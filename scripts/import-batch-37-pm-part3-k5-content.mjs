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
  { kamoku_id: 5, kanji: '要約', furigana: 'ようやく', meaning_id: 'Meringkas — merangkum isi pembicaraan lalu mengembalikannya ke lawan bicara untuk membantu menata perasaannya', example_sentence_jp: '話の内容を要約して、利用者に返す。', example_sentence_id: 'Meringkas isi pembicaraan lalu mengembalikannya ke pengguna layanan.' },
  { kamoku_id: 5, kanji: '開かれた質問', furigana: 'ひらかれたしつもん', meaning_id: 'Pertanyaan terbuka (open question) — mendorong jawaban bebas & panjang', example_sentence_jp: '「今日はどんな一日でしたか」は開かれた質問である。', example_sentence_id: '"Hari ini bagaimana harimu?" adalah contoh pertanyaan terbuka.' },
  { kamoku_id: 5, kanji: '閉じられた質問', furigana: 'とじられたしつもん', meaning_id: 'Pertanyaan tertutup (closed question) — dijawab singkat (ya/tidak dsb.), cocok bagi yang sulit bicara panjang', example_sentence_jp: '構音障害のある人には閉じられた質問が答えやすい。', example_sentence_id: 'Bagi orang dengan gangguan artikulasi, pertanyaan tertutup lebih mudah dijawab.' },
  { kamoku_id: 5, kanji: '構音障害', furigana: 'こうおんしょうがい', meaning_id: 'Gangguan artikulasi — kesulitan mengucapkan kata dengan jelas, meski pemahaman bahasa tetap normal', example_sentence_jp: '構音障害があっても、言葉の理解力は保たれていることが多い。', example_sentence_id: 'Meski ada gangguan artikulasi, kemampuan memahami bahasa sering kali tetap terjaga.' },
  { kamoku_id: 5, kanji: 'バリデーション', furigana: 'ばりでーしょん', meaning_id: 'Validasi — merespons sesuai realita yang dialami penderita demensia, bukan mengoreksinya', example_sentence_jp: 'バリデーションの視点で、Ａさんの言葉を否定せずに受け止める。', example_sentence_id: 'Dari sudut pandang validasi, menerima ucapan Aさん tanpa menyangkalnya.' },
  { kamoku_id: 5, kanji: '主観的情報', furigana: 'しゅかんてきじょうほう', meaning_id: 'Informasi subjektif — apa yang dirasakan/dikatakan pengguna layanan, dicatat terpisah dari fakta objektif', example_sentence_jp: '記録には主観的情報と客観的事実を区別して書く。', example_sentence_id: 'Dalam catatan, informasi subjektif dan fakta objektif ditulis terpisah.' },
]

const materialSections = [
  {
    kamoku_id: 5,
    order_index: 1,
    title_jp: '傾聴の基本技法',
    content_jp:
      '利用者とのコミュニケーションには複数の技法があります。開かれた質問は自由な返答を促し、共感は相手の気持ちを受け止め、うなずき・相槌は受容を示します。要約は、話された内容を整理してまとめ相手に返すことで、利用者自身の気持ちの整理を助ける技法です。',
    content_id:
      'Komunikasi dengan pengguna layanan memiliki berbagai teknik. Pertanyaan terbuka mendorong jawaban bebas, empati menerima perasaan lawan bicara, anggukan/respons singkat menunjukkan penerimaan. Meringkas adalah merangkum isi pembicaraan lalu mengembalikannya ke lawan bicara, membantu menata perasaannya sendiri.',
    example_jp: '「つまり、これからも自宅で暮らしたいというお気持ちなんですね」とまとめて伝える。',
    example_id: '"Jadi, intinya Bapak/Ibu ingin tetap tinggal di rumah ya" — menyampaikan rangkuman seperti ini.',
    exam_point_jp: '各技法（開かれた質問・共感・要約・自己覚知等）の名称と定義を正確に対応させて覚える。',
    exam_point_id: 'Hafalkan pasangan nama-definisi tiap teknik (pertanyaan terbuka, empati, meringkas, self-awareness, dll.) dengan tepat.',
    furigana_map: fm([
      ['利用者', 'りようしゃ'], ['複数', 'ふくすう'], ['技法', 'ぎほう'], ['開', 'ひら'], ['質問', 'しつもん'],
      ['自由', 'じゆう'], ['返答', 'へんとう'], ['促', 'うなが'], ['共感', 'きょうかん'], ['気持', 'きも'], ['受', 'う'],
      ['止', 'と'], ['相槌', 'あいづち'], ['受容', 'じゅよう'], ['示', 'しめ'], ['要約', 'ようやく'], ['整理', 'せいり'],
      ['自身', 'じしん'], ['助', 'たす'],
    ]),
    linkMatch: '要約の技法として',
  },
  {
    kamoku_id: 5,
    order_index: 2,
    title_jp: '家族とのコミュニケーション',
    content_jp:
      '利用者と家族の意向が異なるときは、利用者本人の意思決定を基本としつつ、家族の思いも軽視しないことが大切です。本人の前で対立的な話をせず、家族と話す機会を別に設けて丁寧に思いを聴くことが望ましい配慮です。家族に方針を決めさせたり、一方的に説得したりする対応は避けます。',
    content_id:
      'Saat keinginan pengguna layanan dan keluarga berbeda, dasarnya adalah keputusan pengguna sendiri, tapi perasaan keluarga juga tidak boleh diabaikan. Sebaiknya tidak berdebat di depan pengguna, dan menyediakan waktu terpisah untuk mendengarkan keluarga dengan saksama. Hindari membiarkan keluarga menentukan arah dukungan atau membujuk mereka secara sepihak.',
    example_jp: '利用者のいない時間に、家族だけと話す機会を設けて気持ちを聴く。',
    example_id: 'Menyediakan waktu bicara khusus dengan keluarga saat pengguna layanan tidak ada, untuk mendengarkan perasaan mereka.',
    exam_point_jp: '「家族に決めてもらう」「家族を説得する」は不適切な選択肢になりやすい。本人の意思決定を基本にしつつ家族に配慮する、という両立が正解になりやすい。',
    exam_point_id: '"Diserahkan ke keluarga" atau "membujuk keluarga" biasanya jawaban salah. Jawaban benar biasanya menyeimbangkan keputusan pengguna sendiri dengan perhatian ke keluarga.',
    furigana_map: fm([
      ['利用者', 'りようしゃ'], ['家族', 'かぞく'], ['意向', 'いこう'], ['異', 'こと'], ['本人', 'ほんにん'],
      ['意思決定', 'いしけってい'], ['基本', 'きほん'], ['思', 'おも'], ['軽視', 'けいし'], ['対立的', 'たいりつてき'],
      ['機会', 'きかい'], ['設', 'もう'], ['丁寧', 'ていねい'], ['配慮', 'はいりょ'], ['方針', 'ほうしん'], ['説得', 'せっとく'],
      ['避', 'さ'],
    ]),
    linkMatch: '利用者と家族の意向が異なるとき',
  },
  {
    kamoku_id: 5,
    order_index: 3,
    title_jp: '認知症の人の世界観に合わせた対応',
    content_jp:
      '認知症が進行した人が、今いる現実とは異なる場面を体験していることがあります（例：施設をお店だと思いティッシュを「お金」として渡す）。このようなとき、事実を一方的に訂正したり訴えを無視したりせず、本人が体験している現実に合わせて対応する（バリデーション的アプローチ）ことで、混乱や不安を強めずに関わることができます。',
    content_id:
      'Penderita demensia tahap lanjut kadang mengalami situasi berbeda dari realita saat ini (misal mengira fasilitas adalah toko, menyerahkan tisu sebagai "uang"). Pada saat seperti ini, alih-alih mengoreksi fakta secara sepihak atau mengabaikan keluhannya, merespons sesuai realita yang sedang dialaminya (pendekatan validasi) membantu tidak memperparah kebingungan/kecemasan.',
    example_jp: '「お金はこれで足りますか」と聞かれ、「はい、大丈夫ですよ」と会計の場面に合わせて答える。',
    example_id: 'Saat ditanya "apakah uangnya cukup", menjawab "iya, cukup kok" sesuai situasi pembayaran yang sedang dialami.',
    exam_point_jp: '事実を訂正する・訴えを無視する対応は不適切。本人の体験している世界に合わせる対応が正解になりやすい。',
    exam_point_id: 'Mengoreksi fakta atau mengabaikan keluhan biasanya jawaban salah. Merespons sesuai dunia yang sedang dialami penderita biasanya jawaban benar.',
    furigana_map: fm([
      ['認知症', 'にんちしょう'], ['進行', 'しんこう'], ['現実', 'げんじつ'], ['異', 'こと'], ['体験', 'たいけん'],
      ['事実', 'じじつ'], ['一方的', 'いっぽうてき'], ['訂正', 'ていせい'], ['訴', 'うった'], ['無視', 'むし'],
      ['本人', 'ほんにん'], ['合', 'あ'], ['対応', 'たいおう'], ['混乱', 'こんらん'], ['不安', 'ふあん'], ['強', 'つよ'],
    ]),
    linkMatch: 'アルツハイマー型認知症（dementia of the Alzheimer’s type）が進行している。ある日の昼食時',
  },
  {
    kamoku_id: 5,
    order_index: 4,
    title_jp: '構音障害のある人とのコミュニケーション',
    content_jp:
      '構音障害は発音がうまくできない状態で、言葉の意味を理解する力とは別の問題です。理解に支障があるとは限らないため、会話を諦める必要はありません。対応としては、短い言葉でゆっくり話してもらう、聞き取りやすい閉じられた質問（はい・いいえ等で答えられる質問）を活用するなどの工夫が有効です。',
    content_id:
      'Gangguan artikulasi adalah kondisi sulit mengucapkan kata dengan jelas, masalah yang berbeda dari kemampuan memahami makna bahasa. Belum tentu ada gangguan pemahaman, jadi tidak perlu menyerah berkomunikasi. Responsnya: minta bicara dengan kata pendek & perlahan, memakai pertanyaan tertutup (bisa dijawab ya/tidak) yang lebih mudah dipahami.',
    example_jp: '「痛いところは、ここですか」と、はい・いいえで答えられる質問をする。',
    example_id: 'Bertanya "apakah sakitnya di sini?" yang bisa dijawab dengan ya/tidak.',
    exam_point_jp: '構音障害＝発音の問題（理解力とは別）。開かれた質問より閉じられた質問が有効、会話を中断・訓練を中止するのは不適切という点に注意。',
    exam_point_id: 'Gangguan artikulasi = masalah pengucapan (bukan pemahaman). Pertanyaan tertutup lebih efektif daripada terbuka; menghentikan percakapan/pelatihan biasanya tidak tepat.',
    furigana_map: fm([
      ['構音障害', 'こうおんしょうがい'], ['発音', 'はつおん'], ['言葉', 'ことば'], ['意味', 'いみ'], ['理解', 'りかい'],
      ['支障', 'ししょう'], ['会話', 'かいわ'], ['諦', 'あきら'], ['短', 'みじか'], ['聞', 'き'], ['取', 'と'],
      ['閉', 'と'], ['活用', 'かつよう'], ['工夫', 'くふう'], ['有効', 'ゆうこう'],
    ]),
    linkMatch: '構音障害のあるＢさんは、現在発語訓練を実施中',
  },
  {
    kamoku_id: 5,
    order_index: 5,
    title_jp: '知的障害のある人への共感的なかかわり',
    content_jp:
      '知的障害のある人が努力してもうまくいかないとき、既に試して効果のなかった方法を繰り返したり、根拠のない励ましをしたりするのではなく、まず本人の努力と困難さに共感を示し、一緒に解決策を考える姿勢を伝えることが最初の対応として大切です。',
    content_id:
      'Ketika orang dengan disabilitas intelektual sudah berusaha tapi belum berhasil, alih-alih mengulang cara yang sudah dicoba dan tidak berhasil atau memberi semangat tanpa dasar, langkah pertama yang penting adalah menunjukkan empati atas usaha & kesulitannya, lalu menyatakan sikap mau memikirkan solusi bersama.',
    example_jp: '「難しいですよね、一緒に考えましょう」と伝えてから、具体的な工夫を一緒に検討する。',
    example_id: 'Menyampaikan "memang sulit ya, ayo kita pikirkan bersama" sebelum mendiskusikan solusi konkret bersama.',
    exam_point_jp: '「同じ方法を繰り返す」「根拠のない励まし」「責めるニュアンス」は不適切な選択肢になりやすい。共感＋協働の姿勢が正解になりやすい。',
    exam_point_id: '"Mengulang cara yang sama", "semangat tanpa dasar", "nuansa menyalahkan" biasanya jawaban salah. Sikap empati + kolaborasi biasanya jawaban benar.',
    furigana_map: fm([
      ['知的障害', 'ちてきしょうがい'], ['努力', 'どりょく'], ['既', 'すで'], ['効果', 'こうか'], ['繰', 'く'], ['返', 'かえ'],
      ['根拠', 'こんきょ'], ['励', 'はげ'], ['困難', 'こんなん'], ['共感', 'きょうかん'], ['示', 'しめ'], ['解決策', 'かいけつさく'],
      ['姿勢', 'しせい'], ['伝', 'つた'],
    ]),
    linkMatch: '知的障害がある。3か月前に、施設から居宅での一人暮らし',
  },
  {
    kamoku_id: 5,
    order_index: 6,
    title_jp: '介護記録の原則',
    content_jp:
      '介護記録は、介護福祉職の主観的な意見ではなく客観的な事実を中心に、両者を区別して記載することが原則です。食事チェック表などの様式も記録の一部にあたります。適切な個人情報保護の手続きのもとでは、調査・研究目的での記録活用も行われます。個人情報保護の観点から、利用者本人には自身に関する記録の開示を請求する権利があります。',
    content_id:
      'Catatan perawatan pada prinsipnya berpusat pada fakta objektif (bukan opini subjektif pekerja kaigo), dengan keduanya dicatat terpisah. Formulir seperti tabel cek makan juga termasuk bagian dari catatan. Dengan prosedur perlindungan data pribadi yang tepat, catatan bisa dipakai untuk keperluan riset. Dari sudut pandang perlindungan data pribadi, pengguna layanan berhak meminta akses melihat catatan tentang dirinya.',
    example_jp: '「利用者は不安そうな様子だった（客観的事実）」と「私は心配になった（主観的情報）」を分けて記録する。',
    example_id: 'Mencatat terpisah antara "pengguna layanan terlihat cemas" (fakta objektif) dan "saya jadi khawatir" (informasi subjektif).',
    exam_point_jp: '主観と客観を区別して記載、利用者本人に記録の開示請求権がある、という2点が頻出。',
    exam_point_id: '2 poin sering keluar: mencatat subjektif & objektif secara terpisah, pengguna layanan berhak meminta akses catatan dirinya.',
    furigana_map: fm([
      ['介護記録', 'かいごきろく'], ['主観的', 'しゅかんてき'], ['意見', 'いけん'], ['客観的', 'きゃっかんてき'], ['事実', 'じじつ'],
      ['中心', 'ちゅうしん'], ['区別', 'くべつ'], ['記載', 'きさい'], ['原則', 'げんそく'], ['様式', 'ようしき'],
      ['調査', 'ちょうさ'], ['研究', 'けんきゅう'], ['目的', 'もくてき'], ['活用', 'かつよう'], ['個人情報保護', 'こじんじょうほうほご'],
      ['本人', 'ほんにん'], ['開示', 'かいじ'], ['請求', 'せいきゅう'], ['権利', 'けんり'],
    ]),
    linkMatch: '介護保険サービスにおける記録に関する',
  },
]

async function run() {
  console.log('--- Inserting vocabulary ---')
  for (const v of vocabulary) {
    const { data: existing } = await supabase
      .from('vocabulary')
      .select('id')
      .eq('kamoku_id', v.kamoku_id)
      .eq('kanji', v.kanji)
      .maybeSingle()
    if (existing) {
      console.log('  skip (exists):', v.kanji)
      continue
    }
    const { error } = await supabase.from('vocabulary').insert(v)
    if (error) console.error('  FAILED:', v.kanji, error.message)
    else console.log('  inserted:', v.kanji)
  }

  console.log('--- Inserting material_sections + links ---')
  for (const m of materialSections) {
    const { linkMatch, ...row } = m
    const { data: existing } = await supabase
      .from('material_sections')
      .select('id')
      .eq('kamoku_id', row.kamoku_id)
      .eq('title_jp', row.title_jp)
      .maybeSingle()

    let sectionId = existing?.id
    if (existing) {
      console.log('  skip (exists):', row.title_jp)
    } else {
      const { data: inserted, error } = await supabase.from('material_sections').insert(row).select('id').single()
      if (error) {
        console.error('  FAILED:', row.title_jp, error.message)
        continue
      }
      sectionId = inserted.id
      console.log('  inserted:', row.title_jp)
    }

    const { data: matches } = await supabase
      .from('questions')
      .select('id, question_text_jp')
      .eq('kamoku_id', row.kamoku_id)
      .ilike('question_text_jp', `%${linkMatch}%`)

    for (const q of matches ?? []) {
      const { data: existingLink } = await supabase
        .from('question_material_links')
        .select('question_id')
        .eq('question_id', q.id)
        .eq('material_section_id', sectionId)
        .maybeSingle()
      if (existingLink) continue
      const { error: linkError } = await supabase
        .from('question_material_links')
        .insert({ question_id: q.id, material_section_id: sectionId })
      if (linkError) console.error('  LINK FAILED:', linkError.message)
      else console.log('  linked to question:', q.question_text_jp.slice(0, 30))
    }
  }

  console.log('--- Done ---')
}

run()
