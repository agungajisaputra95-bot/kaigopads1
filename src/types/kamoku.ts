export type KamokuPart = 'A' | 'B' | 'C'

export interface Kamoku {
  id: number
  part: KamokuPart
  name_jp: string
  name_furigana: string | null
  name_id: string
  bank_question_count: number
  order_index: number
}
