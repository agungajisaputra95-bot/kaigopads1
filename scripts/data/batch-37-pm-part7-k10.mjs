// 第37回（令和6年度）午後 問題49-58（障害の理解, kamoku 10）
export const SOURCE = '過去問_第37回_2024（想定解答）'

const fm = (pairs) => pairs.map(([kanji, reading]) => ({ kanji, reading }))

export const questions = [
  {
    kamoku_id: 10, correct_answer: 3, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: '次のうち、ＩＣＦ（International Classification of Functioning, Disability and Health：国際生活機能分類）の社会（人生）レベルに該当するものとして、正しいものを1つ選びなさい。',
    furigana_map: fm([['国際生活機能分類', 'こくさいせいかつきのうぶんるい'], ['社会', 'しゃかい'], ['人生', 'じんせい'], ['該当', 'がいとう']]),
    options: [
      { n: 1, text: '心身機能・身体構造', exp_jp: 'これは生物レベル（身体そのもの）にあたります。', exp_id: 'Ini tingkat biologis (tubuh itu sendiri), bukan tingkat sosial.' },
      { n: 2, text: '活動', exp_jp: 'これは個人（生活）レベルにあたります。', exp_id: 'Ini tingkat individu (kehidupan sehari-hari), bukan tingkat sosial.' },
      { n: 3, text: '参加', exp_jp: '「参加」は社会活動への関わりを示す、社会（人生）レベルにあたります。', exp_id: '"Partisipasi" menunjukkan keterlibatan dalam kegiatan sosial — inilah tingkat sosial (kehidupan bermasyarakat).', correct: true },
      { n: 4, text: '機能障害', exp_jp: 'これは心身機能・身体構造のマイナス面（生物レベル）です。', exp_id: 'Ini sisi negatif dari fungsi tubuh/struktur tubuh (tingkat biologis).' },
      { n: 5, text: '活動制限', exp_jp: 'これは活動のマイナス面（個人レベル）です。', exp_id: 'Ini sisi negatif dari aktivitas (tingkat individu).' },
    ],
  },
  {
    kamoku_id: 10, correct_answer: 3, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: '次の記述のうち、障害者のエンパワメントに関するものとして、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['障害者', 'しょうがいしゃ'], ['エンパワメント', 'えんぱわめんと']]),
    options: [
      { n: 1, text: '障害のある人が障害のない人と同等に生活し、活動する社会を目指す。', exp_jp: 'これはノーマライゼーションの説明で、エンパワメントとは異なる概念です。', exp_id: 'Ini penjelasan normalisasi, konsep yang berbeda dari pemberdayaan (empowerment).' },
      { n: 2, text: '専門職が主導し、障害がある人は受動的に支援を受ける。', exp_jp: 'これはエンパワメントの逆で、専門職主導のパターナリズム的な関わり方です。', exp_id: 'Ini kebalikan dari empowerment — pendekatan paternalistik yang dipimpin profesional.' },
      { n: 3, text: '障害のある人が自らの能力や長所に気づき、課題に対応する。', exp_jp: '本人が自分の力に気づき、それを活かして課題に対応することがエンパワメントの核心です。', exp_id: 'Menyadari kekuatan diri sendiri lalu memakainya untuk mengatasi masalah adalah inti pemberdayaan.', correct: true },
      { n: 4, text: '障害のある人が、主体性や人権が守られないことに耐える。', exp_jp: '主体性や人権が守られないことに耐えるのは、エンパワメントに真っ向から反します。', exp_id: 'Bertahan dalam kondisi hak asasi/subjektivitas tidak terjaga justru bertentangan dengan pemberdayaan.' },
      { n: 5, text: '障害のある人が、医学的リハビリテーションを受ける。', exp_jp: 'これはリハビリテーションの説明であり、エンパワメントそのものではありません。', exp_id: 'Ini penjelasan rehabilitasi medis, bukan pemberdayaan itu sendiri.' },
    ],
  },
  {
    kamoku_id: 10, correct_answer: 2, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp: '次のうち、クローン病（Crohn disease）にみられる特徴的な症状として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['クローン病', 'くろーんびょう'], ['特徴的', 'とくちょうてき'], ['症状', 'しょうじょう']]),
    options: [
      { n: 1, text: '視力低下', exp_jp: 'クローン病の代表的な症状ではありません。', exp_id: 'Bukan gejala representatif penyakit Crohn.' },
      { n: 2, text: '栄養障害', exp_jp: 'クローン病は消化管の慢性炎症により栄養の吸収が障害され、栄養障害を伴うことが特徴的です。', exp_id: 'Penyakit Crohn menyebabkan peradangan kronis saluran cerna yang mengganggu penyerapan gizi — ciri khasnya gangguan nutrisi.', correct: true },
      { n: 3, text: '咳｛がいそう｝嗽', exp_jp: '呼吸器症状はクローン病の代表的な症状ではありません。', exp_id: 'Gejala pernapasan bukan gejala representatif penyakit Crohn.' },
      { n: 4, text: '運動失調', exp_jp: '神経症状はクローン病の代表的な症状ではありません。', exp_id: 'Gejala neurologis bukan gejala representatif penyakit Crohn.' },
      { n: 5, text: '関節痛', exp_jp: '腸管外合併症としてみられることはありますが、最も特徴的な症状は消化管の炎症による栄養障害です。', exp_id: 'Bisa muncul sebagai komplikasi luar usus, tapi gejala paling khas adalah gangguan nutrisi akibat peradangan saluran cerna.' },
    ],
  },
  {
    kamoku_id: 10, correct_answer: 4, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: '次の記述のうち、遂行機能障害の特徴として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['遂行機能障害', 'すいこうきのうしょうがい'], ['特徴', 'とくちょう']]),
    options: [
      { n: 1, text: '些｛ささい｝細なことですぐに興奮して怒鳴る。', exp_jp: 'これは脱抑制や易怒性の症状で、遂行機能障害とは異なります。', exp_id: 'Ini gejala disinhibisi/mudah marah, berbeda dari gangguan fungsi eksekutif.' },
      { n: 2, text: '新しい知識を覚えることが困難である。', exp_jp: 'これは記憶障害の説明です。', exp_id: 'Ini penjelasan gangguan memori.' },
      { n: 3, text: 'ぼんやりして周囲に注意を向け続けることが困難である。', exp_jp: 'これは注意障害の説明です。', exp_id: 'Ini penjelasan gangguan perhatian.' },
      { n: 4, text: '行動を計画して実行することが困難である。', exp_jp: '遂行機能障害とは、物事を計画し、順序立てて実行することが困難になる状態です。', exp_id: 'Gangguan fungsi eksekutif adalah kesulitan merencanakan & melaksanakan sesuatu secara berurutan.', correct: true },
      { n: 5, text: '言葉の表出や理解が困難である。', exp_jp: 'これは失語の説明です。', exp_id: 'Ini penjelasan afasia.' },
    ],
  },
  {
    kamoku_id: 10, correct_answer: 3, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: '視覚障害の特徴と視覚障害者の生活支援に関する次の記述のうち、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['視覚障害', 'しかくしょうがい'], ['特徴', 'とくちょう'], ['生活支援', 'せいかつしえん']]),
    options: [
      { n: 1, text: 'ロービジョンは、視覚情報をまったく得られない状態である。', exp_jp: 'ロービジョンは残存視力がある状態を指し、全く見えない状態（全盲）とは異なります。', exp_id: 'Low vision berarti masih ada sisa penglihatan, berbeda dari kondisi buta total.' },
      { n: 2, text: '中途視覚障害者は、先天性の障害に比べて障害を受容しやすい。', exp_jp: '中途障害は「見えていた」経験からの喪失を伴うため、先天性障害に比べて受容が難しいことが多いとされます。', exp_id: 'Disabilitas yang muncul di tengah hidup melibatkan kehilangan dari pengalaman "pernah bisa melihat", umumnya lebih sulit diterima dibanding disabilitas bawaan.' },
      { n: 3, text: '白｛はく｝杖｛じょう｝には、視覚に障害があることを周囲に知らせる役目がある。', exp_jp: '白杖は歩行の補助だけでなく、周囲に視覚障害があることを知らせるという重要な役割も持っています。', exp_id: 'Tongkat putih tidak hanya membantu berjalan, tapi juga berfungsi penting memberi tahu sekitar bahwa penggunanya memiliki disabilitas penglihatan.', correct: true },
      { n: 4, text: '視覚障害を補うために、ペットの犬と一緒に外出する。', exp_jp: '一般のペット犬は補助犬としての訓練を受けておらず、視覚障害を補う目的で用いられるのは訓練された盲導犬です。', exp_id: 'Anjing peliharaan biasa tidak dilatih sebagai anjing pemandu; yang dipakai untuk membantu disabilitas penglihatan adalah anjing pemandu terlatih.' },
      { n: 5, text: '視覚障害者は、ガイドヘルパーの利用はできない。', exp_jp: '視覚障害者は同行援護（ガイドヘルパー）を利用できます。', exp_id: 'Penyandang disabilitas penglihatan bisa memakai layanan pendamping (dōkō-engo).' },
    ],
  },
  {
    kamoku_id: 10, correct_answer: 4, difficulty: 'hard', exam_frequency: 'high',
    question_text_jp:
      'Ａさん（76歳、女性）は、パーキンソン病（Parkinson disease）と診断され、日常生活動作（Activities of Daily Living：ＡＤＬ）は、車いすやベッド上で全介助である。最近、食事に時間がかかって嫌がるようになり、かすれ声が目立つようになった。\n次のうち、現在のＡさんに対して介護福祉職が留意すべきこととして、最も適切なものを1つ選びなさい。',
    furigana_map: fm([
      ['パーキンソン病', 'ぱーきんそんびょう'], ['診断', 'しんだん'], ['日常生活動作', 'にちじょうせいかつどうさ'], ['全介助', 'ぜんかいじょ'],
      ['食事', 'しょくじ'], ['嫌', 'いや'], ['声', 'こえ'], ['目立', 'めだ'], ['留意', 'りゅうい'],
    ]),
    options: [
      { n: 1, text: '安静時振戦', exp_jp: 'パーキンソン病の代表的症状ですが、今回の場面（食事に時間がかかる・かすれ声）とは直接関係ありません。', exp_id: 'Gejala khas Parkinson, tapi tidak berkaitan langsung dengan situasi kali ini (makan lama, suara serak).' },
      { n: 2, text: '筋固縮', exp_jp: 'パーキンソン病の代表的症状ですが、今回の場面とは直接関係ありません。', exp_id: 'Gejala khas Parkinson, tapi tidak berkaitan langsung dengan situasi kali ini.' },
      { n: 3, text: '仮面様顔貌', exp_jp: 'パーキンソン病の代表的症状ですが、今回の場面とは直接関係ありません。', exp_id: 'Gejala khas Parkinson, tapi tidak berkaitan langsung dengan situasi kali ini.' },
      { n: 4, text: '誤｛ご｝嚥｛えん｝', exp_jp: '食事に時間がかかることやかすれ声は、嚥下や発声に関わる筋肉の機能低下のサインで、誤嚥のリスクとして最も留意すべき点です。', exp_id: 'Makan lama dan suara serak adalah tanda penurunan fungsi otot terkait menelan & bersuara — risiko tersedak yang paling perlu diwaspadai.', correct: true },
      { n: 5, text: '便秘', exp_jp: 'パーキンソン病でよくみられる症状ですが、今回の場面（食事・かすれ声）とは直接関係ありません。', exp_id: 'Gejala umum pada Parkinson, tapi tidak berkaitan langsung dengan situasi kali ini (makan, suara serak).' },
    ],
  },
  {
    kamoku_id: 10, correct_answer: 1, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: '聴覚障害者の特徴や支援の方法に関する次の記述のうち、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['聴覚障害者', 'ちょうかくしょうがいしゃ'], ['特徴', 'とくちょう'], ['支援', 'しえん']]),
    options: [
      { n: 1, text: '要約筆記によって意思疎通を補う。', exp_jp: '要約筆記は、話の内容を要約して文字で伝える、聴覚障害者とのコミュニケーションを補う有効な方法です。', exp_id: 'Notulensi ringkas menyampaikan isi pembicaraan lewat tulisan — cara efektif membantu komunikasi dengan tunarungu.', correct: true },
      { n: 2, text: '軽度の聴覚障害を「ろう」という。', exp_jp: '「ろう」は一般に重度の聴覚障害（音がほとんど聞こえない状態）を指します。', exp_id: '"Tuli" (ろう) umumnya menunjuk gangguan pendengaran berat (hampir tak bisa mendengar suara), bukan ringan.' },
      { n: 3, text: 'フラッシュベルは周囲の音を増幅させて伝える。', exp_jp: 'フラッシュベルは音を光の点滅で知らせる装置で、音を増幅するものではありません。', exp_id: 'Bel kilat memberi tahu lewat kedipan cahaya, bukan menguatkan suara sekitar.' },
      { n: 4, text: '手話は意思の伝達に役立たない。', exp_jp: '手話は聴覚障害者にとって重要な意思伝達手段です。', exp_id: 'Bahasa isyarat adalah alat komunikasi penting bagi tunarungu.' },
      { n: 5, text: '両耳の聴力レベルが40dBで身体障害者手帳が交付される。', exp_jp: '身体障害者手帳の交付基準はより重度（両耳70dB以上等）であり、40dBでは交付されません。', exp_id: 'Standar penerbitan buku disabilitas fisik lebih berat (70dB ke atas dst.), 40dB belum memenuhi syarat.' },
    ],
  },
  {
    kamoku_id: 10, correct_answer: 5, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp:
      'Ｂさん（24歳、男性）は、母親と二人暮らしで、小学生のときに注意欠陥多動性障害と疑われていた。Ｂさんは、最近になって昼夜を問わずゲームを続け、朝起きられずにアルバイトを無断で休むことが増えた。\n次のうち、Ｂさんの母親が相談する機関として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([
      ['母親', 'ははおや'], ['二人暮', 'ふたりぐ'], ['小学生', 'しょうがくせい'], ['注意欠陥多動性障害', 'ちゅういけっかんたどうせいしょうがい'],
      ['疑', 'うたが'], ['昼夜', 'ちゅうや'], ['問', 'と'], ['朝', 'あさ'], ['起', 'お'], ['無断', 'むだん'], ['機関', 'きかん'],
    ]),
    options: [
      { n: 1, text: 'ハローワーク（公共職業安定所）', exp_jp: '就労紹介を行う機関で、この場面での最初の相談先としては適切ではありません。', exp_id: 'Lembaga penyaluran kerja, bukan tempat konsultasi pertama yang tepat untuk situasi ini.' },
      { n: 2, text: '難病情報センター', exp_jp: '難病に関する情報提供機関で、発達障害の相談先ではありません。', exp_id: 'Lembaga informasi penyakit langka, bukan tempat konsultasi disabilitas perkembangan.' },
      { n: 3, text: '認知症カフェ', exp_jp: '認知症の人とその家族向けの場で、Ｂさんの状況とは関係ありません。', exp_id: 'Tempat bagi penderita demensia & keluarganya, tidak berkaitan dengan situasi Bさん.' },
      { n: 4, text: '放課後等デイサービス', exp_jp: '就学中の障害児童向けサービスで、24歳のＢさんには該当しません。', exp_id: 'Layanan bagi anak disabilitas usia sekolah, tidak berlaku bagi Bさん yang berusia 24 tahun.' },
      { n: 5, text: '発達障害者支援センター', exp_jp: '注意欠陥多動性障害（ADHD）が疑われるＢさんの相談先として、発達障害に関する専門機関が最も適切です。', exp_id: 'Bagi Bさん yang dicurigai ADHD, lembaga spesialis disabilitas perkembangan adalah tempat konsultasi paling tepat.', correct: true },
    ],
  },
  {
    kamoku_id: 10, correct_answer: 5, difficulty: 'hard', exam_frequency: 'high',
    question_text_jp:
      '次の記述のうち、「障害者差別解消法」の合理的配慮に沿った対応として、最も適切なものを1つ選びなさい。\n（注）「障害者差別解消法」とは、「障害を理由とする差別の解消の推進に関する法律」のことである。',
    furigana_map: fm([['障害者差別解消法', 'しょうがいしゃさべつかいしょうほう'], ['合理的配慮', 'ごうりてきはいりょ'], ['対応', 'たいおう']]),
    options: [
      { n: 1, text: '車いすの身体障害者から、陳列棚にある商品を見せてほしいと言われたが、口頭で商品を説明した。', exp_jp: '「見せてほしい」という具体的な要望に応えず、口頭説明のみで済ませるのは合理的配慮を欠く対応です。', exp_id: 'Tidak memenuhi permintaan konkret "tolong perlihatkan" dan hanya menjelaskan lisan — kurang memenuhi akomodasi yang wajar.' },
      { n: 2, text: '聴覚障害者の手話による注文がわからなかったので、最も人気のあるメニューを出した。', exp_jp: '本人の意向を確認せず、勝手に判断して対応するのは不適切です。', exp_id: 'Tidak mengonfirmasi keinginan orang tersebut dan bertindak sepihak, tidak tepat.' },
      { n: 3, text: '盲導犬を連れた視覚障害者が来店したが、動物嫌いの客から苦情を言われると思い、犬は店の中に入れないように頼んだ。', exp_jp: '盲導犬の同伴を拒否することは、差別的な対応にあたり不適切です。', exp_id: 'Menolak anjing pemandu masuk adalah tindakan diskriminatif, tidak tepat.' },
      { n: 4, text: '役所に相談に来た精神障害者から、多くの人の中だと不安になると言われたため、帰宅してもらった。', exp_jp: '不安を訴えた相手に配慮した環境調整（別室の用意等）をせず、そのまま帰らせるのは不適切です。', exp_id: 'Tidak menyediakan penyesuaian lingkungan (misal ruang terpisah) bagi orang yang mengaku cemas, malah menyuruhnya pulang — tidak tepat.' },
      { n: 5, text: '知的障害者から申し出があったので、会議に参加するための資料をわかりやすい言葉に直して、事前に口頭で説明した。', exp_jp: '本人からの申し出に応じて、資料の言葉をわかりやすくし事前に説明することは、合理的配慮の適切な実践例です。', exp_id: 'Menanggapi permintaan orang tersebut dengan menyederhanakan bahasa dokumen dan menjelaskannya lebih dulu adalah contoh praktik akomodasi wajar yang tepat.', correct: true },
    ],
  },
  {
    kamoku_id: 10, correct_answer: 5, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: 'レスパイトケアの望ましいあり方に関する記述として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['レスパイトケア', 'れすぱいとけあ'], ['望', 'のぞ'], ['あり方', 'ありかた']]),
    options: [
      { n: 1, text: '障害者はサービスを利用せずに生活するべきである。', exp_jp: 'サービスを利用しないことを望ましいとするのは、レスパイトケアの趣旨に反します。', exp_id: 'Menganggap tidak memakai layanan sebagai hal yang ideal bertentangan dengan tujuan respite care.' },
      { n: 2, text: '利用中、家族は自宅で休まなくてはならない。', exp_jp: '利用中の過ごし方は家族の自由であるべきで、自宅にいることを義務づけるのは不適切です。', exp_id: 'Cara keluarga menghabiskan waktu saat memakai layanan seharusnya bebas, mewajibkan tetap di rumah tidak tepat.' },
      { n: 3, text: '家族が障害者を預けて旅行に行くことは認められない。', exp_jp: '家族のリフレッシュ目的での利用（旅行を含む）も、レスパイトケアの正当な目的の一つです。', exp_id: 'Penggunaan untuk penyegaran keluarga (termasuk liburan) juga termasuk tujuan sah respite care.' },
      { n: 4, text: '家族の休息が目的なので、障害者の施設利用は宿泊に限定される。', exp_jp: '日帰り利用など、様々な形態のレスパイトケアがあります。', exp_id: 'Ada berbagai bentuk respite care, termasuk penggunaan harian tanpa menginap.' },
      { n: 5, text: '家族が休息している間も、障害者が自分らしく過ごせるようにする', exp_jp: 'レスパイトケアは家族の休息だけでなく、利用する障害者本人が自分らしく快適に過ごせることも重視すべきです。', exp_id: 'Respite care bukan hanya soal istirahat keluarga, tapi juga penting agar penyandang disabilitas yang memakainya bisa menjalani waktu senyaman dan sesuai dirinya sendiri.', correct: true },
    ],
  },
]
