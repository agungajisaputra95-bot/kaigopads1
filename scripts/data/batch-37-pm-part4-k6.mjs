// 第37回（令和6年度）午後 問題80-105（生活支援技術, kamoku 6）
export const SOURCE = '過去問_第37回_2024（想定解答）'

const fm = (pairs) => pairs.map(([kanji, reading]) => ({ kanji, reading }))

export const questions = [
  {
    kamoku_id: 6, correct_answer: 5, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: '高齢者に配慮した居室環境に関する次の記述のうち、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['高齢者', 'こうれいしゃ'], ['配慮', 'はいりょ'], ['居室環境', 'きょしつかんきょう']]),
    options: [
      { n: 1, text: '夏は高齢者が発汗してから冷房を使用する。', exp_jp: '発汗する前から適切に温度管理し、熱中症を予防することが重要です。', exp_id: 'Penting mengatur suhu sejak sebelum berkeringat untuk mencegah heat stroke.' },
      { n: 2, text: '暖房を使用するときは除湿機を併用する。', exp_jp: '暖房使用時は空気が乾燥しやすいため、除湿機ではなく加湿器の併用が適切です。', exp_id: 'Saat memakai pemanas, udara cenderung kering, jadi seharusnya pakai humidifier, bukan dehumidifier.' },
      { n: 3, text: '冷房を使用するときは換気を控える。', exp_jp: '感染対策等の観点から、冷房使用中も適度な換気は必要です。', exp_id: 'Ventilasi tetap perlu dilakukan meski AC menyala, demi pencegahan infeksi.' },
      { n: 4, text: '温度は介護福祉職の感覚で調整する。', exp_jp: '高齢者は体感が鈍くなりやすいため、温度計等の客観的な指標で調整すべきです。', exp_id: 'Lansia cenderung kurang peka terhadap suhu, jadi pengaturan sebaiknya pakai termometer, bukan perasaan staf.' },
      { n: 5, text: '冬はトイレの温度を居室の温度に近づける。', exp_jp: '居室とトイレの温度差はヒートショックの原因になるため、温度差を小さくすることが重要です。', exp_id: 'Perbedaan suhu antara kamar dan toilet bisa memicu heat shock, jadi penting memperkecil selisihnya.', correct: true },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 1, difficulty: 'medium', exam_frequency: 'medium',
    question_text_jp: '次の記述のうち、介護の現場において、レクリエーション活動で実施するアイスブレーキングの効果として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['レクリエーション活動', 'れくりえーしょんかつどう'], ['実施', 'じっし'], ['効果', 'こうか']]),
    options: [
      { n: 1, text: '参加者の緊張感を軽減することができる。', exp_jp: 'アイスブレーキングは、参加者同士の緊張をほぐし場の雰囲気を和らげることを目的とした活動です。', exp_id: 'Ice breaking bertujuan mencairkan suasana kaku antar peserta.', correct: true },
      { n: 2, text: '活動内容を毎回固定して実施することができる。', exp_jp: 'アイスブレーキングの効果とは直接関係ありません。', exp_id: 'Tidak terkait langsung dengan efek ice breaking.' },
      { n: 3, text: '介護福祉職の負担を軽減することができる。', exp_jp: 'アイスブレーキングの主な目的ではありません。', exp_id: 'Bukan tujuan utama ice breaking.' },
      { n: 4, text: '利用者の参加を義務づけることができる。', exp_jp: '参加を強制することは、緊張緩和を目的とするアイスブレーキングの趣旨に反します。', exp_id: 'Memaksa partisipasi bertentangan dengan tujuan ice breaking yang justru meredakan ketegangan.' },
      { n: 5, text: '勝敗を楽しむことができる。', exp_jp: 'アイスブレーキングは競争ではなく、緊張をほぐすことが主な目的です。', exp_id: 'Ice breaking bukan kompetisi; tujuan utamanya meredakan ketegangan.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 1, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp: '次の記述のうち、介護福祉職が行う身じたく・整容の介護として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['身じたく', 'みじたく'], ['整容', 'せいよう']]),
    options: [
      { n: 1, text: 'ベッド上で行う口腔｛こうくう｝ケアは、ガーグルベースンを用いる。', exp_jp: '臥床したままうがいができるよう、あご下に当てるガーグルベースンを使用するのが適切です。', exp_id: 'Baskom kumur diletakkan di bawah dagu agar bisa berkumur sambil berbaring — cara yang tepat.', correct: true },
      { n: 2, text: '総義歯の洗浄は、歯みがき剤を用いる。', exp_jp: '歯みがき剤（研磨剤入り）は義歯を傷つけるため、義歯用の洗浄剤を使用します。', exp_id: 'Pasta gigi (mengandung abrasif) bisa merusak gigi palsu; seharusnya pakai pembersih khusus gigi palsu.' },
      { n: 3, text: '耳垢｛じこう｝の除去は、ピンセットを用いる。', exp_jp: '耳垢の除去は医療的な判断を要する行為で、介護福祉職がピンセットで行うのは危険です。', exp_id: 'Membersihkan kotoran telinga memerlukan penilaian medis; berbahaya jika pekerja kaigo memakai pinset sendiri.' },
      { n: 4, text: 'ベッド上で行う洗顔は、冷水に浸して絞ったタオルを用いる。', exp_jp: '通常は温かいタオル（蒸しタオル等）を使用します。', exp_id: 'Umumnya memakai handuk hangat, bukan handuk dingin.' },
      { n: 5, text: '浴室で行う洗髪は、ドライシャンプーを用いる。', exp_jp: 'ドライシャンプーは入浴できないときに使うもので、浴室では通常のシャンプーを使用します。', exp_id: 'Sampo kering dipakai saat tidak bisa mandi; di kamar mandi memakai sampo biasa.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 3, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: '次の記述のうち、障害のある人への事故防止の対応として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['障害', 'しょうがい'], ['事故防止', 'じこぼうし']]),
    options: [
      { n: 1, text: 'パーキンソン病（Parkinson disease）の人には、低めのベッドを用意する。', exp_jp: '低すぎるベッドは立ち上がり動作を困難にするため、適度な高さが適切です。', exp_id: 'Ranjang terlalu rendah menyulitkan berdiri; tinggi yang sesuai lebih tepat.' },
      { n: 2, text: '認知症（dementia）の人には、ガスコンロを用意する。', exp_jp: '消し忘れなどの火災リスクがあるため、ＩＨクッキングヒーター等の方が安全です。', exp_id: 'Ada risiko lupa mematikan kompor gas; kompor induksi lebih aman.' },
      { n: 3, text: '在宅酸素療法中の人のそばでは、喫煙しない。', exp_jp: '酸素は引火性が高いため、酸素療法中の人のそばでの喫煙は厳禁です。', exp_id: 'Oksigen mudah terbakar, jadi merokok di dekat pengguna terapi oksigen di rumah sangat dilarang.', correct: true },
      { n: 4, text: '視覚障害のある人には、洗体用に頭受け台を用意する。', exp_jp: '頭受け台は頸部の保持が難しい人向けの用具で、視覚障害とは関係ありません。', exp_id: 'Penyangga kepala untuk orang yang sulit menopang leher, tidak berkaitan dengan disabilitas penglihatan.' },
      { n: 5, text: '聴覚障害のある人には、補高便座を用意する。', exp_jp: '補高便座は下肢筋力低下等の人向けの用具で、聴覚障害とは関係ありません.', exp_id: 'Dudukan toilet tinggi untuk orang dengan kelemahan otot kaki, tidak berkaitan dengan disabilitas pendengaran.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 1, difficulty: 'hard', exam_frequency: 'high',
    question_text_jp: '次のうち、右片麻痺｛みぎかたまひ｝の利用者が多点杖｛たてんづえ｝を使用して3動作歩行を開始するときに、介護福祉職が行う説明として、適切なものを1つ選びなさい。',
    furigana_map: fm([['右片麻痺', 'みぎかたまひ'], ['多点杖', 'たてんづえ'], ['3動作歩行', 'さんどうさほこう']]),
    options: [
      { n: 1, text: '「杖｛つえ｝、右足、左足の順で歩きましょう」', exp_jp: '3動作歩行は「杖→患側の足→健側の足」の順です。右片麻痺なので患側は右足、健側は左足で、この順序が正しいです。', exp_id: 'Jalan 3 langkah: tongkat → kaki lumpuh → kaki sehat. Untuk lumpuh kanan, urutan ini (tongkat-kanan-kiri) benar.', correct: true },
      { n: 2, text: '「杖｛つえ｝、左足、右足の順で歩きましょう」', exp_jp: '健側（左足）を先に、患側（右足）を後にするのは3動作歩行の順序として誤りです。', exp_id: 'Mendahulukan kaki sehat sebelum kaki lumpuh salah urutan untuk jalan 3 langkah.' },
      { n: 3, text: '「右足、左足、杖｛つえ｝の順で歩きましょう」', exp_jp: '杖を最初に出さない順序は3動作歩行の基本と異なります。', exp_id: 'Urutan yang tidak mendahulukan tongkat berbeda dari dasar jalan 3 langkah.' },
      { n: 4, text: '「左足、杖｛つえ｝、右足の順で歩きましょう」', exp_jp: '杖より先に足を出す順序は3動作歩行の基本と異なります。', exp_id: 'Melangkahkan kaki sebelum tongkat berbeda dari dasar jalan 3 langkah.' },
      { n: 5, text: '「左足、右足、杖｛つえ｝の順で歩きましょう」', exp_jp: '杖を最後に出す順序は3動作歩行の基本と異なります。', exp_id: 'Tongkat diletakkan terakhir berbeda dari dasar jalan 3 langkah.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 4, difficulty: 'hard', exam_frequency: 'high',
    question_text_jp: 'ノーリフティングケアに関する次の記述のうち、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['ノーリフティングケア', 'のーりふてぃんぐけあ']]),
    options: [
      { n: 1, text: '仰臥位｛ぎょうがい｝（背臥位｛はいがい｝）の利用者を抱え上げて、端座位にする。', exp_jp: '「抱え上げる」動作はノーリフティングケアの考え方に反します。', exp_id: 'Tindakan "mengangkat" bertentangan dengan prinsip no-lifting care.' },
      { n: 2, text: '仰臥位｛ぎょうがい｝（背臥位｛はいがい｝）の利用者を手前に引きよせて、ストレッチャーに移乗する。', exp_jp: '「引き寄せる」動作も身体的負担が大きく、スライディングシート等の用具を使うべきです。', exp_id: 'Tindakan "menarik" juga membebani fisik; seharusnya memakai alat seperti sliding sheet.' },
      { n: 3, text: '端座位の利用者の体幹を抱きかかえて、車いすに移乗する。', exp_jp: '「抱きかかえる」動作もノーリフティングケアの考え方に反します。', exp_id: 'Tindakan "memeluk tubuh" juga bertentangan dengan prinsip no-lifting care.' },
      { n: 4, text: '端座位の利用者にスライディングボードを使用して、車いすに移乗する。', exp_jp: 'スライディングボードのような福祉用具を活用し、抱え上げずに移乗する方法がノーリフティングケアの実践です。', exp_id: 'Memakai alat bantu seperti sliding board tanpa mengangkat tubuh adalah praktik no-lifting care.', correct: true },
      { n: 5, text: '立位が困難な端座位の利用者に回転移動盤を使用して、車いすに移乗する。', exp_jp: '回転移動盤は立位が可能な人向けの用具で、立位が困難な人には適していません。', exp_id: 'Alat putar untuk transfer cocok bagi yang bisa berdiri; tidak sesuai bagi yang sulit berdiri.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 2, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp: '次の記述のうち、左片麻痺｛ひだりかたまひ｝の利用者を右側臥位｛みぎそくがい｝から端座位にするときの介護として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['左片麻痺', 'ひだりかたまひ'], ['右側臥位', 'みぎそくがい'], ['端座位', 'たんざい']]),
    options: [
      { n: 1, text: '利用者に左手でベッド柵をつかむように伝える。', exp_jp: '左手は患側のため力が入りにくく、起き上がり動作の支点としては適していません。', exp_id: 'Tangan kiri adalah sisi lumpuh, sulit dipakai untuk bertumpu saat bangun.' },
      { n: 2, text: '利用者に右肘を支点にして上体を起こしてもらう。', exp_jp: '右側臥位で下側にある健側の右肘を支点に自力で起き上がる「肘支点法」は、残存機能を生かした適切な介助です。', exp_id: 'Metode bertumpu pada siku kanan (sisi sehat yang berada di bawah saat miring kanan) memanfaatkan fungsi yang tersisa — cara yang tepat.', correct: true },
      { n: 3, text: '利用者の右脚をベッドから下ろす。', exp_jp: '下肢を下ろす動作自体は含まれますが、起き上がりの介助として最も重要なのは肘支点を使った上体挙上です。', exp_id: 'Menurunkan kaki memang bagian dari prosesnya, tapi yang paling penting adalah metode bertumpu siku untuk mengangkat tubuh.' },
      { n: 4, text: '利用者の頸部｛けいぶ｝を支えて上体を起こす。', exp_jp: '頸部を支えて起こす方法は、頸部への負担が大きく適切な介助法ではありません。', exp_id: 'Menopang leher untuk mengangkat tubuh membebani leher, bukan metode yang tepat.' },
      { n: 5, text: '端座位の利用者の右側に立って上体を支える。', exp_jp: '端座位を支えるときは、患側（左側）に立って支えるのが基本です。', exp_id: 'Saat menopang posisi duduk di tepi ranjang, seharusnya berdiri di sisi lumpuh (kiri).' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 2, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: '口腔｛こうくう｝ケアに関する次の記述のうち、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['口腔ケア', 'こうくうけあ']]),
    options: [
      { n: 1, text: 'うがいは、顔貌を整える。', exp_jp: 'うがいの目的は口腔内の清浄・保湿等であり、顔貌を整えることではありません。', exp_id: 'Tujuan berkumur adalah membersihkan/melembapkan mulut, bukan merapikan wajah.' },
      { n: 2, text: '歯みがきは、感染予防になる。', exp_jp: '歯みがきで口腔内細菌を減らすことは、誤嚥性肺炎などの感染予防につながります。', exp_id: 'Mengurangi bakteri mulut lewat sikat gigi membantu mencegah infeksi seperti pneumonia aspirasi.', correct: true },
      { n: 3, text: '口腔内｛こうくうない｝の乾燥は、口臭を予防する。', exp_jp: '口腔内の乾燥はむしろ口臭の原因になります。', exp_id: 'Mulut kering justru menjadi penyebab bau mulut, bukan mencegahnya.' },
      { n: 4, text: '唾液腺マッサージは、唾液の分泌を抑える。', exp_jp: '唾液腺マッサージは唾液の分泌を促進する目的で行います。', exp_id: 'Pijat kelenjar air liur bertujuan meningkatkan sekresi air liur, bukan menekannya.' },
      { n: 5, text: '咀嚼機能｛そしゃくきのう｝の向上のために、タッピングを行う。', exp_jp: 'タッピングは主に嚥下反射を促す等の目的で行われ、咀嚼機能向上が主目的ではありません。', exp_id: 'Tapping terutama dilakukan untuk mendorong refleks menelan, bukan meningkatkan fungsi mengunyah.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 3, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp: '次の記述のうち、口腔｛こうくう｝ケアを実施するときの留意点として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['口腔ケア', 'こうくうけあ'], ['実施', 'じっし'], ['留意点', 'りゅういてん']]),
    options: [
      { n: 1, text: '実施中は、利用者に顎を上げた姿勢をとってもらう。', exp_jp: '顎を上げる姿勢は誤嚥しやすくなるため、顎を引いた姿勢が適切です。', exp_id: 'Mendongakkan dagu berisiko tersedak; posisi dagu ditarik ke bawah lebih tepat.' },
      { n: 2, text: '総義歯は、上顎から下顎の順に外してもらう。', exp_jp: '通常は外しやすい下顎から先に外します。', exp_id: 'Biasanya rahang bawah dilepas dulu karena lebih mudah.' },
      { n: 3, text: '歯みがきの前に、うがいを行ってもらう。', exp_jp: '歯みがき前にうがいをすることで、口腔内を湿らせ汚れを浮かせやすくする効果があります。', exp_id: 'Berkumur sebelum sikat gigi membasahi mulut dan membantu melunakkan kotoran.', correct: true },
      { n: 4, text: '歯ブラシは、大きく動かして磨いてもらう。', exp_jp: '歯や歯肉を傷つけないよう、小刻みに動かして磨くのが適切です。', exp_id: 'Agar tidak melukai gigi/gusi, sikat digerakkan kecil-kecil, bukan besar.' },
      { n: 5, text: '舌ブラシは、舌先から咽頭に向かって動かしてもらう。', exp_jp: '嘔吐反射を誘発しないよう、奥（咽頭側）から手前（舌先）に向かって動かすのが基本です。', exp_id: 'Untuk menghindari refleks muntah, sikat lidah digerakkan dari belakang ke depan, bukan sebaliknya.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 5, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: '次の記述のうち、介護が必要な人への熱中症対策のために、介護福祉職が行う水分補給の対応として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['熱中症対策', 'ねっちゅうしょうたいさく'], ['水分補給', 'すいぶんほきゅう']]),
    options: [
      { n: 1, text: 'のどが渇いてから、水分を取るように伝える。', exp_jp: '高齢者は喉の渇きを感じにくいことがあるため、渇く前の定期的な水分補給が重要です。', exp_id: 'Lansia kadang kurang peka pada rasa haus, jadi minum air perlu dilakukan berkala sebelum terasa haus.' },
      { n: 2, text: '水でむせるときは、ゼリーの提供を控える。', exp_jp: 'むせやすい人には、とろみをつけたゼリー状の水分の方がかえって適切です。', exp_id: 'Bagi yang mudah tersedak, cairan berbentuk jeli/kental justru lebih tepat.' },
      { n: 3, text: '起床時は、水分摂取を控えるように伝える。', exp_jp: '起床時は脱水気味であることが多く、水分摂取を勧めるべきです。', exp_id: 'Saat bangun tidur biasanya sedikit dehidrasi, jadi disarankan minum air.' },
      { n: 4, text: '食事のときの水分は、一日の水分摂取量から除く。', exp_jp: '食事に含まれる水分も、一日の水分摂取量に含めて考えます。', exp_id: 'Cairan dari makanan juga dihitung dalam total asupan cairan harian.' },
      { n: 5, text: '汗の量が多いときは、塩分を含んだ飲み物を勧める。', exp_jp: '発汗で失われた塩分を補うため、塩分を含んだ飲み物が適切です。', exp_id: 'Minuman mengandung garam membantu mengganti elektrolit yang hilang lewat keringat.', correct: true },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 2, difficulty: 'hard', exam_frequency: 'high',
    question_text_jp:
      'Ａさん（75歳、男性）は、1年前に前頭側頭型認知症（frontotemporal dementia）と診断され、現在は、認知症対応型共同生活介護（認知症高齢者グループホーム）に入居している。若い頃から食べることが好きである。現在、咀嚼｛そしゃく｝や嚥下機能｛えんげきのう｝の低下はなく、スプーンを使い、自分で食べている。最近、飲み込む前に次々と食べ物を口に入れることが増えた。\n次の記述のうち、Ａさんの現在の状態に合わせた食事の介護として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([
      ['前頭側頭型認知症', 'ぜんとうそくとうがたにんちしょう'], ['診断', 'しんだん'], ['認知症対応型共同生活介護', 'にんちしょうたいおうがたきょうどうせいかつかいご'],
      ['入居', 'にゅうきょ'], ['咀嚼', 'そしゃく'], ['嚥下機能', 'えんげきのう'], ['低下', 'ていか'], ['飲', 'の'], ['込', 'こ'],
    ]),
    options: [
      { n: 1, text: '取っ手つきのコップを準備する。', exp_jp: '飲み込む前に次々食べ物を口に入れるという今の問題への直接的な対応にはなりません。', exp_id: 'Tidak menjawab langsung masalah memasukkan makanan berturut-turut sebelum menelan.' },
      { n: 2, text: '食器に少量ずつ盛りつけて提供する。', exp_jp: '一度に目に入る量を制限することで、次々口に入れてしまう衝動的な行動を抑える工夫になります。', exp_id: 'Membatasi jumlah makanan yang terlihat sekaligus membantu menekan dorongan memasukkan makanan berturut-turut.', correct: true },
      { n: 3, text: 'すべての料理をテーブルの上に並べる。', exp_jp: '視界に多くの食べ物があると、かえって次々食べる行動を誘発しやすくなります。', exp_id: 'Banyak makanan terlihat sekaligus justru bisa memicu perilaku makan berturut-turut.' },
      { n: 4, text: '大きなスプーンに変更する。', exp_jp: '一口量が増え、窒息のリスクが高まるため不適切です。', exp_id: 'Ukuran suapan makin besar, meningkatkan risiko tersedak.' },
      { n: 5, text: '手で持って食べられる物を準備する。', exp_jp: '今回の問題（次々口に入れる行動）への直接対応にはなりません。', exp_id: 'Tidak menjawab langsung masalah kali ini (memasukkan makanan berturut-turut).' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 2, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp: '次の記述のうち、パーキンソン病（Parkinson disease）で上肢の震えはあるが、自力摂取が可能な利用者の食事の介護として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['パーキンソン病', 'ぱーきんそんびょう'], ['上肢', 'じょうし'], ['震', 'ふる'], ['自力摂取', 'じりきせっしゅ']]),
    options: [
      { n: 1, text: '食事後に口腔内｛こうくうない｝のアイスマッサージを行う。', exp_jp: 'アイスマッサージは嚥下訓練の一種で、震えのある人の自力摂取を助ける工夫とは直接関係ありません。', exp_id: 'Pijat es adalah bagian latihan menelan, tidak berkaitan langsung dengan bantuan makan mandiri bagi tangan gemetar.' },
      { n: 2, text: '片側の縁が高くなっている皿を準備する。', exp_jp: '縁が高い皿は、震える手でも食べ物をすくいやすく、こぼれにくくする自助具の工夫です。', exp_id: 'Piring dengan tepi tinggi memudahkan mengambil makanan dengan tangan gemetar dan mengurangi tumpahan.', correct: true },
      { n: 3, text: '上半身を後ろに20度程度倒すように伝える。', exp_jp: '上体を後傾させると誤嚥のリスクが高まるため、通常は前傾姿勢が適切です。', exp_id: 'Memiringkan tubuh ke belakang meningkatkan risiko tersedak; posisi condong ke depan lebih tepat.' },
      { n: 4, text: '食器の置いてある位置を説明する。', exp_jp: 'これは視覚障害のある人への配慮であり、震え（振戦）への対応ではありません。', exp_id: 'Ini konsiderasi untuk disabilitas penglihatan, bukan respons untuk tangan gemetar.' },
      { n: 5, text: '踵｛かかと｝を床から浮かすように伝える。', exp_jp: '姿勢を安定させるためには、踵をしっかり床につけるべきです。', exp_id: 'Untuk menstabilkan posisi duduk, tumit seharusnya menapak lantai dengan kuat, bukan diangkat.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 3, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp: '次の記述のうち、入浴の作用を生かした、高齢者への入浴の介護として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['入浴', 'にゅうよく'], ['作用', 'さよう'], ['生', 'い']]),
    options: [
      { n: 1, text: '食事は、入浴直前に摂取する。', exp_jp: '入浴直前直後の食事は、消化器系への血流集中と入浴による血流変化が重なり、体に負担がかかるため避けるべきです。', exp_id: 'Makan tepat sebelum/sesudah mandi membebani tubuh karena aliran darah ke pencernaan bertabrakan dengan efek mandi.' },
      { n: 2, text: '高血圧の人には、42℃以上の湯につかってもらう。', exp_jp: '高温浴は血圧上昇を招くため、高血圧の人には38〜40℃程度のぬるめの湯が適切です。', exp_id: 'Air panas menaikkan tekanan darah; bagi penderita hipertensi, air hangat suam (38-40°C) lebih tepat.' },
      { n: 3, text: '浴槽の中では、関節運動を促す。', exp_jp: '入浴中は浮力によって関節への負担が軽くなり、関節運動がしやすくなるという入浴の作用を生かした対応です。', exp_id: 'Daya apung air mengurangi beban sendi, memanfaatkan efek ini untuk mendorong gerakan sendi lebih mudah.', correct: true },
      { n: 4, text: '心疾患（heart disease）のある人には、肩まで湯につかってもらう。', exp_jp: '肩まで浸かる全身浴は水圧による心臓への負担が大きいため、心疾患のある人には半身浴が推奨されます。', exp_id: 'Berendam sampai bahu memberi tekanan air besar pada jantung; bagi penderita penyakit jantung, berendam setengah badan lebih dianjurkan.' },
      { n: 5, text: '個浴の浴槽内では、足を浮かせてもらう。', exp_jp: '足を浮かせると浮力で姿勢が不安定になり危険なため、足はしっかり浴槽の底につけるべきです。', exp_id: 'Mengangkat kaki membuat posisi tidak stabil karena daya apung, berbahaya; kaki seharusnya menapak dasar bak mandi.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 5, difficulty: 'hard', exam_frequency: 'high',
    question_text_jp: '次の記述のうち、下肢筋力が低下して介護を必要とする人の入浴に適した環境として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['下肢筋力', 'かしきんりょく'], ['低下', 'ていか'], ['入浴', 'にゅうよく'], ['環境', 'かんきょう']]),
    options: [
      { n: 1, text: '浴室の入口は開き戸にする。', exp_jp: '開き戸は緊急時の対応が難しいため、引き戸が推奨されます。', exp_id: 'Pintu ayun sulit ditangani saat darurat; pintu geser lebih direkomendasikan.' },
      { n: 2, text: '床から浴槽の縁までの高さは20cmにする。', exp_jp: '一般的には、またぎやすい高さとして約40cm程度が目安とされます。', exp_id: 'Umumnya tinggi yang mudah dilangkahi sekitar 40 cm, bukan 20 cm.' },
      { n: 3, text: '縦に長く、浅めの洋式の浴槽にする。', exp_jp: '下肢筋力が低下した人には、姿勢を保持しやすい浴槽の形状が求められ、縦長で浅い形状は適していません。', exp_id: 'Orang dengan kekuatan kaki menurun butuh bentuk bak mandi yang menopang posisi duduk dengan baik; bentuk memanjang & dangkal kurang sesuai.' },
      { n: 4, text: '浴槽の縁の幅は20cmにする。', exp_jp: 'これも下肢筋力低下者に特化した適切な基準とはいえません。', exp_id: 'Ini juga bukan standar khusus yang tepat bagi orang dengan kekuatan kaki menurun.' },
      { n: 5, text: '浴槽への出入りのために、水平および垂直の手すりを設置する。', exp_jp: '動作に応じた水平・垂直の手すりを設置することで、安全な出入りを支援できます。', exp_id: 'Memasang pegangan horizontal & vertikal sesuai gerakan membantu keluar-masuk bak mandi dengan aman.', correct: true },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 5, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp: '次の記述のうち、体調不良で入浴できない片麻痺｛かたまひ｝の利用者に対して、ベッド上で行う全身清拭の方法として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['体調不良', 'たいちょうふりょう'], ['片麻痺', 'かたまひ'], ['全身清拭', 'ぜんしんせいしき']]),
    options: [
      { n: 1, text: '清拭時は、窓を開けて行う。', exp_jp: '室温低下を防ぎ保温するため、窓は閉めて行うのが基本です。', exp_id: 'Untuk menjaga suhu ruangan, jendela seharusnya ditutup, bukan dibuka.' },
      { n: 2, text: '洗面器には、40℃程度のお湯を準備する。', exp_jp: '清拭では体に触れるまでにお湯が冷めるため、50℃程度の高めの温度で準備するのが一般的です。', exp_id: 'Karena air mendingin sebelum menyentuh kulit, umumnya disiapkan air lebih panas sekitar 50°C.' },
      { n: 3, text: '最初に、腹部から清拭する。', exp_jp: '通常は顔・上肢など清潔な部位から始め、腹部を最初に拭くのが基本ではありません。', exp_id: 'Biasanya dimulai dari bagian bersih seperti wajah/lengan, bukan dari perut terlebih dahulu.' },
      { n: 4, text: '背部は、患側を下にした側臥位｛そくがい｝にして拭く。', exp_jp: '側臥位にするときは、健側を下にした方が安定し安全です。', exp_id: 'Saat memiringkan tubuh, sisi sehat seharusnya di bawah agar lebih stabil & aman.' },
      { n: 5, text: '蒸しタオルで拭いた後は、乾いたタオルで水分を拭き取る。', exp_jp: '水分が肌に残ると気化熱で体が冷えるため、乾いたタオルで拭き取ることが必要です。', exp_id: 'Sisa air di kulit membuat tubuh dingin akibat penguapan, jadi perlu dikeringkan dengan handuk kering.', correct: true },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 1, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: '次のうち、同居の高齢者におむつを使用する家族介護者に対する、介護福祉職の説明として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['同居', 'どうきょ'], ['家族介護者', 'かぞくかいごしゃ']]),
    options: [
      { n: 1, text: '「使用する本人の羞恥心に気を配りましょう」', exp_jp: 'おむつの使用は本人の尊厳に関わるため、羞恥心への配慮は重要な説明内容です。', exp_id: 'Pemakaian popok berkaitan dengan martabat penggunanya, jadi memperhatikan rasa malunya adalah poin penting.', correct: true },
      { n: 2, text: '「尿失禁を防ぐことができます」', exp_jp: 'おむつは失禁そのものを防ぐものではなく、失禁への対応策です。', exp_id: 'Popok bukan mencegah inkontinensia itu sendiri, melainkan cara menanganinya.' },
      { n: 3, text: '「尿量を気にせずに、1日中同じおむつを使うことができます」', exp_jp: '皮膚トラブルを防ぐため、定期的な交換が必要です。', exp_id: 'Perlu diganti secara berkala untuk mencegah masalah kulit.' },
      { n: 4, text: '「おむつを着けると、安心して排泄｛はいせつ｝ができます」', exp_jp: '本人の尊厳や自立支援の観点から、一方的な決めつけは適切ではありません。', exp_id: 'Dari sudut pandang martabat & dukungan kemandirian, kesimpulan sepihak seperti ini tidak tepat.' },
      { n: 5, text: '「家族の都合に合わせて、おむつを使いましょう」', exp_jp: '本人の尊厳を優先すべきで、家族の都合を優先するのは不適切です。', exp_id: 'Martabat penggunanya harus diutamakan, bukan kepentingan keluarga.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 3, difficulty: 'medium', exam_frequency: 'medium',
    question_text_jp: '次の記述のうち、ポータブルトイレを使用するときの排泄｛はいせつ｝の介護として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['ポータブルトイレ', 'ぽーたぶるといれ'], ['排泄', 'はいせつ']]),
    options: [
      { n: 1, text: 'ポータブルトイレの下に新聞紙を敷く。', exp_jp: '新聞紙はずれやすく安全ではないため、床に固定できる防水シート等を使用します。', exp_id: 'Koran mudah bergeser dan tidak aman; seharusnya memakai alas anti-air yang bisa difiksasi ke lantai.' },
      { n: 2, text: 'ベッドで臥床｛がしょう｝している状態で、ズボンや下着をおろす。', exp_jp: '可能な限り立位または端座位で行い、プライバシーと自立支援に配慮すべきです。', exp_id: 'Sebaiknya dilakukan sambil berdiri/duduk di tepi ranjang jika memungkinkan, demi privasi & kemandirian.' },
      { n: 3, text: 'ポータブルトイレには、前かがみになって座ってもらう。', exp_jp: '前傾姿勢は腹圧をかけやすく、排泄をしやすくする姿勢です。', exp_id: 'Posisi condong ke depan memudahkan menekan perut, membantu proses buang air.', correct: true },
      { n: 4, text: '排泄｛はいせつ｝が終わるまで、ポータブルトイレの後ろに立って待つ。', exp_jp: 'プライバシーに配慮し、適度な距離を取るか一旦離れて見守ることが望ましい対応です。', exp_id: 'Demi privasi, sebaiknya menjaga jarak yang wajar atau menjauh sejenak sambil tetap mengawasi.' },
      { n: 5, text: '排泄後｛はいせつご｝の陰部の清拭は、ベッドの上で行う。', exp_jp: '可能であればトイレ上で行い、不要な移動やベッドを汚すことを避けます。', exp_id: 'Sebaiknya dilakukan di atas toilet portabel jika memungkinkan, menghindari perpindahan yang tidak perlu.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 5, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp: '次の記述のうち、介護福祉士が行うことのできる、坐薬｛ざやく｝（座薬）を用いた介護として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['介護福祉士', 'かいごふくしし'], ['坐薬', 'ざやく']]),
    options: [
      { n: 1, text: '膣｛ちつ｝から挿入する坐薬｛ざやく｝（座薬）が扱える。', exp_jp: '介護福祉士が対応できるのは肛門からの坐薬に限られ、膣坐薬は医療行為として対象外です。', exp_id: 'Pekerja kaigo hanya boleh menangani supositoria dubur; supositoria vagina termasuk tindakan medis di luar wewenangnya.' },
      { n: 2, text: '坐薬｛ざやく｝（座薬）は、あたたかな場所で保管する。', exp_jp: '坐薬は体温で溶けるため、涼しい場所（冷暗所）で保管します。', exp_id: 'Supositoria meleleh oleh suhu tubuh, jadi disimpan di tempat sejuk & gelap, bukan hangat.' },
      { n: 3, text: '坐薬｛ざやく｝（座薬）は、とがっていない方から挿入する。', exp_jp: '通常は尖った方から挿入します。', exp_id: 'Biasanya dimasukkan dari ujung yang runcing.' },
      { n: 4, text: '腹部に力を入れるよう促しながら、坐薬｛ざやく｝（座薬）を挿入する。', exp_jp: '力を入れると排出されやすくなるため、リラックスしてもらうことが適切です。', exp_id: 'Mengejan justru membuat supositoria mudah keluar lagi; sebaiknya diminta rileks.' },
      { n: 5, text: '下剤以外の坐薬｛ざやく｝（座薬）挿入は、先に排泄｛はいせつ｝を済ませてから行う。', exp_jp: '下剤以外の坐薬（解熱剤等）は、排便により薬剤が排出されてしまうのを防ぐため、先に排泄を済ませておくことが適切です。', exp_id: 'Supositoria selain obat pencahar (misal penurun demam) sebaiknya dipasang setelah BAB, agar obat tidak ikut keluar.', correct: true },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 1, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp: '次の記述のうち、調理における基本調味料の効果や使い方として、適切なものを1つ選びなさい。',
    furigana_map: fm([['調理', 'ちょうり'], ['基本調味料', 'きほんちょうみりょう'], ['効果', 'こうか']]),
    options: [
      { n: 1, text: '砂糖は、塩より先に入れると、食物に甘みが浸透しやすくなる。', exp_jp: '砂糖は分子が大きく浸透に時間がかかるため、塩より先に入れることで甘みが浸透しやすくなります（調味料の「さしすせそ」の順）。', exp_id: 'Molekul gula lebih besar dan butuh waktu meresap, jadi dimasukkan sebelum garam agar rasa manis meresap lebih baik (urutan bumbu dasar Jepang).', correct: true },
      { n: 2, text: '塩は、食物のうま味を増し、照りを出す。', exp_jp: 'うま味を増し照りを出す効果は、主に砂糖やみりんによるものです。', exp_id: 'Efek menambah rasa gurih & kilau terutama berasal dari gula/mirin, bukan garam.' },
      { n: 3, text: '酢は、食物の水分を引き出し、保存性を高める。', exp_jp: '食物の水分を引き出すのは塩の脱水作用で、酢の保存効果は主に抗菌作用によるものです。', exp_id: 'Menarik keluar air dari makanan adalah efek dehidrasi garam; efek pengawetan cuka terutama dari sifat antibakterinya.' },
      { n: 4, text: 'しょうゆは、食物のくさみを抜き、肉を柔らかくする。', exp_jp: 'くさみを抜き肉を柔らかくする効果は、主に酒やみりん、酢などによるものです。', exp_id: 'Efek menghilangkan bau amis & melunakkan daging terutama berasal dari sake/mirin/cuka, bukan kecap asin.' },
      { n: 5, text: 'みそは、味付けの最初に入れると、特有の香りが逃げない。', exp_jp: 'みそは加熱すると風味が飛びやすいため、通常は最後に入れます。', exp_id: 'Aroma miso mudah menguap saat dipanaskan lama, jadi biasanya dimasukkan paling akhir, bukan pertama.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 4, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp: '食品の保存に関する次の記述のうち、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['食品', 'しょくひん'], ['保存', 'ほぞん']]),
    options: [
      { n: 1, text: '賞味期限の切れた未開封の缶詰は、すぐに廃棄する。', exp_jp: '賞味期限は「美味しく食べられる目安」であり、未開封であればすぐに廃棄する必要はありません。', exp_id: 'Tanggal kedaluwarsa "best before" hanya patokan rasa terbaik; kaleng tertutup rapat tak perlu langsung dibuang.' },
      { n: 2, text: 'ウインナーには、消費期限が記載されている。', exp_jp: 'ウインナーのように比較的日持ちする加工食品には、通常「賞味期限」が記載されます。', exp_id: 'Produk olahan yang relatif tahan lama seperti sosis umumnya mencantumkan "best before", bukan "use by".' },
      { n: 3, text: '前日調理して常温保存した肉入りカレーは、再加熱する。', exp_jp: '常温保存自体が菌の増殖リスクを高めるため、そもそも冷蔵保存が基本で、再加熱だけでは安全とは限りません。', exp_id: 'Menyimpan di suhu ruang sudah berisiko pertumbuhan bakteri; seharusnya disimpan di kulkas, memanaskan ulang saja belum tentu aman.' },
      { n: 4, text: 'りんごを冷蔵庫で保存するときは、ビニール袋に入れて密封する。', exp_jp: 'りんごはエチレンガスを放出し他の野菜・果物の劣化を早めるため、密封して保存するのが適切です。', exp_id: 'Apel melepaskan gas etilen yang mempercepat pembusukan sayur/buah lain, jadi sebaiknya disimpan dalam kantong tertutup rapat.', correct: true },
      { n: 5, text: '冷凍食品は、一度解凍しても再冷凍すれば長期間の保存が可能である。', exp_jp: '再冷凍は品質劣化や菌の増殖リスクがあるため推奨されません。', exp_id: 'Membekukan ulang berisiko menurunkan kualitas & pertumbuhan bakteri, tidak dianjurkan.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 5, difficulty: 'medium', exam_frequency: 'medium',
    question_text_jp: '次の記述のうち、衣類の保管方法として、適切なものを1つ選びなさい。',
    furigana_map: fm([['衣類', 'いるい'], ['保管方法', 'ほかんほうほう']]),
    options: [
      { n: 1, text: '衣装ケースで保管するときは、たたんだ衣類の下に防虫剤を入れる。', exp_jp: '防虫剤の成分は下に沈むため、衣類の上部に置くのが基本です。', exp_id: 'Kandungan kamper cenderung turun ke bawah, jadi diletakkan di atas tumpukan pakaian, bukan di bawah.' },
      { n: 2, text: 'ドライクリーニング後の衣類は、ビニールを外さずに保管する。', exp_jp: 'ビニールをつけたままだと湿気がこもりカビの原因になるため、外して保管します。', exp_id: 'Plastik yang tetap terpasang menjebak kelembapan dan memicu jamur; sebaiknya dilepas.' },
      { n: 3, text: '汚れのひどい衣類は、介護福祉職の判断で廃棄する。', exp_jp: '本人や家族の意向を確認せず勝手に廃棄すべきではありません。', exp_id: 'Tidak boleh dibuang sepihak tanpa mengonfirmasi keinginan pengguna/keluarga.' },
      { n: 4, text: '湿気を含んだ衣類は、たたんで引き出しに保管する。', exp_jp: '湿気を含んだまま保管するとカビの原因になるため、乾燥させてから保管します。', exp_id: 'Menyimpan dalam keadaan lembap memicu jamur; harus dikeringkan dulu sebelum disimpan.' },
      { n: 5, text: '絹製品は、タンスの上部に保管する。', exp_jp: '絹は湿気に弱いため、湿気がたまりやすい下部より上部に保管するのが望ましいです。', exp_id: 'Sutra rentan lembap, jadi lebih baik disimpan di bagian atas lemari yang tidak mudah lembap.', correct: true },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 4, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp: '次の記述のうち、介護の現場で行うベッドメイキングとして、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['介護', 'かいご'], ['現場', 'げんば'], ['ベッドメイキング', 'べっどめいきんぐ']]),
    options: [
      { n: 1, text: '居室の窓は、閉めて行う。', exp_jp: 'ほこり等が舞うため、換気のために窓を開けて行うのが基本です。', exp_id: 'Karena debu berterbangan, sebaiknya jendela dibuka untuk ventilasi, bukan ditutup.' },
      { n: 2, text: 'キャスターのあるベッドは、ストッパーを外す。', exp_jp: '作業中の安全のため、ストッパーはかけたままにします。', exp_id: 'Demi keamanan saat bekerja, rem roda tetap dikunci, bukan dilepas.' },
      { n: 3, text: 'シーツの中心線を、マットレスの端に合わせる。', exp_jp: 'シーツの中心線はマットレスの中心に合わせます。', exp_id: 'Garis tengah seprai seharusnya disejajarkan dengan tengah kasur, bukan tepinya.' },
      { n: 4, text: 'シーツをマットレスの下に入れるときは、手掌を下にする。', exp_jp: '手のひらを下にして入れることで、シーツをしっかり押し込みやすくなります。', exp_id: 'Memasukkan dengan telapak tangan menghadap bawah memudahkan mendorong seprai dengan kuat ke bawah kasur.', correct: true },
      { n: 5, text: 'シーツ交換は、両膝を伸ばしたままで行う。', exp_jp: '腰痛予防のため、膝を曲げてボディメカニクスを意識して行うべきです。', exp_id: 'Untuk mencegah nyeri punggung, lutut sebaiknya ditekuk sesuai prinsip mekanika tubuh, bukan diluruskan terus.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 1, difficulty: 'hard', exam_frequency: 'high',
    question_text_jp:
      'Ｂさん（90歳、女性、要介護3）は、アルツハイマー型認知症（dementia of the Alzheimer’s type）があり、介護老人福祉施設に入所している。テレビを見ることが好きで、日中はお茶を飲みながら、テレビを見て過ごすことが日課である。1週間前からＢさんは、夜中に目が覚めたり、3時ごろに起きたりと、不眠が続いている。2時間ほどしか寝ていない日もある。ある日、Ｂさんは、「昼間、眠くてしかたがない。からだがだるい」と介護福祉職に話した。\n次の記述のうち、Ｂさんに安眠を促すための介護福祉職の対応として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([
      ['要介護', 'ようかいご'], ['介護老人福祉施設', 'かいごろうじんふくししせつ'], ['入所', 'にゅうしょ'], ['日課', 'にっか'],
      ['夜中', 'よなか'], ['不眠', 'ふみん'], ['安眠', 'あんみん'], ['促', 'うなが'],
    ]),
    options: [
      { n: 1, text: '午前中、太陽の光を浴びることを勧める。', exp_jp: '朝の日光を浴びることは体内時計を整え、夜間の睡眠の質を改善する効果があります。', exp_id: 'Terkena sinar matahari pagi membantu mengatur jam biologis dan memperbaiki kualitas tidur malam.', correct: true },
      { n: 2, text: '昼間眠いときは、1時間以上の昼寝を勧める。', exp_jp: '長い昼寝は夜間の睡眠に悪影響を与えるため、20〜30分程度の短い昼寝が推奨されます。', exp_id: 'Tidur siang lama mengganggu tidur malam; disarankan tidur siang singkat 20-30 menit.' },
      { n: 3, text: '夕食後、すぐに寝ることを勧める。', exp_jp: '消化への影響や生活リズムの乱れにつながるため適切ではありません。', exp_id: 'Berisiko mengganggu pencernaan dan ritme hidup, kurang tepat.' },
      { n: 4, text: '寝る前に、介護福祉職の判断で睡眠薬を勧める。', exp_jp: '薬剤に関する判断は医師が行うべきで、介護福祉職の業務範囲外です。', exp_id: 'Keputusan soal obat adalah wewenang dokter, di luar tugas pekerja kaigo.' },
      { n: 5, text: '夜眠れないときは、居室でテレビを見ることを勧める。', exp_jp: 'テレビの光刺激は覚醒を促すため、かえって睡眠を妨げます。', exp_id: 'Cahaya TV justru merangsang keterjagaan, mengganggu tidur.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 5, difficulty: 'hard', exam_frequency: 'high',
    question_text_jp: '終末期の介護に関する次の記述のうち、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['終末期', 'しゅうまつき'], ['介護', 'かいご']]),
    options: [
      { n: 1, text: '決まった時間に食事を提供する。', exp_jp: '終末期は食欲不振が多いため、本人のペースに合わせるべきです。', exp_id: 'Tahap akhir hidup sering disertai kehilangan nafsu makan, sebaiknya disesuaikan ritme penderita.' },
      { n: 2, text: '部屋の換気は控えるようにする。', exp_jp: '快適な環境を保つため、適切な換気は必要です。', exp_id: 'Ventilasi yang wajar tetap diperlukan demi kenyamanan ruangan.' },
      { n: 3, text: '無反応のときは無言で静かに介護を行う。', exp_jp: '反応がなくても聴覚は最後まで保たれるとされており、声かけを続けることが推奨されます。', exp_id: 'Meski tidak ada respons, pendengaran diyakini bertahan hingga akhir, jadi tetap dianjurkan berbicara.' },
      { n: 4, text: '呼吸困難時は、顎を下げて頭部を前屈させた仰臥位｛ぎょうがい｝（背臥位｛はいがい｝）にする。', exp_jp: '呼吸困難時は気道確保のため、頭部を後屈させるか上体を挙上させる体位が適切です。', exp_id: 'Saat sesak napas, posisi kepala mendongak atau tubuh bagian atas ditinggikan lebih tepat untuk membuka jalan napas.' },
      { n: 5, text: 'せん妄によって話のつじつまが合わないときは、否定せずに受け止める。', exp_jp: '終末期のせん妄には、無理に訂正せず受容的に関わることが基本です。', exp_id: 'Untuk delirium di tahap akhir hidup, dasarnya adalah menerima tanpa memaksa mengoreksi.', correct: true },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 4, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp:
      '次のうち、キューブラー・ロス（Kubler-Ross, E.）が提唱した終末期にある人の死の受容過程のうち、「死は避けられないと知り、さまざまな喪失感を抱く段階」に該当するものとして、適切なものを1つ選びなさい。',
    furigana_map: fm([['提唱', 'ていしょう'], ['終末期', 'しゅうまつき'], ['死', 'し'], ['受容過程', 'じゅようかてい'], ['避', 'さ'], ['喪失感', 'そうしつかん'], ['段階', 'だんかい']]),
    options: [
      { n: 1, text: '否認', exp_jp: '否認は「そんなはずはない」と事実を受け入れられない初期の段階です。', exp_id: 'Penyangkalan adalah tahap awal "tidak mungkin ini terjadi", belum menerima fakta.' },
      { n: 2, text: '怒り', exp_jp: '怒りは「なぜ自分が」という感情がわく段階です。', exp_id: 'Tahap marah adalah munculnya perasaan "kenapa harus aku".' },
      { n: 3, text: '取り引き', exp_jp: '取り引きは「〜すれば助かるかもしれない」と何かにすがろうとする段階です。', exp_id: 'Tahap tawar-menawar adalah berharap "kalau aku lakukan X, mungkin bisa selamat".' },
      { n: 4, text: '抑うつ', exp_jp: '抑うつは、死が避けられないと悟り、さまざまな喪失感や悲しみに沈む段階です。', exp_id: 'Tahap depresi adalah menyadari kematian tak terelakkan dan tenggelam dalam berbagai rasa kehilangan.', correct: true },
      { n: 5, text: '受容', exp_jp: '受容は、最終的に死を静かに受け入れる段階です。', exp_id: 'Tahap penerimaan adalah akhirnya menerima kematian dengan tenang.' },
    ],
  },
  {
    kamoku_id: 6, correct_answer: 2, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp:
      'Ｃさん（58歳、男性）は、アテトーゼ型（athetosis）の脳性麻痺｛のうせいまひ｝（cerebral palsy）がある。腕、脚、体幹の筋肉は不随意的にゆっくりと動くことが多く、手指を細かく動かすことは難しい。言葉をはっきり発音することが困難であるが、音の聞き取りはできる。\n次のうち、Ｃさんが使用している情報・意思疎通支援用具として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([
      ['脳性麻痺', 'のうせいまひ'], ['腕', 'うで'], ['脚', 'あし'], ['体幹', 'たいかん'], ['筋肉', 'きんにく'], ['不随意的', 'ふずいいてき'],
      ['手指', 'しゅし'], ['発音', 'はつおん'], ['困難', 'こんなん'], ['聞', 'き'], ['取', 'と'], ['情報', 'じょうほう'],
      ['意思疎通支援用具', 'いしそつうしえんようぐ'],
    ]),
    options: [
      { n: 1, text: '福祉電話', exp_jp: '福祉電話は主に聴覚障害者向けの電話（文字表示等）で、Ｃさんの聴力は正常なため必要ではありません。', exp_id: 'Telepon kesejahteraan terutama untuk tunarungu (tampilan teks, dll.); pendengaran Cさん normal jadi tidak diperlukan.' },
      { n: 2, text: '携帯用会話補助装置', exp_jp: '発話が困難でも理解力は保たれている人向けの意思伝達装置で、Ｃさんの状態（発音困難・聞き取り可能）に合致します。', exp_id: 'Alat bantu komunikasi portabel untuk orang yang sulit bicara tapi pemahamannya baik — cocok dengan kondisi Cさん (sulit mengucap, tapi bisa mendengar).', correct: true },
      { n: 3, text: '人工喉頭', exp_jp: '人工喉頭は喉頭を摘出した人向けの発声補助具で、脳性麻痺による構音障害とは異なります。', exp_id: 'Laring buatan untuk orang yang laringnya diangkat, berbeda dari gangguan artikulasi akibat cerebral palsy.' },
      { n: 4, text: '助聴器', exp_jp: '助聴器は聴覚障害者向けの用具で、Ｃさんの聴力は正常なため必要ではありません。', exp_id: 'Alat bantu dengar untuk tunarungu; pendengaran Cさん normal jadi tidak diperlukan.' },
      { n: 5, text: '点字器', exp_jp: '点字器は視覚障害者向けの用具で、Ｃさんの視覚とは関係ありません。', exp_id: 'Alat menulis braille untuk tunanetra, tidak berkaitan dengan penglihatan Cさん.' },
    ],
  },
]
