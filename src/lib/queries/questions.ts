import { createClient } from '@/lib/supabase/server'
import type { ExamFrequency, FuriganaMapEntry, QuestionOption, QuestionWithOptions } from '@/types/question'

export async function getQuestionsForKamoku(kamokuId: number): Promise<QuestionWithOptions[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('questions')
    .select('*, question_options(*)')
    .eq('kamoku_id', kamokuId)
    .order('created_at')

  if (error || !data) return []

  return data.map((row) => {
    const { question_options, ...question } = row as typeof row & { question_options: QuestionOption[] }
    return {
      ...question,
      options: [...question_options].sort((a, b) => a.option_number - b.option_number),
    }
  })
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export interface FilteredQuestionsOptions {
  kamokuIds: number[]
  difficulties: string[]
  weakOnly: boolean
  userId: string
  limit: number
}

export async function getFilteredQuestions(opts: FilteredQuestionsOptions): Promise<QuestionWithOptions[]> {
  const supabase = await createClient()

  let allowedQuestionIds: Set<string> | null = null
  if (opts.weakOnly) {
    const { data: weakRows } = await supabase
      .from('user_progress')
      .select('question_id')
      .eq('user_id', opts.userId)
      .eq('is_weak_flagged', true)

    allowedQuestionIds = new Set((weakRows ?? []).map((r) => r.question_id as string))
    if (allowedQuestionIds.size === 0) return []
  }

  let query = supabase
    .from('questions')
    .select('*, question_options(*)')
    .in('kamoku_id', opts.kamokuIds)
    .not('correct_answer', 'is', null)

  if (opts.difficulties.length > 0 && opts.difficulties.length < 3) {
    query = query.in('difficulty', opts.difficulties)
  }

  const { data, error } = await query
  if (error || !data) return []

  let rows = data as (typeof data[number] & { question_options: QuestionOption[] })[]
  if (allowedQuestionIds) {
    rows = rows.filter((row) => allowedQuestionIds!.has(row.id))
  }

  return shuffle(rows)
    .slice(0, opts.limit)
    .map((row) => {
      const { question_options, ...question } = row
      return {
        ...question,
        options: [...question_options].sort((a, b) => a.option_number - b.option_number),
      }
    })
}

export interface RelatedQuestionRow {
  num: number
  textJp: string
  furiganaMap: FuriganaMapEntry[]
}

export async function getRelatedQuestionsForKamoku(kamokuId: number, limit = 3): Promise<RelatedQuestionRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('questions')
    .select('question_text_jp, furigana_map')
    .eq('kamoku_id', kamokuId)
    .order('created_at')
    .limit(limit)

  if (error || !data) return []

  return data.map((row, i) => ({
    num: i + 1,
    textJp: row.question_text_jp,
    furiganaMap: (row.furigana_map as FuriganaMapEntry[]) ?? [],
  }))
}

export async function getDominantExamFrequency(kamokuId: number): Promise<ExamFrequency | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('questions')
    .select('exam_frequency')
    .eq('kamoku_id', kamokuId)
    .not('exam_frequency', 'is', null)

  if (error || !data || data.length === 0) return null

  const counts: Record<string, number> = {}
  for (const row of data) {
    const freq = row.exam_frequency as string
    counts[freq] = (counts[freq] ?? 0) + 1
  }

  return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as ExamFrequency) ?? null
}
