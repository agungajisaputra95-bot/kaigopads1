import { createClient } from '@/lib/supabase/server'
import type { Vocabulary } from '@/types/material'

export async function getVocabularyDictForKamoku(kamokuId: number): Promise<Record<string, Vocabulary>> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('vocabulary').select('*').eq('kamoku_id', kamokuId)

  if (error || !data) return {}

  return Object.fromEntries((data as Vocabulary[]).map((v) => [v.kanji, v]))
}

export async function getVocabularyDictForKamokuIds(kamokuIds: number[]): Promise<Record<string, Vocabulary>> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('vocabulary').select('*').in('kamoku_id', kamokuIds)

  if (error || !data) return {}

  return Object.fromEntries((data as Vocabulary[]).map((v) => [v.kanji, v]))
}

export async function getAllVocabulary(): Promise<Vocabulary[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('vocabulary').select('*').order('kamoku_id')

  if (error || !data) return []
  return data as Vocabulary[]
}

export interface WeakVocabItem {
  id: string
  kanji: string
  furigana: string
  meaningId: string
}

export async function getWeakVocabQueue(userId: string, limit = 5): Promise<WeakVocabItem[]> {
  const supabase = await createClient()
  const today = new Date().toISOString().slice(0, 10)
  const { data, error } = await supabase
    .from('vocabulary_progress')
    .select('vocabulary_id, vocabulary(kanji, furigana, meaning_id)')
    .eq('user_id', userId)
    .eq('is_weak_flagged', true)
    .lte('next_review_date', today)
    .limit(limit)

  if (error || !data) return []

  return data.map((row) => {
    const v = row.vocabulary as unknown as { kanji: string; furigana: string; meaning_id: string }
    return { id: row.vocabulary_id as string, kanji: v.kanji, furigana: v.furigana, meaningId: v.meaning_id }
  })
}

export async function getWeakVocabCount(userId: string): Promise<number> {
  const supabase = await createClient()
  const today = new Date().toISOString().slice(0, 10)
  const { count } = await supabase
    .from('vocabulary_progress')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_weak_flagged', true)
    .lte('next_review_date', today)

  return count ?? 0
}
