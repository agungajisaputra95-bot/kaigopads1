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
  { kamoku_id: 6, kanji: 'ヒートショック', furigana: 'ひーとしょっく', meaning_id: 'Heat shock — reaksi tubuh berbahaya akibat perubahan suhu mendadak (misal antara kamar hangat dan toilet dingin)', example_sentence_jp: '冬場は、居室とトイレの温度差によるヒートショックに注意する。', example_sentence_id: 'Musim dingin, waspada heat shock akibat selisih suhu kamar dan toilet.' },
  { kamoku_id: 6, kanji: 'アイスブレーキング', furigana: 'あいすぶれーきんぐ', meaning_id: 'Ice breaking — aktivitas pembuka untuk mencairkan suasana kaku sebelum kegiatan utama', example_sentence_jp: 'レクリエーションの最初にアイスブレーキングを行う。', example_sentence_id: 'Melakukan ice breaking di awal kegiatan rekreasi.' },
  { kamoku_id: 6, kanji: 'ガーグルベースン', furigana: 'がーぐるべーすん', meaning_id: 'Baskom kumur — alat berbentuk khusus diletakkan di bawah dagu untuk berkumur sambil berbaring', example_sentence_jp: 'ベッド上の口腔ケアでガーグルベースンを使用する。', example_sentence_id: 'Memakai baskom kumur saat perawatan mulut di atas ranjang.' },
  { kamoku_id: 6, kanji: '3動作歩行', furigana: 'さんどうさほこう', meaning_id: 'Jalan 3 langkah — urutan tongkat → kaki lumpuh → kaki sehat, pola jalan dengan tongkat bagi penderita hemiplegia', example_sentence_jp: '多点杖を使い、3動作歩行で移動する。', example_sentence_id: 'Berjalan dengan pola 3 langkah memakai tongkat multi-titik.' },
  { kamoku_id: 6, kanji: 'ノーリフティングケア', furigana: 'のーりふてぃんぐけあ', meaning_id: 'No-lifting care — perawatan tanpa mengangkat tubuh secara manual, memakai alat bantu (sliding board, dll.)', example_sentence_jp: 'ノーリフティングケアの考え方に基づき、スライディングボードを活用する。', example_sentence_id: 'Memakai sliding board berdasarkan prinsip no-lifting care.' },
  { kamoku_id: 6, kanji: '肘支点法', furigana: 'ひじしてんほう', meaning_id: 'Metode bertumpu siku — cara bangun dari posisi miring dengan bertumpu pada siku sisi sehat', example_sentence_jp: '右側臥位から肘支点法で端座位になる。', example_sentence_id: 'Bangun ke posisi duduk dari posisi miring kanan dengan metode bertumpu siku.' },
  { kamoku_id: 6, kanji: '誤嚥性肺炎', furigana: 'ごえんせいはいえん', meaning_id: 'Pneumonia aspirasi — infeksi paru akibat makanan/cairan masuk ke saluran napas, dicegah dengan perawatan mulut', example_sentence_jp: '歯みがきは誤嚥性肺炎の予防につながる。', example_sentence_id: 'Menyikat gigi membantu mencegah pneumonia aspirasi.' },
  { kamoku_id: 6, kanji: '前頭側頭型認知症', furigana: 'ぜんとうそくとうがたにんちしょう', meaning_id: 'Demensia frontotemporal — sering disertai perilaku impulsif/disinhibisi seperti makan berturut-turut', example_sentence_jp: '前頭側頭型認知症では、衝動的な行動がみられることがある。', example_sentence_id: 'Pada demensia frontotemporal, kadang terlihat perilaku impulsif.' },
  { kamoku_id: 6, kanji: '半身浴', furigana: 'はんしんよく', meaning_id: 'Berendam setengah badan — direkomendasikan bagi penderita penyakit jantung untuk mengurangi tekanan air', example_sentence_jp: '心疾患のある人には半身浴を勧める。', example_sentence_id: 'Menyarankan berendam setengah badan bagi penderita penyakit jantung.' },
  { kamoku_id: 6, kanji: '全身清拭', furigana: 'ぜんしんせいしき', meaning_id: 'Lap seluruh tubuh — perawatan kebersihan di atas ranjang bagi yang tidak bisa mandi', example_sentence_jp: '体調不良のときは、入浴の代わりに全身清拭を行う。', example_sentence_id: 'Saat kondisi kurang baik, mengganti mandi dengan lap seluruh tubuh.' },
  { kamoku_id: 6, kanji: '羞恥心', furigana: 'しゅうちしん', meaning_id: 'Rasa malu — perlu diperhatikan saat memakaikan popok pada lansia', example_sentence_jp: 'おむつ交換時は羞恥心に配慮する。', example_sentence_id: 'Memperhatikan rasa malu saat mengganti popok.' },
  { kamoku_id: 6, kanji: '坐薬', furigana: 'ざやく', meaning_id: 'Supositoria (obat dubur) — bisa dipasang pekerja kaigo bersertifikat, terbatas pada rute dubur (bukan vagina)', example_sentence_jp: '介護福祉士が坐薬の挿入を行う場合がある。', example_sentence_id: 'Pekerja kaigo kadang memasang supositoria bagi pengguna layanan.' },
  { kamoku_id: 6, kanji: '賞味期限', furigana: 'しょうみきげん', meaning_id: 'Best before date — patokan rasa terbaik, bukan batas keamanan mutlak (beda dari 消費期限/use-by date)', example_sentence_jp: '未開封の缶詰は、賞味期限が切れてもすぐには廃棄しない。', example_sentence_id: 'Kaleng tertutup rapat tidak langsung dibuang meski lewat tanggal best before.' },
  { kamoku_id: 6, kanji: 'キューブラー・ロス', furigana: 'きゅーぶらー・ろす', meaning_id: 'Kübler-Ross — pencetus 5 tahap penerimaan kematian: penyangkalan, marah, tawar-menawar, depresi, penerimaan', example_sentence_jp: 'キューブラー・ロスの死の受容過程を理解する。', example_sentence_id: 'Memahami proses penerimaan kematian menurut Kübler-Ross.' },
  { kamoku_id: 6, kanji: '携帯用会話補助装置', furigana: 'けいたいようかいわほじょそうち', meaning_id: 'Alat bantu komunikasi portabel — bagi orang yang sulit bicara tapi pemahamannya baik (misal cerebral palsy)', example_sentence_jp: 'アテトーゼ型脳性麻痺のＣさんは携帯用会話補助装置を使用する。', example_sentence_id: 'Cさん dengan cerebral palsy tipe athetosis memakai alat bantu komunikasi portabel.' },
]

const materialSections = [
  {
    kamoku_id: 6, order_index: 1, title_jp: '高齢者の居室環境と温度管理',
    content_jp: '高齢者は体感が鈍くなりやすいため、温度計等の客観的な指標で調整することが基本です。冬は居室とトイレの温度差によるヒートショックを防ぐため、両者の温度を近づけます。暖房使用時は空気が乾燥しやすいため加湿器を、冷房使用時も感染対策等のため適度な換気を行います。',
    content_id: 'Karena lansia cenderung kurang peka pada suhu, pengaturan sebaiknya berdasarkan termometer, bukan perasaan staf. Musim dingin, selisih suhu kamar & toilet perlu diperkecil untuk mencegah heat shock. Saat memakai pemanas, udara kering sehingga perlu humidifier; saat AC menyala, tetap perlu ventilasi wajar demi pencegahan infeksi.',
    example_jp: 'トイレに小型ヒーターを設置し、居室との温度差を減らす。', example_id: 'Memasang pemanas kecil di toilet untuk mengurangi selisih suhu dengan kamar.',
    exam_point_jp: 'ヒートショック予防（居室とトイレの温度差を縮める）が頻出。「発汗してから」「感覚で調整」は誤りになりやすい。',
    exam_point_id: 'Pencegahan heat shock (memperkecil selisih suhu kamar-toilet) sering keluar. "Setelah berkeringat" atau "berdasar perasaan" biasanya salah.',
    furigana_map: fm([['高齢者', 'こうれいしゃ'], ['体感', 'たいかん'], ['鈍', 'にぶ'], ['温度計', 'おんどけい'], ['客観的', 'きゃっかんてき'], ['指標', 'しひょう'], ['冬', 'ふゆ'], ['居室', 'きょしつ'], ['温度差', 'おんどさ'], ['防', 'ふせ'], ['近', 'ちか'], ['暖房', 'だんぼう'], ['乾燥', 'かんそう'], ['加湿器', 'かしつき'], ['冷房', 'れいぼう'], ['感染対策', 'かんせんたいさく'], ['換気', 'かんき']]),
    linkMatch: '高齢者に配慮した居室環境に関する',
  },
  {
    kamoku_id: 6, order_index: 2, title_jp: 'レクリエーションとアイスブレーキング',
    content_jp: 'アイスブレーキングは、レクリエーション活動の導入として参加者同士の緊張をほぐし、場の雰囲気を和らげることを目的とした活動です。参加を義務づけたり勝敗にこだわったりすることは、その趣旨に反します。',
    content_id: 'Ice breaking adalah kegiatan pembuka dalam rekreasi yang bertujuan mencairkan suasana kaku antar peserta. Memaksa partisipasi atau menekankan menang-kalah bertentangan dengan tujuan tersebut.',
    example_jp: '簡単な自己紹介ゲームでアイスブレーキングを行い、参加者の緊張をほぐす。', example_id: 'Melakukan ice breaking lewat permainan perkenalan sederhana untuk mencairkan suasana.',
    exam_point_jp: 'アイスブレーキングの目的＝緊張緩和。「義務づけ」「勝敗」「毎回固定」は不適切な選択肢になりやすい。',
    exam_point_id: 'Tujuan ice breaking = meredakan ketegangan. "Wajib", "menang-kalah", "selalu sama" biasanya jawaban salah.',
    furigana_map: fm([['レクリエーション活動', 'れくりえーしょんかつどう'], ['導入', 'どうにゅう'], ['参加者', 'さんかしゃ'], ['緊張', 'きんちょう'], ['雰囲気', 'ふんいき'], ['和', 'やわ'], ['目的', 'もくてき'], ['活動', 'かつどう'], ['義務', 'ぎむ'], ['勝敗', 'しょうはい'], ['趣旨', 'しゅし'], ['反', 'はん']]),
    linkMatch: 'レクリエーション活動で実施するアイスブレーキング',
  },
  {
    kamoku_id: 6, order_index: 3, title_jp: '身じたく・整容の介護技術',
    content_jp: 'ベッド上の口腔ケアではガーグルベースンを用い、寝たままうがいができるようにします。総義歯の洗浄には歯みがき剤ではなく義歯用洗浄剤を使い、耳垢の除去はピンセットではなく専門的な対応が必要です。ベッド上の洗顔は温かいタオルを、浴室での洗髪は通常のシャンプーを使用します（ドライシャンプーは入浴できないときのみ）。',
    content_id: 'Perawatan mulut di ranjang memakai baskom kumur agar bisa berkumur sambil berbaring. Pembersihan gigi palsu memakai pembersih khusus (bukan pasta gigi), dan membersihkan kotoran telinga memerlukan penanganan khusus (bukan pinset). Cuci muka di ranjang memakai handuk hangat, dan keramas di kamar mandi memakai sampo biasa (sampo kering hanya saat tidak bisa mandi).',
    example_jp: 'ベッド上で口腔ケアを行うとき、あご下にガーグルベースンを当てる。', example_id: 'Saat perawatan mulut di ranjang, meletakkan baskom kumur di bawah dagu.',
    exam_point_jp: '用具と用途の組み合わせ（ガーグルベースン＝臥床時うがい、義歯用洗浄剤＝総義歯）を正確に覚える。',
    exam_point_id: 'Hafalkan pasangan alat-fungsi (baskom kumur = berkumur sambil berbaring, pembersih gigi palsu = gigi palsu).',
    furigana_map: fm([['身じたく', 'みじたく'], ['整容', 'せいよう'], ['口腔ケア', 'こうくうけあ'], ['ガーグルベースン', 'がーぐるべーすん'], ['総義歯', 'そうぎし'], ['洗浄', 'せんじょう'], ['耳垢', 'じこう'], ['除去', 'じょきょ'], ['洗顔', 'せんがん'], ['洗髪', 'せんぱつ']]),
    linkMatch: '介護福祉職が行う身じたく・整容の介護',
  },
  {
    kamoku_id: 6, order_index: 4, title_jp: '障害特性に応じた事故防止',
    content_jp: '事故防止の対応は、障害の特性に合わせて考える必要があります。在宅酸素療法中の人のそばでは、酸素の引火性が高いため喫煙は厳禁です。パーキンソン病の人には立ち上がりやすい適度な高さのベッド、認知症の人には火の消し忘れリスクの低いＩＨクッキングヒーターが望ましいなど、障害と対策を正しく対応させることが重要です。',
    content_id: 'Pencegahan kecelakaan perlu dipikirkan sesuai karakteristik disabilitas. Di dekat pengguna terapi oksigen di rumah, merokok sangat dilarang karena oksigen mudah terbakar. Bagi penderita Parkinson, ranjang dengan tinggi wajar agar mudah berdiri; bagi penderita demensia, kompor induksi lebih aman dari risiko lupa mematikan api — penting mencocokkan disabilitas dengan langkah pencegahan yang tepat.',
    example_jp: '在宅酸素療法中のＡさんの部屋では、家族にも喫煙を控えてもらう。', example_id: 'Di kamar Aさん yang menjalani terapi oksigen di rumah, keluarga juga diminta tidak merokok.',
    exam_point_jp: '酸素療法中＝火気厳禁が最頻出。障害特性と対策がずれている選択肢（視覚障害に頭受け台等）に注意。',
    exam_point_id: 'Terapi oksigen = dilarang api paling sering keluar. Waspadai pilihan yang tidak cocok (misal penyangga kepala untuk disabilitas penglihatan).',
    furigana_map: fm([['障害', 'しょうがい'], ['特性', 'とくせい'], ['事故防止', 'じこぼうし'], ['在宅酸素療法', 'ざいたくさんそりょうほう'], ['引火性', 'いんかせい'], ['喫煙', 'きつえん'], ['厳禁', 'げんきん'], ['立', 'た'], ['上', 'あ'], ['高', 'たか']]),
    linkMatch: '障害のある人への事故防止の対応',
  },
  {
    kamoku_id: 6, order_index: 5, title_jp: '杖歩行の介助（3動作歩行）',
    content_jp: '片麻痺の人が杖を使って歩く3動作歩行は、「杖→患側の足→健側の足」の順で行います。右片麻痺の場合は患側が右足なので、「杖、右足、左足」の順になります。健側の足を先に出す、杖を最後に出すなどの順序は誤りです。',
    content_id: 'Jalan 3 langkah memakai tongkat bagi penderita hemiplegia dilakukan dengan urutan "tongkat → kaki lumpuh → kaki sehat". Untuk lumpuh kanan, sisi lumpuh adalah kaki kanan, jadi urutannya "tongkat, kanan, kiri". Urutan yang mendahulukan kaki sehat atau meletakkan tongkat terakhir salah.',
    example_jp: '右片麻痺のＡさんに、「杖、右足、左足」の順で歩くよう説明する。', example_id: 'Menjelaskan kepada Aさん yang lumpuh kanan untuk berjalan dengan urutan "tongkat, kaki kanan, kaki kiri".',
    exam_point_jp: '3動作歩行＝杖→患側→健側の順、を左右どちらの麻痺でも即座に当てはめられるよう練習しておく。',
    exam_point_id: 'Jalan 3 langkah = urutan tongkat→sisi lumpuh→sisi sehat. Latih agar bisa langsung diterapkan baik untuk lumpuh kanan maupun kiri.',
    furigana_map: fm([['片麻痺', 'かたまひ'], ['杖', 'つえ'], ['3動作歩行', 'さんどうさほこう'], ['患側', 'かんそく'], ['健側', 'けんそく'], ['順', 'じゅん'], ['右片麻痺', 'みぎかたまひ'], ['誤', 'あやま']]),
    linkMatch: '多点杖｛たてんづえ｝を使用して3動作歩行',
  },
  {
    kamoku_id: 6, order_index: 6, title_jp: 'ノーリフティングケアと起き上がりの介助',
    content_jp: 'ノーリフティングケアとは、利用者を抱え上げたり引き寄せたりせず、スライディングボード等の福祉用具を活用して移乗する考え方です。起き上がりの介助では、健側の肘を支点に自力で上体を起こしてもらう「肘支点法」など、残存機能を生かした方法が適切です。頸部を支えて起こす、患側を下にして支える等は避けます。',
    content_id: 'No-lifting care adalah prinsip memindahkan pengguna layanan memakai alat bantu seperti sliding board, tanpa mengangkat atau menarik tubuh secara manual. Untuk bantu bangun, metode bertumpu siku sisi sehat ("metode siku") yang memanfaatkan fungsi tersisa lebih tepat. Hindari menopang leher atau menopang dari sisi lumpuh.',
    example_jp: 'スライディングボードを使い、抱え上げずに車いすへ移乗する。', example_id: 'Memakai sliding board untuk pindah ke kursi roda tanpa mengangkat tubuh.',
    exam_point_jp: '「抱える」「引き寄せる」「抱きかかえる」は身体的負担が大きく不適切。福祉用具の活用と残存機能を生かす方法が正解になりやすい。',
    exam_point_id: '"Mengangkat", "menarik", "memeluk" membebani fisik, tidak tepat. Pemakaian alat bantu & memanfaatkan fungsi tersisa biasanya jawaban benar.',
    furigana_map: fm([['ノーリフティングケア', 'のーりふてぃんぐけあ'], ['抱', 'かか'], ['上', 'あ'], ['引', 'ひ'], ['寄', 'よ'], ['福祉用具', 'ふくしようぐ'], ['活用', 'かつよう'], ['移乗', 'いじょう'], ['起', 'お'], ['健側', 'けんそく'], ['肘', 'ひじ'], ['支点', 'してん'], ['残存機能', 'ざんぞんきのう'], ['頸部', 'けいぶ'], ['患側', 'かんそく'], ['避', 'さ']]),
    linkMatch: 'ノーリフティングケアに関する次の記述',
  },
  {
    kamoku_id: 6, order_index: 7, title_jp: '口腔ケアの基礎知識',
    content_jp: '歯みがきは口腔内細菌を減らし誤嚥性肺炎などの感染予防になります。口腔内の乾燥はむしろ口臭の原因となり、唾液腺マッサージは唾液分泌を促進します。実施時は誤嚥予防のため顎を引いた姿勢をとり、歯みがき前にうがいをして汚れを浮かせ、歯ブラシは小刻みに動かし、舌ブラシは奥から手前に動かして嘔吐反射を防ぎます。総義歯は外しやすい下顎から先に外します。',
    content_id: 'Menyikat gigi mengurangi bakteri mulut dan mencegah infeksi seperti pneumonia aspirasi. Mulut kering justru memicu bau mulut, sementara pijat kelenjar air liur meningkatkan sekresinya. Saat pelaksanaan, dagu ditarik ke bawah untuk mencegah tersedak, berkumur dulu sebelum sikat gigi untuk melunakkan kotoran, sikat digerakkan kecil-kecil, dan sikat lidah digerakkan dari belakang ke depan untuk menghindari refleks muntah. Gigi palsu rahang bawah dilepas lebih dulu karena lebih mudah.',
    example_jp: '歯みがきの前にうがいをしてもらい、口腔内を湿らせておく。', example_id: 'Meminta berkumur sebelum sikat gigi untuk membasahi mulut lebih dulu.',
    exam_point_jp: '歯みがき＝感染予防、乾燥＝口臭の原因、舌ブラシは奥から手前、という組み合わせが頻出。',
    exam_point_id: 'Kombinasi sering keluar: sikat gigi = pencegah infeksi, kering = penyebab bau mulut, sikat lidah dari belakang ke depan.',
    furigana_map: fm([['歯', 'は'], ['細菌', 'さいきん'], ['誤嚥性肺炎', 'ごえんせいはいえん'], ['感染予防', 'かんせんよぼう'], ['乾燥', 'かんそう'], ['口臭', 'こうしゅう'], ['唾液腺', 'だえきせん'], ['分泌', 'ぶんぴつ'], ['促進', 'そくしん'], ['顎', 'あご'], ['引', 'ひ'], ['姿勢', 'しせい'], ['小刻', 'こきざ'], ['舌', 'した'], ['嘔吐反射', 'おうとはんしゃ'], ['総義歯', 'そうぎし']]),
    linkMatch: '口腔｛こうくう｝ケアに関する次の記述',
  },
  {
    kamoku_id: 6, order_index: 8, title_jp: '熱中症予防のための水分補給',
    content_jp: '高齢者は喉の渇きを感じにくいため、渇く前の定期的な水分補給が重要です。むせやすい人にはとろみをつけた水分（ゼリー等）が適切で、起床時の水分摂取は脱水対策として推奨されます。食事に含まれる水分も一日の摂取量に含め、発汗が多いときは塩分を含んだ飲み物で電解質を補います。',
    content_id: 'Karena lansia kurang peka pada rasa haus, minum air perlu dilakukan berkala sebelum terasa haus. Bagi yang mudah tersedak, cairan kental (jeli, dll.) lebih tepat, dan minum air saat bangun tidur dianjurkan sebagai antisipasi dehidrasi. Cairan dari makanan juga dihitung dalam asupan harian, dan saat banyak berkeringat, minuman bergaram membantu mengganti elektrolit.',
    example_jp: '起床後すぐにコップ1杯の水を飲んでもらう。', example_id: 'Meminta minum segelas air segera setelah bangun tidur.',
    exam_point_jp: '「渇いてから」「起床時は控える」「食事の水分を除く」は誤りになりやすい。定期的・先回りした水分補給が正解。',
    exam_point_id: '"Setelah haus", "hindari saat bangun", "kecualikan air dari makanan" biasanya salah. Minum air berkala & proaktif adalah jawaban benar.',
    furigana_map: fm([['熱中症対策', 'ねっちゅうしょうたいさく'], ['水分補給', 'すいぶんほきゅう'], ['喉', 'のど'], ['渇', 'かわ'], ['定期的', 'ていきてき'], ['むせ', 'むせ'], ['とろみ', 'とろみ'], ['起床時', 'きしょうじ'], ['脱水', 'だっすい'], ['発汗', 'はっかん'], ['塩分', 'えんぶん'], ['電解質', 'でんかいしつ']]),
    linkMatch: '熱中症対策のために、介護福祉職が行う水分補給',
  },
  {
    kamoku_id: 6, order_index: 9, title_jp: '前頭側頭型認知症の症状に応じた食事の工夫',
    content_jp: '前頭側頭型認知症では、脱抑制や衝動性から、飲み込む前に次々と食べ物を口に入れてしまう行動がみられることがあります。この場合、食器に少量ずつ盛りつけて一度に目に入る量を制限することで、衝動的な行動を抑える工夫になります。すべての料理を並べる、大きなスプーンにするなどは、かえって行動を助長したり窒息リスクを高めたりするため避けます。',
    content_id: 'Pada demensia frontotemporal, karena disinhibisi & impulsivitas, kadang terlihat perilaku memasukkan makanan berturut-turut sebelum menelan. Dalam situasi ini, menyajikan sedikit demi sedikit membatasi jumlah makanan yang terlihat sekaligus, membantu menekan perilaku impulsif. Menata semua hidangan sekaligus atau memakai sendok besar justru memperparah perilaku atau meningkatkan risiko tersedak, sebaiknya dihindari.',
    example_jp: '料理を小皿に少しずつ分けて、順番に提供する。', example_id: 'Membagi makanan ke piring kecil sedikit demi sedikit, disajikan bergiliran.',
    exam_point_jp: '前頭側頭型認知症＝脱抑制・衝動性が特徴的症状。「少量ずつ提供」が事故防止の工夫として頻出。',
    exam_point_id: 'Demensia frontotemporal = gejala khasnya disinhibisi & impulsivitas. "Menyajikan sedikit demi sedikit" sering keluar sebagai langkah pencegahan.',
    furigana_map: fm([['前頭側頭型認知症', 'ぜんとうそくとうがたにんちしょう'], ['脱抑制', 'だつよくせい'], ['衝動性', 'しょうどうせい'], ['飲', 'の'], ['込', 'こ'], ['少量', 'しょうりょう'], ['盛', 'も'], ['付', 'つ'], ['制限', 'せいげん'], ['助長', 'じょちょう'], ['窒息', 'ちっそく'], ['避', 'さ']]),
    linkMatch: '前頭側頭型認知症（frontotemporal dementia）と診断',
  },
  {
    kamoku_id: 6, order_index: 10, title_jp: 'パーキンソン病の人への食事介護',
    content_jp: 'パーキンソン病で上肢に震えがあるが自力摂取が可能な人には、片側の縁が高くなっている皿など、震える手でも食べ物をすくいやすく、こぼれにくい自助具が有効です。誤嚥予防には前傾姿勢が基本で、後傾姿勢や踵を浮かせる姿勢は不安定・危険です。',
    content_id: 'Bagi penderita Parkinson dengan tangan gemetar tapi masih bisa makan sendiri, alat bantu seperti piring bertepi tinggi di satu sisi membantu mengambil makanan dengan tangan gemetar tanpa banyak tumpah. Posisi condong ke depan adalah dasar pencegahan tersedak; posisi condong ke belakang atau tumit terangkat berbahaya & tidak stabil.',
    example_jp: '縁の高い皿を使い、震える手でもスプーンで食べ物をすくいやすくする。', example_id: 'Memakai piring bertepi tinggi agar tangan gemetar tetap mudah menyendok makanan.',
    exam_point_jp: '自助具の工夫（縁の高い皿）が正解になりやすい。後傾姿勢・踵を浮かせるは誤嚥・転倒リスクで不適切。',
    exam_point_id: 'Alat bantu (piring bertepi tinggi) biasanya jawaban benar. Posisi condong belakang/tumit terangkat berisiko tersedak/jatuh, tidak tepat.',
    furigana_map: fm([['パーキンソン病', 'ぱーきんそんびょう'], ['上肢', 'じょうし'], ['震', 'ふる'], ['自力摂取', 'じりきせっしゅ'], ['縁', 'ふち'], ['皿', 'さら'], ['自助具', 'じじょぐ'], ['誤嚥予防', 'ごえんよぼう'], ['前傾姿勢', 'ぜんけいしせい'], ['後傾', 'こうけい'], ['踵', 'かかと']]),
    linkMatch: 'パーキンソン病（Parkinson disease）で上肢の震え',
  },
  {
    kamoku_id: 6, order_index: 11, title_jp: '入浴の生理作用を生かした介護',
    content_jp: '入浴には温熱作用・静水圧作用・浮力作用があります。浮力を生かせば、浴槽内で関節への負担を軽くして運動しやすくなります。ただし高血圧の人には高温浴を避け（血圧上昇のリスク）、心疾患の人には水圧の負担が少ない半身浴を勧めます。食事の直前直後の入浴も、血流の変化が重なり体に負担がかかるため避けます。',
    content_id: 'Mandi punya efek termal, tekanan air statis, dan daya apung. Memanfaatkan daya apung membantu meringankan beban sendi & memudahkan gerakan di dalam bak mandi. Namun, bagi penderita hipertensi hindari air panas (risiko tekanan darah naik), dan bagi penderita penyakit jantung disarankan berendam setengah badan agar tekanan air lebih ringan. Mandi tepat sebelum/sesudah makan juga dihindari karena tumpang tindih perubahan aliran darah membebani tubuh.',
    example_jp: '浴槽内で、無理のない範囲で膝の曲げ伸ばし運動をしてもらう。', example_id: 'Meminta melakukan gerakan tekuk-luruskan lutut ringan di dalam bak mandi.',
    exam_point_jp: '浮力＝関節運動がしやすくなる、高血圧＝ぬるめの湯、心疾患＝半身浴、という組み合わせを覚える。',
    exam_point_id: 'Hafalkan: daya apung = memudahkan gerak sendi, hipertensi = air suam, penyakit jantung = berendam setengah badan.',
    furigana_map: fm([['入浴', 'にゅうよく'], ['作用', 'さよう'], ['温熱作用', 'おんねつさよう'], ['静水圧作用', 'せいすいあつさよう'], ['浮力作用', 'ふりょくさよう'], ['浴槽', 'よくそう'], ['関節', 'かんせつ'], ['負担', 'ふたん'], ['高血圧', 'こうけつあつ'], ['血圧上昇', 'けつあつじょうしょう'], ['心疾患', 'しんしっかん'], ['半身浴', 'はんしんよく'], ['血流', 'けつりゅう']]),
    linkMatch: '入浴の作用を生かした、高齢者への入浴の介護',
  },
  {
    kamoku_id: 6, order_index: 12, title_jp: '安全な入浴環境の整備',
    content_jp: '下肢筋力が低下した人が安全に入浴できる環境として、緊急時に対応しやすい引き戸、またぎやすい浴槽の縁の高さ（目安約40cm）、動作に応じた水平・垂直の手すりの設置などが重要です。開き戸や、姿勢を保持しにくい形状の浴槽は避けます。',
    content_id: 'Bagi orang dengan kekuatan kaki menurun, lingkungan mandi yang aman meliputi: pintu geser (mudah ditangani saat darurat), tinggi tepi bak mandi yang mudah dilangkahi (sekitar 40 cm), serta pegangan horizontal & vertikal sesuai gerakan. Hindari pintu ayun atau bentuk bak mandi yang sulit menopang postur duduk.',
    example_jp: '浴槽の出入りに合わせて、縦と横の手すりを組み合わせて設置する。', example_id: 'Memasang kombinasi pegangan vertikal & horizontal sesuai gerakan keluar-masuk bak mandi.',
    exam_point_jp: '引き戸・約40cmの縁の高さ・水平垂直の手すり、という具体的な数値と形状を覚える。',
    exam_point_id: 'Hafalkan angka & bentuk konkretnya: pintu geser, tinggi tepi ~40cm, pegangan horizontal & vertikal.',
    furigana_map: fm([['下肢筋力', 'かしきんりょく'], ['低下', 'ていか'], ['入浴', 'にゅうよく'], ['環境', 'かんきょう'], ['緊急時', 'きんきゅうじ'], ['引', 'ひ'], ['戸', 'と'], ['浴槽', 'よくそう'], ['縁', 'ふち'], ['高', 'たか'], ['手', 'て'], ['すり', 'すり'], ['設置', 'せっち'], ['姿勢', 'しせい'], ['保持', 'ほじ']]),
    linkMatch: '下肢筋力が低下して介護を必要とする人の入浴に適した環境',
  },
  {
    kamoku_id: 6, order_index: 13, title_jp: '清拭の基本技術',
    content_jp: '体調不良で入浴できない人へのベッド上清拭では、保温のため窓を閉め、お湯は肌に触れるまでに冷めることを見越して約50℃程度で準備します。側臥位にするときは健側を下にして安定させ、蒸しタオルで拭いた後は必ず乾いたタオルで水分を拭き取り、気化熱による冷えを防ぎます。',
    content_id: 'Saat lap tubuh di ranjang bagi yang tidak bisa mandi karena kurang sehat, jendela ditutup untuk menjaga suhu, dan air disiapkan sekitar 50°C karena akan mendingin sebelum menyentuh kulit. Saat memiringkan tubuh, sisi sehat di bawah agar stabil, dan setelah dilap dengan handuk hangat, selalu dikeringkan dengan handuk kering untuk mencegah kedinginan akibat penguapan.',
    example_jp: '洗面器のお湯は、肌に触れたときにちょうどよい温度になるよう、やや熱めに準備する.', example_id: 'Air di baskom disiapkan agak panas agar suhunya pas saat menyentuh kulit.',
    exam_point_jp: 'お湯は約50℃（触れる前に冷めるため）、側臥位は健側を下、拭いた後は乾いたタオルで水分を取る、という3点セット。',
    exam_point_id: '3 poin: air sekitar 50°C (karena mendingin sebelum menyentuh), posisi miring dengan sisi sehat di bawah, dikeringkan dengan handuk kering setelah dilap.',
    furigana_map: fm([['体調不良', 'たいちょうふりょう'], ['入浴', 'にゅうよく'], ['清拭', 'せいしき'], ['保温', 'ほおん'], ['冷', 'さ'], ['側臥位', 'そくがい'], ['健側', 'けんそく'], ['安定', 'あんてい'], ['水分', 'すいぶん'], ['気化熱', 'きかねつ']]),
    linkMatch: 'ベッド上で行う全身清拭の方法',
  },
  {
    kamoku_id: 6, order_index: 14, title_jp: 'おむつ使用と尊厳への配慮',
    content_jp: 'おむつは失禁を防ぐものではなく失禁への対応策であり、使用する本人の羞恥心への配慮が最も重要です。皮膚トラブル予防のため定期的な交換が必要で、家族の都合よりも本人の尊厳を優先します。',
    content_id: 'Popok bukan mencegah inkontinensia itu sendiri, melainkan cara menanganinya, dan yang paling penting adalah memperhatikan rasa malu penggunanya. Perlu diganti berkala untuk mencegah masalah kulit, dan martabat penggunanya diutamakan di atas kepentingan keluarga.',
    example_jp: 'おむつ交換時は、カーテンを閉めるなどプライバシーに配慮する。', example_id: 'Saat mengganti popok, menutup tirai demi menjaga privasi.',
    exam_point_jp: '羞恥心への配慮が最も重要という点が頻出。「防ぐことができる」「1日中同じ」「家族都合優先」は誤り。',
    exam_point_id: 'Poin yang sering keluar: memperhatikan rasa malu paling penting. "Mencegah inkontinensia", "sama seharian", "utamakan keluarga" biasanya salah.',
    furigana_map: fm([['同居', 'どうきょ'], ['高齢者', 'こうれいしゃ'], ['おむつ', 'おむつ'], ['家族介護者', 'かぞくかいごしゃ'], ['尿失禁', 'にょうしっきん'], ['防', 'ふせ'], ['対応策', 'たいおうさく'], ['羞恥心', 'しゅうちしん'], ['配慮', 'はいりょ'], ['皮膚', 'ひふ'], ['交換', 'こうかん'], ['尊厳', 'そんげん'], ['優先', 'ゆうせん']]),
    linkMatch: '同居の高齢者におむつを使用する家族介護者',
  },
  {
    kamoku_id: 6, order_index: 15, title_jp: 'ポータブルトイレでの排泄介助',
    content_jp: 'ポータブルトイレ使用時は、前かがみの姿勢が腹圧をかけやすく排泄を助けます。下には床に固定できる防水シートを使い（新聞紙はずれやすく不適切）、可能な限り立位・端座位でズボン等を下ろし、プライバシーに配慮して適度な距離を取りながら見守ります。陰部の清拭も可能であればトイレ上で行います。',
    content_id: 'Saat memakai toilet portabel, posisi condong ke depan memudahkan menekan perut & membantu buang air. Di bawahnya memakai alas anti-air yang bisa difiksasi (koran mudah bergeser, tidak tepat), sebaiknya menurunkan celana sambil berdiri/duduk jika memungkinkan, dan mengawasi dari jarak wajar demi privasi. Membersihkan area intim pun sebaiknya di atas toilet jika bisa.',
    example_jp: 'ポータブルトイレの下に、床に固定できる防水シートを敷く。', example_id: 'Meletakkan alas anti-air yang bisa difiksasi ke lantai di bawah toilet portabel.',
    exam_point_jp: '前かがみ姿勢が排泄を助けるという点が頻出。新聞紙・臥床のまま脱衣・後ろに立って待つ、は不適切。',
    exam_point_id: 'Posisi condong ke depan membantu buang air, sering keluar. Koran, melepas pakaian sambil berbaring, atau berdiri menunggu di belakang — semua tidak tepat.',
    furigana_map: fm([['ポータブルトイレ', 'ぽーたぶるといれ'], ['排泄', 'はいせつ'], ['前', 'まえ'], ['腹圧', 'ふくあつ'], ['床', 'ゆか'], ['固定', 'こてい'], ['防水シート', 'ぼうすいしーと'], ['立位', 'りつい'], ['端座位', 'たんざい'], ['配慮', 'はいりょ'], ['陰部', 'いんぶ'], ['清拭', 'せいしき']]),
    linkMatch: 'ポータブルトイレを使用するときの排泄｛はいせつ｝の介護',
  },
  {
    kamoku_id: 6, order_index: 16, title_jp: '坐薬を用いた医療的ケアの範囲',
    content_jp: '介護福祉士が扱えるのは肛門からの坐薬に限られ、膣坐薬は対象外です。坐薬は体温で溶けるため涼しい場所で保管し、通常は尖った方から挿入します。挿入時は力を入れないようリラックスを促し、下剤以外の坐薬は薬剤が排出されないよう先に排泄を済ませてから挿入します。',
    content_id: 'Yang boleh ditangani pekerja kaigo hanya supositoria dubur, bukan vagina. Supositoria disimpan di tempat sejuk (mudah meleleh suhu tubuh), umumnya dimasukkan dari ujung runcing. Saat pemasangan, penderita diminta rileks (bukan mengejan), dan supositoria selain pencahar dipasang setelah BAB agar obat tidak ikut keluar.',
    example_jp: '解熱の坐薬を使うときは、先にトイレを済ませてもらう。', example_id: 'Saat memakai supositoria penurun demam, meminta BAB dulu sebelumnya.',
    exam_point_jp: '肛門坐薬のみ対応可（膣坐薬は不可）、下剤以外は排泄後に挿入、という2点が頻出。',
    exam_point_id: '2 poin sering keluar: hanya boleh menangani supositoria dubur (bukan vagina), selain pencahar dipasang setelah BAB.',
    furigana_map: fm([['坐薬', 'ざやく'], ['介護福祉士', 'かいごふくしし'], ['肛門', 'こうもん'], ['膣', 'ちつ'], ['対象外', 'たいしょうがい'], ['体温', 'たいおん'], ['保管', 'ほかん'], ['挿入', 'そうにゅう'], ['下剤', 'げざい'], ['排出', 'はいしゅつ'], ['排泄', 'はいせつ']]),
    linkMatch: '坐薬｛ざやく｝（座薬）を用いた介護',
  },
  {
    kamoku_id: 6, order_index: 17, title_jp: '調味料の基本と使い方',
    content_jp: '調味料には「さしすせそ」（砂糖・塩・酢・しょうゆ・みそ）の順番があります。砂糖は分子が大きく浸透に時間がかかるため、塩より先に入れると甘みが浸透しやすくなります。うま味・照りを出すのは主に砂糖やみりん、水分を引き出し保存性を高めるのは塩の脱水作用、くさみを抜き肉を柔らかくするのは酒やみりん・酢の働きです。みそは風味が飛びやすいため最後に加えます。',
    content_id: 'Bumbu dasar Jepang punya urutan "sa-shi-su-se-so" (gula-garam-cuka-kecap-miso). Gula bermolekul besar & butuh waktu meresap, jadi dimasukkan sebelum garam agar rasa manis meresap lebih baik. Efek gurih & kilau terutama dari gula/mirin, menarik air & mengawetkan adalah efek dehidrasi garam, dan menghilangkan bau amis & melunakkan daging adalah kerja sake/mirin/cuka. Miso ditambahkan terakhir karena aromanya mudah menguap.',
    example_jp: '煮物を作るとき、最初に砂糖、その後に塩やしょうゆを加える。', example_id: 'Saat memasak semur, gula dimasukkan dulu, baru garam/kecap.',
    exam_point_jp: '「さしすせそ」の順番と、各調味料の代表的な効果（砂糖=浸透しやすさ、塩=脱水、みりん・酒=くさみ抜き）を対応させて覚える。',
    exam_point_id: 'Hafalkan urutan bumbu "sa-shi-su-se-so" dan efek khas tiap bumbu (gula=peresapan, garam=dehidrasi, mirin/sake=hilangkan bau amis).',
    furigana_map: fm([['調理', 'ちょうり'], ['基本調味料', 'きほんちょうみりょう'], ['砂糖', 'さとう'], ['塩', 'しお'], ['浸透', 'しんとう'], ['うま味', 'うまみ'], ['照', 'て'], ['水分', 'すいぶん'], ['保存性', 'ほぞんせい'], ['くさみ', 'くさみ'], ['柔', 'やわ'], ['風味', 'ふうみ']]),
    linkMatch: '調理における基本調味料の効果や使い方',
  },
  {
    kamoku_id: 6, order_index: 18, title_jp: '食品保存の基礎知識',
    content_jp: '賞味期限（美味しく食べられる目安）と消費期限（安全に食べられる期限、傷みやすい食品向け）は異なる概念で、未開封の缶詰は賞味期限切れですぐ廃棄する必要はありません。調理後カレー等は常温放置せず冷蔵保存が基本です。りんごはエチレンガスを放出するため密封して保存し、冷凍食品の再冷凍は品質劣化のリスクがあるため避けます。',
    content_id: 'Best-before date (patokan rasa terbaik) dan use-by date (batas aman dimakan, untuk makanan mudah rusak) adalah konsep berbeda; kaleng tertutup rapat tidak perlu langsung dibuang meski lewat best-before. Kari dkk. setelah dimasak sebaiknya disimpan di kulkas, bukan dibiarkan di suhu ruang. Apel melepas gas etilen sehingga disimpan tertutup rapat, dan membekukan ulang makanan beku dihindari karena berisiko menurunkan kualitas.',
    example_jp: '未開封の缶詰は、賞味期限が多少過ぎても状態を見て判断する。', example_id: 'Kaleng tertutup rapat yang sedikit lewat tanggal best-before dinilai dari kondisinya dulu.',
    exam_point_jp: '賞味期限≠消費期限、りんごは密封保存、常温放置カレーは危険、という3点が頻出。',
    exam_point_id: '3 poin sering keluar: best-before ≠ use-by, apel disimpan tertutup rapat, kari yang dibiarkan di suhu ruang berbahaya.',
    furigana_map: fm([['食品', 'しょくひん'], ['保存', 'ほぞん'], ['賞味期限', 'しょうみきげん'], ['消費期限', 'しょうひきげん'], ['未開封', 'みかいふう'], ['缶詰', 'かんづめ'], ['廃棄', 'はいき'], ['常温', 'じょうおん'], ['冷蔵保存', 'れいぞうほぞん'], ['密封', 'みっぷう'], ['冷凍食品', 'れいとうしょくひん'], ['再冷凍', 'さいれいとう'], ['劣化', 'れっか']]),
    linkMatch: '食品の保存に関する次の記述',
  },
  {
    kamoku_id: 6, order_index: 19, title_jp: '衣類の保管方法',
    content_jp: '防虫剤は成分が下に沈むため衣類の上部に置き、ドライクリーニング後のビニールは湿気がこもるため外して保管します。汚れのひどい衣類は本人・家族の意向を確認してから対応し、湿気を含んだ衣類は乾燥させてから保管します。絹製品は湿気に弱いため、湿気がたまりやすい下部より上部に保管します。',
    content_id: 'Kandungan kamper turun ke bawah, jadi diletakkan di atas tumpukan pakaian; plastik dari dry cleaning dilepas karena menjebak kelembapan. Pakaian sangat kotor ditangani setelah konfirmasi keinginan pengguna/keluarga, dan pakaian lembap dikeringkan dulu sebelum disimpan. Sutra rentan lembap, jadi disimpan di bagian atas lemari yang tidak mudah lembap.',
    example_jp: '防虫剤は、たたんだ衣類の一番上に置く。', example_id: 'Kamper diletakkan di paling atas tumpukan pakaian yang dilipat.',
    exam_point_jp: '防虫剤は上部、ビニールは外す、絹製品は上部保管、という「上に置く/外す」系の正解パターンを覚える。',
    exam_point_id: 'Hafalkan pola jawaban "diletakkan di atas / dilepas": kamper di atas, plastik dilepas, sutra disimpan di bagian atas.',
    furigana_map: fm([['衣類', 'いるい'], ['保管方法', 'ほかんほうほう'], ['防虫剤', 'ぼうちゅうざい'], ['成分', 'せいぶん'], ['沈', 'しず'], ['ドライクリーニング', 'どらいくりーにんぐ'], ['湿気', 'しっけ'], ['汚', 'よご'], ['意向', 'いこう'], ['乾燥', 'かんそう'], ['絹製品', 'きぬせいひん']]),
    linkMatch: '衣類の保管方法として',
  },
  {
    kamoku_id: 6, order_index: 20, title_jp: 'ベッドメイキングの基本',
    content_jp: 'ベッドメイキングは、ほこりが舞うため窓を開けて行い、キャスターにはストッパーをかけたままにします。シーツの中心線はマットレスの中心に合わせ、下に入れるときは手のひらを下にして押し込みます。腰痛予防のため、両膝を曲げボディメカニクスを意識して作業します。',
    content_id: 'Merapikan ranjang dilakukan dengan jendela terbuka (karena debu berterbangan), dan rem roda tetap dikunci. Garis tengah seprai disejajarkan dengan tengah kasur, dimasukkan ke bawah dengan telapak tangan menghadap bawah. Untuk mencegah nyeri punggung, lutut ditekuk sesuai prinsip mekanika tubuh.',
    example_jp: 'シーツをマットレスの下に入れるとき、手のひらを下に向けてしっかり押し込む.', example_id: 'Saat memasukkan seprai ke bawah kasur, telapak tangan menghadap bawah untuk mendorong dengan kuat.',
    exam_point_jp: '窓は開ける、ストッパーはかけたまま、手掌を下にする、膝を曲げる、という4点セットで覚える。',
    exam_point_id: 'Hafalkan 4 poin: jendela dibuka, rem tetap dikunci, telapak tangan menghadap bawah, lutut ditekuk.',
    furigana_map: fm([['ベッドメイキング', 'べっどめいきんぐ'], ['居室', 'きょしつ'], ['窓', 'まど'], ['キャスター', 'きゃすたー'], ['ストッパー', 'すとっぱー'], ['中心線', 'ちゅうしんせん'], ['マットレス', 'まっとれす'], ['手掌', 'しゅしょう'], ['腰痛', 'ようつう'], ['両膝', 'りょうひざ']]),
    linkMatch: '介護の現場で行うベッドメイキングとして',
  },
  {
    kamoku_id: 6, order_index: 21, title_jp: '認知症高齢者の睡眠支援',
    content_jp: '不眠が続く高齢者への対応は、体内時計を整えることが基本です。午前中に太陽の光を浴びると夜間の睡眠の質が改善します。昼寝は20〜30分程度の短時間にとどめ、夕食後すぐの就寝や、就寝前のテレビ、介護福祉職の判断による睡眠薬の提案は避けます。',
    content_id: 'Respons bagi lansia dengan insomnia berkelanjutan dasarnya mengatur jam biologis. Terkena sinar matahari pagi memperbaiki kualitas tidur malam. Tidur siang dibatasi 20-30 menit, dan hindari langsung tidur setelah makan malam, menonton TV sebelum tidur, atau saran obat tidur berdasar keputusan pekerja kaigo sendiri.',
    example_jp: '毎朝、カーテンを開けて日光を浴びる習慣をつける。', example_id: 'Membiasakan membuka tirai setiap pagi untuk terkena sinar matahari.',
    exam_point_jp: '午前中の日光浴が体内時計を整える、という点が頻出。長い昼寝・就寝前のテレビ・独断での睡眠薬提案は不適切。',
    exam_point_id: 'Berjemur pagi hari mengatur jam biologis, sering keluar. Tidur siang lama, TV sebelum tidur, atau saran obat tidur sepihak — semua tidak tepat.',
    furigana_map: fm([['不眠', 'ふみん'], ['高齢者', 'こうれいしゃ'], ['体内時計', 'たいないどけい'], ['午前中', 'ごぜんちゅう'], ['太陽', 'たいよう'], ['光', 'ひかり'], ['浴', 'あ'], ['夜間', 'やかん'], ['睡眠', 'すいみん'], ['質', 'しつ'], ['改善', 'かいぜん'], ['昼寝', 'ひるね'], ['短時間', 'たんじかん'], ['就寝', 'しゅうしん']]),
    linkMatch: 'Ｂさんに安眠を促すための介護福祉職の対応',
  },
  {
    kamoku_id: 6, order_index: 22, title_jp: '終末期ケアの基本姿勢',
    content_jp: '終末期は食欲不振が多いため、決まった時間ではなく本人のペースに合わせます。反応がなくても聴覚は最後まで保たれるとされ、声かけを続けることが基本です。呼吸困難時は頭部を後屈または上体を挙上させ気道を確保します。せん妄によって話のつじつまが合わないときも、否定せず受け止める受容的な関わりが大切です。',
    content_id: 'Karena tahap akhir hidup sering disertai hilang nafsu makan, disesuaikan ritme penderita, bukan waktu tetap. Meski tidak ada respons, pendengaran diyakini bertahan hingga akhir, jadi tetap dianjurkan berbicara. Saat sesak napas, kepala didongakkan atau tubuh atas ditinggikan untuk membuka jalan napas. Saat delirium membuat ucapan tidak nyambung, penerimaan tanpa menyangkal tetap penting.',
    example_jp: '反応が薄くなっても、これまでどおり声をかけながらケアを行う。', example_id: 'Meski responsnya melemah, tetap merawat sambil terus berbicara seperti biasa.',
    exam_point_jp: '聴覚は最後まで保たれる、せん妄は否定せず受け止める、という2点が頻出。呼吸困難時の体位（前屈させない）にも注意。',
    exam_point_id: '2 poin sering keluar: pendengaran bertahan hingga akhir, delirium diterima tanpa disangkal. Perhatikan juga posisi saat sesak napas (jangan menekuk ke depan).',
    furigana_map: fm([['終末期', 'しゅうまつき'], ['食欲不振', 'しょくよくふしん'], ['聴覚', 'ちょうかく'], ['声', 'こえ'], ['呼吸困難', 'こきゅうこんなん'], ['頭部', 'とうぶ'], ['後屈', 'こうくつ'], ['気道', 'きどう'], ['確保', 'かくほ'], ['せん妄', 'せんもう'], ['否定', 'ひてい'], ['受容的', 'じゅようてき']]),
    linkMatch: '終末期の介護に関する次の記述',
  },
  {
    kamoku_id: 6, order_index: 23, title_jp: 'キューブラー・ロスの死の受容過程',
    content_jp: 'キューブラー・ロスは、終末期にある人の心理を5段階（否認・怒り・取り引き・抑うつ・受容）で示しました。否認は事実を受け入れられない段階、怒りは「なぜ自分が」という段階、取り引きは何かにすがろうとする段階、抑うつは死が避けられないと悟り喪失感を抱く段階、受容は静かに受け入れる最終段階です。',
    content_id: 'Kübler-Ross menggambarkan psikologi orang di tahap akhir hidup dalam 5 tahap: penyangkalan, marah, tawar-menawar, depresi, penerimaan. Penyangkalan = tidak bisa menerima fakta, marah = "kenapa harus aku", tawar-menawar = berharap pada sesuatu, depresi = menyadari kematian tak terelakkan dan tenggelam dalam kehilangan, penerimaan = tahap akhir menerima dengan tenang.',
    example_jp: '「もう助からないんだ」と気づき、深い悲しみに沈む時期は抑うつの段階にあたる。', example_id: 'Masa menyadari "tidak akan selamat lagi" dan tenggelam dalam kesedihan mendalam adalah tahap depresi.',
    exam_point_jp: '5段階の順番（否認→怒り→取り引き→抑うつ→受容）と各段階の定義を正確に対応させて覚える。',
    exam_point_id: 'Hafalkan urutan 5 tahap (penyangkalan→marah→tawar-menawar→depresi→penerimaan) dan definisi tiap tahap dengan tepat.',
    furigana_map: fm([['キューブラー・ロス', 'きゅーぶらー・ろす'], ['終末期', 'しゅうまつき'], ['心理', 'しんり'], ['段階', 'だんかい'], ['否認', 'ひにん'], ['怒', 'いか'], ['取', 'と'], ['引', 'ひ'], ['抑', 'よく'], ['受容', 'じゅよう'], ['事実', 'じじつ'], ['喪失感', 'そうしつかん']]),
    linkMatch: '死の受容過程のうち、「死は避けられないと知り',
  },
  {
    kamoku_id: 6, order_index: 24, title_jp: '脳性麻痺の人とのコミュニケーション支援用具',
    content_jp: 'アテトーゼ型脳性麻痺で手指の細かい動きや発音が困難でも、聞き取りや理解力が保たれている人には、携帯用会話補助装置（文字盤やシンボルの選択で音声出力等）が適した意思疎通支援用具です。福祉電話や助聴器は聴覚障害者向け、人工喉頭は喉頭摘出者向け、点字器は視覚障害者向けで、それぞれ対象となる障害が異なります。',
    content_id: 'Bagi penderita cerebral palsy tipe athetosis yang sulit menggerakkan jari halus/mengucap tapi pendengaran & pemahamannya baik, alat bantu komunikasi portabel (memilih huruf/simbol untuk keluaran suara, dll.) adalah alat yang tepat. Telepon kesejahteraan & alat bantu dengar untuk tunarungu, laring buatan untuk yang laringnya diangkat, alat braille untuk tunanetra — masing-masing untuk disabilitas berbeda.',
    example_jp: 'Ｃさんは、携帯用会話補助装置の文字盤を指して意思を伝える。', example_id: 'Cさん menyampaikan keinginannya dengan menunjuk papan huruf di alat bantu komunikasi portabel.',
    exam_point_jp: '各支援用具の対象障害（福祉電話・助聴器＝聴覚、人工喉頭＝喉頭摘出、点字器＝視覚、携帯用会話補助装置＝発話困難）を正確に区別する。',
    exam_point_id: 'Bedakan dengan tepat disabilitas sasaran tiap alat: telepon/alat dengar=pendengaran, laring buatan=laring diangkat, braille=penglihatan, alat komunikasi portabel=sulit bicara.',
    furigana_map: fm([['アテトーゼ型', 'あてとーぜがた'], ['脳性麻痺', 'のうせいまひ'], ['手指', 'しゅし'], ['発音', 'はつおん'], ['困難', 'こんなん'], ['聞', 'き'], ['取', 'と'], ['理解力', 'りかいりょく'], ['携帯用会話補助装置', 'けいたいようかいわほじょそうち'], ['文字盤', 'もじばん'], ['音声出力', 'おんせいしゅつりょく'], ['福祉電話', 'ふくしでんわ'], ['助聴器', 'じょちょうき'], ['人工喉頭', 'じんこうこうとう'], ['喉頭摘出', 'こうとうてきしゅつ'], ['点字器', 'てんじき'], ['対象', 'たいしょう']]),
    linkMatch: 'Ｃさんが使用している情報・意思疎通支援用具',
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
