// Materi + kosakata untuk 第37回 午前 問題31-48 (kamoku 8, 9)
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
  { kamoku_id: 8, kanji: '語彙爆発', furigana: 'ごいばくはつ', meaning_id: 'Ledakan kosakata — periode kosakata anak meningkat drastis, sekitar usia 1,5-2 tahun', example_sentence_jp: '1歳半ごろから語彙爆発がみられる。', example_sentence_id: 'Ledakan kosakata mulai terlihat sekitar usia 1,5 tahun.' },
  { kamoku_id: 8, kanji: '人見知り', furigana: 'ひとみしり', meaning_id: 'Malu/takut pada orang asing (pada bayi), umumnya mulai usia 6-8 bulan', example_sentence_jp: '生後7か月ごろから人見知りが始まった。', example_sentence_id: 'Rasa malu pada orang asing mulai muncul sekitar usia 7 bulan.' },
  { kamoku_id: 8, kanji: '神経性無食欲症', furigana: 'しんけいせいむしょくよくしょう', meaning_id: 'Anoreksia nervosa — gangguan makan dengan ketakutan kuat menjadi gemuk', example_sentence_jp: '神経性無食欲症は若い女性に多くみられる。', example_sentence_id: 'Anoreksia nervosa banyak dialami perempuan muda.' },
  { kamoku_id: 8, kanji: '結晶性知能', furigana: 'けっしょうせいちのう', meaning_id: 'Kecerdasan terkristalisasi — kemampuan memakai pengetahuan hasil pengalaman/pendidikan', example_sentence_jp: '結晶性知能は高齢になっても維持されやすい。', example_sentence_id: 'Kecerdasan terkristalisasi cenderung tetap terjaga meski lanjut usia.' },
  { kamoku_id: 8, kanji: '流動性知能', furigana: 'りゅうどうせいちのう', meaning_id: 'Kecerdasan cair — kemampuan memecahkan masalah baru secara langsung', example_sentence_jp: '流動性知能は加齢とともに低下しやすい。', example_sentence_id: 'Kecerdasan cair cenderung menurun seiring usia.' },
  { kamoku_id: 8, kanji: '暗順応', furigana: 'あんじゅんのう', meaning_id: 'Adaptasi gelap — proses mata terbiasa dengan tempat gelap', example_sentence_jp: '加齢により暗順応の時間が延長する。', example_sentence_id: 'Seiring usia, waktu adaptasi gelap makin lama.' },
  { kamoku_id: 8, kanji: '老性自覚', furigana: 'ろうせいじかく', meaning_id: 'Kesadaran diri bahwa dirinya sudah menua', example_sentence_jp: '白髪の増加をきっかけに老性自覚が芽生えた。', example_sentence_id: 'Bertambahnya uban memicu kesadaran akan penuaan diri.' },
  { kamoku_id: 8, kanji: 'エイジズム', furigana: 'えいじずむ', meaning_id: 'Ageism — diskriminasi/prasangka berdasarkan usia', example_sentence_jp: '「年をとると頑固になる」という発言はエイジズムの一例である。', example_sentence_id: '"Makin tua makin keras kepala" adalah contoh ucapan bernada ageism.' },
  { kamoku_id: 8, kanji: 'サクセスフル・エイジング', furigana: 'さくせすふる・えいじんぐ', meaning_id: 'Successful aging — menua dengan tetap menjaga kualitas hidup & partisipasi', example_sentence_jp: '補聴器を使ってパソコン教室に通うのはサクセスフル・エイジングの例である。', example_sentence_id: 'Memakai alat bantu dengar untuk tetap ikut kelas komputer adalah contoh successful aging.' },
  { kamoku_id: 8, kanji: '老年症候群', furigana: 'ろうねんしょうこうぐん', meaning_id: 'Sindrom geriatri — kumpulan gejala khas lansia (jatuh, kelemahan, dll.)', example_sentence_jp: '骨粗鬆症は老年症候群に直接関わる疾患である。', example_sentence_id: 'Osteoporosis adalah penyakit yang langsung berkaitan dengan sindrom geriatri.' },

  { kamoku_id: 9, kanji: '認知症施策推進大綱', furigana: 'にんちしょうしさくすいしんたいこう', meaning_id: 'Peta jalan kebijakan demensia nasional (2019) — "共生"（hidup berdampingan）dan "予防"（pencegahan）sebagai dua pilar utama', example_sentence_jp: '認知症施策推進大綱は共生と予防を車の両輪とする。', example_sentence_id: 'Peta jalan ini menjadikan hidup berdampingan dan pencegahan sebagai dua roda yang sama penting.' },
  { kamoku_id: 9, kanji: 'せん妄', furigana: 'せんもう', meaning_id: 'Delirium — kekaburan kesadaran akut dengan fluktuasi gejala, sering dipicu penyakit fisik/obat/lingkungan', example_sentence_jp: '入院をきっかけにせん妄が生じることがある。', example_sentence_id: 'Delirium bisa muncul dipicu rawat inap.' },
  { kamoku_id: 9, kanji: '近時記憶', furigana: 'きんじきおく', meaning_id: 'Memori jangka pendek/baru — terganggu sejak tahap awal demensia Alzheimer', example_sentence_jp: '近時記憶の障害はアルツハイマー型認知症の初期からみられる。', example_sentence_id: 'Gangguan memori jangka pendek terlihat sejak tahap awal demensia Alzheimer.' },
  { kamoku_id: 9, kanji: '幻視', furigana: 'げんし', meaning_id: 'Halusinasi visual — gejala khas demensia Lewy body', example_sentence_jp: '幻視はレビー小体型認知症の特徴的な症状である。', example_sentence_id: 'Halusinasi visual adalah gejala khas demensia Lewy body.' },
  { kamoku_id: 9, kanji: '改訂長谷川式認知症スケール', furigana: 'かいていはせがわしきにんちしょうすけーる', meaning_id: 'HDS-R — tes skrining kognisi 30 poin, skor 20 ke bawah indikasi demensia', example_sentence_jp: 'HDS-Rで20点以下だったため、詳しい検査を勧められた。', example_sentence_id: 'Karena skor HDS-R di bawah 20, disarankan pemeriksaan lebih lanjut.' },
  { kamoku_id: 9, kanji: '回想法', furigana: 'かいそうほう', meaning_id: 'Terapi reminiscence — memakai foto/musik lama untuk mengaktifkan memori & stabilitas psikologis', example_sentence_jp: '回想法として、昔の写真を見せながら思い出を語ってもらう。', example_sentence_id: 'Dalam terapi reminiscence, menunjukkan foto lama sambil mengajak bercerita kenangan.' },
  { kamoku_id: 9, kanji: 'リアリティ・オリエンテーション', furigana: 'りありてぃ・おりえんてーしょん', meaning_id: 'Reality orientation — melatih orientasi waktu/tempat/situasi', example_sentence_jp: 'リアリティ・オリエンテーションで今日の日付を確認する。', example_sentence_id: 'Dalam reality orientation, mengonfirmasi tanggal hari ini.' },
  { kamoku_id: 9, kanji: '認知症疾患医療センター', furigana: 'にんちしょうしっかんいりょうせんたー', meaning_id: 'Pusat medis khusus demensia — melakukan diagnosis banding & koordinasi komunitas', example_sentence_jp: '鑑別診断のために認知症疾患医療センターを受診する。', example_sentence_id: 'Berobat ke pusat medis khusus demensia untuk diagnosis banding.' },
  { kamoku_id: 9, kanji: '認知症初期集中支援チーム', furigana: 'にんちしょうしょきしゅうちゅうしえんちーむ', meaning_id: 'Tim dukungan intensif tahap awal demensia — asesmen & merencanakan arah dukungan', example_sentence_jp: '地域包括支援センターの相談を受け、認知症初期集中支援チームが編成された。', example_sentence_id: 'Setelah konsultasi di pusat dukungan komunitas, tim dukungan intensif tahap awal demensia dibentuk.' },
]

const materialSections = [
  {
    kamoku_id: 8,
    order_index: 1,
    title_jp: '子どもの発達の目安',
    content_jp:
      '子どもの発達には大まかな標準的な時期があります。人見知りは生後6〜8か月ごろ、指さし（共同注意）は生後9か月〜1歳ごろ、ハイハイは生後8〜10か月ごろ、歩行の完成は1歳半ごろまでにみられます。語彙が急に増える語彙爆発や、自己主張が強まるイヤイヤ期（第一次反抗期）は1歳半〜3歳ごろに生じます。第二反抗期は思春期に現れ、第一次反抗期とは時期も性質も異なります。',
    content_id:
      'Perkembangan anak punya perkiraan waktu standar. Malu pada orang asing sekitar 6-8 bulan, menunjuk (joint attention) sekitar 9 bulan-1 tahun, merangkak sekitar 8-10 bulan, dan berjalan sempurna sekitar usia 1,5 tahun. Ledakan kosakata dan masa "tidak-tidak" (pemberontakan pertama) yang penuh penegasan diri muncul sekitar 1,5-3 tahun. Pemberontakan kedua muncul saat remaja — waktu dan sifatnya berbeda dari yang pertama.',
    example_jp: '1歳になったＡちゃんは、ほしいものを指さして知らせるようになった。',
    example_id: 'Setelah berusia 1 tahun, Aちゃん mulai menunjuk barang yang diinginkannya.',
    exam_point_jp: '各発達の目安となる時期（人見知り・指さし・語彙爆発・イヤイヤ期など）を正確な月齢・年齢で覚えること。第一次反抗期と第二次反抗期を混同しない。',
    exam_point_id: 'Hafalkan usia pasti tiap tonggak perkembangan (malu pada orang asing, menunjuk, ledakan kosakata, masa "tidak-tidak"). Jangan tertukar pemberontakan pertama & kedua.',
    furigana_map: fm([
      ['子', 'こ'], ['発達', 'はったつ'], ['標準的', 'ひょうじゅんてき'], ['時期', 'じき'], ['人見知り', 'ひとみしり'],
      ['指', 'ゆび'], ['共同注意', 'きょうどうちゅうい'], ['歩行', 'ほこう'], ['完成', 'かんせい'], ['語彙', 'ごい'],
      ['急', 'きゅう'], ['増', 'ふ'], ['語彙爆発', 'ごいばくはつ'], ['自己主張', 'じこしゅちょう'], ['強', 'つよ'],
      ['反抗期', 'はんこうき'], ['思春期', 'ししゅんき'], ['性質', 'せいしつ'], ['異', 'こと'],
    ]),
    linkMatch: '子どもの標準的な成長として',
  },
  {
    kamoku_id: 8,
    order_index: 2,
    title_jp: '神経性無食欲症の特徴',
    content_jp:
      '神経性無食欲症（拒食症）は、思春期・青年期の女性に多くみられる摂食障害です。強い肥満恐怖があり、低体重にもかかわらず活動性が高まる（過活動性）ことが特徴です。自分の低体重の深刻さを正しく認識できない（病識の欠如）ことも典型的な症状です。',
    content_id:
      'Anoreksia nervosa (gangguan makan) banyak dialami perempuan remaja/dewasa muda. Cirinya: ketakutan kuat menjadi gemuk, dan meski berat badan rendah, aktivitas justru meningkat (hiperaktivitas). Ciri khas lainnya adalah kurangnya kesadaran akan seberapa serius berat badan rendahnya (kurang insight).',
    example_jp: '体重がかなり減っているにもかかわらず、本人は「まだ太っている」と感じている。',
    example_id: 'Meski berat badan sudah sangat turun, penderita tetap merasa "masih gemuk".',
    exam_point_jp: '好発年齢（思春期・青年期の女性）、過活動性、病識の欠如という3点が頻出。「活動性が低下する」等の逆の記述に注意。',
    exam_point_id: '3 poin sering keluar: usia rentan (remaja/dewasa muda perempuan), hiperaktivitas, kurangnya insight. Waspadai pernyataan terbalik seperti "aktivitas menurun".',
    furigana_map: fm([
      ['神経性無食欲症', 'しんけいせいむしょくよくしょう'], ['拒食症', 'きょしょくしょう'], ['思春期', 'ししゅんき'],
      ['青年期', 'せいねんき'], ['摂食障害', 'せっしょくしょうがい'], ['恐怖', 'きょうふ'], ['低体重', 'ていたいじゅう'],
      ['活動性', 'かつどうせい'], ['深刻', 'しんこく'], ['認識', 'にんしき'], ['病識', 'びょうしき'], ['欠如', 'けつじょ'],
      ['典型的', 'てんけいてき'], ['症状', 'しょうじょう'],
    ]),
    linkMatch: '神経性無食欲症（anorexia nervosa）に関するもの',
  },
  {
    kamoku_id: 8,
    order_index: 3,
    title_jp: 'ライチャードの適応タイプ',
    content_jp:
      'ライチャードは、退職後の男性の心理的適応を5つのタイプに分類しました。円熟型は老いを自然に受容するタイプ、自己防衛（装甲）型は老いへの不安を活動や若さへのこだわりで抑え込むタイプ、ロッキングチェアー型は受動的に他者への依存を楽しむタイプ、外罰（憤慨）型は老いを受け入れられず他責的になるタイプ、内罰（自責）型は自分の人生を悔い自分を責めるタイプです。',
    content_id:
      'Reichard mengklasifikasikan adaptasi psikologis laki-laki pasca-pensiun jadi 5 tipe. Tipe matang menerima penuaan secara wajar, tipe pertahanan diri (armor) menekan kecemasan lewat aktivitas & keteguhan mempertahankan kemudaan, tipe kursi goyang pasif menikmati bergantung pada orang lain, tipe menyalahkan luar (kesal) menolak penuaan & melimpahkan kesalahan ke luar, tipe menyalahkan diri menyesali hidupnya sendiri.',
    example_jp: '毎日運動をして若さを保とうとするのは、自己防衛型の特徴の一つである。',
    example_id: 'Berolahraga setiap hari untuk mempertahankan kemudaan adalah salah satu ciri tipe pertahanan diri.',
    exam_point_jp: '5タイプの名称と特徴を対応させて覚える。特に円熟型（適応的）と自己防衛型（不安を活動で抑圧）を混同しないこと。',
    exam_point_id: 'Hafalkan pasangan nama-ciri 5 tipe ini. Terutama jangan tertukar tipe matang (adaptif) dengan tipe pertahanan diri (menekan kecemasan lewat aktivitas).',
    furigana_map: fm([
      ['退職後', 'たいしょくご'], ['心理的', 'しんりてき'], ['適応', 'てきおう'], ['分類', 'ぶんるい'], ['円熟型', 'えんじゅくがた'],
      ['受容', 'じゅよう'], ['自己防衛', 'じこぼうえい'], ['装甲', 'そうこう'], ['不安', 'ふあん'], ['抑', 'おさ'],
      ['受動的', 'じゅどうてき'], ['依存', 'いぞん'], ['外罰', 'がいばつ'], ['憤慨', 'ふんがい'], ['他責的', 'たせきてき'],
      ['内罰', 'ないばつ'], ['自責', 'じせき'], ['悔', 'く'],
    ]),
    linkMatch: '会社の役員として勤めていたが、3年前に退職した',
  },
  {
    kamoku_id: 8,
    order_index: 4,
    title_jp: '結晶性知能と流動性知能',
    content_jp:
      '知能は結晶性知能と流動性知能に分けられます。結晶性知能は、経験や教育を通じて蓄積された知識・語彙・判断力を活用する能力で、加齢による低下が緩やかです。流動性知能は、その場で新しい問題を解決する能力で、結晶性知能より早く、40〜50歳ごろから低下しやすいとされます。',
    content_id:
      'Kecerdasan dibagi menjadi kecerdasan terkristalisasi dan kecerdasan cair. Kecerdasan terkristalisasi adalah kemampuan memakai pengetahuan/kosakata/penilaian yang terkumpul dari pengalaman & pendidikan, menurun perlahan seiring usia. Kecerdasan cair adalah kemampuan memecahkan masalah baru secara langsung, cenderung menurun lebih cepat, mulai sekitar usia 40-50 tahun.',
    example_jp: '長年の経験を活かして的確な判断をする高齢者の能力は、結晶性知能の表れである。',
    example_id: 'Kemampuan lansia mengambil keputusan tepat berdasarkan pengalaman bertahun-tahun adalah wujud kecerdasan terkristalisasi.',
    exam_point_jp: '結晶性知能＝経験の蓄積・低下が緩やか、流動性知能＝新しい問題解決・低下が早い、という対比を正確に覚える。',
    exam_point_id: 'Hafalkan kontras ini dengan tepat: kecerdasan terkristalisasi = akumulasi pengalaman, menurun perlahan; kecerdasan cair = pemecahan masalah baru, menurun lebih cepat.',
    furigana_map: fm([
      ['知能', 'ちのう'], ['結晶性知能', 'けっしょうせいちのう'], ['流動性知能', 'りゅうどうせいちのう'], ['経験', 'けいけん'],
      ['蓄積', 'ちくせき'], ['知識', 'ちしき'], ['語彙', 'ごい'], ['判断力', 'はんだんりょく'], ['活用', 'かつよう'],
      ['低下', 'ていか'], ['緩', 'ゆる'],
    ]),
    linkMatch: '結晶性知能に関する説明として',
  },
  {
    kamoku_id: 8,
    order_index: 5,
    title_jp: '加齢に伴う感覚機能の変化',
    content_jp:
      '加齢により、多くの感覚機能は低下します。聴力は高音域から低下しやすく（老人性難聴）、皮膚感覚・味覚・嗅覚も鈍くなる傾向があります。視覚では、暗い場所に目が慣れるまでの時間（暗順応）が延長します。',
    content_id:
      'Seiring usia, sebagian besar fungsi indera menurun. Pendengaran nada tinggi menurun lebih dulu (presbikusis), sensasi kulit-rasa-penciuman cenderung menumpul. Untuk penglihatan, waktu mata beradaptasi ke tempat gelap (adaptasi gelap) makin lama.',
    example_jp: '暗い部屋に入った直後は何も見えないが、しばらくすると徐々に見えるようになる。この時間が高齢者では長くなる。',
    example_id: 'Saat baru masuk ruang gelap tidak terlihat apa-apa, tapi lama-lama mulai terlihat — waktu ini makin panjang pada lansia.',
    exam_point_jp: '感覚機能はほぼすべて加齢で低下する（敏感になる、ではない）。暗順応の延長は頻出ポイント。',
    exam_point_id: 'Hampir semua fungsi indera menurun seiring usia (bukan makin peka). Perpanjangan waktu adaptasi gelap sering keluar di ujian.',
    furigana_map: fm([
      ['加齢', 'かれい'], ['感覚機能', 'かんかくきのう'], ['低下', 'ていか'], ['聴力', 'ちょうりょく'], ['高音域', 'こうおんいき'],
      ['老人性難聴', 'ろうじんせいなんちょう'], ['皮膚感覚', 'ひふかんかく'], ['味覚', 'みかく'], ['嗅覚', 'きゅうかく'],
      ['鈍', 'にぶ'], ['視覚', 'しかく'], ['暗順応', 'あんじゅんのう'], ['延長', 'えんちょう'],
    ]),
    linkMatch: '加齢に伴う感覚機能の変化として',
  },
  {
    kamoku_id: 8,
    order_index: 6,
    title_jp: '老いの受容と喪失不安',
    content_jp:
      '高齢期には、白髪や友人の死別などをきっかけに「年をとった」という老性自覚が生じます。長年暮らした環境や仲間を失うことへの不安も、高齢期に特有の心理として理解する必要があります。一方、「年をとると頑固になる」「認知症になるはずだ」といった年齢に基づく偏見や決めつけはエイジズムと呼ばれ、高齢者本人ではなく、周囲の人がこうした考え方をもつ場合があることに注意が必要です。',
    content_id:
      'Pada usia lanjut, hal seperti uban atau kematian teman bisa memicu kesadaran "sudah tua" (老性自覚). Kekhawatiran kehilangan lingkungan & teman yang sudah lama dijalani juga perlu dipahami sebagai psikologi khas usia lanjut. Sebaliknya, prasangka/stereotip berbasis usia seperti "makin tua makin keras kepala" atau "pasti akan kena demensia" disebut ageism — perlu diperhatikan bahwa yang bersikap begini kadang justru orang di sekitar lansia, bukan lansia itu sendiri.',
    example_jp: '長年住んだ地元を離れたくないと話す高齢者の言葉には、環境や仲間の喪失への不安が表れている。',
    example_id: 'Ucapan lansia yang tak ingin meninggalkan kampung halamannya mencerminkan kecemasan kehilangan lingkungan & teman.',
    exam_point_jp: '「誰が」その考え方を持っているかを事例文からよく読み取ること。エイジズムは周囲の発言に現れることが多い。',
    exam_point_id: 'Perhatikan baik-baik "siapa" yang punya pandangan tertentu dalam soal kasus. Ageism sering muncul lewat ucapan orang di sekitar lansia, bukan lansia itu sendiri.',
    furigana_map: fm([
      ['高齢期', 'こうれいき'], ['白髪', 'しらが'], ['死別', 'しべつ'], ['老性自覚', 'ろうせいじかく'], ['長年', 'ながねん'],
      ['環境', 'かんきょう'], ['仲間', 'なかま'], ['喪失', 'そうしつ'], ['不安', 'ふあん'], ['心理', 'しんり'],
      ['理解', 'りかい'], ['頑固', 'がんこ'], ['年齢', 'ねんれい'], ['偏見', 'へんけん'], ['決', 'き'],
      ['エイジズム', 'えいじずむ'], ['本人', 'ほんにん'], ['周囲', 'しゅうい'],
    ]),
    linkMatch: '地方で一人暮らしをしている。持病はなく',
  },
  {
    kamoku_id: 8,
    order_index: 7,
    title_jp: 'サクセスフル・エイジング',
    content_jp:
      'サクセスフル・エイジングとは、単に長生きすることではなく、心身の健康を保ち、社会的なつながりを維持しながら生活の質を高く保つ老い方を指す概念です。障害や機能低下があっても、道具や工夫を活用して活動を継続する姿勢が、この考え方の実践例となります。',
    content_id:
      'Successful aging bukan sekadar umur panjang, melainkan konsep menua dengan tetap menjaga kesehatan jiwa-raga, hubungan sosial, dan kualitas hidup yang tinggi. Meski ada disabilitas/penurunan fungsi, tetap berupaya melanjutkan aktivitas dengan bantuan alat/penyesuaian adalah contoh praktik konsep ini.',
    example_jp: '足腰が弱くなっても、杖を使って散歩を続ける。',
    example_id: 'Meski kaki melemah, tetap jalan-jalan dengan bantuan tongkat.',
    exam_point_jp: '「活動をやめる・避ける」選択肢は不適切、「工夫して活動を続ける」選択肢が正解になりやすい。',
    exam_point_id: 'Pilihan "berhenti/menghindari aktivitas" biasanya salah; pilihan "tetap beraktivitas dengan penyesuaian" biasanya jawaban benar.',
    furigana_map: fm([
      ['長生', 'ながい'], ['心身', 'しんしん'], ['健康', 'けんこう'], ['保', 'たも'], ['社会的', 'しゃかいてき'],
      ['維持', 'いじ'], ['生活', 'せいかつ'], ['質', 'しつ'], ['老', 'お'], ['概念', 'がいねん'], ['障害', 'しょうがい'],
      ['機能低下', 'きのうていか'], ['道具', 'どうぐ'], ['工夫', 'くふう'], ['継続', 'けいぞく'], ['姿勢', 'しせい'], ['実践例', 'じっせんれい'],
    ]),
    linkMatch: 'サクセスフル・エイジング（successful aging）として',
  },
  {
    kamoku_id: 8,
    order_index: 8,
    title_jp: '老年症候群',
    content_jp:
      '老年症候群とは、加齢に伴い高齢者に多くみられる、転倒・骨折・低栄養・尿失禁・褥瘡などの症状群を指します。骨粗鬆症は骨がもろくなり転倒時の骨折につながりやすいため、老年症候群に直接関わる代表的な疾患とされます。高血圧症・糖尿病・脂質異常症などの生活習慣病は、老年症候群そのものの代表疾患とは区別されます。',
    content_id:
      'Sindrom geriatri adalah kumpulan gejala yang umum dialami lansia seiring usia, seperti jatuh, patah tulang, kekurangan gizi, inkontinensia urine, dan luka tekan. Osteoporosis membuat tulang rapuh dan mudah patah saat jatuh, sehingga dianggap penyakit representatif yang langsung berkaitan dengan sindrom geriatri. Penyakit gaya hidup seperti hipertensi, diabetes, dislipidemia dibedakan dari penyakit representatif sindrom geriatri itu sendiri.',
    example_jp: '骨粗鬆症により、ちょっとした転倒でも骨折しやすくなる。',
    example_id: 'Karena osteoporosis, jatuh ringan pun mudah menyebabkan patah tulang.',
    exam_point_jp: '老年症候群＝転倒・骨折等につながる疾患群、骨粗鬆症がその代表例という点を覚える。生活習慣病（高血圧・糖尿病等）と区別する。',
    exam_point_id: 'Ingat: sindrom geriatri = kumpulan penyakit yang berujung jatuh/patah tulang, osteoporosis contoh representatifnya. Bedakan dari penyakit gaya hidup (hipertensi, diabetes, dll.).',
    furigana_map: fm([
      ['老年症候群', 'ろうねんしょうこうぐん'], ['加齢', 'かれい'], ['転倒', 'てんとう'], ['骨折', 'こっせつ'],
      ['低栄養', 'ていえいよう'], ['尿失禁', 'にょうしっきん'], ['褥瘡', 'じょくそう'], ['症状群', 'しょうじょうぐん'],
      ['骨粗鬆症', 'こつそしょうしょう'], ['骨', 'ほね'], ['直接', 'ちょくせつ'], ['代表的', 'だいひょうてき'],
      ['疾患', 'しっかん'], ['生活習慣病', 'せいかつしゅうかんびょう'], ['区別', 'くべつ'],
    ]),
    linkMatch: '老年症候群に直接関わる疾患として',
  },
  {
    kamoku_id: 9,
    order_index: 1,
    title_jp: '認知症施策推進大綱',
    content_jp:
      '2019年（令和元年）に策定された認知症施策推進大綱は、「共生」と「予防」を車の両輪として施策を進めるとしています。ここでの「予防」は「認知症にならない」ことではなく、「発症を遅らせる」「進行を緩やかにする」という意味です。基本的な柱は5つで、普及啓発・本人発信支援では、家族の代弁ではなく本人自らが発信することへの支援が重視されます。数値目標はおおむね3年ごとに点検・見直しが行われます。',
    content_id:
      'Peta jalan kebijakan demensia nasional yang ditetapkan tahun 2019 menjadikan "hidup berdampingan" dan "pencegahan" sebagai dua roda yang sama pentingnya. "Pencegahan" di sini bukan berarti "tidak akan kena demensia", tapi "menunda onset" dan "memperlambat progresi". Ada 5 pilar dasar, dan pada poin penyebaran informasi & dukungan penyampaian diri, yang diutamakan adalah dukungan agar penderita sendiri yang menyampaikan (bukan diwakili keluarga). Target angka ditinjau ulang sekitar setiap 3 tahun.',
    example_jp: '大綱に基づき、認知症の人が周囲の理解を得ながら地域で暮らし続けられる社会を目指す。',
    example_id: 'Berdasarkan peta jalan ini, ditargetkan masyarakat di mana penderita demensia bisa terus hidup di komunitas dengan pemahaman dari sekitarnya.',
    exam_point_jp: '「共生」と「予防」が車の両輪、予防の意味（発症遅延・進行緩和であり、ならないことではない）が最頻出ポイント。',
    exam_point_id: 'Poin paling sering keluar: "hidup berdampingan" & "pencegahan" sebagai dua roda; makna pencegahan (menunda/memperlambat, bukan "tidak akan pernah kena").',
    furigana_map: fm([
      ['策定', 'さくてい'], ['認知症施策推進大綱', 'にんちしょうしさくすいしんたいこう'], ['共生', 'きょうせい'],
      ['予防', 'よぼう'], ['施策', 'しさく'], ['発症', 'はっしょう'], ['遅', 'おく'], ['進行', 'しんこう'],
      ['緩', 'ゆる'], ['基本的', 'きほんてき'], ['柱', 'はしら'], ['普及啓発', 'ふきゅうけいはつ'], ['本人発信支援', 'ほんにんはっしんしえん'],
      ['家族', 'かぞく'], ['代弁', 'だいべん'], ['重視', 'じゅうし'], ['数値目標', 'すうちもくひょう'], ['点検', 'てんけん'],
      ['見直', 'みなお'],
    ]),
    linkMatch: '認知症施策推進大綱に関する説明として',
  },
  {
    kamoku_id: 9,
    order_index: 2,
    title_jp: '不安に寄り添う声かけ',
    content_jp:
      '認知症の人が不安や混乱を訴えるとき、まず本人の気持ちに共感し、一緒に行動する姿勢を示す声かけが基本です。記憶違いを直接指摘したり、事実を突きつけたりする対応は、本人を否定的な気持ちにさせ、不安をかえって強める可能性があります。',
    content_id:
      'Saat penderita demensia mengungkapkan kecemasan atau kebingungan, respons dasarnya adalah berempati dulu pada perasaannya lalu menunjukkan sikap mau bertindak bersama. Menunjuk langsung kesalahan ingatannya atau menyodorkan fakta secara blak-blakan bisa membuatnya merasa disalahkan dan justru memperparah kecemasan.',
    example_jp: '物がなくなったと訴える利用者に、「心配ですね、一緒に探しましょう」と声をかける。',
    example_id: 'Kepada pengguna yang mengeluh barangnya hilang, merespons dengan "pasti khawatir ya, ayo cari bersama".',
    exam_point_jp: '「事実を指摘する」「後回しにする」「突き放す」対応は不適切。「共感してから一緒に行動する」対応が正解になりやすい。',
    exam_point_id: 'Respons "menunjuk fakta", "menunda", atau "menyudutkan" biasanya tidak tepat. Respons "berempati dulu lalu bertindak bersama" biasanya jawaban benar.',
    furigana_map: fm([
      ['不安', 'ふあん'], ['混乱', 'こんらん'], ['訴', 'うった'], ['本人', 'ほんにん'], ['気持', 'きも'], ['共感', 'きょうかん'],
      ['姿勢', 'しせい'], ['記憶違', 'きおくちが'], ['指摘', 'してき'], ['事実', 'じじつ'], ['突', 'つ'], ['否定的', 'ひていてき'],
    ]),
    linkMatch: 'アルツハイマー型認知症（dementia of the Alzheimer’s type）で、介護老人福祉施設に入所',
  },
  {
    kamoku_id: 9,
    order_index: 3,
    title_jp: 'せん妄の特徴',
    content_jp:
      'せん妄は、身体疾患・薬剤・環境変化などをきっかけに急激に生じる意識障害で、症状の変動が大きく、夜間に悪化しやすい（夜間せん妄）ことが特徴です。見当識障害などの認知機能障害を伴うことが多く、対応としては誘因となっている因子を特定し、取り除くことが基本です。認知症とは異なり、原因を取り除けば改善しうる点も重要です。',
    content_id:
      'Delirium adalah gangguan kesadaran akut yang dipicu penyakit fisik/obat/perubahan lingkungan, dengan fluktuasi gejala besar dan cenderung memburuk malam hari (delirium malam). Sering disertai gangguan kognitif seperti disorientasi, dan penanganannya berbasis mengidentifikasi & menghilangkan faktor pemicu. Berbeda dari demensia, delirium bisa membaik jika penyebabnya dihilangkan.',
    example_jp: '入院後、夜になると点滴を抜こうとするなど、せん妄の症状がみられた。',
    example_id: 'Setelah rawat inap, malam hari muncul gejala delirium seperti mencoba mencabut infus.',
    exam_point_jp: 'せん妄＝急性・変動大・夜間悪化・誘因の特定と除去が重要、という点を認知症の特徴と混同しないこと。',
    exam_point_id: 'Delirium = akut, fluktuasi besar, memburuk malam hari, penting mengidentifikasi & menghilangkan pemicu — jangan tertukar dengan ciri demensia.',
    furigana_map: fm([
      ['せん妄', 'せんもう'], ['身体疾患', 'しんたいしっかん'], ['薬剤', 'やくざい'], ['環境変化', 'かんきょうへんか'],
      ['急激', 'きゅうげき'], ['意識障害', 'いしきしょうがい'], ['変動', 'へんどう'], ['夜間', 'やかん'], ['悪化', 'あっか'],
      ['見当識障害', 'けんとうしきしょうがい'], ['認知機能障害', 'にんちきのうしょうがい'], ['誘因', 'ゆういん'],
      ['因子', 'いんし'], ['特定', 'とくてい'], ['取', 'と'], ['除', 'のぞ'], ['原因', 'げんいん'], ['改善', 'かいぜん'],
    ]),
    linkMatch: '認知症（dementia）の高齢者にみられる、せん妄に関する',
  },
  {
    kamoku_id: 9,
    order_index: 4,
    title_jp: 'アルツハイマー型認知症の特徴',
    content_jp:
      'アルツハイマー型認知症は、脳にアミロイドβが蓄積してから発症までに10〜20年ほどの長い前駆期間があり、近時記憶（新しい記憶）の障害が初期から現れる中核症状です。歩行障害や嚥下障害は病状が進行した段階で多くみられます。幻視はレビー小体型認知症に特徴的な症状で、アルツハイマー型とは区別されます。',
    content_id:
      'Demensia Alzheimer punya periode prodromal panjang (10-20 tahun) antara akumulasi amiloid beta di otak dan munculnya gejala, dengan gangguan memori jangka pendek sebagai gejala inti sejak tahap awal. Gangguan berjalan dan menelan lebih sering muncul di tahap lanjut. Halusinasi visual adalah gejala khas demensia Lewy body, dibedakan dari Alzheimer.',
    example_jp: 'アルツハイマー型認知症の初期には、さっき聞いたことをすぐ忘れるという記憶障害がみられる。',
    example_id: 'Pada tahap awal demensia Alzheimer, terlihat gangguan memori seperti langsung lupa hal yang baru saja didengar.',
    exam_point_jp: '近時記憶障害＝初期症状、歩行・嚥下障害＝進行期の症状、幻視＝レビー小体型の症状、と整理する。',
    exam_point_id: 'Hafalkan: gangguan memori jangka pendek = gejala awal, gangguan berjalan/menelan = gejala tahap lanjut, halusinasi visual = gejala demensia Lewy body.',
    furigana_map: fm([
      ['アミロイドβ', 'あみろいどべーた'], ['蓄積', 'ちくせき'], ['発症', 'はっしょう'], ['前駆期間', 'ぜんくきかん'],
      ['近時記憶', 'きんじきおく'], ['障害', 'しょうがい'], ['初期', 'しょき'], ['中核症状', 'ちゅうかくしょうじょう'],
      ['歩行障害', 'ほこうしょうがい'], ['嚥下障害', 'えんげしょうがい'], ['進行', 'しんこう'], ['段階', 'だんかい'],
      ['幻視', 'げんし'], ['特徴的', 'とくちょうてき'], ['区別', 'くべつ'],
    ]),
    linkMatch: 'アルツハイマー型認知症（dementia of the Alzheimer’s type）の特徴',
  },
  {
    kamoku_id: 9,
    order_index: 5,
    title_jp: '認知症のリスク因子・予防因子',
    content_jp:
      '認知症のリスクを高める要因として、歯の喪失による咀嚼機能の低下や、難聴を放置することが知られています。一方、身体活動・社会参加（ボランティア活動等）・不飽和脂肪酸の摂取・補聴器の使用などは、認知症の予防に関連する要因とされています。',
    content_id:
      'Faktor yang diketahui meningkatkan risiko demensia antara lain penurunan fungsi mengunyah akibat kehilangan gigi, dan membiarkan gangguan pendengaran tanpa penanganan. Sebaliknya, aktivitas fisik, partisipasi sosial (kegiatan sukarela dll.), konsumsi asam lemak tak jenuh, dan pemakaian alat bantu dengar dikaitkan dengan pencegahan demensia.',
    example_jp: '歯を失ったまま放置せず、義歯を使ってしっかり噛めるようにする。',
    example_id: 'Tidak membiarkan gigi yang hilang begitu saja, memakai gigi palsu agar tetap bisa mengunyah dengan baik.',
    exam_point_jp: 'リスク因子（歯の喪失・難聴放置）と予防因子（身体活動・社会参加・補聴器使用）を逆に覚えないよう注意。',
    exam_point_id: 'Hati-hati jangan tertukar antara faktor risiko (kehilangan gigi, gangguan pendengaran dibiarkan) dan faktor pencegah (aktivitas fisik, partisipasi sosial, alat bantu dengar).',
    furigana_map: fm([
      ['認知症', 'にんちしょう'], ['要因', 'よういん'], ['歯', 'は'], ['喪失', 'そうしつ'], ['咀嚼機能', 'そしゃくきのう'],
      ['低下', 'ていか'], ['難聴', 'なんちょう'], ['放置', 'ほうち'], ['身体活動', 'しんたいかつどう'], ['社会参加', 'しゃかいさんか'],
      ['不飽和脂肪酸', 'ふほうわしぼうさん'], ['摂取', 'せっしゅ'], ['補聴器', 'ほちょうき'], ['予防', 'よぼう'],
    ]),
    linkMatch: '認知症（dementia）のリスクを高める要因として',
  },
  {
    kamoku_id: 9,
    order_index: 6,
    title_jp: '認知機能評価尺度',
    content_jp:
      '認知機能を評価する尺度にはそれぞれ特徴があります。改訂長谷川式認知症スケール（HDS-R）は30点満点の検査で、20点以下が認知症の目安です。FASTはアルツハイマー型認知症の重症度を病期分類するもの、認知症高齢者の日常生活自立度判定基準はランクで生活自立度を判定するもの、CDR（臨床的認知症尺度）は0〜3の重症度評価です。バーセルインデックスは認知機能ではなくADL（日常生活動作）を評価する尺度です。',
    content_id:
      'Berbagai skala evaluasi kognisi punya karakteristik masing-masing. HDS-R adalah tes 30 poin dengan skor 20 ke bawah sebagai indikasi demensia. FAST mengklasifikasikan keparahan demensia Alzheimer berdasarkan tahapan, kriteria kemandirian hidup lansia demensia menilai dengan peringkat, CDR menilai keparahan skala 0-3. Barthel Index bukan menilai kognisi, melainkan ADL (aktivitas hidup sehari-hari).',
    example_jp: 'HDS-Rで18点だったため、認知症の可能性が疑われた。',
    example_id: 'Karena skor HDS-R 18, dicurigai kemungkinan demensia.',
    exam_point_jp: '「30点満点・20点以下」＝HDS-Rという組み合わせが頻出。各尺度が評価する対象（認知機能かADLか、点数式かランク式か）を区別する。',
    exam_point_id: 'Kombinasi "skala 30 poin, 20 ke bawah" = HDS-R sering keluar. Bedakan tiap skala menilai apa (kognisi atau ADL, sistem poin atau peringkat).',
    furigana_map: fm([
      ['認知機能', 'にんちきのう'], ['評価', 'ひょうか'], ['尺度', 'しゃくど'], ['改訂長谷川式認知症スケール', 'かいていはせがわしきにんちしょうすけーる'],
      ['満点', 'まんてん'], ['検査', 'けんさ'], ['目安', 'めやす'], ['重症度', 'じゅうしょうど'], ['病期分類', 'びょうきぶんるい'],
      ['日常生活自立度', 'にちじょうせいかつじりつど'], ['判定基準', 'はんていきじゅん'], ['臨床的認知症尺度', 'りんしょうてきにんちしょうしゃくど'],
    ]),
    linkMatch: '全般的な認知機能を評価する尺度であり',
  },
  {
    kamoku_id: 9,
    order_index: 7,
    title_jp: '意思決定支援ガイドライン',
    content_jp:
      '「認知症の人の日常生活・社会生活における意思決定支援ガイドライン」（2018年、厚生労働省）は、本人の意思を尊重することを基本理念としています。支援者は特定の職種に限定されず、家族含む幅広い関係者が担います。本人の意思は変化しうるものとして継続的に確認し、できるだけ早期から支援を行います。言葉だけでなく、身振りや表情の変化も意思表示として読み取る努力を最大限に行うことが重視されます。',
    content_id:
      'Pedoman Dukungan Pengambilan Keputusan bagi Penderita Demensia dalam Kehidupan Sehari-hari & Sosial (2018, Kementerian Kesehatan Jepang) menjadikan penghormatan kehendak penderita sebagai prinsip dasar. Pendukung tidak dibatasi profesi tertentu, melibatkan keluarga & pihak luas. Kehendak penderita dianggap bisa berubah sehingga perlu dikonfirmasi berkelanjutan, dimulai sedini mungkin. Diutamakan upaya membaca bahasa tubuh & ekspresi wajah, bukan hanya kata-kata, sebagai bentuk penyampaian kehendak.',
    example_jp: '言葉で意思を伝えにくい利用者の表情の変化から、好みや希望を読み取ろうと努める。',
    example_id: 'Berupaya membaca preferensi/keinginan dari perubahan ekspresi wajah pengguna layanan yang sulit menyampaikan kehendak lewat kata-kata.',
    exam_point_jp: '支援対象＝本人（家族ではない）、非言語的サインも意思表示として読み取る、という2点が最頻出。',
    exam_point_id: '2 poin paling sering keluar: subjek dukungan adalah penderita sendiri (bukan keluarga), dan tanda non-verbal juga dibaca sebagai penyampaian kehendak.',
    furigana_map: fm([
      ['意思決定支援ガイドライン', 'いしけっていしえんがいどらいん'], ['厚生労働省', 'こうせいろうどうしょう'], ['本人', 'ほんにん'],
      ['意思', 'いし'], ['尊重', 'そんちょう'], ['基本理念', 'きほんりねん'], ['支援者', 'しえんしゃ'], ['特定', 'とくてい'],
      ['職種', 'しょくしゅ'], ['限定', 'げんてい'], ['幅広', 'はばひろ'], ['関係者', 'かんけいしゃ'], ['変化', 'へんか'],
      ['継続的', 'けいぞくてき'], ['確認', 'かくにん'], ['早期', 'そうき'], ['身振', 'みぶ'], ['表情', 'ひょうじょう'],
      ['読', 'よ'], ['取', 'と'], ['努力', 'どりょく'], ['重視', 'じゅうし'],
    ]),
    linkMatch: '意思決定支援ガイドライン」（2018年（平成30年）',
  },
  {
    kamoku_id: 9,
    order_index: 8,
    title_jp: '回想法などの非薬物療法',
    content_jp:
      '認知症ケアには様々な非薬物療法があります。回想法は、昔の写真や音楽を使って過去の記憶を語り合い、心理的な安定を図る技法です。リアリティ・オリエンテーションは、時間・場所・状況を説明し見当識を高める技法、バリデーション療法は共感を通して本人が体験している現実を受け入れる技法、タッチング（触れるケア）は肩や背中に優しく触れて安心感を伝える技法です。それぞれ目的と方法が異なります。',
    content_id:
      'Perawatan demensia memiliki berbagai terapi non-obat. Terapi reminiscence memakai foto/musik lama untuk mengajak bercerita masa lalu demi stabilitas psikologis. Reality orientation menjelaskan waktu/tempat/situasi untuk meningkatkan orientasi, terapi validasi menerima realita yang dialami penderita lewat empati, sentuhan lembut (touching care) menyampaikan rasa aman lewat sentuhan di bahu/punggung. Masing-masing punya tujuan & metode berbeda.',
    example_jp: '回想法のセッションで、懐かしい昭和の音楽を流しながら思い出話をしてもらう。',
    example_id: 'Dalam sesi terapi reminiscence, memutar musik nostalgia sambil mengajak bercerita kenangan.',
    exam_point_jp: '回想法＝昔の写真・音楽、リアリティ・オリエンテーション＝見当識訓練、バリデーション＝共感して現実を受容、タッチング＝触れるケア、と技法ごとの特徴を区別する。',
    exam_point_id: 'Bedakan ciri tiap teknik: reminiscence=foto/musik lama, reality orientation=latihan orientasi, validasi=menerima realita lewat empati, touching=perawatan sentuhan.',
    furigana_map: fm([
      ['非薬物療法', 'ひやくぶつりょうほう'], ['回想法', 'かいそうほう'], ['記憶', 'きおく'], ['心理的', 'しんりてき'],
      ['安定', 'あんてい'], ['技法', 'ぎほう'], ['見当識', 'けんとうしき'], ['共感', 'きょうかん'], ['現実', 'げんじつ'],
      ['受', 'う'], ['入', 'い'], ['触', 'ふ'], ['安心感', 'あんしんかん'], ['目的', 'もくてき'], ['方法', 'ほうほう'], ['異', 'こと'],
    ]),
    linkMatch: '回想法として、最も適切なものを1つ選びなさい',
  },
  {
    kamoku_id: 9,
    order_index: 9,
    title_jp: '認知症疾患医療センター',
    content_jp:
      '認知症疾患医療センターは、都道府県・指定都市が実施主体となり、都道府県内に複数設置される専門医療機関です。主な機能は認知症の鑑別診断、急性期の対応、地域の医療・介護関係者との連携で、進行した人の入院治療専門ではありません。介護保険法ではなく、関連する国の通知等に基づき整備されています。',
    content_id:
      'Pusat medis khusus demensia adalah lembaga medis spesialis yang diselenggarakan provinsi/kota yang ditunjuk, didirikan lebih dari satu lokasi dalam satu provinsi. Fungsi utamanya diagnosis banding demensia, respons fase akut, dan koordinasi dengan tenaga medis-perawatan komunitas — bukan khusus rawat inap pasien tahap lanjut. Didirikan berdasarkan notifikasi pemerintah terkait, bukan diatur dalam UU Asuransi Perawatan.',
    example_jp: '物忘れが急に進んだため、認知症疾患医療センターで鑑別診断を受けた。',
    example_id: 'Karena kepikunan tiba-tiba memburuk, menjalani diagnosis banding di pusat medis khusus demensia.',
    exam_point_jp: '実施主体＝都道府県、機能＝鑑別診断（入院治療専門ではない）、根拠法令＝介護保険法ではない、という3点を整理する。',
    exam_point_id: 'Hafalkan 3 poin: penyelenggara = provinsi, fungsi = diagnosis banding (bukan khusus rawat inap), dasar hukum = bukan UU Asuransi Perawatan.',
    furigana_map: fm([
      ['認知症疾患医療センター', 'にんちしょうしっかんいりょうせんたー'], ['都道府県', 'とどうふけん'], ['指定都市', 'していとし'],
      ['実施主体', 'じっしゅたい'], ['複数', 'ふくすう'], ['設置', 'せっち'], ['専門医療機関', 'せんもんいりょうきかん'],
      ['機能', 'きのう'], ['鑑別診断', 'かんべつしんだん'], ['急性期', 'きゅうせいき'], ['対応', 'たいおう'], ['地域', 'ちいき'],
      ['連携', 'れんけい'], ['進行', 'しんこう'], ['入院治療', 'にゅういんちりょう'], ['専門', 'せんもん'], ['整備', 'せいび'],
    ]),
    linkMatch: '認知症疾患医療センターの説明として',
  },
  {
    kamoku_id: 9,
    order_index: 10,
    title_jp: '認知症初期集中支援チーム',
    content_jp:
      '認知症初期集中支援チームは、認知症の疑いがある人やその家族を訪問し、観察・アセスメントを行ったうえで、チームとして今後の支援方針を検討する役割を担います。金銭管理・ケアプラン作成・サービス契約・法定後見といった具体的な事務手続きは、それぞれ別の専門職や制度が担当します。地域包括支援センターへの相談をきっかけに編成されることが多いです。',
    content_id:
      'Tim dukungan intensif tahap awal demensia bertugas mengunjungi orang yang dicurigai demensia beserta keluarganya, melakukan observasi & asesmen, lalu tim mempertimbangkan arah dukungan ke depan. Prosedur administratif spesifik seperti pengelolaan uang, penyusunan care plan, kontrak layanan, atau perwalian resmi ditangani profesi/sistem lain masing-masing. Tim ini sering dibentuk setelah ada konsultasi ke pusat dukungan komprehensif komunitas.',
    example_jp: '近隣住民の相談をきっかけに、認知症初期集中支援チームがＢさん宅を訪問した。',
    example_id: 'Berawal dari konsultasi warga sekitar, tim dukungan intensif tahap awal demensia mengunjungi rumah Bさん.',
    exam_point_jp: 'チームの役割＝アセスメントと支援方針検討。ケアプラン作成・契約・後見等の具体的事務は他の専門職の業務である点に注意。',
    exam_point_id: 'Peran tim = asesmen & mempertimbangkan arah dukungan. Perhatikan bahwa tugas administratif seperti care plan, kontrak, perwalian adalah tugas profesi lain.',
    furigana_map: fm([
      ['認知症初期集中支援チーム', 'にんちしょうしょきしゅうちゅうしえんちーむ'], ['疑', 'うたが'], ['訪問', 'ほうもん'],
      ['観察', 'かんさつ'], ['検討', 'けんとう'], ['役割', 'やくわり'], ['担', 'にな'], ['金銭管理', 'きんせんかんり'],
      ['具体的', 'ぐたいてき'], ['事務手続', 'じむてつづき'], ['専門職', 'せんもんしょく'], ['制度', 'せいど'],
      ['担当', 'たんとう'], ['地域包括支援センター', 'ちいきほうかつしえんせんたー'], ['相談', 'そうだん'], ['編成', 'へんせい'],
    ]),
    linkMatch: '玄関前で、脱水で倒れているところを発見され',
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
