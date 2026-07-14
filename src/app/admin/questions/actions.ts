'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'

export interface SaveQuestionOptionInput {
  text: string
  explanation: string
}

export interface SaveQuestionInput {
  id?: string
  kamokuId: number
  source: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  questionText: string
  correctOption: number
  options: SaveQuestionOptionInput[]
  frequency: 'High' | 'Medium' | 'Low'
  furiganaMap: { kanji: string; reading: string }[]
  materialSectionIds: string[]
  imageUrl: string | null
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp']

export async function uploadQuestionImage(formData: FormData): Promise<{ url: string }> {
  const file = formData.get('file')
  if (!(file instanceof File)) {
    throw new Error('File gambar tidak valid.')
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Format gambar harus PNG, JPEG, atau WEBP.')
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error('Ukuran gambar maksimal 5MB.')
  }

  const supabase = createAdminClient()
  const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg'
  const path = `${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from('question-images').upload(path, file, {
    contentType: file.type,
    upsert: false,
  })

  if (error) {
    throw new Error(`Gagal upload gambar: ${error.message}`)
  }

  const { data } = supabase.storage.from('question-images').getPublicUrl(path)
  return { url: data.publicUrl }
}

async function syncMaterialLinks(
  supabase: ReturnType<typeof createAdminClient>,
  questionId: string,
  materialSectionIds: string[]
) {
  await supabase.from('question_material_links').delete().eq('question_id', questionId)

  if (materialSectionIds.length === 0) return

  await supabase.from('question_material_links').insert(
    materialSectionIds.map((materialSectionId) => ({
      question_id: questionId,
      material_section_id: materialSectionId,
    }))
  )
}

export async function saveQuestion(input: SaveQuestionInput) {
  const supabase = createAdminClient()
  const difficulty = input.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'
  const examFrequency = input.frequency.toLowerCase() as 'high' | 'medium' | 'low'

  if (input.id) {
    await supabase
      .from('questions')
      .update({
        kamoku_id: input.kamokuId,
        source: input.source,
        difficulty,
        question_text_jp: input.questionText,
        correct_answer: input.correctOption,
        exam_frequency: examFrequency,
        furigana_map: input.furiganaMap,
        image_url: input.imageUrl,
      })
      .eq('id', input.id)

    await Promise.all(
      input.options.map((opt, index) =>
        supabase
          .from('question_options')
          .update({
            option_text_jp: opt.text,
            explanation_id: opt.explanation || null,
          })
          .eq('question_id', input.id)
          .eq('option_number', index + 1)
      )
    )

    await syncMaterialLinks(supabase, input.id, input.materialSectionIds)

    revalidatePath('/admin/questions')
    revalidatePath(`/admin/questions/${input.id}`)
    return { id: input.id }
  }

  const { data: inserted, error } = await supabase
    .from('questions')
    .insert({
      kamoku_id: input.kamokuId,
      source: input.source,
      difficulty,
      question_text_jp: input.questionText,
      correct_answer: input.correctOption,
      exam_frequency: examFrequency,
      furigana_map: input.furiganaMap,
      image_url: input.imageUrl,
    })
    .select('id')
    .single()

  if (error || !inserted) {
    throw new Error(error?.message ?? 'Gagal menyimpan soal baru.')
  }

  await supabase.from('question_options').insert(
    input.options.map((opt, index) => ({
      question_id: inserted.id,
      option_number: index + 1,
      option_text_jp: opt.text,
      explanation_id: opt.explanation || null,
    }))
  )

  await syncMaterialLinks(supabase, inserted.id, input.materialSectionIds)

  revalidatePath('/admin/questions')
  redirect(`/admin/questions/${inserted.id}`)
}
