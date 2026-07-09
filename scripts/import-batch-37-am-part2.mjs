// Import soal untuk 第37回（令和6年度）午前 問題1-30
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { questions, SOURCE } from './data/batch-37-am-part2.mjs'

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split('\n')
    .filter((l) => l.includes('='))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i), l.slice(i + 1)]
    })
)

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function run() {
  let inserted = 0
  let skipped = 0

  for (const q of questions) {
    const { data: existing } = await supabase
      .from('questions')
      .select('id')
      .eq('kamoku_id', q.kamoku_id)
      .eq('question_text_jp', q.question_text_jp)
      .maybeSingle()

    if (existing) {
      console.log('  skip (exists):', q.question_text_jp.slice(0, 30))
      skipped++
      continue
    }

    const { data: insertedQ, error } = await supabase
      .from('questions')
      .insert({
        kamoku_id: q.kamoku_id,
        source: SOURCE,
        difficulty: q.difficulty,
        question_text_jp: q.question_text_jp,
        correct_answer: q.correct_answer,
        exam_frequency: q.exam_frequency,
        furigana_map: q.furigana_map,
      })
      .select('id')
      .single()

    if (error) {
      console.error('  QUESTION FAILED:', q.question_text_jp.slice(0, 30), error.message)
      continue
    }

    const optionRows = q.options.map((o) => ({
      question_id: insertedQ.id,
      option_number: o.n,
      option_text_jp: o.text,
      option_furigana_map: [],
      explanation_jp: o.exp_jp,
      explanation_id: o.exp_id,
      explanation_furigana_map: [],
    }))

    const { error: optError } = await supabase.from('question_options').insert(optionRows)
    if (optError) {
      console.error('  OPTIONS FAILED:', q.question_text_jp.slice(0, 30), optError.message)
      continue
    }

    console.log('  inserted:', q.question_text_jp.slice(0, 30))
    inserted++
  }

  console.log(`\nDone. inserted=${inserted} skipped=${skipped}`)
}

run()
