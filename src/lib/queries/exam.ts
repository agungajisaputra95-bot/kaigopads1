import { createClient } from '@/lib/supabase/server'
import { KAMOKU_LIST, type KamokuPart } from '@/lib/constants'
import type { FuriganaMapEntry, QuestionOption } from '@/types/question'

export interface MockExamOption {
  number: number
  textJp: string
  furiganaMap: FuriganaMapEntry[]
}

export interface MockExamQuestion {
  id: string
  number: number
  kamokuId: number
  part: KamokuPart
  textJp: string
  furiganaMap: FuriganaMapEntry[]
  imageUrl: string | null
  options: MockExamOption[]
  correctAnswer: number
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const MAX_EXAM_QUESTIONS = 125

export async function getExamQuestions(sourceFilter?: string): Promise<MockExamQuestion[]> {
  const supabase = await createClient()
  let query = supabase
    .from('questions')
    .select('id, kamoku_id, question_text_jp, correct_answer, furigana_map, image_url, question_options(*)')
    .not('correct_answer', 'is', null)

  if (sourceFilter) {
    query = query.ilike('source', `%${sourceFilter}%`)
  }

  const { data, error } = await query

  if (error || !data || data.length === 0) {
    if (sourceFilter) return getExamQuestions() // fallback ke semua soal kalau filter tahun kosong
    return []
  }

  const shuffled = shuffle(data).slice(0, MAX_EXAM_QUESTIONS)

  return shuffled.map((row, i) => {
    const kamoku = KAMOKU_LIST.find((k) => k.id === row.kamoku_id)
    const options = (row.question_options as QuestionOption[])
      .sort((a, b) => a.option_number - b.option_number)
      .map((opt) => ({
        number: opt.option_number,
        textJp: opt.option_text_jp,
        furiganaMap: opt.option_furigana_map ?? [],
      }))

    return {
      id: row.id,
      number: i + 1,
      kamokuId: row.kamoku_id,
      part: kamoku?.part ?? 'A',
      textJp: row.question_text_jp,
      furiganaMap: (row.furigana_map as FuriganaMapEntry[]) ?? [],
      imageUrl: row.image_url as string | null,
      options,
      correctAnswer: row.correct_answer as number,
    }
  })
}

export interface PastYearAttemptInfo {
  correctCount: number
  totalQuestions: number
  takenAt: string
}

// Daftar 過去問 (tahun ujian) yang benar-benar ada soalnya di bank, diambil dari
// nilai `source` unik di tabel questions (bukan daftar hardcoded).
export async function getPastYearSources(): Promise<string[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('questions')
    .select('source')
    .ilike('source', '%過去問%')
    .not('source', 'is', null)

  if (error || !data) return []

  const sources = new Set(data.map((row) => row.source as string))
  return [...sources].sort((a, b) => b.localeCompare(a))
}

export async function getPastYearAttempts(userId: string): Promise<Record<string, PastYearAttemptInfo>> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('exam_attempts')
    .select('source, correct_count, total_questions, taken_at')
    .eq('user_id', userId)
    .order('taken_at', { ascending: false })

  if (error || !data) return {}

  const bySource: Record<string, PastYearAttemptInfo> = {}
  for (const row of data) {
    // Baris pertama per source (karena sudah di-order terbaru dulu) = percobaan terakhir.
    if (!bySource[row.source]) {
      bySource[row.source] = {
        correctCount: row.correct_count,
        totalQuestions: row.total_questions,
        takenAt: row.taken_at,
      }
    }
  }

  return bySource
}
