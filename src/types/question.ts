export type QuestionDifficulty = 'easy' | 'medium' | 'hard'
export type ExamFrequency = 'high' | 'medium' | 'low'

export interface FuriganaMapEntry {
  kanji: string
  reading: string
}

export interface Question {
  id: string
  kamoku_id: number
  source: string | null
  difficulty: QuestionDifficulty | null
  question_text_jp: string
  correct_answer: number
  exam_frequency: ExamFrequency | null
  furigana_map: FuriganaMapEntry[] | null
  created_at: string
}

export interface QuestionOption {
  id: string
  question_id: string
  option_number: number
  option_text_jp: string
  option_furigana_map: FuriganaMapEntry[] | null
  explanation_jp: string | null
  explanation_id: string | null
  explanation_furigana_map: FuriganaMapEntry[] | null
}

export interface QuestionWithOptions extends Question {
  options: QuestionOption[]
}
