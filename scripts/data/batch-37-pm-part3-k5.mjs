// 第37回（令和6年度）午後 問題74-79（コミュニケーション技術, kamoku 5）
export const SOURCE = '過去問_第37回_2024（想定解答）'

const fm = (pairs) => pairs.map(([kanji, reading]) => ({ kanji, reading }))

export const questions = [
  {
    kamoku_id: 5,
    correct_answer: 4,
    difficulty: 'medium',
    exam_frequency: 'high',
    question_text_jp: '次の記述のうち、利用者とのコミュニケーションの場面で用いる要約の技法として、適切なものを1つ選びなさい。',
    furigana_map: fm([['利用者', 'りようしゃ'], ['要約', 'ようやく'], ['技法', 'ぎほう']]),
    options: [
      { n: 1, text: '開かれた質問をして、利用者の気持ちを明らかにした。', exp_jp: 'これは「開かれた質問（オープンクエスチョン）」の技法で、要約とは異なります。', exp_id: 'Ini teknik "pertanyaan terbuka" (open question), berbeda dari teknik meringkas.' },
      { n: 2, text: '共感しながら話を聞き、利用者の気持ちを受け止めた。', exp_jp: 'これは「共感」の技法で、要約とは異なります。', exp_id: 'Ini teknik "empati", berbeda dari teknik meringkas.' },
      { n: 3, text: '話の途中でうなずき、利用者の気持ちに同意した。', exp_jp: 'これはうなずき・相槌による受容の技法で、要約とは異なります。', exp_id: 'Ini teknik menerima lewat anggukan/respons singkat, berbeda dari teknik meringkas.' },
      { n: 4, text: '話の内容を総合的にまとめて返し、利用者の気持ちを整理した。', exp_jp: '話された内容を整理してまとめ、相手に返すことが要約の技法そのものです。', exp_id: 'Merangkum isi pembicaraan lalu mengembalikannya kepada lawan bicara adalah definisi teknik meringkas itu sendiri.', correct: true },
      { n: 5, text: '自己覚知を図り、利用者との人間関係の形成に努めた。', exp_jp: 'これは自己覚知（自分の感情・傾向を客観的に理解すること）の説明で、要約とは異なります。', exp_id: 'Ini penjelasan self-awareness (memahami emosi/kecenderungan diri secara objektif), berbeda dari teknik meringkas.' },
    ],
  },
  {
    kamoku_id: 5,
    correct_answer: 3,
    difficulty: 'medium',
    exam_frequency: 'medium',
    question_text_jp:
      '次の記述のうち、利用者と家族の意向が異なるとき、家族とのコミュニケーションにおいて介護福祉職が留意すべき点として、適切なものを1つ選びなさい。',
    furigana_map: fm([['利用者', 'りようしゃ'], ['家族', 'かぞく'], ['意向', 'いこう'], ['異', 'こと'], ['留意', 'りゅうい']]),
    options: [
      { n: 1, text: '家族に支援方針を決めてもらう。', exp_jp: '支援方針は、家族ではなく利用者本人の意思決定を基本に検討すべきです。', exp_id: 'Arah dukungan seharusnya dipertimbangkan berdasarkan keputusan pengguna layanan sendiri, bukan diserahkan ke keluarga.' },
      { n: 2, text: '家族を通して利用者の意向を聴き取る。', exp_jp: '利用者の意向は、家族を介さず本人から直接聴き取ることが基本です。', exp_id: 'Keinginan pengguna layanan sebaiknya didengar langsung darinya, bukan lewat perantara keluarga.' },
      { n: 3, text: '家族と話す機会を別に設ける。', exp_jp: '利用者本人の前で対立的な話をせず、家族の思いを丁寧に聴く時間を別に設けることが望ましい配慮です.', exp_id: 'Sebaiknya tidak berdebat di depan pengguna layanan; menyediakan waktu terpisah untuk mendengarkan keluarga secara saksama adalah sikap yang tepat.', correct: true },
      { n: 4, text: '家族にカウンセリングを行うことを意識する。', exp_jp: 'カウンセリングは専門的な心理的援助行為であり、介護福祉職の役割ではありません。', exp_id: 'Konseling adalah tindakan bantuan psikologis profesional, bukan peran pekerja kaigo.' },
      { n: 5, text: '家族を説得する。', exp_jp: '一方的に家族を説得しようとする対応は、家族の思いを軽視するもので不適切です。', exp_id: 'Berusaha membujuk keluarga secara sepihak mengabaikan perasaan mereka, respons yang tidak tepat.' },
    ],
  },
  {
    kamoku_id: 5,
    correct_answer: 3,
    difficulty: 'hard',
    exam_frequency: 'medium',
    question_text_jp:
      'Ａさん（80歳、男性、要介護3）は、介護老人福祉施設に入所している。アルツハイマー型認知症（dementia of the Alzheimer’s type）が進行している。ある日の昼食時、介護福祉職がＡさんに配膳すると、「お金はこれしかありません。足りますか」と小さくたたまれたティッシュペーパーを渡してきた。\nこのときのＡさんに対する介護福祉職の対応として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([
      ['要介護', 'ようかいご'], ['介護老人福祉施設', 'かいごろうじんふくししせつ'], ['入所', 'にゅうしょ'], ['進行', 'しんこう'],
      ['昼食時', 'ちゅうしょくじ'], ['配膳', 'はいぜん'], ['小', 'ちい'], ['渡', 'わた'],
    ]),
    options: [
      { n: 1, text: 'ティッシュペーパーは、口の周りが汚れたら拭くものだと伝える。', exp_jp: '事実を一方的に訂正するもので、Ａさんの体験している世界を否定してしまいます。', exp_id: 'Ini mengoreksi fakta secara sepihak, menyangkal dunia yang sedang dialami Aさん.' },
      { n: 2, text: 'ティッシュペーパーが不足しているサインとして受け止める。', exp_jp: 'Ａさんの発言や場面の文脈と合わない解釈です。', exp_id: 'Interpretasi ini tidak sesuai dengan ucapan & konteks situasi Aさん.' },
      { n: 3, text: '飲食店での会計の場面であると認識して対応する。', exp_jp: 'Ａさんが今体験している現実（会計の場面）に合わせて対応することで、混乱や不安を強めずに関わることができます。', exp_id: 'Merespons sesuai realita yang sedang dialami Aさん (situasi pembayaran) membantu tidak memperparah kebingungan/kecemasannya.', correct: true },
      { n: 4, text: '食事に集中するように促す。', exp_jp: 'Ａさんの訴えを無視するもので、不安を強める可能性があります。', exp_id: 'Mengabaikan keluhan Aさん, berpotensi memperparah kecemasannya.' },
      { n: 5, text: '小遣いの増額を家族に相談する。', exp_jp: '場面の解釈を誤った、的外れな対応です。', exp_id: 'Interpretasi situasi yang keliru, respons yang tidak tepat sasaran.' },
    ],
  },
  {
    kamoku_id: 5,
    correct_answer: 2,
    difficulty: 'hard',
    exam_frequency: 'medium',
    question_text_jp:
      '構音障害のあるＢさんは、現在発語訓練を実施中である。ある日、介護福祉職に対して、「おあんで、あつがおごれた」と訴えた。介護福祉職は、Ｂさんの発語をうまく聞き取れず、「もう一度、言ってください」と伝えた。Ｂさんは、自身の発語で会話を続けようとしているが、介護福祉職には、その内容を十分に理解することができなかった。\nこのときの、Ｂさんに対する介護福祉職の判断として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([
      ['構音障害', 'こうおんしょうがい'], ['発語訓練', 'はつごくんれん'], ['実施中', 'じっしちゅう'], ['訴', 'うった'],
      ['発語', 'はつご'], ['聞', 'き'], ['取', 'と'], ['継続', 'けいぞく'], ['内容', 'ないよう'], ['理解', 'りかい'],
    ]),
    options: [
      { n: 1, text: 'Ｂさんは言葉の意味の理解に支障があるため、会話の継続は困難である。', exp_jp: '構音障害は発音の問題であり、言葉の意味を理解する力とは別です。理解に支障があるとは限りません。', exp_id: 'Gangguan artikulasi adalah masalah pengucapan, berbeda dari kemampuan memahami makna kata. Belum tentu ada gangguan pemahaman.' },
      { n: 2, text: '発音が苦手なため、短い言葉でゆっくり話してもらう必要がある。', exp_jp: '構音障害のある人には、短い言葉でゆっくり話してもらうことで聞き取りやすくなり、コミュニケーションが円滑になります。', exp_id: 'Bagi orang dengan gangguan artikulasi, meminta bicara dengan kata pendek & perlahan membuatnya lebih mudah dipahami, memperlancar komunikasi.', correct: true },
      { n: 3, text: '話す意欲があるため、開かれた質問が有効である。', exp_jp: '開かれた質問は自由で長い返答を促すため、聞き取りが難しい構音障害のある人にはかえって負担になります。', exp_id: 'Pertanyaan terbuka mendorong jawaban bebas & panjang, justru membebani orang dengan gangguan artikulasi yang sulit dipahami ucapannya.' },
      { n: 4, text: '発語訓練の効果がみられないため、訓練を中止する必要がある。', exp_jp: 'この一場面だけで訓練の効果を判断し中止するのは時期尚早です。', exp_id: 'Menilai & menghentikan pelatihan hanya dari satu momen ini terlalu terburu-buru.' },
      { n: 5, text: 'Ｂさんの言葉が聞き取れないため、会話を中断する必要がある。', exp_jp: '聞き取れないことを理由に会話をあきらめるべきではなく、工夫して継続することが望ましい対応です。', exp_id: 'Bukan berarti harus menyerah berkomunikasi karena sulit dipahami — sebaiknya tetap dilanjutkan dengan penyesuaian.' },
    ],
  },
  {
    kamoku_id: 5,
    correct_answer: 5,
    difficulty: 'hard',
    exam_frequency: 'high',
    question_text_jp:
      'Ｃさん（55歳、男性）は、知的障害がある。3か月前に、施設から居宅での一人暮らしに移行し、現在は、居宅介護（ホームヘルプサービス）を利用しながら生活している。ある日、Ｃさんが、「ゴミ、分けて捨てるの、難しいよ」と言うので、室内に分別収集の説明書を貼って、カレンダーに収集日を書くことにした。そして、介護福祉職は、「この説明書とカレンダーを見て、捨てるといいですよ」とＣさんに伝えた。その後、Ｃさんは努力していたが、分別できなかったゴミが少しずつ増えていった。\n次のうち、Ｃさんにかける介護福祉職の最初の言葉として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([
      ['知的障害', 'ちてきしょうがい'], ['施設', 'しせつ'], ['居宅', 'きょたく'], ['移行', 'いこう'], ['居宅介護', 'きょたくかいご'],
      ['分別収集', 'ぶんべつしゅうしゅう'], ['説明書', 'せつめいしょ'], ['収集日', 'しゅうしゅうび'], ['努力', 'どりょく'],
    ]),
    options: [
      { n: 1, text: '「ゴミでいっぱいになる前に、適切に捨てられるようになりましょう」', exp_jp: '抽象的な指示にとどまり、Ｃさんの努力や気持ちへの共感が示されていません。', exp_id: 'Hanya instruksi abstrak, tidak menunjukkan empati atas usaha & perasaan Cさん.' },
      { n: 2, text: '「説明書とカレンダーをよく見てください」', exp_jp: 'すでに試してうまくいかなかった方法を繰り返すだけで、状況の改善にはつながりません。', exp_id: 'Hanya mengulang cara yang sudah dicoba dan tidak berhasil, tidak membantu memperbaiki situasi.' },
      { n: 3, text: '「ゴミが増えてきて、気持ち悪いですね」', exp_jp: 'Ｃさんを責めるようなニュアンスを含み、不適切です。', exp_id: 'Mengandung nuansa menyalahkan Cさん, tidak tepat.' },
      { n: 4, text: '「がんばっていれば、上手にできるようになりますよ」', exp_jp: '根拠のない励ましにとどまり、具体的な支援にはなっていません。', exp_id: 'Hanya semangat tanpa dasar konkret, bukan dukungan nyata.' },
      { n: 5, text: '「ゴミ捨ては難しいですよね。できることをいっしょに考えましょう」', exp_jp: 'Ｃさんの努力と困難さにまず共感し、一緒に解決策を考える姿勢を示す、最初の言葉として適切な対応です。', exp_id: 'Berempati dulu pada usaha & kesulitan Cさん, lalu menunjukkan sikap mau memikirkan solusi bersama — respons awal yang tepat.', correct: true },
    ],
  },
  {
    kamoku_id: 5,
    correct_answer: 5,
    difficulty: 'medium',
    exam_frequency: 'high',
    question_text_jp: '介護保険サービスにおける記録に関する次の記述のうち、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['介護保険サービス', 'かいごほけんさーびす'], ['記録', 'きろく']]),
    options: [
      { n: 1, text: '記録に含まれないものとして食事チェック表がある。', exp_jp: '食事チェック表も、利用者の状態を示す記録の一つです。', exp_id: 'Tabel cek makan juga termasuk salah satu catatan yang menunjukkan kondisi pengguna layanan.' },
      { n: 2, text: '介護記録は介護福祉職の意見を中心に記録する。', exp_jp: '記録は主観的な意見ではなく、客観的な事実を中心に記載することが原則です。', exp_id: 'Catatan pada prinsipnya berisi fakta objektif, bukan berpusat pada opini subjektif pekerja kaigo.' },
      { n: 3, text: '調査・研究目的で記録を利用することは避ける。', exp_jp: '適切な個人情報保護の手続きを経れば、調査・研究目的での記録活用も行われます。', exp_id: 'Dengan prosedur perlindungan data pribadi yang tepat, catatan bisa dipakai untuk keperluan riset.' },
      { n: 4, text: '主観的情報と客観的事実は区別しないで記録する。', exp_jp: '主観的情報と客観的事実は区別して記録することが原則です。', exp_id: 'Prinsipnya, informasi subjektif dan fakta objektif dicatat secara terpisah.' },
      { n: 5, text: '利用者は記録の閲覧を請求することができる。', exp_jp: '個人情報保護の観点から、利用者本人には自身に関する記録の開示を請求する権利があります。', exp_id: 'Dari sudut pandang perlindungan data pribadi, pengguna layanan berhak meminta akses melihat catatan tentang dirinya.', correct: true },
    ],
  },
]
