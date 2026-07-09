// Materi + kosakata untuk 第37回 午前 問題1-30 (kamoku 1 tambahan, 3, 4, 7)
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
  { kamoku_id: 1, kanji: 'アドボカシー', furigana: 'あどぼかしー', meaning_id: 'Advokasi — membela dan mewakili hak/suara orang yang sulit menyampaikan keinginannya sendiri', example_sentence_jp: 'アドボカシーの視点から利用者の意思を代弁する。', example_sentence_id: 'Mewakili keinginan pengguna layanan dari sudut pandang advokasi.' },

  { kamoku_id: 4, kanji: '自己同一性', furigana: 'じこどういつせい', meaning_id: 'Identitas diri (aidentitas) — rasa konsisten tentang "siapa saya"', example_sentence_jp: '青年期は自己同一性を確立する重要な時期である。', example_sentence_id: 'Masa remaja adalah periode penting membangun identitas diri.' },
  { kamoku_id: 4, kanji: '自己覚知', furigana: 'じこかくち', meaning_id: 'Self-awareness — memahami emosi, nilai, dan kecenderungan diri secara objektif', example_sentence_jp: '対人援助職には自己覚知が欠かせない。', example_sentence_id: 'Self-awareness sangat penting bagi pekerja pendamping.' },
  { kamoku_id: 4, kanji: '自己中心性', furigana: 'じこちゅうしんせい', meaning_id: 'Egosentrisme — sulit mengambil sudut pandang orang lain', example_sentence_jp: '幼児期には自己中心性がみられる。', example_sentence_id: 'Egosentrisme umum terlihat pada masa balita.' },
  { kamoku_id: 4, kanji: 'あいづち', furigana: 'あいづち', meaning_id: 'Respons singkat/anggukan saat mendengarkan — teknik komunikasi memancing lawan bicara', example_sentence_jp: 'あいづちを打ちながら話を聞く。', example_sentence_id: 'Mendengarkan sambil memberi respons singkat.' },
  { kamoku_id: 4, kanji: '自己開示', furigana: 'じこかいじ', meaning_id: 'Self-disclosure — membagikan informasi tentang diri sendiri ke orang lain', example_sentence_jp: '信頼関係を築くために自己開示を行う。', example_sentence_id: 'Melakukan self-disclosure untuk membangun hubungan saling percaya.' },
  { kamoku_id: 4, kanji: 'キャリアパス', furigana: 'きゃりあぱす', meaning_id: 'Jenjang karier — jalur kemampuan/pengalaman yang dibutuhkan sesuai posisi', example_sentence_jp: '施設のキャリアパスを確認する。', example_sentence_id: 'Memeriksa jenjang karier di fasilitas.' },
  { kamoku_id: 4, kanji: 'フォロワーシップ', furigana: 'ふぉろわーしっぷ', meaning_id: 'Followership — peran aktif anggota tim mendukung pemimpin & tim', example_sentence_jp: 'チームの一員としてフォロワーシップを発揮する。', example_sentence_id: 'Menunjukkan followership sebagai anggota tim.' },

  { kamoku_id: 3, kanji: '社会福祉法人', furigana: 'しゃかいふくしほうじん', meaning_id: 'Badan hukum kesejahteraan sosial', example_sentence_jp: '社会福祉法人が特別養護老人ホームを運営する。', example_sentence_id: 'Badan hukum kesejahteraan sosial mengelola panti wredha.' },
  { kamoku_id: 3, kanji: '評議員会', furigana: 'ひょうぎいんかい', meaning_id: 'Dewan pengawas — organ wajib di badan hukum kesejahteraan sosial', example_sentence_jp: '評議員会で予算を承認する。', example_sentence_id: 'Dewan pengawas menyetujui anggaran.' },
  { kamoku_id: 3, kanji: '定期巡回・随時対応型訪問介護看護', furigana: 'ていきじゅんかい・ずいじたいおうがたほうもんかいごかんご', meaning_id: 'Layanan kunjungan perawatan & keperawatan terjadwal dan sewaktu-waktu, 24 jam', example_sentence_jp: '定期巡回・随時対応型訪問介護看護を利用して在宅生活を続ける。', example_sentence_id: 'Tetap tinggal di rumah dengan bantuan layanan kunjungan 24 jam ini.' },
  { kamoku_id: 3, kanji: '生存権', furigana: 'せいぞんけん', meaning_id: 'Hak hidup layak — dijamin Pasal 25 Konstitusi Jepang', example_sentence_jp: '生存権は生活保護制度の根拠である。', example_sentence_id: 'Hak hidup layak adalah dasar hukum sistem bantuan sosial.' },
  { kamoku_id: 3, kanji: '保健所', furigana: 'ほけんじょ', meaning_id: 'Pusat kesehatan masyarakat tingkat provinsi/kota besar', example_sentence_jp: '保健所は精神保健に関する業務も行う。', example_sentence_id: 'Pusat kesehatan ini juga menangani urusan kesehatan jiwa.' },
  { kamoku_id: 3, kanji: '地域包括支援センター', furigana: 'ちいきほうかつしえんせんたー', meaning_id: 'Pusat dukungan komprehensif berbasis komunitas bagi lansia', example_sentence_jp: '地域包括支援センターに相談する。', example_sentence_id: 'Berkonsultasi ke pusat dukungan komprehensif komunitas.' },
  { kamoku_id: 3, kanji: '第1号被保険者', furigana: 'だいいちごうひほけんしゃ', meaning_id: 'Tertanggung kategori 1 asuransi perawatan (65 tahun ke atas)', example_sentence_jp: '第1号被保険者の保険料は市町村が徴収する。', example_sentence_id: 'Premi tertanggung kategori 1 dipungut pemerintah kota.' },
  { kamoku_id: 3, kanji: '第2号被保険者', furigana: 'だいにごうひほけんしゃ', meaning_id: 'Tertanggung kategori 2 asuransi perawatan (40-64 tahun)', example_sentence_jp: '第2号被保険者の保険料は医療保険と合わせて徴収される。', example_sentence_id: 'Premi tertanggung kategori 2 dipungut bersamaan asuransi kesehatan.' },
  { kamoku_id: 3, kanji: '法定雇用率', furigana: 'ほうていこようりつ', meaning_id: 'Kuota wajib pekerja disabilitas di perusahaan', example_sentence_jp: '2024年度の法定雇用率は2.5％になった。', example_sentence_id: 'Kuota wajib tahun fiskal 2024 naik jadi 2,5%.' },
  { kamoku_id: 3, kanji: '訓練等給付', furigana: 'くんれんとうきゅうふ', meaning_id: 'Tunjangan pelatihan (障害者総合支援法)', example_sentence_jp: '自立訓練は訓練等給付の1つである。', example_sentence_id: 'Pelatihan kemandirian termasuk tunjangan pelatihan.' },
  { kamoku_id: 3, kanji: '介護給付', furigana: 'かいごきゅうふ', meaning_id: 'Tunjangan perawatan (障害者総合支援法)', example_sentence_jp: '短期入所や行動援護は介護給付に含まれる。', example_sentence_id: 'Short stay dan dukungan pendampingan perilaku termasuk tunjangan perawatan.' },
  { kamoku_id: 3, kanji: '障害児通所支援', furigana: 'しょうがいじつうしょしえん', meaning_id: 'Dukungan kunjungan harian bagi anak disabilitas', example_sentence_jp: '障害児通所支援の利用計画を作成する。', example_sentence_id: 'Menyusun rencana penggunaan dukungan kunjungan harian anak disabilitas.' },
  { kamoku_id: 3, kanji: 'サービス付き高齢者向け住宅', furigana: 'さーびすつきこうれいしゃむけじゅうたく', meaning_id: 'Rumah lansia berlayanan (サ高住)', example_sentence_jp: 'サービス付き高齢者向け住宅に入居する。', example_sentence_id: 'Tinggal di rumah lansia berlayanan.' },
  { kamoku_id: 3, kanji: '高次脳機能障害', furigana: 'こうじのうきのうしょうがい', meaning_id: 'Gangguan fungsi otak tingkat tinggi (memori, perhatian, dll. pasca cedera otak)', example_sentence_jp: '高次脳機能障害の治療とリハビリテーションを受ける。', example_sentence_id: 'Menjalani pengobatan dan rehabilitasi gangguan fungsi otak tingkat tinggi.' },

  { kamoku_id: 7, kanji: '扁桃体', furigana: 'へんとうたい', meaning_id: 'Amigdala — bagian otak yang memproses emosi (takut, cemas, senang)', example_sentence_jp: '扁桃体は情動の処理に関わる。', example_sentence_id: 'Amigdala berperan dalam pemrosesan emosi.' },
  { kamoku_id: 7, kanji: '三叉神経', furigana: 'さんさしんけい', meaning_id: 'Saraf trigeminal — mengatur sensasi wajah', example_sentence_jp: '三叉神経は顔の感覚を司る。', example_sentence_id: 'Saraf trigeminal mengatur sensasi wajah.' },
  { kamoku_id: 7, kanji: '鼻腔', furigana: 'びくう', meaning_id: 'Rongga hidung', example_sentence_jp: '鼻腔の粘膜には毛細血管が豊富にある。', example_sentence_id: 'Selaput lendir rongga hidung kaya pembuluh darah kapiler.' },
  { kamoku_id: 7, kanji: '歯周病', furigana: 'ししゅうびょう', meaning_id: 'Penyakit gusi (periodontal)', example_sentence_jp: '歯周病は歯周ポケットの形成が特徴である。', example_sentence_id: 'Penyakit gusi ditandai terbentuknya kantong periodontal.' },
  { kamoku_id: 7, kanji: '唾液分泌', furigana: 'だえきぶんぴつ', meaning_id: 'Sekresi air liur', example_sentence_jp: '唾液分泌の低下は口臭の原因になる。', example_sentence_id: 'Penurunan sekresi air liur bisa menyebabkan bau mulut.' },
  { kamoku_id: 7, kanji: '表皮', furigana: 'ひょうひ', meaning_id: 'Epidermis — lapisan kulit terluar', example_sentence_jp: '表皮は外界と直接接する組織である。', example_sentence_id: 'Epidermis adalah jaringan yang langsung bersentuhan dengan lingkungan luar.' },
  { kamoku_id: 7, kanji: '高温浴', furigana: 'こうおんよく', meaning_id: 'Mandi air panas', example_sentence_jp: '高温浴は血圧を上昇させる。', example_sentence_id: 'Mandi air panas menaikkan tekanan darah.' },
  { kamoku_id: 7, kanji: '小腸', furigana: 'しょうちょう', meaning_id: 'Usus halus — tempat utama penyerapan zat gizi', example_sentence_jp: '栄養素の大部分は小腸で吸収される。', example_sentence_id: 'Sebagian besar zat gizi diserap di usus halus.' },
  { kamoku_id: 7, kanji: 'レム睡眠', furigana: 'れむすいみん', meaning_id: 'Tidur REM — fase tidur dengan otak aktif, berperan dalam memori', example_sentence_jp: 'レム睡眠中は記憶が整理される。', example_sentence_id: 'Saat tidur REM, memori diorganisasi ulang.' },
  { kamoku_id: 7, kanji: '周期性四肢運動障害', furigana: 'しゅうきせいししうんどうしょうがい', meaning_id: 'Gangguan gerak anggota tubuh periodik saat tidur, tanpa disadari penderita', example_sentence_jp: '睡眠中に下肢が周期的に動くのは周期性四肢運動障害の特徴である。', example_sentence_id: 'Kaki bergerak berirama saat tidur adalah ciri khas gangguan ini.' },
  { kamoku_id: 7, kanji: '呼吸中枢', furigana: 'こきゅうちゅうすう', meaning_id: 'Pusat pernapasan di otak (延髄)', example_sentence_jp: '延髄には呼吸中枢がある。', example_sentence_id: 'Medula oblongata memiliki pusat pernapasan.' },
  { kamoku_id: 7, kanji: '対光反射', furigana: 'たいこうはんしゃ', meaning_id: 'Refleks cahaya pupil', example_sentence_jp: '対光反射の消失は脳死判定の徴候の一つである。', example_sentence_id: 'Hilangnya refleks cahaya pupil adalah salah satu tanda kematian otak.' },
]

const materialSections = [
  {
    kamoku_id: 1,
    order_index: 5,
    title_jp: 'アドボカシー（権利擁護）の視点',
    content_jp:
      'アドボカシーとは、自分の意思を表明しにくい利用者に代わって、その権利や意思を代弁し、実現に向けて働きかけることです。単なる説明・同意（インフォームドコンセント）や多職種連携とは異なり、「本人が言い出しにくいことをくみ取り、実現のために動く」という積極的な姿勢が核心です。',
    content_id:
      'Advokasi adalah mewakili dan menyuarakan hak/keinginan pengguna layanan yang sulit menyampaikan sendiri, lalu berupaya mewujudkannya. Berbeda dari sekadar penjelasan-persetujuan (informed consent) atau kolaborasi antarprofesi, inti advokasi adalah sikap aktif: menangkap hal yang sulit diucapkan seseorang lalu bergerak mewujudkannya.',
    example_jp: '施設での生活に不満があっても言い出せない利用者の気持ちを汲み取り、代わりに職員会議で提案する。',
    example_id: 'Menangkap keluhan pengguna layanan yang tak berani diucapkan tentang kehidupan di fasilitas, lalu menyampaikannya di rapat staf.',
    exam_point_jp: 'インフォームドコンセント・多職種連携・情報保障など似た概念と混同しないこと。アドボカシー＝代弁・権利擁護が核心。',
    exam_point_id: 'Jangan tertukar dengan konsep mirip seperti informed consent, kolaborasi antarprofesi, atau aksesibilitas informasi. Inti advokasi adalah mewakili suara & membela hak.',
    furigana_map: fm([
      ['意思', 'いし'], ['表明', 'ひょうめい'], ['利用者', 'りようしゃ'], ['代', 'か'], ['権利', 'けんり'],
      ['実現', 'じつげん'], ['働', 'はたら'], ['同意', 'どうい'], ['多職種連携', 'たしょくしゅれんけい'],
      ['異', 'こと'], ['本人', 'ほんにん'], ['積極的', 'せっきょくてき'], ['姿勢', 'しせい'], ['核心', 'かくしん'],
    ]),
    linkMatch: '介護福祉職がアドボカシー（advocacy）の視点から行う対応',
  },
  {
    kamoku_id: 4,
    order_index: 1,
    title_jp: '自己概念に関する心理学用語',
    content_jp:
      '自己同一性（アイデンティティ）の確立とは、時間や状況が変わっても一貫した「自分とは何か」という認識をもつことです。自我は、現実に適応しながら思考・行動を統制する機能を指し、無意識（表面化していない意識）とは区別されます。自己覚知は、自分の感情・価値観・傾向を客観的に理解することで、対人援助職に不可欠な姿勢です。自己中心性は、他者の視点に立てず自分の視点でしか物事を捉えられないことを指す発達心理学の用語です。',
    content_id:
      'Membangun identitas diri berarti memiliki kesadaran konsisten tentang "siapa saya" meski waktu dan situasi berubah. Ego adalah fungsi yang mengatur pikiran & perilaku sesuai realita, berbeda dari alam bawah sadar. Self-awareness adalah memahami emosi, nilai, dan kecenderungan diri secara objektif — sikap penting bagi pekerja pendamping. Egosentrisme adalah istilah psikologi perkembangan untuk ketidakmampuan mengambil sudut pandang orang lain.',
    example_jp: '介護福祉職は、自分の価値観が支援に影響していないか自己覚知を通じて振り返る。',
    example_id: 'Pekerja kaigo merefleksikan lewat self-awareness apakah nilai pribadinya memengaruhi cara mendukung pengguna layanan.',
    exam_point_jp: '自己同一性・自我・自己覚知・自己中心性・自己愛・自己開示など似た「自己○○」用語の定義を混同しないよう整理する。',
    exam_point_id: 'Banyak istilah "self-○○" (identitas, ego, self-awareness, egosentrisme, self-love, self-disclosure) — hafalkan definisinya masing-masing agar tidak tertukar.',
    furigana_map: fm([
      ['自己同一性', 'じこどういつせい'], ['確立', 'かくりつ'], ['認識', 'にんしき'], ['自我', 'じが'],
      ['現実', 'げんじつ'], ['適応', 'てきおう'], ['統制', 'とうせい'], ['機能', 'きのう'],
      ['無意識', 'むいしき'], ['区別', 'くべつ'], ['自己覚知', 'じこかくち'], ['感情', 'かんじょう'],
      ['価値観', 'かちかん'], ['客観的', 'きゃっかんてき'], ['対人援助職', 'たいじんえんじょしょく'],
      ['自己中心性', 'じこちゅうしんせい'], ['他者', 'たしゃ'], ['視点', 'してん'], ['発達心理学', 'はったつしんりがく'],
    ]),
    linkMatch: '人間関係と心理に関する次の記述',
  },
  {
    kamoku_id: 4,
    order_index: 2,
    title_jp: '傾聴とコミュニケーション技術',
    content_jp:
      'あいづちは、相手の話を一方的に聞くのではなく、うなずきや短い相槌によって話しやすい雰囲気をつくり、双方向のやり取りを生み出す技法です。特に初対面や戸惑いのある利用者に対しては、こちらから積極的に話すのではなく、あいづちを通じて相手の発話を引き出すことが信頼関係づくりの第一歩になります。',
    content_id:
      'Menganggukkan kepala/respons singkat (aizuchi) adalah teknik menciptakan suasana nyaman bicara dan komunikasi dua arah, bukan sekadar mendengarkan pasif. Terutama pada pengguna layanan yang baru bertemu atau canggung, memancing mereka bicara lewat aizuchi — bukan banyak bicara sendiri — adalah langkah pertama membangun kepercayaan.',
    example_jp: '「そうなんですね」「なるほど」と相槌を打ちながら、Ａさんが話しやすい雰囲気をつくる。',
    example_id: 'Menciptakan suasana nyaman bagi Aさん untuk bicara dengan merespons "begitu ya", "oh iya".',
    exam_point_jp: 'あいづち＝双方向のやり取りを生む技法。自己開示（自分の情報を話すこと）や能力評価とは目的が異なる点に注意。',
    exam_point_id: 'Aizuchi bertujuan menciptakan komunikasi dua arah. Bedakan dari self-disclosure (membicarakan diri sendiri) atau penilaian kemampuan.',
    furigana_map: fm([
      ['相手', 'あいて'], ['一方的', 'いっぽうてき'], ['雰囲気', 'ふんいき'], ['双方向', 'そうほうこう'],
      ['技法', 'ぎほう'], ['初対面', 'しょたいめん'], ['戸惑', 'とまど'], ['利用者', 'りようしゃ'],
      ['積極的', 'せっきょくてき'], ['発話', 'はつわ'], ['引', 'ひ'], ['信頼関係', 'しんらいかんけい'], ['第一歩', 'だいいっぽ'],
    ]),
    linkMatch: '有料老人ホームに入所することになった。一人暮らしが長かったＡさん',
  },
  {
    kamoku_id: 4,
    order_index: 3,
    title_jp: '介護福祉職のキャリアパス',
    content_jp:
      'キャリアパスとは、職位や役割に応じて、介護福祉職として必要な能力や経験の道筋を明確にする仕組みです。介護計画の作成方法や業務マニュアル、設備基準の確認といった個別の実務内容とは異なり、「どのような経験・能力を積めば次の段階に進めるか」という成長の道筋そのものを指します。',
    content_id:
      'Jenjang karier adalah sistem yang memperjelas jalur kemampuan & pengalaman yang dibutuhkan pekerja kaigo sesuai posisi/perannya. Berbeda dari konten kerja spesifik seperti cara membuat rencana perawatan, manual kerja, atau standar fasilitas — ini soal jalur pertumbuhan itu sendiri: pengalaman/kemampuan apa yang perlu dikuasai untuk naik tingkat.',
    example_jp: '施設が用意したキャリアパスに沿って、初任者から主任、施設長へとステップアップする。',
    example_id: 'Naik jenjang dari staf pemula ke penyelia lalu kepala fasilitas, mengikuti jenjang karier yang disediakan fasilitas.',
    exam_point_jp: 'キャリアパスは「個人の成長の道筋」。業務マニュアルや設備基準など施設運営に関する選択肢と混同しない。',
    exam_point_id: 'Jenjang karier adalah "jalur pertumbuhan individu". Jangan tertukar dengan pilihan soal manual kerja atau standar fasilitas.',
    furigana_map: fm([
      ['職位', 'しょくい'], ['役割', 'やくわり'], ['応', 'おう'], ['介護福祉職', 'かいごふくししょく'],
      ['能力', 'のうりょく'], ['経験', 'けいけん'], ['道筋', 'みちすじ'], ['仕組', 'しく'], ['介護計画', 'かいごけいかく'],
      ['業務', 'ぎょうむ'], ['設備基準', 'せつびきじゅん'], ['確認', 'かくにん'], ['異', 'こと'], ['段階', 'だんかい'],
      ['成長', 'せいちょう'],
    ]),
    linkMatch: '介護福祉職のキャリアパスに関するものとして',
  },
  {
    kamoku_id: 4,
    order_index: 4,
    title_jp: 'フォロワーシップとチームケア',
    content_jp:
      'フォロワーシップとは、リーダーに従うだけでなく、チームの一員として主体的に働きかける姿勢のことです。同僚の様子の変化に気づいたとき、最初にすべきことは、いきなり本人を励ましたり周囲に共有したりすることではなく、まず情報を集めて状況を正しく把握することです。状況把握の前に行動すると、誤解や不必要なプライバシー侵害につながる可能性があります。',
    content_id:
      'Followership adalah sikap proaktif sebagai anggota tim, bukan sekadar patuh pada pemimpin. Saat menyadari perubahan pada rekan kerja, langkah pertama bukan langsung menyemangati atau membagikan info ke orang lain, melainkan mengumpulkan informasi dan memahami situasi dengan benar dulu. Bertindak sebelum memahami situasi berisiko menimbulkan kesalahpahaman atau melanggar privasi yang tidak perlu.',
    example_jp: 'ユニットリーダーから相談を受けたら、まず詳しい状況を確認してから対応を考える。',
    example_id: 'Setelah menerima konsultasi dari pemimpin unit, cek dulu situasi detailnya sebelum memikirkan respons.',
    exam_point_jp: '「最初に行うこと」を問う問題では、まず情報収集・状況把握が正解になりやすい。励ます・共有する・指示を仰ぐは時期尚早な選択肢になりやすい。',
    exam_point_id: 'Untuk soal "langkah pertama", jawabannya biasanya mengumpulkan info/memahami situasi. Menyemangati, membagikan info, atau minta instruksi biasanya terlalu dini.',
    furigana_map: fm([
      ['従', 'したが'], ['一員', 'いちいん'], ['主体的', 'しゅたいてき'], ['姿勢', 'しせい'], ['同僚', 'どうりょう'],
      ['様子', 'ようす'], ['変化', 'へんか'], ['気', 'き'], ['最初', 'さいしょ'], ['励', 'はげ'], ['周囲', 'しゅうい'],
      ['共有', 'きょうゆう'], ['情報', 'じょうほう'], ['把握', 'はあく'], ['誤解', 'ごかい'], ['侵害', 'しんがい'],
      ['可能性', 'かのうせい'],
    ]),
    linkMatch: '学校を卒業したばかりの元気なＣ介護福祉職',
  },
  {
    kamoku_id: 3,
    order_index: 1,
    title_jp: '社会福祉法人の基本',
    content_jp:
      '社会福祉法人は、社会福祉法に基づき所轄庁（都道府県知事等）の認可を受けて設立される非営利法人です。本来業務に支障のない範囲で収益事業も行うことができます。2016年の法改正により、評議員会がすべての社会福祉法人に必置の機関となりました。解散も所定の手続きを経れば可能です。',
    content_id:
      'Badan hukum kesejahteraan sosial didirikan berdasarkan UU Kesejahteraan Sosial dengan izin otoritas pengawas (gubernur, dll.), berstatus nirlaba. Boleh menjalankan usaha komersial selama tidak mengganggu kegiatan utama. Sejak revisi UU 2016, dewan pengawas (評議員会) wajib dimiliki semua badan hukum ini. Pembubaran pun dimungkinkan lewat prosedur yang ditetapkan.',
    example_jp: '社会福祉法人が特別養護老人ホームや保育所を運営する。',
    example_id: 'Badan hukum kesejahteraan sosial mengelola panti wredha atau tempat penitipan anak.',
    exam_point_jp: '「収益事業禁止」「認可不要」「解散禁止」等の断定的な選択肢は誤りになりやすい。評議員会必置は頻出ポイント。',
    exam_point_id: 'Pilihan tegas seperti "usaha komersial dilarang", "tidak perlu izin", "dilarang bubar" biasanya salah. Kewajiban dewan pengawas sering keluar di ujian.',
    furigana_map: fm([
      ['社会福祉法人', 'しゃかいふくしほうじん'], ['社会福祉法', 'しゃかいふくしほう'], ['所轄庁', 'しょかつちょう'],
      ['認可', 'にんか'], ['設立', 'せつりつ'], ['非営利法人', 'ひえいりほうじん'], ['本来業務', 'ほんらいぎょうむ'],
      ['支障', 'ししょう'], ['収益事業', 'しゅうえきじぎょう'], ['法改正', 'ほうかいせい'], ['評議員会', 'ひょうぎいんかい'],
      ['必置', 'ひっち'], ['機関', 'きかん'], ['解散', 'かいさん'], ['所定', 'しょてい'], ['手続', 'てつづ'],
    ]),
    linkMatch: '社会福祉法に基づく社会福祉法人に関する',
  },
  {
    kamoku_id: 3,
    order_index: 2,
    title_jp: '地域密着型サービス：定期巡回・随時対応型訪問介護看護',
    content_jp:
      '定期巡回・随時対応型訪問介護看護は、24時間365日、訪問介護と訪問看護を一体的に提供する地域密着型サービスです。日中・夜間を通じて必要なときに随時対応します。地域密着型サービスであるため、指定・指導・監督は市町村が行います（都道府県ではない点に注意）。',
    content_id:
      'Layanan ini menyediakan kunjungan perawatan (kaigo) dan keperawatan (kango) secara terpadu 24 jam 365 hari, siang dan malam, sesuai kebutuhan mendadak. Karena tergolong layanan berbasis komunitas, penetapan-pembinaan-pengawasannya dilakukan pemerintah kota/kabupaten (bukan provinsi).',
    example_jp: '夜間に体調が急変しても、随時のコールで訪問看護師が対応してくれる。',
    example_id: 'Meski kondisi memburuk mendadak malam hari, perawat kunjungan tetap merespons lewat panggilan sewaktu-waktu.',
    exam_point_jp: '定員9人以下＝グループホームの説明、通い泊まり看護の組合せ＝看護小規模多機能型居宅介護の説明と混同しないこと。',
    exam_point_id: 'Jangan tertukar: kuota maksimal 9 orang itu deskripsi grup home; kombinasi kunjungan-menginap-perawatan itu layanan multifungsi skala kecil dengan perawatan.',
    furigana_map: fm([
      ['定期巡回', 'ていきじゅんかい'], ['随時対応型訪問介護看護', 'ずいじたいおうがたほうもんかいごかんご'],
      ['訪問介護', 'ほうもんかいご'], ['訪問看護', 'ほうもんかんご'], ['一体的', 'いったいてき'],
      ['地域密着型サービス', 'ちいきみっちゃくがたさーびす'], ['日中', 'にっちゅう'], ['夜間', 'やかん'],
      ['指定', 'してい'], ['指導', 'しどう'], ['監督', 'かんとく'], ['市町村', 'しちょうそん'],
    ]),
    linkMatch: '定期巡回・随時対応型訪問介護看護の説明',
  },
  {
    kamoku_id: 3,
    order_index: 3,
    title_jp: '日本国憲法と生存権・生活保護制度',
    content_jp:
      '日本国憲法第25条は「健康で文化的な最低限度の生活を営む権利」＝生存権を保障しています。生活保護制度はこの生存権を具体化した制度で、失業や病気などで生活を営めなくなり、頼れる親族もいない人が対象となります。',
    content_id:
      'Pasal 25 Konstitusi Jepang menjamin "hak menjalani hidup layak secara sehat dan berbudaya" — dikenal sebagai hak hidup layak (生存権). Sistem bantuan sosial (生活保護制度) mewujudkan hak ini secara konkret, ditujukan bagi orang yang tak bisa lagi menopang hidupnya (misal karena kehilangan pekerjaan/sakit) dan tak punya keluarga yang bisa diandalkan.',
    example_jp: '再就職先が見つからず貯金も尽きたため、生活保護を受給することになった。',
    example_id: 'Karena tidak dapat pekerjaan baru dan tabungan habis, akhirnya menerima bantuan sosial.',
    exam_point_jp: '生活保護制度の根拠となる憲法上の権利＝生存権（25条）。平等権・財産権・思想の自由など他の人権と混同しない。',
    exam_point_id: 'Dasar konstitusional sistem bantuan sosial adalah hak hidup layak (Pasal 25). Jangan tertukar dengan hak asasi lain seperti hak kesetaraan, hak properti, atau kebebasan berpikir.',
    furigana_map: fm([
      ['日本国憲法', 'にほんこくけんぽう'], ['健康', 'けんこう'], ['文化的', 'ぶんかてき'], ['最低限度', 'さいていげんど'],
      ['生活', 'せいかつ'], ['営', 'いとな'], ['権利', 'けんり'], ['生存権', 'せいぞんけん'], ['保障', 'ほしょう'],
      ['生活保護制度', 'せいかつほごせいど'], ['具体化', 'ぐたいか'], ['失業', 'しつぎょう'], ['親族', 'しんぞく'],
      ['対象', 'たいしょう'],
    ]),
    linkMatch: 'うつ症状から体調不良が続き、仕事を休むことが増えた',
  },
  {
    kamoku_id: 3,
    order_index: 4,
    title_jp: '保健所と地域保健法',
    content_jp:
      '保健所は地域保健法に基づき、都道府県・政令指定都市・中核市などに設置される機関で、すべての市町村に設置義務があるわけではありません。業務には感染症対策のほか、精神保健に関する事項も含まれます。歯科衛生士の配置は必置義務ではなく、児童の一時保護は児童相談所の業務です。',
    content_id:
      'Puskesmas tingkat provinsi (保健所) didirikan berdasarkan UU Kesehatan Daerah, berlokasi di provinsi/kota besar tertentu — bukan wajib di semua kotamadya. Tugasnya mencakup pengendalian penyakit menular maupun urusan kesehatan jiwa. Menempatkan perawat gigi bukan kewajiban mutlak, dan perlindungan sementara anak adalah tugas pusat konsultasi anak (bukan 保健所).',
    example_jp: '保健所は、地域住民の精神保健相談や感染症予防の啓発活動を行う。',
    example_id: 'Puskesmas ini melayani konsultasi kesehatan jiwa dan penyuluhan pencegahan penyakit menular bagi warga.',
    exam_point_jp: '保健所＝地域保健法に基づく設置、業務に精神保健を含む、という2点が頻出。児童相談所の業務との違いに注意。',
    exam_point_id: '2 poin sering keluar: dasar hukumnya UU Kesehatan Daerah, dan tugasnya mencakup kesehatan jiwa. Perhatikan bedanya dengan tugas pusat konsultasi anak.',
    furigana_map: fm([
      ['保健所', 'ほけんじょ'], ['地域保健法', 'ちいきほけんほう'], ['都道府県', 'とどうふけん'],
      ['政令指定都市', 'せいれいしていとし'], ['中核市', 'ちゅうかくし'], ['設置', 'せっち'], ['義務', 'ぎむ'],
      ['業務', 'ぎょうむ'], ['感染症対策', 'かんせんしょうたいさく'], ['精神保健', 'せいしんほけん'],
      ['歯科衛生士', 'しかえいせいし'], ['配置', 'はいち'], ['児童', 'じどう'], ['一時保護', 'いちじほご'],
      ['児童相談所', 'じどうそうだんじょ'],
    ]),
    linkMatch: '保健所に関するものとして',
  },
  {
    kamoku_id: 3,
    order_index: 5,
    title_jp: '地域包括支援センターの業務',
    content_jp:
      '地域包括支援センターは、地域ケア会議の開催をはじめとする包括的支援事業を担う機関です。施設サービスのケアプラン作成は施設のケアマネジャーが行い、成年後見制度の申請自体は本人や親族が行います（センターは相談・利用支援）。介護認定審査会の設置や地域密着型サービス事業者の指導・監督は市町村の業務です。',
    content_id:
      'Pusat dukungan komprehensif komunitas menjalankan usaha dukungan komprehensif, termasuk menyelenggarakan rapat perawatan berbasis komunitas. Rencana perawatan layanan fasilitas dibuat oleh care manager fasilitas; pengajuan sistem perwalian dewasa dilakukan sendiri oleh yang bersangkutan/keluarga (pusat ini hanya mendampingi & konsultasi). Pendirian komite penilaian tingkat perawatan dan pembinaan penyedia layanan komunitas adalah tugas pemerintah kota.',
    example_jp: '地域包括支援センターが中心となり、多職種が集まる地域ケア会議を開く。',
    example_id: 'Pusat dukungan komprehensif komunitas menjadi penggerak utama rapat perawatan lintas profesi.',
    exam_point_jp: '「センターがやること」と「市町村がやること」を混同しやすい。指導・監督や審査会設置は市町村、センターは相談・支援・会議運営が中心。',
    exam_point_id: 'Sering tertukar antara tugas pusat ini dan tugas pemerintah kota. Pembinaan/pendirian komite = pemerintah kota; pusat ini fokus konsultasi, dukungan, dan mengelola rapat.',
    furigana_map: fm([
      ['地域包括支援センター', 'ちいきほうかつしえんせんたー'], ['地域ケア会議', 'ちいきけあかいぎ'], ['開催', 'かいさい'],
      ['包括的支援事業', 'ほうかつてきしえんじぎょう'], ['担', 'にな'], ['機関', 'きかん'], ['施設サービス', 'しせつさーびす'],
      ['ケアマネジャー', 'けあまねじゃー'], ['成年後見制度', 'せいねんこうけんせいど'], ['申請', 'しんせい'],
      ['本人', 'ほんにん'], ['親族', 'しんぞく'], ['介護認定審査会', 'かいごにんていしんさかい'], ['設置', 'せっち'],
      ['地域密着型サービス', 'ちいきみっちゃくがたさーびす'], ['指導', 'しどう'], ['監督', 'かんとく'],
    ]),
    linkMatch: '地域包括支援センターの業務に関する記述',
  },
  {
    kamoku_id: 3,
    order_index: 6,
    title_jp: '地域支援事業・総合事業',
    content_jp:
      '地域支援事業（介護予防・日常生活支援総合事業）には、訪問型サービスや第一号通所事業（通所型サービス）など、要支援者等が日中に交流し孤立を防ぐためのサービスが含まれます。要介護度が高くなくても、話し相手がいない・日中の居場所がないといった悩みには、通所型サービスの利用が適しています。',
    content_id:
      'Program dukungan komunitas (termasuk program komprehensif pencegahan & kehidupan sehari-hari) mencakup layanan kunjungan dan program layanan kunjungan siang hari (第一号通所事業), yang membantu status 要支援 dkk. bersosialisasi dan mencegah isolasi. Meski tingkat kebutuhan perawatannya tidak tinggi, kekhawatiran seperti tak ada teman bicara atau tempat beraktivitas siang hari cocok diatasi lewat layanan kunjungan siang ini.',
    example_jp: '日中一人で寂しいと話すＢさんに、通所型サービスの利用を勧める。',
    example_id: 'Menyarankan layanan kunjungan siang bagi Bさん yang mengeluh kesepian sendirian di siang hari.',
    exam_point_jp: '本人が自宅での生活継続を望んでいる場合、施設入所系の選択肢（グループホーム・介護老人福祉施設等）は誤りになりやすい。',
    exam_point_id: 'Jika seseorang ingin tetap tinggal di rumah, pilihan berupa masuk fasilitas (grup home, panti wredha, dll.) biasanya jawaban salah.',
    furigana_map: fm([
      ['地域支援事業', 'ちいきしえんじぎょう'], ['介護予防', 'かいごよぼう'], ['総合事業', 'そうごうじぎょう'],
      ['訪問型サービス', 'ほうもんがたさーびす'], ['第一号通所事業', 'だいいちごうつうしょじぎょう'],
      ['通所型サービス', 'つうしょがたさーびす'], ['要支援者', 'ようしえんしゃ'], ['日中', 'にっちゅう'],
      ['交流', 'こうりゅう'], ['孤立', 'こりつ'], ['防', 'ふせ'], ['要介護度', 'ようかいごど'], ['居場所', 'いばしょ'],
    ]),
    linkMatch: '自宅で一人暮らしをしている。最近、物忘れが多くなり',
  },
  {
    kamoku_id: 3,
    order_index: 7,
    title_jp: '介護保険制度の財源としくみ',
    content_jp:
      '介護保険の財源は公費50％と保険料50％で構成され、保険料は第1号被保険者（65歳以上）と第2号被保険者（40〜64歳）の両方が含まれます。第1号被保険者の保険料は市町村が徴収し、市町村ごとに基準額が異なります。第2号被保険者の保険料は医療保険の保険料と合わせて徴収されます。利用者負担割合は所得に応じて1〜3割です。',
    content_id:
      'Sumber dana asuransi perawatan terdiri dari 50% dana publik dan 50% premi, yang mencakup tertanggung kategori 1 (65 tahun ke atas) maupun kategori 2 (40-64 tahun). Premi kategori 1 dipungut pemerintah kota dan besarannya berbeda tiap daerah. Premi kategori 2 dipungut bersamaan dengan premi asuransi kesehatan. Porsi biaya pengguna 1-3% tergantung penghasilan.',
    example_jp: '65歳になり第1号被保険者となったため、年金から保険料が天引きされるようになった。',
    example_id: 'Setelah berusia 65 tahun dan menjadi tertanggung kategori 1, premi mulai dipotong langsung dari uang pensiun.',
    exam_point_jp: '第1号＝市町村徴収・金額は地域差あり、第2号＝医療保険と合わせて徴収、という組み合わせが頻出。',
    exam_point_id: 'Yang sering keluar: kategori 1 dipungut pemerintah kota dengan besaran berbeda tiap daerah; kategori 2 dipungut bersama asuransi kesehatan.',
    furigana_map: fm([
      ['介護保険', 'かいごほけん'], ['財源', 'ざいげん'], ['公費', 'こうひ'], ['保険料', 'ほけんりょう'],
      ['構成', 'こうせい'], ['第1号被保険者', 'だいいちごうひほけんしゃ'], ['第2号被保険者', 'だいにごうひほけんしゃ'],
      ['市町村', 'しちょうそん'], ['徴収', 'ちょうしゅう'], ['基準額', 'きじゅんがく'], ['医療保険', 'いりょうほけん'],
      ['利用者負担割合', 'りようしゃふたんわりあい'], ['所得', 'しょとく'],
    ]),
    linkMatch: '介護保険制度に関する記述として',
  },
  {
    kamoku_id: 3,
    order_index: 8,
    title_jp: '障害者雇用促進法',
    content_jp:
      '障害者の雇用の促進等に関する法律に基づく法定雇用率は、2024年度（令和6年度）に民間企業で2.5％へ引き上げられました。この率のもとでは、従業員40人以上の事業主に雇用義務が生じます。2018年度から精神障害者も算定対象に含まれ、重度身体・重度知的・精神障害者は週10時間以上20時間未満の労働も算定対象として認められます。',
    content_id:
      'Berdasarkan UU Promosi Ketenagakerjaan Disabilitas, kuota wajib pekerja disabilitas di perusahaan swasta naik menjadi 2,5% pada tahun fiskal 2024. Dengan kuota ini, kewajiban berlaku bagi pemberi kerja dengan 40 karyawan atau lebih. Sejak tahun fiskal 2018, disabilitas mental juga dihitung dalam kuota, dan pekerja disabilitas fisik/intelektual berat serta disabilitas mental dengan jam kerja 10-20 jam/minggu tetap diakui dalam perhitungan.',
    example_jp: '従業員45人の会社は、法定雇用率に基づき障害者を雇用する義務がある。',
    example_id: 'Perusahaan dengan 45 karyawan wajib mempekerjakan penyandang disabilitas sesuai kuota wajib.',
    exam_point_jp: '法定雇用率の数値と対象人数（2.5％→40人以上）、精神障害者が対象に含まれる点が頻出。年度ごとの数値変化に注意。',
    exam_point_id: 'Yang sering keluar: angka kuota dan jumlah minimal karyawan (2,5% → 40 orang ke atas), dan disabilitas mental termasuk dalam kuota. Perhatikan perubahan angka tiap tahun fiskal.',
    furigana_map: fm([
      ['障害者', 'しょうがいしゃ'], ['雇用促進', 'こようそくしん'], ['法定雇用率', 'ほうていこようりつ'],
      ['民間企業', 'みんかんきぎょう'], ['引', 'ひ'], ['上', 'あ'], ['従業員', 'じゅうぎょういん'], ['事業主', 'じぎょうぬし'],
      ['雇用義務', 'こようぎむ'], ['精神障害者', 'せいしんしょうがいしゃ'], ['算定対象', 'さんていたいしょう'],
      ['重度身体', 'じゅうどしんたい'], ['重度知的', 'じゅうどちてき'], ['労働', 'ろうどう'],
    ]),
    linkMatch: '障害者の雇用の促進等に関する法律に関する',
  },
  {
    kamoku_id: 3,
    order_index: 9,
    title_jp: '障害者総合支援法のサービス体系',
    content_jp:
      '障害者総合支援法のサービスは大きく「介護給付」と「訓練等給付」に分かれます。短期入所・行動援護は介護給付、自立訓練・自立生活援助は訓練等給付に含まれます。介護給付を受けるには障害支援区分の認定が必要です。地域生活支援事業の実施主体は市町村・都道府県で、自立支援給付の利用者負担は所得に応じた応能負担が原則です。',
    content_id:
      'Layanan UU Dukungan Komprehensif Disabilitas terbagi besar menjadi "tunjangan perawatan" dan "tunjangan pelatihan". Short stay dan dukungan pendampingan perilaku termasuk tunjangan perawatan; pelatihan kemandirian dan dukungan hidup mandiri termasuk tunjangan pelatihan. Menerima tunjangan perawatan mensyaratkan penetapan klasifikasi tingkat dukungan disabilitas. Program dukungan kehidupan komunitas diselenggarakan kotamadya/provinsi, dan beban biaya tunjangan dukungan kemandirian pada prinsipnya disesuaikan penghasilan.',
    example_jp: '短期入所を利用する前に、障害支援区分の認定を受ける必要がある。',
    example_id: 'Sebelum memakai layanan short stay, perlu lebih dulu mendapat penetapan klasifikasi tingkat dukungan disabilitas.',
    exam_point_jp: '「介護給付」と「訓練等給付」のどちらに属するサービスか、という分類問題が頻出。行動援護＝介護給付、自立訓練＝訓練等給付と整理しておく。',
    exam_point_id: 'Sering keluar soal klasifikasi: layanan termasuk "tunjangan perawatan" atau "tunjangan pelatihan"? Ingat: dukungan pendampingan perilaku = tunjangan perawatan, pelatihan kemandirian = tunjangan pelatihan.',
    furigana_map: fm([
      ['障害者総合支援法', 'しょうがいしゃそうごうしえんほう'], ['介護給付', 'かいごきゅうふ'], ['訓練等給付', 'くんれんとうきゅうふ'],
      ['短期入所', 'たんきにゅうしょ'], ['行動援護', 'こうどうえんご'], ['自立訓練', 'じりつくんれん'],
      ['自立生活援助', 'じりつせいかつえんじょ'], ['障害支援区分', 'しょうがいしえんくぶん'], ['認定', 'にんてい'],
      ['地域生活支援事業', 'ちいきせいかつしえんじぎょう'], ['実施主体', 'じっしゅたい'], ['応能負担', 'おうのうふたん'],
    ]),
    linkMatch: '「障害者総合支援法」のサービスに関する',
  },
  {
    kamoku_id: 3,
    order_index: 10,
    title_jp: '障害児支援の制度',
    content_jp:
      '放課後等デイサービスや障害児入所支援などの障害児支援は児童福祉法に基づくサービスです。障害児通所支援の利用には、事前に障害児支援利用計画の作成が必要です。療育手帳がなくても、医師の診断書等でサービスを利用できる場合があります。障害児入所支援の実施主体は都道府県等（児童相談所設置市を含む）で、保育所等訪問支援は専門職が保育所等を訪問し、障害児が集団生活に適応できるよう支援するサービスです。',
    content_id:
      'Layanan pendampingan anak seperti layanan sepulang sekolah (放課後等デイサービス) atau dukungan tempat tinggal anak disabilitas berdasarkan UU Kesejahteraan Anak. Penggunaan dukungan kunjungan harian bagi anak disabilitas memerlukan penyusunan rencana dukungan lebih dulu. Bahkan tanpa buku disabilitas intelektual, layanan tetap bisa diakses lewat surat keterangan dokter dalam kondisi tertentu. Penyelenggara dukungan tempat tinggal anak adalah provinsi (termasuk kota dengan pusat konsultasi anak), dan dukungan kunjungan TK/PAUD menghadirkan tenaga ahli agar anak disabilitas beradaptasi dengan kehidupan berkelompok.',
    example_jp: '保育所等訪問支援を利用し、専門職が保育園を訪れて集団生活への適応を支援する。',
    example_id: 'Memakai dukungan kunjungan TK, tenaga ahli datang ke TK untuk membantu anak beradaptasi dengan kehidupan berkelompok.',
    exam_point_jp: '放課後等デイサービス＝児童福祉法（子ども・子育て支援法ではない）、障害児入所支援の実施主体＝都道府県、という点が頻出。',
    exam_point_id: 'Yang sering keluar: dasar layanan sepulang sekolah adalah UU Kesejahteraan Anak (bukan UU Dukungan Anak & Pengasuhan), penyelenggara dukungan tempat tinggal anak adalah provinsi.',
    furigana_map: fm([
      ['放課後等デイサービス', 'ほうかごとうでいさーびす'], ['障害児入所支援', 'しょうがいじにゅうしょしえん'],
      ['児童福祉法', 'じどうふくしほう'], ['障害児通所支援', 'しょうがいじつうしょしえん'], ['事前', 'じぜん'],
      ['利用計画', 'りようけいかく'], ['作成', 'さくせい'], ['療育手帳', 'りょういくてちょう'], ['診断書', 'しんだんしょ'],
      ['実施主体', 'じっしゅたい'], ['都道府県', 'とどうふけん'], ['児童相談所', 'じどうそうだんじょ'],
      ['保育所等訪問支援', 'ほいくしょとうほうもんしえん'], ['専門職', 'せんもんしょく'], ['集団生活', 'しゅうだんせいかつ'],
      ['適応', 'てきおう'],
    ]),
    linkMatch: '障害児支援に関する次の記述',
  },
  {
    kamoku_id: 3,
    order_index: 11,
    title_jp: 'サービス付き高齢者向け住宅（サ高住）',
    content_jp:
      'サービス付き高齢者向け住宅（サ高住）は、高齢者住まい法（高齢者の居住の安定確保に関する法律）に基づく登録制度による高齢者向けの住まいです。入居は本人と事業者の契約によるもので、市町村の措置ではありません。必須なのは安否確認と生活相談サービスで、食事・介護サービスの提供は義務ではなく、必要な人は外部のサービスを利用します。',
    content_id:
      'Rumah lansia berlayanan (サ高住) adalah hunian lansia berdasarkan sistem registrasi dalam UU Perumahan Lansia. Masuk lewat kontrak antara penghuni dan penyedia, bukan penempatan pemerintah kota. Yang wajib adalah layanan pengecekan keselamatan & konsultasi hidup; layanan makan dan perawatan bersifat opsional — bagi yang butuh, memakai layanan eksternal.',
    example_jp: 'サ高住に入居し、安否確認と生活相談サービスを受けながら暮らす。',
    example_id: 'Tinggal di サ高住 dengan menerima layanan pengecekan keselamatan dan konsultasi hidup.',
    exam_point_jp: '認知症高齢者向けの共同生活住居（グループホーム）と混同しないこと。サ高住の必須サービスは安否確認＋生活相談のみ。',
    exam_point_id: 'Jangan tertukar dengan grup home demensia. Layanan wajib サ高住 hanya pengecekan keselamatan + konsultasi hidup.',
    furigana_map: fm([
      ['高齢者向け住宅', 'こうれいしゃむけじゅうたく'], ['高齢者住まい法', 'こうれいしゃすまいほう'], ['登録制度', 'とうろくせいど'],
      ['入居', 'にゅうきょ'], ['契約', 'けいやく'], ['措置', 'そち'], ['安否確認', 'あんぴかくにん'], ['生活相談', 'せいかつそうだん'],
      ['義務', 'ぎむ'],
    ]),
    linkMatch: 'サービス付き高齢者向け住宅に関するものとして',
  },
  {
    kamoku_id: 3,
    order_index: 12,
    title_jp: '医療保険制度の基本',
    content_jp:
      '業務外の傷病（休日の私的な活動中のけが・病気など）の医療費は、健康保険などの医療保険制度でまかなわれます。業務中や通勤中の災害には労働者災害補償保険（労災保険）が適用され、医療保険は適用されません。介護保険は65歳未満では特定疾病に該当する場合のみ対象です。',
    content_id:
      'Biaya medis untuk cedera/sakit di luar pekerjaan (misal terjadi saat aktivitas pribadi di hari libur) ditanggung sistem asuransi kesehatan (health insurance). Kecelakaan saat bekerja atau perjalanan ke/dari kerja ditanggung asuransi kecelakaan kerja (labor accident compensation insurance), bukan asuransi kesehatan. Asuransi perawatan (kaigo hoken) untuk usia di bawah 65 tahun hanya berlaku jika termasuk penyakit tertentu.',
    example_jp: '休日に趣味の作業中にけがをしたため、健康保険を使って治療を受けた。',
    example_id: 'Karena cedera saat beraktivitas pribadi di hari libur, berobat menggunakan asuransi kesehatan.',
    exam_point_jp: '「業務中か業務外か」で適用される保険制度が変わる点が頻出。休日の私的活動＝医療保険、業務中の災害＝労災保険。',
    exam_point_id: 'Yang sering keluar: sistem asuransi berbeda tergantung "saat bekerja atau tidak". Aktivitas pribadi di hari libur = asuransi kesehatan, kecelakaan saat kerja = asuransi kecelakaan kerja.',
    furigana_map: fm([
      ['業務外', 'ぎょうむがい'], ['傷病', 'しょうびょう'], ['休日', 'きゅうじつ'], ['私的', 'してき'], ['医療費', 'いりょうひ'],
      ['健康保険', 'けんこうほけん'], ['医療保険制度', 'いりょうほけんせいど'], ['業務中', 'ぎょうむちゅう'], ['通勤中', 'つうきんちゅう'],
      ['災害', 'さいがい'], ['労働者災害補償保険', 'ろうどうしゃさいがいほしょうほけん'], ['適用', 'てきよう'],
      ['特定疾病', 'とくていしっぺい'], ['該当', 'がいとう'],
    ]),
    linkMatch: '休日に自宅で趣味の家庭菜園の作業中に脳出血',
  },
  {
    kamoku_id: 7,
    order_index: 1,
    title_jp: '情動と脳の部位（扁桃体）',
    content_jp:
      '恐怖・不安・喜びなどの情動の処理には、大脳辺縁系にある扁桃体が中心的な役割を果たします。小脳は運動の協調・バランス、下垂体はホルモン分泌の調節、海馬は記憶の形成、視床下部は体温・食欲など身体の恒常性維持を担っており、それぞれ扁桃体とは異なる機能をもちます。',
    content_id:
      'Pemrosesan emosi seperti takut, cemas, dan senang terutama ditangani amigdala di sistem limbik otak. Otak kecil mengatur koordinasi gerak & keseimbangan, kelenjar pituitari mengatur sekresi hormon, hipokampus membentuk memori, dan hipotalamus mengatur homeostasis tubuh (suhu, nafsu makan) — masing-masing berfungsi berbeda dari amigdala.',
    example_jp: '恐怖を感じたとき、扁桃体が活発に働く。',
    example_id: 'Saat merasa takut, amigdala bekerja aktif.',
    exam_point_jp: '脳の部位と機能の組み合わせ問題が頻出。扁桃体＝情動、海馬＝記憶、小脳＝運動協調、視床下部＝恒常性維持、と整理する。',
    exam_point_id: 'Soal pasangan bagian otak-fungsi sering keluar. Hafalkan: amigdala=emosi, hipokampus=memori, otak kecil=koordinasi gerak, hipotalamus=homeostasis.',
    furigana_map: fm([
      ['恐怖', 'きょうふ'], ['不安', 'ふあん'], ['喜', 'よろこ'], ['情動', 'じょうどう'], ['大脳辺縁系', 'だいのうへんえんけい'],
      ['扁桃体', 'へんとうたい'], ['小脳', 'しょうのう'], ['運動', 'うんどう'], ['協調', 'きょうちょう'], ['下垂体', 'かすいたい'],
      ['海馬', 'かいば'], ['記憶', 'きおく'], ['視床下部', 'ししょうかぶ'], ['恒常性', 'こうじょうせい'],
    ]),
    linkMatch: '恐怖や不安、喜びなどの情動に関わる脳の機能局在',
  },
  {
    kamoku_id: 7,
    order_index: 2,
    title_jp: '脳神経のはたらき',
    content_jp:
      '顔面の感覚（触覚・痛覚など）を司るのは三叉神経です。嗅神経は嗅覚、顔面神経は主に表情筋の運動と舌前方の味覚、迷走神経は内臓機能の調節、舌下神経は舌の運動を担っており、それぞれ役割が異なります。',
    content_id:
      'Sensasi wajah (sentuhan, nyeri) diatur oleh saraf trigeminal. Saraf olfaktori mengatur penciuman, saraf fasialis terutama mengatur otot ekspresi wajah & rasa di lidah depan, saraf vagus mengatur fungsi organ dalam, dan saraf hipoglosus mengatur gerakan lidah — masing-masing punya peran berbeda.',
    example_jp: '洗顔時に感じる水の冷たさは、三叉神経によって伝わる。',
    example_id: 'Sensasi dingin air saat cuci muka dihantarkan lewat saraf trigeminal.',
    exam_point_jp: '脳神経の名称と担当機能の組み合わせを整理して覚える。三叉神経＝顔面感覚、顔面神経＝表情筋運動、と混同しないこと。',
    exam_point_id: 'Hafalkan pasangan nama saraf kranial dan fungsinya. Jangan tertukar: trigeminal=sensasi wajah, fasialis=gerak otot ekspresi.',
    furigana_map: fm([
      ['顔面', 'がんめん'], ['感覚', 'かんかく'], ['触覚', 'しょっかく'], ['痛覚', 'つうかく'], ['三叉神経', 'さんさしんけい'],
      ['嗅神経', 'きゅうしんけい'], ['嗅覚', 'きゅうかく'], ['顔面神経', 'がんめんしんけい'], ['表情筋', 'ひょうじょうきん'],
      ['味覚', 'みかく'], ['迷走神経', 'めいそうしんけい'], ['内臓機能', 'ないぞうきのう'], ['舌下神経', 'ぜっかしんけい'],
      ['舌', 'した'],
    ]),
    linkMatch: '顔の感覚に関与する脳神経として',
  },
  {
    kamoku_id: 7,
    order_index: 3,
    title_jp: '鼻腔の構造と機能',
    content_jp:
      '鼻腔は上鼻道・中鼻道・下鼻道に分かれ、奥は咽頭につながっています。鼻毛は吸い込んだ空気中の塵や埃を除去するフィルターの役割を果たします。鼻腔の粘膜には毛細血管が豊富にあり、これが鼻出血しやすい理由の一つです。嗅細胞は鼻腔上部の嗅上皮にあります。',
    content_id:
      'Rongga hidung terbagi menjadi saluran hidung atas, tengah, dan bawah, dengan bagian dalam terhubung ke faring. Bulu hidung berfungsi sebagai filter menyaring debu dari udara yang dihirup. Selaput lendir rongga hidung kaya pembuluh darah kapiler — salah satu sebab mudah mimisan. Sel penciuman berada di epitel olfaktori bagian atas rongga hidung.',
    example_jp: '鼻毛が塵や埃を捕らえ、気道への侵入を防ぐ。',
    example_id: 'Bulu hidung menangkap debu dan mencegahnya masuk ke saluran napas.',
    exam_point_jp: '鼻腔の分岐（上・中・下鼻道）、奥は咽頭につながる（喉頭ではない）、嗅細胞の位置（嗅上皮）が頻出ポイント。',
    exam_point_id: 'Poin yang sering keluar: pembagian rongga hidung (atas-tengah-bawah), bagian dalam terhubung ke faring (bukan laring), lokasi sel penciuman (epitel olfaktori).',
    furigana_map: fm([
      ['鼻腔', 'びくう'], ['上鼻道', 'じょうびどう'], ['中鼻道', 'ちゅうびどう'], ['下鼻道', 'かびどう'], ['咽頭', 'いんとう'],
      ['鼻毛', 'はなげ'], ['塵', 'ちり'], ['埃', 'ほこり'], ['除去', 'じょきょ'], ['粘膜', 'ねんまく'],
      ['毛細血管', 'もうさいけっかん'], ['豊富', 'ほうふ'], ['鼻出血', 'びしゅっけつ'], ['嗅細胞', 'きゅうさいぼう'],
      ['嗅上皮', 'きゅうじょうひ'],
    ]),
    linkMatch: '鼻の構造と機能として',
  },
  {
    kamoku_id: 7,
    order_index: 4,
    title_jp: '歯周病と口腔機能の加齢変化',
    content_jp:
      '歯周病は、歯と歯茎の間の溝が深くなる「歯周ポケット」の形成が特徴的な症状です。一方、歯のくぼみ・硬組織の軟化・エナメル質の侵食・歯髄の炎症疼痛は、う蝕（むし歯）の進行に伴う症状です。加齢により唾液分泌が低下すると、口腔内が乾燥し口臭が生じやすくなるほか、水分がないと飲み込みにくくなることがあります。',
    content_id:
      'Penyakit gusi ditandai terbentuknya "kantong periodontal" — celah antara gigi dan gusi yang makin dalam. Sementara itu, lubang gigi, pelunakan jaringan keras gigi, erosi enamel, dan nyeri pulpa adalah gejala perkembangan gigi berlubang (karies). Seiring usia, penurunan sekresi air liur membuat mulut kering (memicu bau mulut) dan sulit menelan tanpa cairan.',
    example_jp: '唾液分泌が減少した高齢者は、水分と一緒でないと食べ物を飲み込みにくくなる。',
    example_id: 'Lansia dengan sekresi air liur menurun jadi sulit menelan makanan tanpa cairan.',
    exam_point_jp: '歯周病＝歯周ポケット形成、う蝕＝くぼみ・軟化・エナメル質侵食・歯髄炎、と症状を区別する。唾液分泌低下と口臭・嚥下しにくさの関係も頻出。',
    exam_point_id: 'Bedakan gejala: penyakit gusi = kantong periodontal, karies = lubang/pelunakan/erosi enamel/radang pulpa. Hubungan penurunan air liur dengan bau mulut & kesulitan menelan juga sering keluar.',
    furigana_map: fm([
      ['歯周病', 'ししゅうびょう'], ['歯茎', 'はぐき'], ['溝', 'みぞ'], ['歯周ポケット', 'ししゅうぽけっと'], ['形成', 'けいせい'],
      ['特徴的', 'とくちょうてき'], ['症状', 'しょうじょう'], ['くぼみ', 'くぼみ'], ['硬組織', 'こうそしき'], ['軟化', 'なんか'],
      ['エナメル質', 'えなめるしつ'], ['侵食', 'しんしょく'], ['歯髄', 'しずい'], ['炎症', 'えんしょう'], ['疼痛', 'とうつう'],
      ['う蝕', 'うしょく'], ['加齢', 'かれい'], ['唾液分泌', 'だえきぶんぴつ'], ['低下', 'ていか'], ['口腔内', 'こうくうない'],
      ['乾燥', 'かんそう'], ['口臭', 'こうしゅう'], ['水分', 'すいぶん'], ['飲', 'の'], ['込', 'こ'],
    ]),
    linkMatch: '歯周病（periodontal disease）の症状',
  },
  {
    kamoku_id: 7,
    order_index: 5,
    title_jp: '皮膚の構造',
    content_jp:
      '皮膚は外側から表皮・真皮・皮下組織の順に構成されます。外界と直接接する組織は表皮で、その厚さは平均0.2mm程度です。表皮の最表面は角質層、最深部は基底層です。皮脂腺は真皮にあります。',
    content_id:
      'Kulit tersusun dari luar ke dalam: epidermis, dermis, jaringan subkutan. Jaringan yang bersentuhan langsung dengan lingkungan luar adalah epidermis, dengan ketebalan rata-rata sekitar 0,2 mm. Lapisan terluar epidermis adalah lapisan tanduk, lapisan terdalamnya adalah lapisan basal. Kelenjar sebasea berada di dermis.',
    example_jp: '表皮は薄いながらも、外界からの刺激や病原体の侵入を防ぐバリアの役割を果たす。',
    example_id: 'Meski tipis, epidermis berfungsi sebagai penghalang terhadap rangsangan luar dan masuknya patogen.',
    exam_point_jp: '表皮の厚さ（約0.2mm、2.0mmではない）、角質層と基底層の位置（表面と最深部が逆にならないよう注意）が頻出。',
    exam_point_id: 'Yang sering keluar: ketebalan epidermis (sekitar 0,2 mm, bukan 2,0 mm), posisi lapisan tanduk vs lapisan basal (jangan terbalik).',
    furigana_map: fm([
      ['皮膚', 'ひふ'], ['外側', 'そとがわ'], ['表皮', 'ひょうひ'], ['真皮', 'しんぴ'], ['皮下組織', 'ひかそしき'],
      ['構成', 'こうせい'], ['外界', 'がいかい'], ['厚', 'あつ'], ['平均', 'へいきん'], ['最表面', 'さいひょうめん'],
      ['角質層', 'かくしつそう'], ['最深部', 'さいしんぶ'], ['基底層', 'きていそう'], ['皮脂腺', 'ひしせん'],
    ]),
    linkMatch: '皮膚の構造に関する次の記述',
  },
  {
    kamoku_id: 7,
    order_index: 6,
    title_jp: '高齢者の入浴と生理反応',
    content_jp:
      '高温浴（熱めのお湯）は交感神経を刺激し、血圧・心拍数を上昇させ、腸の蠕動運動はむしろ抑制される傾向があります。一方、微温浴（ぬるめのお湯）は副交感神経を優位にし、リラックス効果があります。高齢者は嗜好や温度覚の低下から熱いお湯を好むことがありますが、血圧上昇による心臓への負担を説明する必要があります。',
    content_id:
      'Mandi air panas merangsang saraf simpatis, menaikkan tekanan darah & detak jantung, sementara gerak usus justru cenderung tertekan. Sebaliknya, mandi air hangat-suam mengaktifkan saraf parasimpatis dan memberi efek relaksasi. Lansia kadang menyukai air panas karena penurunan indera perasa/suhu, tapi perlu dijelaskan risiko beban jantung akibat kenaikan tekanan darah.',
    example_jp: '高齢者には、血圧上昇のリスクが少ない微温浴を勧めることが多い。',
    example_id: 'Lansia sering disarankan mandi air hangat-suam karena risiko kenaikan tekanan darah lebih kecil.',
    exam_point_jp: '高温浴＝交感神経優位（血圧上昇）、微温浴＝副交感神経優位（リラックス）、と正反対の効果を混同しないこと。',
    exam_point_id: 'Jangan tertukar efek berlawanan: mandi panas = saraf simpatis aktif (tekanan darah naik), mandi hangat-suam = saraf parasimpatis aktif (relaksasi).',
    furigana_map: fm([
      ['嗜好', 'しこう'], ['温度覚', 'おんどかく'], ['低下', 'ていか'], ['高温浴', 'こうおんよく'], ['交感神経', 'こうかんしんけい'],
      ['刺激', 'しげき'], ['血圧', 'けつあつ'], ['心拍数', 'しんぱくすう'], ['上昇', 'じょうしょう'], ['腸', 'ちょう'],
      ['蠕動運動', 'ぜんどううんどう'], ['抑制', 'よくせい'], ['微温浴', 'びおんよく'], ['副交感神経', 'ふくこうかんしんけい'],
      ['優位', 'ゆうい'], ['負担', 'ふたん'],
    ]),
    linkMatch: '高温浴を希望した場合に、説明すべき高温浴の特徴',
  },
  {
    kamoku_id: 7,
    order_index: 7,
    title_jp: '消化管のしくみ（吸収）',
    content_jp:
      '食物の栄養素の大部分は小腸で吸収されます。胃は主に消化を担い、栄養素の吸収は限定的です。横行結腸・直腸・Ｓ状結腸は主に水分・電解質の吸収や便の一時的な貯留を担っており、栄養素吸収の中心ではありません。',
    content_id:
      'Sebagian besar zat gizi makanan diserap di usus halus. Lambung terutama mencerna makanan, penyerapan gizinya terbatas. Kolon transversal, rektum, dan kolon sigmoid terutama menyerap air/elektrolit atau menampung tinja sementara, bukan pusat penyerapan gizi.',
    example_jp: '摂取したたんぱく質やビタミンの多くは、小腸の絨毛から吸収される。',
    example_id: 'Sebagian besar protein dan vitamin yang dikonsumsi diserap lewat vili usus halus.',
    exam_point_jp: '栄養素吸収の中心＝小腸。胃・大腸各部位の役割（消化・水分吸収・貯留）と混同しないこと。',
    exam_point_id: 'Pusat penyerapan gizi = usus halus. Jangan tertukar dengan peran lambung/usus besar (pencernaan, penyerapan air, penyimpanan).',
    furigana_map: fm([
      ['食物', 'しょくもつ'], ['栄養素', 'えいようそ'], ['大部分', 'だいぶぶん'], ['小腸', 'しょうちょう'], ['吸収', 'きゅうしゅう'],
      ['胃', 'い'], ['消化', 'しょうか'], ['限定的', 'げんていてき'], ['横行結腸', 'おうこうけっちょう'], ['直腸', 'ちょくちょう'],
      ['Ｓ状結腸', 'えすじょうけっちょう'], ['水分', 'すいぶん'], ['電解質', 'でんかいしつ'], ['貯留', 'ちょりゅう'],
    ]),
    linkMatch: '食物の栄養素の大部分を吸収する部位',
  },
  {
    kamoku_id: 7,
    order_index: 8,
    title_jp: '睡眠のしくみと睡眠障害',
    content_jp:
      'レム睡眠は脳が活発に働く睡眠で、記憶の整理・定着に関わるとされます（脳を休息させるのはノンレム睡眠）。レム睡眠は入眠初期ではなく、しばらくしてから出現します。成長ホルモンの分泌は深いノンレム睡眠（徐波睡眠）で盛んになります。\n睡眠中に本人が気づかないまま下肢が周期的に動く場合は周期性四肢運動障害が疑われます。本人が脚のむずむず感などの異常を自覚するレストレスレッグス症候群とは、この「自覚の有無」で区別されます。レム睡眠行動障害は、夢の内容に応じた大声や激しい動きが特徴で、周期的な動きとは異なります。',
    content_id:
      'Tidur REM adalah fase tidur dengan otak aktif, berperan mengorganisasi & memperkuat memori (mengistirahatkan otak adalah ciri tidur non-REM). Tidur REM muncul bukan di awal tidur, tapi beberapa saat setelahnya. Sekresi hormon pertumbuhan meningkat saat tidur non-REM yang dalam.\nJika kaki bergerak berirama saat tidur tanpa disadari penderita, dicurigai gangguan gerak anggota tubuh periodik. Bedanya dengan sindrom kaki gelisah (penderita sadar akan sensasi tak nyaman) terletak pada "ada-tidaknya kesadaran" itu. Gangguan perilaku tidur REM ditandai teriakan/gerakan kasar sesuai isi mimpi, berbeda dari gerakan berirama.',
    example_jp: '本人は自覚していないが、家族が「寝ている間に脚がぴくぴく動く」と気づくことがある。',
    example_id: 'Penderita sendiri tak sadar, tapi keluarga kadang menyadari "kaki bergerak-gerak saat tidur".',
    exam_point_jp: 'レム睡眠＝脳が活発・記憶整理、ノンレム睡眠＝脳の休息・成長ホルモン分泌。周期性四肢運動障害とレストレスレッグス症候群は「自覚症状の有無」で見分ける。',
    exam_point_id: 'Tidur REM = otak aktif & organisasi memori; tidur non-REM = istirahat otak & sekresi hormon pertumbuhan. Bedakan gangguan gerak periodik vs sindrom kaki gelisah lewat "ada-tidaknya kesadaran gejala".',
    furigana_map: fm([
      ['記憶', 'きおく'], ['整理', 'せいり'], ['定着', 'ていちゃく'], ['休息', 'きゅうそく'], ['入眠初期', 'にゅうみんしょき'],
      ['出現', 'しゅつげん'], ['成長ホルモン', 'せいちょうほるもん'], ['分泌', 'ぶんぴつ'], ['徐波睡眠', 'じょはすいみん'],
      ['下肢', 'かし'], ['周期的', 'しゅうきてき'], ['周期性四肢運動障害', 'しゅうきせいししうんどうしょうがい'],
      ['自覚', 'じかく'], ['異常', 'いじょう'], ['レストレスレッグス症候群', 'れすとれすれっぐすしょうこうぐん'], ['区別', 'くべつ'],
    ]),
    linkMatch: 'レム睡眠に関するものとして',
  },
  {
    kamoku_id: 7,
    order_index: 9,
    title_jp: '生命維持中枢と脳死の徴候',
    content_jp:
      '呼吸中枢は延髄にあり、呼吸のリズムを調節しています（大脳・中脳・小脳・脊髄には呼吸中枢はありません）。脳の機能停止（脳死）を示す重要な神経学的徴候の一つが、瞳孔散大・対光反射の消失です。心停止は心臓死の徴候であり、脳死とは別の概念です。',
    content_id:
      'Pusat pernapasan berada di medula oblongata, mengatur ritme napas (bukan di otak besar, otak tengah, otak kecil, atau sumsum tulang belakang). Salah satu tanda neurologis penting kematian otak (fungsi otak berhenti) adalah pupil melebar dan hilangnya refleks cahaya. Henti jantung adalah tanda kematian jantung, konsep berbeda dari kematian otak.',
    example_jp: '脳死判定では、瞳孔の状態と対光反射の有無が重要な確認項目となる。',
    example_id: 'Dalam penetapan kematian otak, kondisi pupil dan ada-tidaknya refleks cahaya menjadi poin pemeriksaan penting.',
    exam_point_jp: '呼吸中枢の位置＝延髄。脳死の徴候＝瞳孔散大・対光反射消失。心停止（心臓死）と脳死は別概念である点に注意。',
    exam_point_id: 'Lokasi pusat pernapasan = medula oblongata. Tanda kematian otak = pupil melebar & hilang refleks cahaya. Ingat, henti jantung (kematian jantung) adalah konsep berbeda dari kematian otak.',
    furigana_map: fm([
      ['呼吸中枢', 'こきゅうちゅうすう'], ['延髄', 'えんずい'], ['調節', 'ちょうせつ'], ['大脳', 'だいのう'], ['中脳', 'ちゅうのう'],
      ['小脳', 'しょうのう'], ['脊髄', 'せきずい'], ['脳', 'のう'], ['機能停止', 'きのうていし'], ['脳死', 'のうし'],
      ['徴候', 'ちょうこう'], ['瞳孔散大', 'どうこうさんだい'], ['対光反射', 'たいこうはんしゃ'], ['消失', 'しょうしつ'],
      ['心停止', 'しんていし'], ['心臓死', 'しんぞうし'], ['概念', 'がいねん'],
    ]),
    linkMatch: '脳の機能停止を示す徴候に該当するもの',
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
