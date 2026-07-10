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
  { kamoku_id: 10, kanji: 'エンパワメント', furigana: 'えんぱわめんと', meaning_id: 'Pemberdayaan — proses penyandang disabilitas menyadari kekuatan/kelebihan diri sendiri untuk mengatasi masalah', example_sentence_jp: '本人のエンパワメントを支える関わりを心がける。', example_sentence_id: 'Berupaya mendukung pemberdayaan diri orang tersebut.' },
  { kamoku_id: 10, kanji: 'クローン病', furigana: 'くろーんびょう', meaning_id: 'Penyakit Crohn — penyakit radang usus kronis dengan gejala khas gangguan nutrisi', example_sentence_jp: 'クローン病により、栄養状態が悪化することがある.', example_sentence_id: 'Kondisi gizi bisa memburuk akibat penyakit Crohn.' },
  { kamoku_id: 10, kanji: '遂行機能障害', furigana: 'すいこうきのうしょうがい', meaning_id: 'Gangguan fungsi eksekutif — kesulitan merencanakan & melaksanakan sesuatu secara berurutan', example_sentence_jp: '遂行機能障害があると、料理の手順を組み立てるのが難しい。', example_sentence_id: 'Dengan gangguan fungsi eksekutif, menyusun langkah memasak jadi sulit.' },
  { kamoku_id: 10, kanji: 'ロービジョン', furigana: 'ろーびじょん', meaning_id: 'Low vision — masih memiliki sisa penglihatan, berbeda dari buta total', example_sentence_jp: 'ロービジョンの人は、拡大鏡を使って文字を読むことがある。', example_sentence_id: 'Orang dengan low vision kadang memakai kaca pembesar untuk membaca.' },
  { kamoku_id: 10, kanji: '白杖', furigana: 'はくじょう', meaning_id: 'Tongkat putih — alat bantu jalan sekaligus tanda bagi sekitar bahwa penggunanya punya disabilitas penglihatan', example_sentence_jp: '白杖を持って、一人で外出する。', example_sentence_id: 'Bepergian sendiri sambil membawa tongkat putih.' },
  { kamoku_id: 10, kanji: '誤嚥', furigana: 'ごえん', meaning_id: 'Tersedak/aspirasi — makanan/cairan masuk ke saluran napas, risiko meningkat pada gangguan menelan/bersuara', example_sentence_jp: 'かすれ声が目立つときは、誤嚥のリスクに注意する。', example_sentence_id: 'Saat suara serak menonjol, waspadai risiko tersedak.' },
  { kamoku_id: 10, kanji: '要約筆記', furigana: 'ようやくひっき', meaning_id: 'Notulensi ringkas — merangkum isi pembicaraan secara tertulis untuk membantu komunikasi dengan tunarungu', example_sentence_jp: '講演会で要約筆記のスクリーンを用意する。', example_sentence_id: 'Menyediakan layar notulensi ringkas di acara ceramah.' },
  { kamoku_id: 10, kanji: '発達障害者支援センター', furigana: 'はったつしょうがいしゃしえんせんたー', meaning_id: 'Pusat dukungan disabilitas perkembangan — lembaga spesialis konsultasi ADHD, autisme, dll.', example_sentence_jp: '発達障害者支援センターに相談し、専門的な助言を受ける。', example_sentence_id: 'Berkonsultasi ke pusat dukungan disabilitas perkembangan untuk saran ahli.' },
  { kamoku_id: 10, kanji: '合理的配慮', furigana: 'ごうりてきはいりょ', meaning_id: 'Akomodasi yang wajar — penyesuaian sesuai permintaan penyandang disabilitas, diwajibkan UU Penghapusan Diskriminasi Disabilitas', example_sentence_jp: '本人からの申し出に応じて、合理的配慮を行う。', example_sentence_id: 'Memberikan akomodasi wajar sesuai permintaan orang tersebut.' },
  { kamoku_id: 10, kanji: 'レスパイトケア', furigana: 'れすぱいとけあ', meaning_id: 'Respite care — layanan penitipan sementara untuk memberi istirahat bagi keluarga pengasuh, sekaligus menjaga kualitas hidup penyandang disabilitas', example_sentence_jp: 'レスパイトケアを利用して、家族が旅行に行く。', example_sentence_id: 'Keluarga bepergian liburan dengan memakai layanan respite care.' },
]

const materialSections = [
  {
    kamoku_id: 10, order_index: 1, title_jp: 'ICFの3つのレベル（生物・個人・社会）',
    content_jp: 'ICFは生活機能を「心身機能・身体構造」（生物レベル）、「活動」（個人レベル）、「参加」（社会・人生レベル）の3つのレベルで捉えます。それぞれのマイナス面が「機能障害」「活動制限」「参加制約」です。「参加」は社会活動への関わりを示す社会レベルにあたります。',
    content_id: 'ICF memahami fungsi kehidupan dalam 3 tingkat: "fungsi tubuh & struktur tubuh" (tingkat biologis), "aktivitas" (tingkat individu), "partisipasi" (tingkat sosial/kehidupan bermasyarakat). Sisi negatif masing-masing adalah "gangguan fungsi", "keterbatasan aktivitas", "restriksi partisipasi". "Partisipasi" menunjukkan keterlibatan dalam kegiatan sosial, itulah tingkat sosial.',
    example_jp: '地域のボランティア活動に参加することは、ICFの「参加」（社会レベル）にあたる。', example_id: 'Ikut kegiatan sukarela komunitas termasuk "partisipasi" (tingkat sosial) dalam ICF.',
    exam_point_jp: '心身機能・身体構造＝生物レベル、活動＝個人レベル、参加＝社会レベル、という3層構造を正確に対応させて覚える。',
    exam_point_id: 'Hafalkan dengan tepat 3 tingkatnya: fungsi/struktur tubuh = biologis, aktivitas = individu, partisipasi = sosial.',
    furigana_map: fm([['国際生活機能分類', 'こくさいせいかつきのうぶんるい'], ['生活機能', 'せいかつきのう'], ['心身機能', 'しんしんきのう'], ['身体構造', 'しんたいこうぞう'], ['活動', 'かつどう'], ['参加', 'さんか'], ['機能障害', 'きのうしょうがい'], ['活動制限', 'かつどうせいげん'], ['参加制約', 'さんかせいやく'], ['社会活動', 'しゃかいかつどう']]),
    linkMatch: 'ＩＣＦ（International Classification of Functioning, Disability and Health',
  },
  {
    kamoku_id: 10, order_index: 2, title_jp: '障害者のエンパワメント',
    content_jp: 'エンパワメントとは、障害のある人が自らの能力や長所に気づき、それを活かして自分の課題に対応していく力を高めることです。専門職主導で受動的に支援を受けるあり方や、主体性・人権が守られないことに耐えることは、エンパワメントの考え方に反します。ノーマライゼーション（障害の有無にかかわらず同等に生活できる社会を目指す）とは異なる概念である点に注意します。',
    content_id: 'Pemberdayaan adalah proses penyandang disabilitas menyadari kekuatan/kelebihan dirinya sendiri, lalu memakainya untuk mengatasi masalahnya sendiri. Pendekatan pasif dipimpin profesional, atau bertahan dalam kondisi hak asasi/subjektivitas tak terjaga, bertentangan dengan prinsip ini. Perlu diingat konsep ini berbeda dari normalisasi (menargetkan masyarakat di mana siapa pun bisa hidup setara terlepas ada-tidaknya disabilitas).',
    example_jp: '本人が「自分にもできることがある」と気づき、積極的に活動に取り組むようになった。', example_id: 'Orang tersebut menyadari "saya juga bisa melakukan sesuatu" dan mulai aktif berkegiatan.',
    exam_point_jp: 'エンパワメント＝本人の能力・長所に気づき課題に対応。ノーマライゼーションとの違いに注意。',
    exam_point_id: 'Pemberdayaan = menyadari kekuatan diri lalu mengatasi masalah. Perhatikan bedanya dengan normalisasi.',
    furigana_map: fm([['障害者', 'しょうがいしゃ'], ['エンパワメント', 'えんぱわめんと'], ['能力', 'のうりょく'], ['長所', 'ちょうしょ'], ['気', 'き'], ['課題', 'かだい'], ['対応', 'たいおう'], ['専門職', 'せんもんしょく'], ['主導', 'しゅどう'], ['受動的', 'じゅどうてき'], ['主体性', 'しゅたいせい'], ['人権', 'じんけん'], ['ノーマライゼーション', 'のーまらいぜーしょん']]),
    linkMatch: '障害者のエンパワメントに関するものとして',
  },
  {
    kamoku_id: 10, order_index: 3, title_jp: 'クローン病の特徴',
    content_jp: 'クローン病は消化管に慢性的な炎症を起こす疾患で、下痢や腹痛が続き、栄養の吸収が障害されることによる栄養障害が特徴的な症状です。関節痛などの腸管外合併症がみられることもありますが、最も代表的なのは消化管の炎症による栄養状態の悪化です。',
    content_id: 'Penyakit Crohn menyebabkan peradangan kronis saluran cerna, dengan diare & nyeri perut berkelanjutan, dan gangguan nutrisi akibat terganggunya penyerapan gizi adalah gejala khasnya. Bisa juga muncul komplikasi luar usus seperti nyeri sendi, tapi yang paling representatif adalah memburuknya status gizi akibat peradangan saluran cerna.',
    example_jp: 'クローン病の利用者には、消化に負担の少ない食事を提供する。', example_id: 'Menyediakan makanan yang ringan bagi pencernaan untuk pengguna dengan penyakit Crohn.',
    exam_point_jp: 'クローン病＝消化管の慢性炎症＋栄養障害が代表的症状という組み合わせを覚える。',
    exam_point_id: 'Hafalkan kombinasi: penyakit Crohn = peradangan kronis saluran cerna + gangguan nutrisi sebagai gejala representatif.',
    furigana_map: fm([['クローン病', 'くろーんびょう'], ['消化管', 'しょうかかん'], ['慢性的', 'まんせいてき'], ['炎症', 'えんしょう'], ['下痢', 'げり'], ['腹痛', 'ふくつう'], ['栄養', 'えいよう'], ['吸収', 'きゅうしゅう'], ['障害', 'しょうがい'], ['栄養障害', 'えいようしょうがい'], ['関節痛', 'かんせつつう'], ['合併症', 'がっぺいしょう']]),
    linkMatch: 'クローン病（Crohn disease）にみられる特徴的な症状',
  },
  {
    kamoku_id: 10, order_index: 4, title_jp: '高次脳機能障害の症状の見分け方',
    content_jp: '高次脳機能障害にはいくつかの症状があり、それぞれ区別して理解する必要があります。遂行機能障害は物事を計画し順序立てて実行することが困難になる症状、記憶障害は新しい知識を覚えることが困難になる症状、注意障害はぼんやりして注意を向け続けることが困難になる症状、失語は言葉の表出や理解が困難になる症状、脱抑制は些細なことで興奮しやすくなる症状です。',
    content_id: 'Gangguan fungsi otak tingkat tinggi memiliki beberapa gejala yang perlu dipahami secara terpisah. Gangguan fungsi eksekutif = kesulitan merencanakan & melaksanakan sesuatu berurutan, gangguan memori = kesulitan mengingat pengetahuan baru, gangguan perhatian = kesulitan mempertahankan fokus, afasia = kesulitan mengungkapkan/memahami bahasa, disinhibisi = mudah terangsang emosi karena hal sepele.',
    example_jp: '料理の手順を組み立てられなくなったのは、遂行機能障害の表れである。', example_id: 'Tidak bisa lagi menyusun langkah memasak adalah wujud gangguan fungsi eksekutif.',
    exam_point_jp: '遂行機能障害・記憶障害・注意障害・失語・脱抑制、それぞれの症状の説明文を正確に区別して覚える。',
    exam_point_id: 'Hafalkan dengan tepat definisi masing-masing: gangguan eksekutif, memori, perhatian, afasia, disinhibisi — jangan tertukar.',
    furigana_map: fm([['高次脳機能障害', 'こうじのうきのうしょうがい'], ['遂行機能障害', 'すいこうきのうしょうがい'], ['計画', 'けいかく'], ['順序', 'じゅんじょ'], ['実行', 'じっこう'], ['記憶障害', 'きおくしょうがい'], ['注意障害', 'ちゅういしょうがい'], ['失語', 'しつご'], ['表出', 'ひょうしゅつ'], ['脱抑制', 'だつよくせい'], ['興奮', 'こうふん']]),
    linkMatch: '遂行機能障害の特徴として',
  },
  {
    kamoku_id: 10, order_index: 5, title_jp: '視覚障害の理解と生活支援',
    content_jp: 'ロービジョンは残存視力がある状態で、全盲（視覚情報を全く得られない状態）とは異なります。中途視覚障害者は「見えていた」経験の喪失を伴うため、先天性障害者に比べ受容が難しいとされます。白杖は歩行補助だけでなく、周囲に視覚障害を知らせる役目も持ちます。視覚障害を補うのは訓練された盲導犬であり、一般のペット犬ではありません。視覚障害者は同行援護（ガイドヘルパー）を利用できます。',
    content_id: 'Low vision berarti masih ada sisa penglihatan, berbeda dari buta total (sama sekali tidak bisa mendapat info visual). Disabilitas penglihatan yang muncul di tengah hidup melibatkan kehilangan pengalaman "pernah bisa melihat", sehingga umumnya lebih sulit diterima dibanding disabilitas bawaan. Tongkat putih tidak hanya membantu berjalan, tapi juga memberi tahu sekitar tentang disabilitas penglihatan penggunanya. Yang membantu disabilitas penglihatan adalah anjing pemandu terlatih, bukan anjing peliharaan biasa. Penyandang disabilitas penglihatan bisa memakai layanan pendamping (dōkō-engo).',
    example_jp: '白杖を持つことで、周囲の人が道を譲ってくれることがある。', example_id: 'Dengan membawa tongkat putih, orang di sekitar kadang memberi jalan.',
    exam_point_jp: 'ロービジョン≠全盲、中途障害は受容が難しい、白杖の役割、盲導犬とペット犬の違い、ガイドヘルパー利用可、という5点セット。',
    exam_point_id: '5 poin: low vision ≠ buta total, disabilitas tengah-hidup lebih sulit diterima, peran tongkat putih, beda anjing pemandu-peliharaan, bisa pakai pendamping.',
    furigana_map: fm([['視覚障害', 'しかくしょうがい'], ['ロービジョン', 'ろーびじょん'], ['残存視力', 'ざんぞんしりょく'], ['全盲', 'ぜんもう'], ['中途視覚障害者', 'ちゅうとしかくしょうがいしゃ'], ['先天性', 'せんてんせい'], ['受容', 'じゅよう'], ['白杖', 'はくじょう'], ['歩行補助', 'ほこうほじょ'], ['盲導犬', 'もうどうけん'], ['同行援護', 'どうこうえんご']]),
    linkMatch: '視覚障害の特徴と視覚障害者の生活支援',
  },
  {
    kamoku_id: 10, order_index: 6, title_jp: 'パーキンソン病進行期の誤嚥リスク',
    content_jp: 'パーキンソン病が進行し全介助の状態になると、嚥下や発声に関わる筋肉の機能も低下します。食事に時間がかかる、かすれ声が目立つといった変化は、誤嚥のリスクが高まっているサインとして留意すべき点です。安静時振戦・筋固縮・仮面様顔貌はパーキンソン病の代表的症状ですが、この場面で最優先すべきなのは誤嚥への対応です。',
    content_id: 'Saat Parkinson memburuk hingga butuh bantuan penuh, fungsi otot terkait menelan & bersuara pun menurun. Perubahan seperti makan lama & suara serak yang menonjol adalah tanda meningkatnya risiko tersedak yang perlu diwaspadai. Tremor saat diam, kekakuan otot, wajah topeng adalah gejala khas Parkinson, tapi yang paling perlu diprioritaskan dalam situasi ini adalah respons terhadap risiko tersedak.',
    example_jp: 'かすれ声が目立つＡさんの食事介助では、とろみをつけるなど誤嚥予防を工夫する.', example_id: 'Saat membantu makan Aさん yang suaranya serak, diberi penyesuaian seperti pengental untuk mencegah tersedak.',
    exam_point_jp: '事例文の変化（食事に時間・かすれ声）から誤嚥リスクを読み取る力が問われる。安静時振戦等の既知の症状名に惑わされないこと。',
    exam_point_id: 'Diuji kemampuan membaca risiko tersedak dari perubahan di soal (makan lama, suara serak). Jangan terkecoh nama gejala Parkinson yang sudah dikenal (tremor, dll.).',
    furigana_map: fm([['パーキンソン病', 'ぱーきんそんびょう'], ['進行', 'しんこう'], ['全介助', 'ぜんかいじょ'], ['嚥下', 'えんげ'], ['発声', 'はっせい'], ['筋肉', 'きんにく'], ['機能低下', 'きのうていか'], ['誤嚥', 'ごえん'], ['リスク', 'りすく'], ['安静時振戦', 'あんせいじしんせん'], ['筋固縮', 'きんこしゅく'], ['仮面様顔貌', 'かめんようがんぼう']]),
    linkMatch: 'パーキンソン病（Parkinson disease）と診断され',
  },
  {
    kamoku_id: 10, order_index: 7, title_jp: '聴覚障害者への支援方法',
    content_jp: '要約筆記は、話の内容を要約して文字で伝え、聴覚障害者とのコミュニケーションを補う方法です。「ろう」は一般に重度の聴覚障害を指し、軽度障害を指すものではありません。フラッシュベルは音を光の点滅で知らせる装置で、音を増幅する機器ではありません。手話は重要な意思伝達手段です。身体障害者手帳の交付基準は両耳70dB以上等、より重度な基準です。',
    content_id: 'Notulensi ringkas merangkum isi pembicaraan secara tertulis, membantu komunikasi dengan tunarungu. "Tuli" (ろう) umumnya menunjuk gangguan pendengaran berat, bukan ringan. Bel kilat memberi tahu lewat kedipan cahaya, bukan alat penguat suara. Bahasa isyarat adalah alat komunikasi penting. Standar penerbitan buku disabilitas fisik lebih berat (70dB ke atas dst. di kedua telinga).',
    example_jp: '会議で要約筆記を用意し、聴覚障害のある参加者の理解を助ける。', example_id: 'Menyediakan notulensi ringkas dalam rapat untuk membantu pemahaman peserta tunarungu.',
    exam_point_jp: '要約筆記の役割、フラッシュベルの機能（増幅ではなく光での通知）、身体障害者手帳の聴力基準を正確に覚える。',
    exam_point_id: 'Hafalkan dengan tepat: fungsi notulensi ringkas, cara kerja bel kilat (kedipan cahaya, bukan penguatan suara), standar pendengaran buku disabilitas fisik.',
    furigana_map: fm([['聴覚障害者', 'ちょうかくしょうがいしゃ'], ['要約筆記', 'ようやくひっき'], ['意思疎通', 'いしそつう'], ['補', 'おぎな'], ['ろう', 'ろう'], ['フラッシュベル', 'ふらっしゅべる'], ['増幅', 'ぞうふく'], ['手話', 'しゅわ'], ['身体障害者手帳', 'しんたいしょうがいしゃてちょう'], ['交付', 'こうふ']]),
    linkMatch: '聴覚障害者の特徴や支援の方法に関する',
  },
  {
    kamoku_id: 10, order_index: 8, title_jp: '発達障害の相談窓口',
    content_jp: 'ADHD（注意欠陥多動性障害）等の発達障害が疑われる場合の専門的な相談先は、発達障害者支援センターです。ハローワークは就労紹介、難病情報センターは難病、認知症カフェは認知症の人とその家族、放課後等デイサービスは就学中の障害児童向けと、それぞれ対象が異なるため、相談内容に応じた適切な機関を選ぶことが重要です。',
    content_id: 'Tempat konsultasi spesialis bagi yang dicurigai disabilitas perkembangan seperti ADHD adalah pusat dukungan disabilitas perkembangan. Hallowork untuk penyaluran kerja, pusat informasi penyakit langka untuk penyakit langka, kafe demensia untuk penderita demensia & keluarganya, layanan sepulang sekolah untuk anak disabilitas usia sekolah — masing-masing sasarannya berbeda, penting memilih lembaga yang tepat sesuai isi konsultasi.',
    example_jp: '大人になってからADHDが疑われる場合も、発達障害者支援センターに相談できる。', example_id: 'Meski dicurigai ADHD setelah dewasa, tetap bisa berkonsultasi ke pusat dukungan disabilitas perkembangan.',
    exam_point_jp: '各相談機関（発達障害者支援センター・ハローワーク・難病情報センター等）の対象を正確に区別する。',
    exam_point_id: 'Bedakan dengan tepat sasaran tiap lembaga konsultasi (pusat disabilitas perkembangan, Hallowork, pusat penyakit langka, dll.).',
    furigana_map: fm([['注意欠陥多動性障害', 'ちゅういけっかんたどうせいしょうがい'], ['発達障害', 'はったつしょうがい'], ['疑', 'うたが'], ['専門的', 'せんもんてき'], ['相談先', 'そうだんさき'], ['発達障害者支援センター', 'はったつしょうがいしゃしえんせんたー'], ['対象', 'たいしょう'], ['異', 'こと']]),
    linkMatch: '小学生のときに注意欠陥多動性障害と疑われていた',
  },
  {
    kamoku_id: 10, order_index: 9, title_jp: '障害者差別解消法と合理的配慮',
    content_jp: '障害者差別解消法における合理的配慮とは、障害のある人本人からの申し出に応じて、負担が重すぎない範囲で対応を調整することです。要望を無視して口頭説明のみで済ませる、本人の意向を確認せず勝手に対応する、盲導犬の同伴を拒否する、不安を訴えた人をそのまま帰す、といった対応はいずれも合理的配慮に反します。本人の申し出に応じ、資料をわかりやすくして説明するなどの対応が適切な実践例です。',
    content_id: 'Akomodasi wajar dalam UU Penghapusan Diskriminasi Disabilitas adalah menyesuaikan respons sesuai permintaan penyandang disabilitas itu sendiri, dalam batas beban yang tidak berlebihan. Mengabaikan permintaan dan hanya menjelaskan lisan, bertindak sepihak tanpa konfirmasi, menolak anjing pemandu, atau menyuruh pulang orang yang mengaku cemas — semua bertentangan dengan akomodasi wajar. Menyederhanakan bahasa dokumen sesuai permintaan orang tersebut adalah contoh praktik yang tepat.',
    example_jp: '車いすの客から商品を手に取って見せてほしいと言われ、実際に手に取って見せた。', example_id: 'Saat pelanggan pengguna kursi roda minta melihat barang, benar-benar mengambil & memperlihatkannya.',
    exam_point_jp: '合理的配慮＝本人の申し出に応じた対応。要望を無視する・独断で判断する・拒否するは不適切な選択肢になりやすい。',
    exam_point_id: 'Akomodasi wajar = respons sesuai permintaan orang tersebut. Mengabaikan permintaan/bertindak sepihak/menolak biasanya jawaban salah.',
    furigana_map: fm([['障害者差別解消法', 'しょうがいしゃさべつかいしょうほう'], ['合理的配慮', 'ごうりてきはいりょ'], ['本人', 'ほんにん'], ['申', 'もう'], ['出', 'で'], ['負担', 'ふたん'], ['調整', 'ちょうせい'], ['要望', 'ようぼう'], ['無視', 'むし'], ['意向', 'いこう'], ['確認', 'かくにん'], ['盲導犬', 'もうどうけん'], ['同伴', 'どうはん'], ['拒否', 'きょひ']]),
    linkMatch: '「障害者差別解消法」の合理的配慮に沿った対応',
  },
  {
    kamoku_id: 10, order_index: 10, title_jp: 'レスパイトケアの目的',
    content_jp: 'レスパイトケアは、家族の休息（レスパイト）のためのサービスですが、利用中の過ごし方を家族に強制したり、旅行等での利用を制限したり、宿泊のみに限定したりするものではありません。何より重要なのは、家族が休息している間も、利用する障害者本人が自分らしく快適に過ごせるよう配慮することです。',
    content_id: 'Respite care adalah layanan untuk istirahat (respite) keluarga, tapi tidak memaksa cara keluarga menghabiskan waktu, tidak membatasi penggunaan untuk liburan, dan tidak dibatasi hanya menginap. Yang paling penting adalah memastikan penyandang disabilitas yang memakai layanan tetap bisa menjalani waktu senyaman dan sesuai dirinya sendiri, sementara keluarganya beristirahat.',
    example_jp: 'レスパイトケア利用中も、利用者が好きな活動を楽しめるよう工夫する。', example_id: 'Bahkan saat memakai respite care, diupayakan pengguna tetap bisa menikmati kegiatan favoritnya.',
    exam_point_jp: '「家族の休息」だけでなく「利用者本人のQOL」も重視するのがレスパイトケアの望ましいあり方という点が頻出。',
    exam_point_id: 'Yang sering keluar: bukan hanya "istirahat keluarga", tapi juga "kualitas hidup pengguna sendiri" yang jadi bentuk ideal respite care.',
    furigana_map: fm([['レスパイトケア', 'れすぱいとけあ'], ['家族', 'かぞく'], ['休息', 'きゅうそく'], ['過', 'す'], ['強制', 'きょうせい'], ['旅行', 'りょこう'], ['制限', 'せいげん'], ['宿泊', 'しゅくはく'], ['限定', 'げんてい'], ['利用者', 'りようしゃ'], ['本人', 'ほんにん'], ['配慮', 'はいりょ']]),
    linkMatch: 'レスパイトケアの望ましいあり方に関する記述',
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
