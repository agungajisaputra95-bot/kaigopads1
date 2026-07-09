import type { FuriganaMapEntry } from '@/types/question'

export interface MaterialSection {
  id: string
  kamoku_id: number
  title_jp: string
  title_furigana: string | null
  content_jp: string
  content_id: string
  example_jp: string | null
  example_id: string | null
  exam_point_jp: string | null
  exam_point_id: string | null
  furigana_map: FuriganaMapEntry[] | null
  order_index: number | null
}

export interface QuestionMaterialLink {
  question_id: string
  material_section_id: string
}

export interface Vocabulary {
  id: string
  kanji: string
  furigana: string
  meaning_id: string
  example_sentence_jp: string | null
  example_sentence_id: string | null
  kamoku_id: number
}
