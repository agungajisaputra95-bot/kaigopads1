import { createClient } from '@/lib/supabase/server'
import { KAMOKU_LIST } from '@/lib/constants'
import type { QuestionOption, QuestionWithOptions } from '@/types/question'

export interface AdminQuestionListItem {
  id: string
  kamoku_id: number
  source: string | null
  difficulty: string | null
  correct_answer: number | null
  question_text_jp: string
  created_at: string
}

export async function getAllQuestionsForAdmin(): Promise<AdminQuestionListItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('questions')
    .select('id, kamoku_id, source, difficulty, correct_answer, question_text_jp, created_at')
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data
}

export async function getQuestionForEdit(id: string): Promise<QuestionWithOptions | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('questions').select('*, question_options(*)').eq('id', id).maybeSingle()

  if (error || !data) return null

  const { question_options, ...question } = data as typeof data & { question_options: QuestionOption[] }
  return {
    ...question,
    options: [...question_options].sort((a, b) => a.option_number - b.option_number),
  }
}

export async function getLinkedMaterialSectionIds(questionId: string): Promise<string[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('question_material_links')
    .select('material_section_id')
    .eq('question_id', questionId)

  if (error || !data) return []
  return data.map((row) => row.material_section_id as string)
}

export interface ContentStats {
  totalQuestions: number
  draftQuestions: number
  totalMaterialSections: number
  totalVocabulary: number
  kamokuWithMateriCount: number
}

export async function getContentStats(): Promise<ContentStats> {
  const supabase = await createClient()

  const [questionsRes, draftRes, materialRes, vocabRes, materiKamokuRes] = await Promise.all([
    supabase.from('questions').select('id', { count: 'exact', head: true }),
    supabase.from('questions').select('id', { count: 'exact', head: true }).is('correct_answer', null),
    supabase.from('material_sections').select('id', { count: 'exact', head: true }),
    supabase.from('vocabulary').select('id', { count: 'exact', head: true }),
    supabase.from('material_sections').select('kamoku_id'),
  ])

  const distinctKamoku = new Set((materiKamokuRes.data ?? []).map((r) => r.kamoku_id))

  return {
    totalQuestions: questionsRes.count ?? 0,
    draftQuestions: draftRes.count ?? 0,
    totalMaterialSections: materialRes.count ?? 0,
    totalVocabulary: vocabRes.count ?? 0,
    kamokuWithMateriCount: distinctKamoku.size,
  }
}

export interface KamokuInventoryRow {
  id: number
  part: string
  nameJp: string
  nameId: string
  questionCount: number
  draftCount: number
  materialCount: number
  vocabCount: number
}

export async function getKamokuInventory(): Promise<KamokuInventoryRow[]> {
  const supabase = await createClient()

  const [questionsRes, materialRes, vocabRes] = await Promise.all([
    supabase.from('questions').select('kamoku_id, correct_answer'),
    supabase.from('material_sections').select('kamoku_id'),
    supabase.from('vocabulary').select('kamoku_id'),
  ])

  const questionCounts = new Map<number, { total: number; draft: number }>()
  for (const row of questionsRes.data ?? []) {
    const entry = questionCounts.get(row.kamoku_id) ?? { total: 0, draft: 0 }
    entry.total += 1
    if (row.correct_answer === null) entry.draft += 1
    questionCounts.set(row.kamoku_id, entry)
  }

  const materialCounts = new Map<number, number>()
  for (const row of materialRes.data ?? []) {
    materialCounts.set(row.kamoku_id, (materialCounts.get(row.kamoku_id) ?? 0) + 1)
  }

  const vocabCounts = new Map<number, number>()
  for (const row of vocabRes.data ?? []) {
    vocabCounts.set(row.kamoku_id, (vocabCounts.get(row.kamoku_id) ?? 0) + 1)
  }

  return KAMOKU_LIST.map((k) => ({
    id: k.id,
    part: k.part,
    nameJp: k.nameJp,
    nameId: k.nameId,
    questionCount: questionCounts.get(k.id)?.total ?? 0,
    draftCount: questionCounts.get(k.id)?.draft ?? 0,
    materialCount: materialCounts.get(k.id) ?? 0,
    vocabCount: vocabCounts.get(k.id) ?? 0,
  }))
}
