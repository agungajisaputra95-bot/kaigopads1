// 第37回（令和6年度）介護福祉士国家試験 午後 問題59-63（医療的ケア）
export const SOURCE = '過去問_第37回_2024（想定解答）'

const fm = (pairs) => pairs.map(([kanji, reading]) => ({ kanji, reading }))

export const questions = [
  {
    kamoku_id: 11,
    correct_answer: 1,
    difficulty: 'hard',
    exam_frequency: 'high',
    question_text_jp: '次の記述のうち、成人に対する救急蘇生法｛きゅうきゅうそせいほう｝での胸骨圧迫の方法として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['成人', 'せいじん'], ['救急蘇生法', 'きゅうきゅうそせいほう'], ['胸骨圧迫', 'きょうこつあっぱく']]),
    options: [
      { n: 1, text: '呼吸が確認できない場合は、すぐに圧迫を始める。', exp_jp: '反応がなく呼吸が確認できない（死戦期呼吸を含む）場合は、直ちに胸骨圧迫を開始します。', exp_id: 'Jika tidak ada respons dan napas tidak terkonfirmasi (termasuk napas agonal), kompresi dada harus segera dimulai.', correct: true },
      { n: 2, text: '圧迫する部位は、胸骨の左側である。', exp_jp: '圧迫部位は胸骨の下半分中央であり、左側ではありません。', exp_id: 'Titik kompresi ada di tengah bagian bawah tulang dada, bukan di sisi kiri.' },
      { n: 3, text: '実施者の両手を重ねて、指先で圧迫する。', exp_jp: '圧迫は指先ではなく、手のひらの付け根（手掌基部）で行います。', exp_id: 'Kompresi dilakukan dengan pangkal telapak tangan, bukan ujung jari.' },
      { n: 4, text: '圧迫の深さは、胸が10cm沈むようにする。', exp_jp: '成人の胸骨圧迫の深さは約5cm（6cmを超えない）が目安です。', exp_id: 'Kedalaman kompresi dada dewasa sekitar 5 cm (tidak lebih dari 6 cm), bukan 10 cm.' },
      { n: 5, text: '1分間に60回を目安に圧迫する。', exp_jp: '推奨される圧迫のペースは1分間に100〜120回です。', exp_id: 'Kecepatan kompresi yang direkomendasikan adalah 100-120 kali per menit, bukan 60 kali.' },
    ],
  },
  {
    kamoku_id: 11,
    correct_answer: 4,
    difficulty: 'medium',
    exam_frequency: 'medium',
    question_text_jp: '次の記述のうち、痰｛たん｝を喀出｛かくしゅつ｝する仕組みに関するものとして、正しいものを1つ選びなさい。',
    furigana_map: fm([['痰', 'たん'], ['喀出', 'かくしゅつ'], ['仕組み', 'しくみ']]),
    options: [
      { n: 1, text: '呼吸器官の内部は乾燥した状態になっている。', exp_jp: '正常な気道粘膜は適度に加湿された状態にあり、乾燥した状態ではありません。', exp_id: 'Selaput lendir saluran napas normal justru cukup lembap, bukan kering.' },
      { n: 2, text: '気管の内部の表面には絨毛｛じゅうもう｝があり、分泌物の侵入を防いでいる。', exp_jp: '気管内部の表面にあるのは絨毛ではなく線毛（せんもう）で、線毛運動によって分泌物や異物を外へ運び出す働きをします（侵入を防ぐのではありません）。', exp_id: 'Permukaan dalam trakea memiliki silia (bukan vili), yang berfungsi mendorong lendir/benda asing keluar lewat gerakan silia — bukan mencegah masuknya.' },
      { n: 3, text: '分泌物は、咽頭で吸収される。', exp_jp: '分泌物は吸収されるのではなく、線毛運動により上方へ運ばれ、咳等で喀出されます。', exp_id: 'Lendir tidak diserap, melainkan didorong ke atas oleh gerakan silia lalu dikeluarkan lewat batuk.' },
      { n: 4, text: '痰｛たん｝は、咳｛せき｝や咳払｛せきばら｝いによって排出される。', exp_jp: '線毛運動で運ばれた痰は、咳や咳払いという反射・随意運動によって体外に排出されます。', exp_id: 'Dahak yang didorong gerakan silia dikeluarkan dari tubuh lewat batuk atau berdeham.', correct: true },
      { n: 5, text: '咳｛せき｝は、下垂体にある咳中枢｛せきちゅうすう｝によっておこる反射運動である。', exp_jp: '咳中枢は下垂体ではなく延髄にあります。', exp_id: 'Pusat refleks batuk berada di medula oblongata, bukan kelenjar pituitari.' },
    ],
  },
  {
    kamoku_id: 11,
    correct_answer: 4,
    difficulty: 'hard',
    exam_frequency: 'high',
    question_text_jp: '次の記述のうち、介護福祉士が行う口腔内｛こうくうない｝の喀痰吸引｛かくたんきゅういん｝の方法として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['介護福祉士', 'かいごふくしし'], ['口腔内', 'こうくうない'], ['喀痰吸引', 'かくたんきゅういん']]),
    options: [
      { n: 1, text: '吸引圧は、利用者の体調によって介護福祉士が決める。', exp_jp: '吸引圧は医師の指示に基づいてあらかじめ決められた範囲内で行うもので、介護福祉士がその場の判断で独自に決めるものではありません。', exp_id: 'Tekanan suction ditentukan berdasarkan instruksi dokter dalam rentang yang sudah ditetapkan, bukan diputuskan sendiri oleh pekerja kaigo di tempat.' },
      { n: 2, text: '吸引圧をかけた状態で、吸引チューブを挿入する。', exp_jp: '挿入時には吸引圧をかけず、所定の位置に達してから圧をかけて吸引します。', exp_id: 'Saat memasukkan selang, tekanan suction belum diaktifkan; tekanan baru diberikan setelah mencapai posisi yang ditentukan.' },
      { n: 3, text: '口蓋垂まで吸引チューブを挿入する。', exp_jp: '口腔内吸引では、咽頭反射などのリスクを避けるため、口蓋垂を超えない範囲の浅い位置までしか挿入しません。', exp_id: 'Suction mulut hanya memasukkan selang sedalam sebelum uvula, untuk menghindari risiko refleks tersedak.' },
      { n: 4, text: '吸引チューブを回転させながら痰｛たん｝を吸引する。', exp_jp: '一点に留めず、チューブを軽く回転させながら吸引することで、粘膜を傷つけにくく、効果的に痰を吸引できます。', exp_id: 'Memutar selang secara perlahan saat menyedot lendir mengurangi risiko melukai selaput lendir dan lebih efektif membersihkan dahak.', correct: true },
      { n: 5, text: '吸引後は洗浄水を吸引し、清浄綿でチューブを拭く。', exp_jp: 'チューブ外側の消毒には、清浄綿ではなくアルコール綿等の消毒用の綿を用いるのが適切です。', exp_id: 'Untuk mendisinfeksi bagian luar selang, seharusnya memakai kapas beralkohol (disinfektan), bukan kapas bersih biasa.' },
    ],
  },
  {
    kamoku_id: 11,
    correct_answer: 1,
    difficulty: 'medium',
    exam_frequency: 'medium',
    question_text_jp: '次の記述のうち、消化器症状の説明として、正しいものを1つ選びなさい。',
    furigana_map: fm([['消化器症状', 'しょうかきしょうじょう']]),
    options: [
      { n: 1, text: '腹部膨満感は、腹部が張る感覚のことである。', exp_jp: '腹部膨満感とは、文字どおりお腹が張っているように感じる感覚のことです。', exp_id: 'Rasa kembung perut adalah sensasi perut terasa penuh/mengembang, sesuai definisinya.', correct: true },
      { n: 2, text: 'しゃっくり（吃逆｛きつぎゃく｝）は、胸膜の刺激で起こる現象である。', exp_jp: 'しゃっくりは、横隔膜の不随意なけいれん性収縮によって起こります。', exp_id: 'Cegukan disebabkan kontraksi kejang tak sadar pada diafragma, bukan rangsangan pleura.' },
      { n: 3, text: '胸やけは、飲食物による食道の熱傷のことである。', exp_jp: '胸やけは、胃酸が食道に逆流することで生じる灼熱感で、熱傷ではありません。', exp_id: 'Nyeri ulu hati adalah sensasi terbakar akibat asam lambung naik ke kerongkongan, bukan luka bakar dari makanan/minuman.' },
      { n: 4, text: 'げっぷ（噯気）は、咽頭にたまった空気が排出されることである。', exp_jp: 'げっぷは、胃にたまった空気（飲食時に飲み込んだ空気など）が口から排出される現象です。', exp_id: 'Sendawa adalah keluarnya udara yang terkumpul di lambung (misal tertelan saat makan/minum) lewat mulut, bukan dari faring.' },
      { n: 5, text: '嘔気｛おうき｝は、胃や腸の内容物が、食道を逆流して口外に吐き出されることである。', exp_jp: 'これは「嘔吐」の説明です。嘔気とは、吐き気を感じる感覚そのものを指します。', exp_id: 'Ini penjelasan untuk "muntah". Mual (嘔気) adalah sensasi ingin muntah itu sendiri, bukan tindakan mengeluarkan isi lambung.' },
    ],
  },
  {
    kamoku_id: 11,
    correct_answer: 3,
    difficulty: 'hard',
    exam_frequency: 'high',
    question_text_jp:
      'Ａさん（80歳、女性）は、脳梗塞（cerebral infarction）の後遺症で左片麻痺｛ひだりかたまひ｝があり、介護老人保健施設に入所して在宅復帰に向けた訓練をしている。嚥下障害｛えんげしょうがい｝もあるため、経鼻経管栄養による栄養摂取をしているが、経口摂取できないことでイライラしてチューブを抜去したことがある。医師からは一時的な治療であると説明を受けて同意していた。\n経管栄養中に介護福祉士が訪室すると、チューブを触りながら、「自分の口から食べたいから、このチューブを抜いてほしい。見た目も良くない」と訴えがあった。看護師に連絡し、チューブが抜けていないことを確認してもらった。\nこのときのＡさんへの介護福祉士の対応として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([
      ['脳梗塞', 'のうこうそく'], ['後遺症', 'こういしょう'], ['左片麻痺', 'ひだりかたまひ'], ['介護老人保健施設', 'かいごろうじんほけんしせつ'],
      ['在宅復帰', 'ざいたくふっき'], ['訓練', 'くんれん'], ['嚥下障害', 'えんげしょうがい'], ['経鼻経管栄養', 'けいびけいかんえいよう'],
      ['栄養摂取', 'えいようせっしゅ'], ['経口摂取', 'けいこうせっしゅ'], ['抜去', 'ばっきょ'], ['一時的', 'いちじてき'],
      ['治療', 'ちりょう'], ['同意', 'どうい'], ['経管栄養中', 'けいかんえいようちゅう'], ['訪室', 'ほうしつ'], ['訴', 'うった'],
      ['看護師', 'かんごし'], ['連絡', 'れんらく'],
    ]),
    options: [
      { n: 1, text: 'チューブを抜かないようにＡさんの右手を固定する。', exp_jp: '身体拘束にあたり、Ａさんの尊厳や訴えを無視する不適切な対応です。', exp_id: 'Ini termasuk pembatasan fisik dan mengabaikan martabat serta keluhan Aさん — respons yang tidak tepat.' },
      { n: 2, text: '経管栄養が早く終わるように滴下速度を調節する。', exp_jp: '滴下速度の調整は医療的な判断が必要な行為で、介護福祉士が独自に行うことは業務範囲外です。', exp_id: 'Mengatur kecepatan tetesan memerlukan keputusan medis; di luar wewenang pekerja kaigo untuk memutuskan sendiri.' },
      { n: 3, text: '医師や看護師にＡさんの思いを伝える。', exp_jp: 'Ａさんの「自分の口から食べたい」という思いを多職種に伝え、今後の対応を医療職と共に検討してもらうことが、介護福祉士としての適切な役割です。', exp_id: 'Menyampaikan keinginan Aさん untuk makan lewat mulut sendiri kepada tenaga medis agar mereka mempertimbangkan langkah berikutnya adalah peran yang tepat bagi pekerja kaigo.', correct: true },
      { n: 4, text: 'Ａさんに胃ろうの造設を提案する。', exp_jp: '胃ろう造設のような医療的処置の提案は、介護福祉士の業務範囲外です。', exp_id: 'Mengusulkan tindakan medis seperti pemasangan gastrostomi berada di luar tugas pekerja kaigo.' },
      { n: 5, text: 'Ａさんに経口摂取を提案する。', exp_jp: '嚥下障害があるＡさんに医師の判断なく経口摂取を勧めることは、誤嚥のリスクがあり危険です。', exp_id: 'Menyarankan makan lewat mulut tanpa keputusan dokter berisiko bagi Aさん yang punya gangguan menelan, karena bahaya tersedak/aspirasi.' },
    ],
  },
]
