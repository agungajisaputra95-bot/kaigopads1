import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'

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

const fm = (pairs) => pairs.map(([kanji, reading]) => ({ kanji, reading }))

const vocabulary = [
  { kamoku_id: 12, kanji: '介護過程', furigana: 'かいごかてい', meaning_id: 'Proses perawatan — siklus asesmen, rencana, pelaksanaan, evaluasi untuk mendukung kemandirian individual', example_sentence_jp: '介護過程を展開し、利用者の自立を支援する。', example_sentence_id: 'Menjalankan proses perawatan untuk mendukung kemandirian pengguna layanan.' },
  { kamoku_id: 12, kanji: '生活課題', furigana: 'せいかつかだい', meaning_id: 'Masalah hidup — kebutuhan pengguna layanan yang diidentifikasi lewat asesmen', example_sentence_jp: 'アセスメントを通して生活課題を明らかにする。', example_sentence_id: 'Mengidentifikasi masalah hidup lewat asesmen.' },
  { kamoku_id: 12, kanji: 'アセスメント', furigana: 'あせすめんと', meaning_id: 'Asesmen — pengumpulan & analisis informasi tentang kondisi pengguna layanan, langkah awal proses perawatan', example_sentence_jp: '初回訪問でアセスメントを行う。', example_sentence_id: 'Melakukan asesmen pada kunjungan pertama.' },
  { kamoku_id: 12, kanji: 'サービス担当者会議', furigana: 'さーびすたんとうしゃかいぎ', meaning_id: 'Rapat penanggung jawab layanan — dipimpin care manager, membahas rencana perawatan lintas profesi', example_sentence_jp: 'サービス担当者会議で各職種の役割を確認する。', example_sentence_id: 'Mengonfirmasi peran tiap profesi dalam rapat penanggung jawab layanan.' },
  { kamoku_id: 12, kanji: 'サービス提供責任者', furigana: 'さーびすていきょうせきにんしゃ', meaning_id: 'Penanggung jawab layanan — menyusun rencana kunjungan perawatan, mengoordinasikan tim home helper', example_sentence_jp: 'サービス提供責任者が訪問介護計画を作成する。', example_sentence_id: 'Penanggung jawab layanan menyusun rencana kunjungan perawatan.' },
  { kamoku_id: 12, kanji: '個別支援計画', furigana: 'こべつしえんけいかく', meaning_id: 'Rencana dukungan individual — dipakai di layanan kesejahteraan disabilitas, berisi target jangka pendek/panjang', example_sentence_jp: '個別支援計画の短期目標を見直す。', example_sentence_id: 'Meninjau ulang target jangka pendek dalam rencana dukungan individual.' },
]

const materialSections = [
  {
    kamoku_id: 12, order_index: 1, title_jp: '介護過程を展開する目的と生活課題',
    content_jp: '介護過程を展開する目的は、利用者一人ひとりの状態に応じた個別ケアを通じて自立を支援することです。生活課題は、家族の立場や介護福祉職の主観ではなく、利用者本人のニーズ（アセスメントで把握した情報）を基盤に特定します。複数の生活課題が存在することもあり、無理に1つに集約する必要はありませんが、生命に関わる危機がある場合はそれを最優先します。',
    content_id: 'Tujuan menjalankan proses perawatan adalah mendukung kemandirian lewat perawatan individual sesuai kondisi tiap pengguna layanan. Masalah hidup ditentukan berdasarkan kebutuhan pengguna sendiri (informasi dari asesmen), bukan sudut pandang keluarga atau opini pekerja kaigo. Bisa ada beberapa masalah hidup sekaligus, tidak perlu dipaksa jadi satu, tapi bahaya yang mengancam nyawa tetap diprioritaskan.',
    example_jp: 'アセスメントで把握したＡさんのニーズをもとに、生活課題を明確にする。', example_id: 'Menentukan masalah hidup berdasarkan kebutuhan Aさん yang diketahui lewat asesmen.',
    exam_point_jp: '介護過程の目的＝個別ケアによる自立支援。生活課題の基盤＝本人のニーズ。「家族の立場」「介護職の主観」は不適切な選択肢になりやすい。',
    exam_point_id: 'Tujuan proses perawatan = dukungan kemandirian lewat perawatan individual. Dasar masalah hidup = kebutuhan pengguna sendiri. "Sudut pandang keluarga" atau "opini staf" biasanya jawaban salah.',
    furigana_map: fm([['介護過程', 'かいごかてい'], ['展開', 'てんかい'], ['目的', 'もくてき'], ['個別ケア', 'こべつけあ'], ['自立支援', 'じりつしえん'], ['生活課題', 'せいかつかだい'], ['本人', 'ほんにん'], ['ニーズ', 'にーず'], ['基盤', 'きばん'], ['特定', 'とくてい'], ['複数', 'ふくすう'], ['生命', 'せいめい'], ['危機', 'きき'], ['優先', 'ゆうせん']]),
    linkMatch: '介護過程を展開する目的として',
  },
  {
    kamoku_id: 12, order_index: 2, title_jp: '介護過程における評価',
    content_jp: '評価とは、設定した目標がどの程度達成されたかを確認することです。他の利用者との比較ではなく、その利用者個人の達成状況で行います。評価日は計画作成時にあらかじめ設定し、短期目標を達成しても長期目標に向けて介護過程は継続します。計画を修正した場合も、その後の評価は必要です。',
    content_id: 'Evaluasi adalah memeriksa sejauh mana target yang ditetapkan tercapai. Dilakukan berdasarkan capaian pengguna itu sendiri, bukan dibandingkan pengguna lain. Tanggal evaluasi ditentukan sejak awal saat menyusun rencana, dan meski target jangka pendek tercapai, proses perawatan berlanjut menuju target jangka panjang. Meski rencana direvisi, evaluasi berikutnya tetap diperlukan.',
    example_jp: '3か月後の評価日に、短期目標の達成状況を確認する。', example_id: 'Pada tanggal evaluasi 3 bulan kemudian, memeriksa capaian target jangka pendek.',
    exam_point_jp: '評価＝目標達成状況の確認。「他利用者と比較」「短期目標達成で終了」「修正時は評価省略」は誤りになりやすい。',
    exam_point_id: 'Evaluasi = memeriksa capaian target. "Dibandingkan pengguna lain", "selesai setelah target jangka pendek tercapai", "evaluasi dilewati saat revisi" biasanya salah.',
    furigana_map: fm([['評価', 'ひょうか'], ['目標', 'もくひょう'], ['達成状況', 'たっせいじょうきょう'], ['確認', 'かくにん'], ['比較', 'ひかく'], ['個人', 'こじん'], ['評価日', 'ひょうかび'], ['計画作成時', 'けいかくさくせいじ'], ['短期目標', 'たんきもくひょう'], ['長期目標', 'ちょうきもくひょう'], ['継続', 'けいぞく'], ['修正', 'しゅうせい']]),
    linkMatch: '介護過程の展開における評価の説明',
  },
  {
    kamoku_id: 12, order_index: 3, title_jp: 'サービス担当者会議と多職種の役割分担',
    content_jp: 'サービス担当者会議は介護支援専門員（ケアマネジャー）が主催し、居宅サービス計画の原案を説明します。サービス提供責任者は、この会議で訪問介護計画の作成に必要な情報を確認する役割を担います。他職種のサービス内容の評価は、それぞれの専門職やケアマネジャーが行います。',
    content_id: 'Rapat penanggung jawab layanan diselenggarakan oleh care manager, yang menjelaskan draf rencana layanan rumah. Penanggung jawab layanan berperan mengonfirmasi informasi yang diperlukan untuk menyusun rencana kunjungan perawatan dalam rapat ini. Evaluasi layanan profesi lain dilakukan masing-masing profesi/care manager.',
    example_jp: 'サービス提供責任者は、会議でＡさんの生活状況について質問し、訪問介護計画に必要な情報を集める。', example_id: 'Penanggung jawab layanan bertanya soal kondisi hidup Aさん dalam rapat untuk mengumpulkan informasi yang diperlukan rencana kunjungan perawatan.',
    exam_point_jp: '会議の主催・原案説明＝ケアマネジャー、情報確認＝サービス提供責任者、と役割を混同しないこと。',
    exam_point_id: 'Jangan tertukar peran: penyelenggara rapat & penjelasan draf = care manager, konfirmasi informasi = penanggung jawab layanan.',
    furigana_map: fm([['サービス担当者会議', 'さーびすたんとうしゃかいぎ'], ['介護支援専門員', 'かいごしえんせんもんいん'], ['主催', 'しゅさい'], ['居宅サービス計画', 'きょたくさーびすけいかく'], ['原案', 'げんあん'], ['サービス提供責任者', 'さーびすていきょうせきにんしゃ'], ['訪問介護計画', 'ほうもんかいごけいかく'], ['作成', 'さくせい'], ['情報', 'じょうほう'], ['確認', 'かくにん'], ['役割', 'やくわり']]),
    linkMatch: 'サービス担当者会議におけるサービス提供責任者の役割',
  },
  {
    kamoku_id: 12, order_index: 4, title_jp: '行動の背景を読み取るアセスメント（脳梗塞後の調理支援）',
    content_jp: '利用者の行動には必ず背景があります。片麻痺で調理がうまくいかず作業を中断した場面では、本人の発言（「悔しい」等）や翌日の行動（「今日も手伝って」と調理継続を望む）から、興味の喪失ではなく「うまくできないことへの苛立ち」と解釈することが適切です。カンファレンスでの対応提案は、本人の自立への意欲を支えつつ課題を解決する、調理用の福祉用具（自助具）の活用などが有効です。',
    content_id: 'Setiap perilaku pengguna layanan pasti punya latar belakang. Saat seseorang dengan hemiplegia berhenti memasak karena gagal, dari ucapannya ("kesal") dan perilaku esoknya (minta "dibantu lagi" — ingin lanjut memasak), interpretasi yang tepat bukan hilangnya minat, melainkan "frustrasi karena tak bisa melakukannya dengan baik". Usulan dalam konferensi sebaiknya berupa alat bantu memasak yang mendukung motivasi mandiri sambil menyelesaikan masalahnya.',
    example_jp: '「もう一度自分で作りたい」という言葉から、調理への意欲がまだあることがわかる。', example_id: 'Dari ucapan "ingin memasak sendiri lagi", terlihat motivasi memasak masih ada.',
    exam_point_jp: '発言・翌日の行動から本人の本当の気持ちを読み取る力が問われる。福祉用具の活用は自立支援と課題解決を両立する定番の正解。',
    exam_point_id: 'Diuji kemampuan membaca perasaan sebenarnya dari ucapan & perilaku esoknya. Pemakaian alat bantu adalah jawaban umum yang menyeimbangkan dukungan kemandirian & penyelesaian masalah.',
    furigana_map: fm([['行動', 'こうどう'], ['背景', 'はいけい'], ['片麻痺', 'かたまひ'], ['調理', 'ちょうり'], ['中断', 'ちゅうだん'], ['発言', 'はつげん'], ['苛立', 'いらだ'], ['解釈', 'かいしゃく'], ['カンファレンス', 'かんふぁれんす'], ['意欲', 'いよく'], ['福祉用具', 'ふくしようぐ'], ['自助具', 'じじょぐ'], ['活用', 'かつよう']]),
    linkMatch: 'Ａさん（78歳、男性、要介護1）は、一人暮らしで、脳梗塞（cerebral infarction）を発症し入院',
  },
  {
    kamoku_id: 12, order_index: 5, title_jp: '知的障害のある人の排泄自立支援',
    content_jp: '排泄の失敗を他の利用者にからかわれて一人でいるような場面では、まずその相手（ほかの利用者）との関係性を理解することが最優先です。短期目標の実現に向けては、本人と一緒に手順を定期的に確認するなど、自立を支える対応が基本で、我慢させる、本人の意思に反しておむつを勧める、全介助にするといった対応は目標に反します。',
    content_id: 'Saat seseorang menyendiri setelah diejek pengguna lain atas kegagalan buang air, yang paling prioritas dipahami dulu adalah hubungan dengan pengguna lain itu. Untuk mewujudkan target jangka pendek, dasarnya adalah dukungan yang menopang kemandirian, seperti mengecek prosedur bersama secara berkala — bukan menahan buang air, menyarankan popok bertentangan dengan keinginannya, atau memberi bantuan penuh yang justru bertentangan dengan target.',
    example_jp: '生活支援員が、Ｂさんと一緒にトイレの手順を確認しながら、失敗を減らしていく。', example_id: 'Pendamping hidup mengecek prosedur toilet bersama Bさん, mengurangi kegagalan secara bertahap.',
    exam_point_jp: '「一人でいた理由」は他の利用者との関係。目標実現の対応は「本人と一緒に確認」が基本、我慢させる・全介助は不適切。',
    exam_point_id: '"Alasan menyendiri" = hubungan dengan pengguna lain. Respons mewujudkan target dasarnya "mengecek bersama pengguna", menahan/bantuan penuh tidak tepat.',
    furigana_map: fm([['知的障害', 'ちてきしょうがい'], ['排泄', 'はいせつ'], ['自立支援', 'じりつしえん'], ['からか', 'からか'], ['関係性', 'かんけいせい'], ['理解', 'りかい'], ['優先', 'ゆうせん'], ['短期目標', 'たんきもくひょう'], ['実現', 'じつげん'], ['手順', 'てじゅん'], ['確認', 'かくにん'], ['我慢', 'がまん'], ['意思', 'いし'], ['全介助', 'ぜんかいじょ']]),
    linkMatch: 'Ｂさん（42歳、女性、障害支援区分3）は、知的障害があり',
  },
]

async function run() {
  console.log('--- Inserting vocabulary ---')
  for (const v of vocabulary) {
    const { data: existing } = await supabase.from('vocabulary').select('id').eq('kamoku_id', v.kamoku_id).eq('kanji', v.kanji).maybeSingle()
    if (existing) { console.log('  skip (exists):', v.kanji); continue }
    const { error } = await supabase.from('vocabulary').insert(v)
    if (error) console.error('  FAILED:', v.kanji, error.message)
    else console.log('  inserted:', v.kanji)
  }

  console.log('--- Inserting material_sections + links ---')
  for (const m of materialSections) {
    const { linkMatch, ...row } = m
    const { data: existing } = await supabase.from('material_sections').select('id').eq('kamoku_id', row.kamoku_id).eq('title_jp', row.title_jp).maybeSingle()
    let sectionId = existing?.id
    if (existing) {
      console.log('  skip (exists):', row.title_jp)
    } else {
      const { data: inserted, error } = await supabase.from('material_sections').insert(row).select('id').single()
      if (error) { console.error('  FAILED:', row.title_jp, error.message); continue }
      sectionId = inserted.id
      console.log('  inserted:', row.title_jp)
    }
    const { data: matches } = await supabase.from('questions').select('id, question_text_jp').eq('kamoku_id', row.kamoku_id).ilike('question_text_jp', `%${linkMatch}%`)
    for (const q of matches ?? []) {
      const { data: existingLink } = await supabase.from('question_material_links').select('question_id').eq('question_id', q.id).eq('material_section_id', sectionId).maybeSingle()
      if (existingLink) continue
      const { error: linkError } = await supabase.from('question_material_links').insert({ question_id: q.id, material_section_id: sectionId })
      if (linkError) console.error('  LINK FAILED:', linkError.message)
      else console.log('  linked to question:', q.question_text_jp.slice(0, 30))
    }
  }
  console.log('--- Done ---')
}

run()
