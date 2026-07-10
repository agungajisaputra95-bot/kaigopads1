// Materi + kosakata untuk 第37回 午後 問題59-63 (kamoku 11: 医療的ケア)
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
  { kamoku_id: 11, kanji: '胸骨圧迫', furigana: 'きょうこつあっぱく', meaning_id: 'Kompresi dada — bagian inti CPR, tekan pangkal telapak tangan di tengah bawah tulang dada', example_sentence_jp: '反応と呼吸がないことを確認したら、すぐに胸骨圧迫を始める。', example_sentence_id: 'Setelah memastikan tidak ada respons & napas, segera mulai kompresi dada.' },
  { kamoku_id: 11, kanji: '死戦期呼吸', furigana: 'しせんきこきゅう', meaning_id: 'Napas agonal — napas tidak normal yang tampak seperti bernapas tapi sebenarnya tanda henti jantung', example_sentence_jp: '死戦期呼吸がみられても、正常な呼吸とはみなさない。', example_sentence_id: 'Meski terlihat napas agonal, itu tidak dianggap napas normal.' },
  { kamoku_id: 11, kanji: '線毛', furigana: 'せんもう', meaning_id: 'Silia — struktur mikroskopis di permukaan saluran napas yang mendorong lendir/kotoran keluar', example_sentence_jp: '気管内部の線毛運動により、異物が外に運ばれる。', example_sentence_id: 'Gerakan silia di dalam trakea mendorong benda asing keluar.' },
  { kamoku_id: 11, kanji: '喀痰吸引', furigana: 'かくたんきゅういん', meaning_id: 'Suction dahak — tindakan menyedot dahak lewat selang, salah satu tindakan medis terbatas yang boleh dilakukan pekerja kaigo bersertifikat', example_sentence_jp: '研修を修了した介護福祉士が口腔内の喀痰吸引を行う。', example_sentence_id: 'Pekerja kaigo yang sudah lulus pelatihan melakukan suction dahak di mulut.' },
  { kamoku_id: 11, kanji: '咽頭反射', furigana: 'いんとうはんしゃ', meaning_id: 'Refleks faring/muntah — respons tersedak saat sesuatu menyentuh bagian belakang tenggorokan', example_sentence_jp: '咽頭反射を誘発しないよう、吸引チューブは浅めに挿入する。', example_sentence_id: 'Selang suction dimasukkan dangkal agar tidak memicu refleks tersedak.' },
  { kamoku_id: 11, kanji: '腹部膨満感', furigana: 'ふくぶぼうまんかん', meaning_id: 'Rasa kembung perut', example_sentence_jp: '食後に腹部膨満感を訴える利用者がいる。', example_sentence_id: 'Ada pengguna layanan yang mengeluh kembung setelah makan.' },
  { kamoku_id: 11, kanji: '嘔気', furigana: 'おうき', meaning_id: 'Mual — sensasi ingin muntah (berbeda dari muntah/嘔吐 itu sendiri)', example_sentence_jp: '嘔気を訴える利用者の顔色を観察する。', example_sentence_id: 'Mengamati wajah pengguna layanan yang mengeluh mual.' },
  { kamoku_id: 11, kanji: '経鼻経管栄養', furigana: 'けいびけいかんえいよう', meaning_id: 'Nutrisi lewat selang hidung (NGT) — nutrisi cair dialirkan lewat selang dari hidung ke lambung', example_sentence_jp: '嚥下障害があるため、経鼻経管栄養で栄養を摂取している。', example_sentence_id: 'Karena gangguan menelan, mendapat nutrisi lewat selang dari hidung.' },
  { kamoku_id: 11, kanji: '胃ろう', furigana: 'いろう', meaning_id: 'Gastrostomi (PEG) — lubang buatan di perut untuk memasukkan nutrisi langsung ke lambung', example_sentence_jp: '経口摂取が難しい場合、胃ろうの造設が検討される。', example_sentence_id: 'Jika sulit makan lewat mulut, pemasangan gastrostomi dipertimbangkan.' },
]

const materialSections = [
  {
    kamoku_id: 11,
    order_index: 1,
    title_jp: '救急蘇生法（胸骨圧迫）の基本',
    content_jp:
      '成人への一次救命処置では、反応がなく呼吸が確認できない（死戦期呼吸を含む）場合、直ちに胸骨圧迫を開始します。圧迫部位は胸骨の下半分中央で、手のひらの付け根（指先ではない）を重ねて圧迫します。深さは約5cm（6cmを超えない）、速さは1分間に100〜120回が目安です。',
    content_id:
      'Dalam pertolongan pertama bagi dewasa, jika tidak ada respons dan napas tidak terkonfirmasi (termasuk napas agonal), kompresi dada harus segera dimulai. Titik kompresi ada di tengah bagian bawah tulang dada, ditekan dengan pangkal telapak tangan bertumpuk (bukan ujung jari). Kedalaman sekitar 5 cm (tidak lebih 6 cm), kecepatan 100-120 kali per menit.',
    example_jp: '倒れている人に反応がなく呼吸も確認できないため、ただちに胸骨圧迫を開始した。',
    example_id: 'Karena orang yang tergeletak tidak merespons dan napasnya tidak terkonfirmasi, kompresi dada segera dimulai.',
    exam_point_jp: '深さ約5cm・速さ100〜120回/分・圧迫部位は胸骨下半分中央・手掌基部で圧迫、という具体的数値と部位を正確に覚える。',
    exam_point_id: 'Hafalkan angka & lokasi pastinya: kedalaman ~5cm, kecepatan 100-120x/menit, titik di tengah bawah tulang dada, ditekan pangkal telapak tangan.',
    furigana_map: fm([
      ['成人', 'せいじん'], ['一次救命処置', 'いちじきゅうめいしょち'], ['反応', 'はんのう'], ['呼吸', 'こきゅう'],
      ['死戦期呼吸', 'しせんきこきゅう'], ['直', 'ただ'], ['胸骨圧迫', 'きょうこつあっぱく'], ['開始', 'かいし'],
      ['部位', 'ぶい'], ['胸骨', 'きょうこつ'], ['下半分', 'かはんぶん'], ['中央', 'ちゅうおう'], ['手', 'て'],
      ['付', 'つ'], ['根', 'ね'], ['重', 'かさ'], ['深', 'ふか'], ['速', 'はや'], ['目安', 'めやす'],
    ]),
    linkMatch: '成人に対する救急蘇生法｛きゅうきゅうそせいほう｝での胸骨圧迫',
  },
  {
    kamoku_id: 11,
    order_index: 2,
    title_jp: '痰の喀出のしくみ',
    content_jp:
      '気道の粘膜は適度に加湿されており、その表面には線毛（せんもう）があります。線毛が絶え間なく動くことで、分泌物や異物を上方（喉の方向）へ運び出します。運ばれた痰は、咳や咳払いによって体外に排出されます。咳は、延髄にある咳中枢による反射運動です。',
    content_id:
      'Selaput lendir saluran napas cukup lembap, dengan permukaan bersilia. Silia bergerak terus-menerus mendorong lendir & benda asing ke arah atas (menuju tenggorokan). Dahak yang terdorong itu dikeluarkan lewat batuk atau berdeham. Batuk adalah gerak refleks yang dikendalikan pusat batuk di medula oblongata.',
    example_jp: '風邪をひくと、線毛の働きで運ばれた痰が咳とともに出てくる。',
    example_id: 'Saat pilek, dahak yang terdorong gerakan silia keluar bersama batuk.',
    exam_point_jp: '「絨毛」ではなく「線毛」、咳中枢は下垂体ではなく延髄、分泌物は吸収されず喀出される、という誤りやすいポイントに注意。',
    exam_point_id: 'Waspadai kesalahan umum: istilahnya "silia" bukan "vili", pusat batuk di medula oblongata (bukan pituitari), lendir tidak diserap tapi dikeluarkan.',
    furigana_map: fm([
      ['気道', 'きどう'], ['粘膜', 'ねんまく'], ['加湿', 'かしつ'], ['表面', 'ひょうめん'], ['線毛', 'せんもう'],
      ['絶', 'た'], ['間', 'ま'], ['動', 'うご'], ['分泌物', 'ぶんぴつぶつ'], ['異物', 'いぶつ'], ['上方', 'じょうほう'],
      ['運', 'はこ'], ['出', 'だ'], ['痰', 'たん'], ['咳', 'せき'], ['咳払', 'せきばら'], ['排出', 'はいしゅつ'],
      ['延髄', 'えんずい'], ['咳中枢', 'せきちゅうすう'], ['反射運動', 'はんしゃうんどう'],
    ]),
    linkMatch: '痰｛たん｝を喀出｛かくしゅつ｝する仕組みに関するもの',
  },
  {
    kamoku_id: 11,
    order_index: 3,
    title_jp: '口腔内喀痰吸引の手順',
    content_jp:
      '介護福祉士が行う口腔内の喀痰吸引は、医師の指示に基づいた吸引圧の範囲内で実施します。吸引チューブは、吸引圧をかけない状態で挿入し、口蓋垂を超えない浅い位置までとします（咽頭反射のリスクを避けるため）。吸引時はチューブを軽く回転させながら行うことで、粘膜を傷つけにくく、効果的に痰を除去できます。吸引後は洗浄水を吸引し、チューブの外側はアルコール綿等の消毒用の綿で拭きます。',
    content_id:
      'Suction dahak di mulut yang dilakukan pekerja kaigo dijalankan dalam rentang tekanan yang ditentukan berdasarkan instruksi dokter. Selang dimasukkan tanpa tekanan aktif, hanya sampai posisi dangkal sebelum uvula (untuk menghindari risiko refleks tersedak). Saat menyedot, selang diputar perlahan agar tidak melukai selaput lendir dan lebih efektif membersihkan dahak. Setelah selesai, air pembilas disedot dan bagian luar selang dilap dengan kapas beralkohol/disinfektan.',
    example_jp: '吸引チューブを軽く回転させながら、口腔内の痰を吸引する。',
    example_id: 'Menyedot dahak di mulut sambil memutar selang secara perlahan.',
    exam_point_jp: '吸引圧は医師の指示範囲内・挿入時は圧をかけない・口蓋垂は超えない・チューブは回転させる、という4点セットで覚える。',
    exam_point_id: 'Hafalkan 4 poin ini bersamaan: tekanan sesuai instruksi dokter, tidak ada tekanan saat memasukkan, tidak melewati uvula, selang diputar saat menyedot.',
    furigana_map: fm([
      ['介護福祉士', 'かいごふくしし'], ['口腔内', 'こうくうない'], ['喀痰吸引', 'かくたんきゅういん'], ['医師', 'いし'],
      ['指示', 'しじ'], ['吸引圧', 'きゅういんあつ'], ['範囲内', 'はんいない'], ['実施', 'じっし'], ['吸引', 'きゅういん'],
      ['挿入', 'そうにゅう'], ['口蓋垂', 'こうがいすい'], ['浅', 'あさ'], ['位置', 'いち'], ['咽頭反射', 'いんとうはんしゃ'],
      ['避', 'さ'], ['回転', 'かいてん'], ['粘膜', 'ねんまく'], ['傷', 'きず'], ['効果的', 'こうかてき'], ['除去', 'じょきょ'],
      ['洗浄水', 'せんじょうすい'], ['外側', 'そとがわ'], ['消毒', 'しょうどく'],
    ]),
    linkMatch: '介護福祉士が行う口腔内｛こうくうない｝の喀痰吸引',
  },
  {
    kamoku_id: 11,
    order_index: 4,
    title_jp: '消化器症状の用語整理',
    content_jp:
      '消化器の症状にはそれぞれ正確な定義があります。腹部膨満感はお腹が張る感覚、しゃっくり（吃逆）は横隔膜の不随意な痙攣性収縮、胸やけは胃酸の食道への逆流による灼熱感、げっぷ（噯気）は胃にたまった空気の口からの排出です。嘔気は「吐き気」を感じる感覚そのものを指し、実際に胃腸の内容物を口から吐き出す「嘔吐」とは区別されます。',
    content_id:
      'Setiap gejala pencernaan punya definisi tepatnya. Rasa kembung = sensasi perut mengembang, cegukan = kontraksi kejang tak sadar diafragma, nyeri ulu hati = sensasi terbakar akibat asam lambung naik ke kerongkongan, sendawa = keluarnya udara yang terkumpul di lambung lewat mulut. Mual (嘔気) adalah sensasi "ingin muntah" itu sendiri, dibedakan dari muntah (嘔吐) yaitu tindakan benar-benar mengeluarkan isi lambung/usus lewat mulut.',
    example_jp: '嘔気を訴えていた利用者が、その後嘔吐した。',
    example_id: 'Pengguna layanan yang mengeluh mual, kemudian benar-benar muntah.',
    exam_point_jp: '嘔気（吐き気の感覚）と嘔吐（実際に吐く行為）を混同しないこと。各症状の原因部位（横隔膜・食道・胃）も正確に覚える。',
    exam_point_id: 'Jangan tertukar mual (sensasi ingin muntah) dengan muntah (tindakan benar-benar mengeluarkan isi lambung). Hafalkan juga penyebab tiap gejala (diafragma, kerongkongan, lambung).',
    furigana_map: fm([
      ['消化器症状', 'しょうかきしょうじょう'], ['腹部膨満感', 'ふくぶぼうまんかん'], ['張', 'は'], ['感覚', 'かんかく'],
      ['吃逆', 'きつぎゃく'], ['横隔膜', 'おうかくまく'], ['不随意', 'ふずいい'], ['痙攣性収縮', 'けいれんせいしゅうしゅく'],
      ['胸', 'むね'], ['胃酸', 'いさん'], ['食道', 'しょくどう'], ['逆流', 'ぎゃくりゅう'], ['灼熱感', 'しゃくねつかん'],
      ['噯気', 'あいき'], ['空気', 'くうき'], ['排出', 'はいしゅつ'], ['嘔気', 'おうき'], ['吐', 'は'], ['気', 'け'],
      ['嘔吐', 'おうと'], ['区別', 'くべつ'],
    ]),
    linkMatch: '消化器症状の説明として',
  },
  {
    kamoku_id: 11,
    order_index: 5,
    title_jp: '経管栄養中の意思表示への対応',
    content_jp:
      '経管栄養中の利用者が「口から食べたい」といった思いを訴えたときは、まず看護師等に連絡し安全を確認したうえで、身体拘束や独自の医療的判断（滴下速度の調整、経口摂取の提案、処置の提案など）を行わず、本人の思いを医師や看護師にきちんと伝え、多職種で今後の対応を検討してもらうことが、介護福祉士としての適切な役割です。',
    content_id:
      'Saat pengguna layanan yang sedang menjalani nutrisi lewat selang mengungkapkan keinginan "ingin makan lewat mulut", langkah tepatnya adalah menghubungi perawat untuk memastikan keamanan dulu, tanpa melakukan pembatasan fisik atau keputusan medis sendiri (mengatur kecepatan tetesan, menyarankan makan lewat mulut, mengusulkan tindakan medis) — melainkan menyampaikan keinginan pengguna dengan tepat kepada dokter/perawat agar dipertimbangkan bersama tim lintas profesi.',
    example_jp: '「チューブを抜いてほしい」というＡさんの訴えを、そのまま看護師に伝えた。',
    example_id: 'Menyampaikan langsung keluhan Aさん "ingin selangnya dilepas" kepada perawat.',
    exam_point_jp: '介護福祉士は医療的判断（滴下速度・処置の提案）を行わない。身体拘束も不適切。「本人の思いを医療職に伝える」が正解になりやすい。',
    exam_point_id: 'Pekerja kaigo tidak boleh membuat keputusan medis (kecepatan tetesan, usulan tindakan). Pembatasan fisik juga tidak tepat. "Menyampaikan keinginan pengguna ke tenaga medis" biasanya jawaban benar.',
    furigana_map: fm([
      ['経管栄養中', 'けいかんえいようちゅう'], ['利用者', 'りようしゃ'], ['思', 'おも'], ['訴', 'うった'], ['看護師', 'かんごし'],
      ['連絡', 'れんらく'], ['安全', 'あんぜん'], ['確認', 'かくにん'], ['身体拘束', 'しんたいこうそく'], ['独自', 'どくじ'],
      ['医療的判断', 'いりょうてきはんだん'], ['滴下速度', 'てきかそくど'], ['調整', 'ちょうせい'], ['経口摂取', 'けいこうせっしゅ'],
      ['提案', 'ていあん'], ['処置', 'しょち'], ['本人', 'ほんにん'], ['医師', 'いし'], ['多職種', 'たしょくしゅ'], ['検討', 'けんとう'],
    ]),
    linkMatch: '脳梗塞（cerebral infarction）の後遺症で左片麻痺｛ひだりかたまひ｝があり、介護老人保健施設に入所',
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
