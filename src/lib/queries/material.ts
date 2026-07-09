import { createClient } from '@/lib/supabase/server'
import type { MaterialSection } from '@/types/material'

export async function getFirstMaterialSectionForKamoku(kamokuId: number): Promise<MaterialSection | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('material_sections')
    .select('*')
    .eq('kamoku_id', kamokuId)
    .order('order_index')
    .limit(1)
    .maybeSingle()

  if (error || !data) return null
  return data as MaterialSection
}

export async function getAllMaterialSectionsForKamoku(kamokuId: number): Promise<MaterialSection[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('material_sections')
    .select('*')
    .eq('kamoku_id', kamokuId)
    .order('order_index')

  if (error || !data) return []
  return data as MaterialSection[]
}

export async function getAllMaterialSections(): Promise<MaterialSection[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('material_sections').select('*').order('kamoku_id').order('order_index')

  if (error || !data) return []
  return data as MaterialSection[]
}

export async function getMaterialSectionCounts(): Promise<Record<number, number>> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('material_sections').select('kamoku_id')

  const counts: Record<number, number> = {}
  if (error || !data) return counts

  for (const row of data) {
    counts[row.kamoku_id] = (counts[row.kamoku_id] ?? 0) + 1
  }
  return counts
}
