// 第37回（令和6年度）午後 問題106-113（介護過程, kamoku 12）
export const SOURCE = '過去問_第37回_2024（想定解答）'

const fm = (pairs) => pairs.map(([kanji, reading]) => ({ kanji, reading }))

export const questions = [
  {
    kamoku_id: 12, correct_answer: 2, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: '次の記述のうち、介護過程を展開する目的として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['介護過程', 'かいごかてい'], ['展開', 'てんかい'], ['目的', 'もくてき']]),
    options: [
      { n: 1, text: '家族が抱える生活課題の解決', exp_jp: '介護過程は、家族ではなく利用者本人の生活課題解決を目指すものです。', exp_id: 'Proses perawatan menargetkan penyelesaian masalah hidup pengguna layanan itu sendiri, bukan keluarganya.' },
      { n: 2, text: '個別ケアに基づく利用者の自立支援', exp_jp: '介護過程を展開する目的は、利用者一人ひとりの状態に応じた個別ケアを通じて自立を支援することです。', exp_id: 'Tujuan menjalankan proses perawatan adalah mendukung kemandirian lewat perawatan individual sesuai kondisi tiap pengguna layanan.', correct: true },
      { n: 3, text: '介護福祉職の職業倫理の向上', exp_jp: '介護過程展開の副次的な効果ではあり得ますが、目的そのものではありません。', exp_id: 'Bisa jadi efek sampingan, tapi bukan tujuan utamanya.' },
      { n: 4, text: '利用者と家族の信頼関係の構築', exp_jp: '結果として生まれることはありますが、介護過程展開の目的そのものではありません。', exp_id: 'Bisa terjadi sebagai hasil, tapi bukan tujuan itu sendiri.' },
      { n: 5, text: '介護福祉職と他職種の連携の促進', exp_jp: '連携は介護過程を進める上での手段であり、目的そのものではありません。', exp_id: 'Kolaborasi adalah sarana dalam menjalankan proses perawatan, bukan tujuan itu sendiri.' },
    ],
  },
  {
    kamoku_id: 12, correct_answer: 2, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: '生活課題に関する記述として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['生活課題', 'せいかつかだい']]),
    options: [
      { n: 1, text: '家族の立場から検討する。', exp_jp: '生活課題は、家族ではなく利用者本人の立場から検討すべきです。', exp_id: 'Masalah hidup seharusnya dipertimbangkan dari sudut pandang pengguna layanan sendiri, bukan keluarga.' },
      { n: 2, text: '利用者のニーズを判断の基盤にする。', exp_jp: '生活課題は、利用者のニーズ（アセスメントで把握した情報）を基盤に特定されます。', exp_id: 'Masalah hidup ditentukan berdasarkan kebutuhan pengguna layanan (informasi dari asesmen).', correct: true },
      { n: 3, text: '利用者の要望を1つに集約する。', exp_jp: '生活課題は複数存在しうるもので、無理に1つにまとめる必要はありません。', exp_id: 'Masalah hidup bisa lebih dari satu, tidak perlu dipaksakan jadi satu.' },
      { n: 4, text: '介護福祉職の主観を尊重する。', exp_jp: '生活課題は主観的な意見ではなく、客観的な情報とアセスメントに基づいて特定します。', exp_id: 'Ditentukan berdasarkan informasi objektif & asesmen, bukan opini subjektif pekerja kaigo.' },
      { n: 5, text: '生命の危機よりも利用者の意向を優先する。', exp_jp: '生命に関わる危機がある場合は、それを最優先に対応すべきです。', exp_id: 'Jika ada bahaya yang mengancam nyawa, itu harus diprioritaskan lebih dulu.' },
    ],
  },
  {
    kamoku_id: 12, correct_answer: 3, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: '次の記述のうち、介護過程の展開における評価の説明として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['介護過程', 'かいごかてい'], ['展開', 'てんかい'], ['評価', 'ひょうか']]),
    options: [
      { n: 1, text: '他の利用者と比較して評価する。', exp_jp: '評価は、他の利用者との比較ではなく、その利用者個人の目標達成状況で行います。', exp_id: 'Evaluasi dilakukan berdasarkan capaian target pengguna itu sendiri, bukan dibandingkan pengguna lain.' },
      { n: 2, text: '短期目標の評価によって、介護過程の展開を終了する。', exp_jp: '短期目標を達成しても、長期目標に向けて介護過程は継続します。', exp_id: 'Meski target jangka pendek tercapai, proses perawatan berlanjut menuju target jangka panjang.' },
      { n: 3, text: '目標の達成状況を評価する。', exp_jp: '評価とは、設定した目標がどの程度達成されたかを確認することです。', exp_id: 'Evaluasi adalah memeriksa sejauh mana target yang ditetapkan tercapai.', correct: true },
      { n: 4, text: '介護計画の実施後に評価日を検討する。', exp_jp: '評価日は、計画作成時にあらかじめ設定しておくものです。', exp_id: 'Tanggal evaluasi ditentukan sejak awal saat menyusun rencana, bukan setelah pelaksanaan.' },
      { n: 5, text: '介護計画を修正した場合は、評価を省略する。', exp_jp: '計画を修正したときこそ、その後の評価が必要です。', exp_id: 'Justru saat rencana direvisi, evaluasi berikutnya tetap diperlukan.' },
    ],
  },
  {
    kamoku_id: 12, correct_answer: 5, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp: '次のうち、介護保険制度のサービス担当者会議におけるサービス提供責任者の役割として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['介護保険制度', 'かいごほけんせいど'], ['サービス担当者会議', 'さーびすたんとうしゃかいぎ'], ['サービス提供責任者', 'さーびすていきょうせきにんしゃ'], ['役割', 'やくわり']]),
    options: [
      { n: 1, text: '会議の主催', exp_jp: 'サービス担当者会議の主催は、介護支援専門員（ケアマネジャー）の役割です。', exp_id: 'Penyelenggara rapat ini adalah care manager, bukan penanggung jawab layanan.' },
      { n: 2, text: '居宅サービス計画の原案の説明', exp_jp: '居宅サービス計画（ケアプラン）の原案説明は、ケアマネジャーの役割です。', exp_id: 'Penjelasan draf rencana layanan rumah adalah tugas care manager.' },
      { n: 3, text: '他職種が実施したサービス内容の評価', exp_jp: '他職種のサービス内容の評価は、それぞれの専門職やケアマネジャーが行います。', exp_id: 'Evaluasi layanan profesi lain dilakukan masing-masing profesi/care manager.' },
      { n: 4, text: '訪問介護計画の作成に要した時間の報告', exp_jp: 'サービス担当者会議の目的とは関係のない内容です。', exp_id: 'Tidak berkaitan dengan tujuan rapat ini.' },
      { n: 5, text: '訪問介護計画の作成に必要な情報の確認', exp_jp: 'サービス提供責任者は、訪問介護計画を作成するために必要な情報を会議で確認する役割を担います。', exp_id: 'Penanggung jawab layanan berperan mengonfirmasi informasi yang diperlukan untuk menyusun rencana kunjungan perawatan dalam rapat ini.', correct: true },
    ],
  },
  {
    kamoku_id: 12, correct_answer: 5, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp:
      '次の事例を読んで、問題110、問題111について答えなさい。\n〔事例〕\nＡさん（78歳、男性、要介護1）は、一人暮らしで、脳梗塞（cerebral infarction）を発症し入院した。その後、リハビリテーションを経て、自宅に戻った。利き手の右手に麻痺｛まひ｝が残ったため、左手を使った調理の自立を目的に、訪問介護（ホームヘルプサービス）を利用することになった。サービス利用時は、訪問介護員（ホームヘルパー）の協力を得ながら、孫からプレゼントされた包丁を使って、調理に取り組んでいた。\nある日、好物の牛肉をうまく押さえることができず、切ることができなかった。すると、Ａさんは包丁を置き、部屋で横になってしまった。心配した訪問介護員（ホームヘルパー）が声をかけ、バイタルサインを確認したところ変化はなかった。Ａさんは、「右手が思うように動いてくれない。悔しい。でも、もう一度ひとりで作れるようになりたい」と話した。\n次の日、Ａさんは、「今日も手伝って」と訪問介護員（ホームヘルパー）に話した。\n\n問題110　調理中にＡさんが包丁を置き、部屋で横になってしまった行動に対する解釈として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([
      ['要介護', 'ようかいご'], ['一人暮らし', 'ひとりぐらし'], ['脳梗塞', 'のうこうそく'], ['発症', 'はっしょう'], ['入院', 'にゅういん'],
      ['利', 'き'], ['手', 'て'], ['麻痺', 'まひ'], ['調理', 'ちょうり'], ['自立', 'じりつ'], ['訪問介護', 'ほうもんかいご'],
      ['孫', 'まご'], ['包丁', 'ほうちょう'], ['好物', 'こうぶつ'], ['牛肉', 'ぎゅうにく'], ['押', 'お'], ['悔', 'くや'],
      ['解釈', 'かいしゃく'],
    ]),
    options: [
      { n: 1, text: '体調不良による休憩', exp_jp: 'バイタルサインに変化はなく、体調不良を示す情報はありません。', exp_id: 'Tanda vitalnya tidak berubah, tidak ada indikasi kondisi fisik memburuk.' },
      { n: 2, text: '食材に対する不満', exp_jp: 'Ａさんの発言は食材そのものへの不満を示していません。', exp_id: 'Ucapan Aさん tidak menunjukkan keluhan terhadap bahan makanannya.' },
      { n: 3, text: '調理に対する興味の喪失', exp_jp: '翌日「今日も手伝って」と話しており、調理への意欲は失われていません。', exp_id: 'Keesokan harinya ia berkata "bantu lagi hari ini", menunjukkan minat memasak belum hilang.' },
      { n: 4, text: '包丁に対する不満', exp_jp: 'Ａさんの発言は包丁そのものへの不満を示していません。', exp_id: 'Ucapan Aさん tidak menunjukkan keluhan terhadap pisaunya sendiri.' },
      { n: 5, text: '調理がうまくできないことに対する苛立｛いらだ｝ち', exp_jp: '「右手が思うように動いてくれない。悔しい」という発言から、うまく切れないことへの苛立ちが読み取れます。', exp_id: 'Ucapan "tangan kanan tak bisa bergerak sesuai keinginan, kesal" menunjukkan rasa frustrasi karena tak bisa memotong dengan baik.', correct: true },
    ],
  },
  {
    kamoku_id: 12, correct_answer: 4, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp: '訪問介護計画の修正を目的としたカンファレンスで、訪問介護員（ホームヘルパー）が提案する内容として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['訪問介護計画', 'ほうもんかいごけいかく'], ['修正', 'しゅうせい'], ['カンファレンス', 'かんふぁれんす'], ['提案', 'ていあん']]),
    options: [
      { n: 1, text: '訪問介護員（ホームヘルパー）による調理の代行', exp_jp: 'Ａさんの「もう一度ひとりで作れるようになりたい」という意欲に反する提案です。', exp_id: 'Bertentangan dengan keinginan Aさん untuk "bisa memasak sendiri lagi".' },
      { n: 2, text: '担当する訪問介護員（ホームヘルパー）の交代', exp_jp: '問題の本質（右手の動かしにくさへの対応）とは関係ありません。', exp_id: 'Tidak berkaitan dengan inti masalah (kesulitan menggerakkan tangan kanan).' },
      { n: 3, text: '配食サービスの利用', exp_jp: 'Ａさんの自立への意欲に反する提案です。', exp_id: 'Bertentangan dengan keinginan Aさん untuk mandiri.' },
      { n: 4, text: '調理に関する福祉用具の活用', exp_jp: '片手でも食材を押さえやすい調理用自助具などを活用することで、Ａさんの「自分で作りたい」という意欲を支えながら課題を解決できます。', exp_id: 'Memakai alat bantu memasak (misal penahan bahan dengan satu tangan) mendukung keinginan Aさん untuk memasak sendiri sambil menyelesaikan masalahnya.', correct: true },
      { n: 5, text: '訪問回数の削減', exp_jp: '今回の課題（うまく切れないこと）への対応にはならず、むしろ逆行する可能性があります。', exp_id: 'Tidak menjawab masalah (kesulitan memotong), bahkan berisiko kontraproduktif.' },
    ],
  },
  {
    kamoku_id: 12, correct_answer: 4, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp:
      '次の事例を読んで、問題112、問題113について答えなさい。\n〔事例〕\nＢさん（42歳、女性、障害支援区分3）は、知的障害があり、母親と二人暮らしである。日中は生活介護事業所に通っている。日常生活動作の一部に見守りが必要である。個別支援計画の短期目標を、「見守りのもと、トイレで排泄｛はいせつ｝ができる」としている。\nしかし、最近、排泄｛はいせつ｝のときに下着やズボンを汚してしまい、それをほかの利用者にからかわれ、しばらく一人でいる様子があったと生活支援員から申し送りがあった。\nある日、事業所長が話しかけると、Ｂさんは、「トイレで失敗したら恥ずかしい」と元気なく話した。母親からも電話で、「これからは紙おむつを使うように勧めているのだけど、使いたくないとＢは話している」とサービス管理責任者に連絡があった。\n\n問題112　次のうち、Ｂさんがしばらく一人でいた様子を理解するために必要な情報として、最も優先すべきものを1つ選びなさい。',
    furigana_map: fm([
      ['障害支援区分', 'しょうがいしえんくぶん'], ['知的障害', 'ちてきしょうがい'], ['母親', 'ははおや'], ['二人暮らし', 'ふたりぐらし'],
      ['生活介護事業所', 'せいかつかいごじぎょうしょ'], ['日常生活動作', 'にちじょうせいかつどうさ'], ['見守', 'みまも'],
      ['個別支援計画', 'こべつしえんけいかく'], ['短期目標', 'たんきもくひょう'], ['排泄', 'はいせつ'], ['下着', 'したぎ'],
      ['汚', 'よご'], ['申', 'もう'], ['送', 'おく'], ['事業所長', 'じぎょうしょちょう'], ['恥', 'は'], ['紙おむつ', 'かみおむつ'],
      ['サービス管理責任者', 'さーびすかんりせきにんしゃ'],
    ]),
    options: [
      { n: 1, text: 'サービス管理責任者との関係', exp_jp: 'Ｂさんが一人でいた直接の背景（からかわれた出来事）とは関係が薄い情報です。', exp_id: 'Kurang berkaitan langsung dengan latar belakang (diejek) yang membuat Bさん menyendiri.' },
      { n: 2, text: '生活支援員との関係', exp_jp: '直接の背景とは関係が薄い情報です。', exp_id: 'Kurang berkaitan langsung dengan latar belakangnya.' },
      { n: 3, text: '事業所長との関係', exp_jp: '直接の背景とは関係が薄い情報です。', exp_id: 'Kurang berkaitan langsung dengan latar belakangnya.' },
      { n: 4, text: 'ほかの利用者との関係', exp_jp: 'Ｂさんは排泄の失敗を「ほかの利用者にからかわれ」て一人でいたため、その相手であるほかの利用者との関係性の理解が最優先です。', exp_id: 'Bさん menyendiri setelah "diejek pengguna lain" atas kegagalan buang air, jadi memahami hubungan dengan pengguna lain itu paling prioritas.', correct: true },
      { n: 5, text: '母親との関係', exp_jp: 'おむつに関する話は別の場面での出来事で、一人でいた直接の原因ではありません。', exp_id: 'Soal popok adalah kejadian di momen lain, bukan penyebab langsung ia menyendiri.' },
    ],
  },
  {
    kamoku_id: 12, correct_answer: 1, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp:
      'Ｂさんについて、個別支援会議が開催され、短期目標を、「排泄｛はいせつ｝の自立（下着を汚さずに排泄｛はいせつ｝する）（3か月）」とした。次の記述のうち、Ｂさんの短期目標を実現するために生活支援員がとる対応として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([
      ['個別支援会議', 'こべつしえんかいぎ'], ['開催', 'かいさい'], ['短期目標', 'たんきもくひょう'], ['排泄', 'はいせつ'],
      ['自立', 'じりつ'], ['下着', 'したぎ'], ['汚', 'よご'], ['実現', 'じつげん'], ['生活支援員', 'せいかつしえんいん'],
    ]),
    options: [
      { n: 1, text: '定期的に、手順を理解できているか一緒に確認する。', exp_jp: '本人と一緒に手順を確認しながら進めることは、自立支援の観点から適切な対応です。', exp_id: 'Mengecek prosedur bersama secara berkala mendukung kemandirian Bさん — respons yang tepat.', correct: true },
      { n: 2, text: '自宅で排泄｛はいせつ｝を済ませ、事業所で排泄｛はいせつ｝しないように助言する。', exp_jp: '排泄を我慢させることは健康上のリスクがあり、不適切です。', exp_id: 'Menahan buang air berisiko bagi kesehatan, tidak tepat.' },
      { n: 3, text: '母親の要望であると伝え、紙おむつを使うように助言する。', exp_jp: 'Ｂさんは「使いたくない」と話しており、本人の意思に反する対応です。', exp_id: 'Bさん sendiri berkata "tidak mau memakainya" — bertentangan dengan keinginannya.' },
      { n: 4, text: 'ポータブルトイレを設置し、そこで排泄｛はいせつ｝をするように誘導する。', exp_jp: '目標は「トイレで排泄」であり、ポータブルトイレへの誘導は目標と異なります。', exp_id: 'Target adalah "buang air di toilet", mengarahkan ke toilet portabel berbeda dari target tersebut.' },
      { n: 5, text: '排泄｛はいせつ｝に関する行為を、全介助にする。', exp_jp: '全介助は自立支援という目標に反します。', exp_id: 'Bantuan penuh bertentangan dengan target dukungan kemandirian.' },
    ],
  },
]
