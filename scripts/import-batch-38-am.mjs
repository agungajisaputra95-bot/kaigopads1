// One-off import: materi + kosakata untuk soal 第38回 (令和7年度) 午前 問題1-12
// Soal-soalnya sendiri sudah ada di DB — script ini hanya mengisi material_sections,
// vocabulary, dan question_material_links yang masih kosong untuk kamoku 1 & 2.
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

const vocabulary = [
  // kamoku 1 additions
  {
    kamoku_id: 1,
    kanji: 'ノーマライゼーション',
    furigana: 'のーまらいぜーしょん',
    meaning_id: 'Normalisasi — prinsip agar penyandang disabilitas hidup senormal mungkin di masyarakat, bukan diisolasi di institusi',
    example_sentence_jp: 'ノーマライゼーションの理念に基づいて地域生活を支援する。',
    example_sentence_id: 'Mendukung kehidupan di tengah masyarakat berdasarkan prinsip normalisasi.',
  },
  {
    kamoku_id: 1,
    kanji: '意思決定支援',
    furigana: 'いしけっていしえん',
    meaning_id: 'Dukungan pengambilan keputusan — mendampingi pengguna layanan menentukan pilihannya sendiri, bukan menggantikan keputusannya',
    example_sentence_jp: '本人の意思決定支援を大切にする。',
    example_sentence_id: 'Mengutamakan dukungan agar keputusan tetap diambil oleh diri sendiri.',
  },
  {
    kamoku_id: 1,
    kanji: '筋萎縮性側索硬化症',
    furigana: 'きんいしゅくせいそくさくこうかしょう',
    meaning_id: 'ALS (Amyotrophic Lateral Sclerosis) — penyakit saraf motorik progresif yang melemahkan otot tubuh secara bertahap',
    example_sentence_jp: 'ＡＬＳの診断を受けてからも自宅での生活を続ける。',
    example_sentence_id: 'Tetap tinggal di rumah meski telah didiagnosis ALS.',
  },
  // kamoku 2 (belum ada kosakata sama sekali)
  { kamoku_id: 2, kanji: '介護ロボット', furigana: 'かいごろぼっと', meaning_id: 'Robot perawatan — alat bantu berbasis teknologi untuk mendukung kaigo', example_sentence_jp: '介護ロボットを導入して職員の負担を減らす。', example_sentence_id: 'Memasang robot perawatan untuk mengurangi beban staf.' },
  { kamoku_id: 2, kanji: '自立支援', furigana: 'じりつしえん', meaning_id: 'Dukungan kemandirian', example_sentence_jp: '自立支援を目的として介護を行う。', example_sentence_id: 'Melakukan perawatan dengan tujuan mendukung kemandirian.' },
  { kamoku_id: 2, kanji: '生活の質', furigana: 'せいかつのしつ', meaning_id: 'Kualitas hidup (QOL)', example_sentence_jp: '生活の質の向上を目指す。', example_sentence_id: 'Menargetkan peningkatan kualitas hidup.' },
  { kamoku_id: 2, kanji: '要配慮者', furigana: 'ようはいりょしゃ', meaning_id: 'Orang yang butuh perhatian khusus saat bencana (lansia, disabilitas, ibu hamil, dll.)', example_sentence_jp: '避難所では要配慮者への支援が必要である。', example_sentence_id: 'Di tempat pengungsian, orang yang butuh perhatian khusus perlu didukung.' },
  { kamoku_id: 2, kanji: '指定避難所', furigana: 'していひなんじょ', meaning_id: 'Tempat pengungsian resmi yang ditetapkan pemerintah', example_sentence_jp: '指定避難所に避難する。', example_sentence_id: 'Mengungsi ke tempat pengungsian resmi.' },
  { kamoku_id: 2, kanji: 'ユニバーサルデザイン', furigana: 'ゆにばーさるでざいん', meaning_id: 'Desain universal — desain yang bisa digunakan semua orang tanpa terkecuali', example_sentence_jp: 'ユニバーサルデザインの製品を選ぶ。', example_sentence_id: 'Memilih produk dengan desain universal.' },
  { kamoku_id: 2, kanji: '行動援護', furigana: 'こうどうえんご', meaning_id: 'Layanan pendampingan bagi penyandang disabilitas intelektual/mental dengan kesulitan perilaku saat beraktivitas di luar', example_sentence_jp: '行動援護を利用して外出する。', example_sentence_id: 'Bepergian keluar dengan menggunakan layanan pendampingan perilaku.' },
  { kamoku_id: 2, kanji: '同行援護', furigana: 'どうこうえんご', meaning_id: 'Layanan pendampingan bagi penyandang tunanetra', example_sentence_jp: '同行援護のヘルパーと外出する。', example_sentence_id: 'Bepergian bersama pendamping layanan tunanetra.' },
  { kamoku_id: 2, kanji: '障害支援区分', furigana: 'しょうがいしえんくぶん', meaning_id: 'Klasifikasi tingkat kebutuhan dukungan bagi penyandang disabilitas (1-6)', example_sentence_jp: '障害支援区分の認定を受ける。', example_sentence_id: 'Menerima penetapan klasifikasi tingkat dukungan disabilitas.' },
  { kamoku_id: 2, kanji: '介護予防住宅改修', furigana: 'かいごよぼうじゅうたくかいしゅう', meaning_id: 'Renovasi rumah untuk pencegahan (bagi penerima layanan pencegahan/要支援)', example_sentence_jp: '介護予防住宅改修で手すりを設置する。', example_sentence_id: 'Memasang pegangan tangan lewat renovasi rumah pencegahan.' },
  { kamoku_id: 2, kanji: '要支援', furigana: 'ようしえん', meaning_id: 'Butuh dukungan — tingkat kebutuhan bantuan lebih ringan daripada 要介護', example_sentence_jp: '要支援2と認定された。', example_sentence_id: 'Ditetapkan sebagai tingkat butuh-dukungan 2.' },
  { kamoku_id: 2, kanji: '生活史', furigana: 'せいかつし', meaning_id: 'Riwayat hidup seseorang (pekerjaan, peran, nilai-nilai yang dijalani)', example_sentence_jp: '利用者の生活史を尊重する。', example_sentence_id: 'Menghormati riwayat hidup pengguna layanan.' },
  { kamoku_id: 2, kanji: '在宅復帰', furigana: 'ざいたくふっき', meaning_id: 'Kembali tinggal di rumah setelah dirawat di fasilitas', example_sentence_jp: '在宅復帰に向けてカンファレンスを行う。', example_sentence_id: 'Mengadakan konferensi menuju kepulangan ke rumah.' },
  { kamoku_id: 2, kanji: '福祉用具専門相談員', furigana: 'ふくしようぐせんもんそうだんいん', meaning_id: 'Konsultan ahli alat bantu kesejahteraan (memilih & menyewakan alat bantu)', example_sentence_jp: '福祉用具専門相談員に車いすを相談する。', example_sentence_id: 'Berkonsultasi soal kursi roda ke konsultan alat bantu.' },
  { kamoku_id: 2, kanji: 'リスクマネジメント', furigana: 'りすくまねじめんと', meaning_id: 'Manajemen risiko', example_sentence_jp: '施設全体でリスクマネジメントに取り組む。', example_sentence_id: 'Seluruh fasilitas menjalankan manajemen risiko secara terorganisir.' },
  { kamoku_id: 2, kanji: 'ヒヤリハット', furigana: 'ひやりはっと', meaning_id: 'Insiden nyaris celaka (near-miss) yang harus dilaporkan agar tak terulang', example_sentence_jp: 'ヒヤリハット報告書を作成する。', example_sentence_id: 'Membuat laporan insiden nyaris celaka.' },
  { kamoku_id: 2, kanji: 'レジオネラ菌', furigana: 'れじおねらきん', meaning_id: 'Bakteri Legionella — berkembang biak di air (bak mandi sirkulasi, humidifier)', example_sentence_jp: '循環式浴槽のレジオネラ菌対策をする。', example_sentence_id: 'Melakukan pencegahan bakteri Legionella pada bak mandi sirkulasi.' },
  { kamoku_id: 2, kanji: 'ストレスチェック制度', furigana: 'すとれすちぇっくせいど', meaning_id: 'Sistem pemeriksaan stres kerja wajib bagi tempat kerja tertentu', example_sentence_jp: '年に1回のストレスチェック制度を実施する。', example_sentence_id: 'Melaksanakan sistem pemeriksaan stres kerja setahun sekali.' },
]

const materialSections = [
  {
    kamoku_id: 1,
    order_index: 4,
    title_jp: 'ノーマライゼーションの提唱者',
    content_jp:
      'ノーマライゼーションは、障害の有無にかかわらず誰もが地域で普通に生活できる社会を目指す理念です。デンマークのバンク-ミケルセンが提唱し、スウェーデンのニィリエが「8つの原理」として整理しました。ヴォルフェンスベルガーはこの理念をアメリカに紹介し、「ソーシャルロール・バロリゼーション」として発展させました。',
    content_id:
      'Normalisasi adalah prinsip yang menargetkan masyarakat di mana siapa pun — dengan atau tanpa disabilitas — bisa hidup wajar di lingkungan masyarakat. Diusulkan oleh Bank-Mikkelsen dari Denmark, lalu disistematisasi oleh Nirje dari Swedia menjadi "8 prinsip". Wolfensberger memperkenalkan prinsip ini ke Amerika Serikat dan mengembangkannya menjadi "Social Role Valorization".',
    example_jp: '施設ではなく、地域の中で当たり前の生活を送れるように支援する。',
    example_id: 'Mendukung agar seseorang bisa menjalani hidup wajar di tengah masyarakat, bukan di institusi.',
    exam_point_jp:
      '人物名と理念の組み合わせが頻出。バンク-ミケルセン→提唱者、ニィリエ→8つの原理、ヴォルフェンスベルガー→ソーシャルロール・バロリゼーション、と整理して覚える。',
    exam_point_id:
      'Pasangan nama tokoh dan konsepnya sering keluar di ujian. Hafalkan agar tidak tertukar: Bank-Mikkelsen = pencetus, Nirje = 8 prinsip, Wolfensberger = Social Role Valorization.',
    furigana_map: [
      { kanji: '障害', reading: 'しょうがい' },
      { kanji: '有無', reading: 'うむ' },
      { kanji: '誰', reading: 'だれ' },
      { kanji: '地域', reading: 'ちいき' },
      { kanji: '生活', reading: 'せいかつ' },
      { kanji: '社会', reading: 'しゃかい' },
      { kanji: '目指', reading: 'めざ' },
      { kanji: '理念', reading: 'りねん' },
      { kanji: '提唱', reading: 'ていしょう' },
      { kanji: '原理', reading: 'げんり' },
      { kanji: '整理', reading: 'せいり' },
      { kanji: '紹介', reading: 'しょうかい' },
      { kanji: '発展', reading: 'はってん' },
      { kanji: '施設', reading: 'しせつ' },
      { kanji: '中', reading: 'なか' },
      { kanji: '当', reading: 'あ' },
      { kanji: '前', reading: 'まえ' },
      { kanji: '送', reading: 'おく' },
      { kanji: '支援', reading: 'しえん' },
      { kanji: '人物名', reading: 'じんぶつめい' },
      { kanji: '組', reading: 'く' },
      { kanji: '合', reading: 'あ' },
      { kanji: '頻出', reading: 'ひんしゅつ' },
    ],
    linkMatch: '社会福祉の理念を発展させた人物',
  },
  {
    kamoku_id: 2,
    order_index: 1,
    title_jp: '介護ロボットの活用目的',
    content_jp:
      '介護ロボットは、職員の身体的負担の軽減や、利用者の自立支援・生活の質の向上のために導入されます。人員配置基準を緩和したり、職員と利用者のかかわりを減らしたりする目的ではなく、あくまで支援を「補う」ためのツールです。使用にあたっては、施設のルールや研修に基づいた運用が必要です。',
    content_id:
      'Robot perawatan dipasang untuk mengurangi beban fisik staf serta mendukung kemandirian dan kualitas hidup pengguna layanan. Bukan untuk melonggarkan standar jumlah staf atau mengurangi interaksi staf-pengguna, melainkan sekadar alat bantu pelengkap. Penggunaannya harus mengikuti aturan fasilitas dan pelatihan yang sesuai.',
    example_jp: '移乗介助用のロボットを使い、職員の腰の負担を減らす。',
    example_id: 'Memakai robot bantu perpindahan posisi untuk mengurangi beban punggung staf.',
    exam_point_jp: '「人員配置基準の緩和」「かかわりを減らす」「巡回不要」といった選択肢は誤りになりやすい。',
    exam_point_id: 'Pilihan seperti "melonggarkan standar staf", "mengurangi interaksi", atau "patroli jadi tak perlu" biasanya jawaban salah.',
    furigana_map: [
      { kanji: '介護', reading: 'かいご' },
      { kanji: '職員', reading: 'しょくいん' },
      { kanji: '身体的', reading: 'しんたいてき' },
      { kanji: '負担', reading: 'ふたん' },
      { kanji: '軽減', reading: 'けいげん' },
      { kanji: '利用者', reading: 'りようしゃ' },
      { kanji: '自立支援', reading: 'じりつしえん' },
      { kanji: '生活', reading: 'せいかつ' },
      { kanji: '質', reading: 'しつ' },
      { kanji: '向上', reading: 'こうじょう' },
      { kanji: '導入', reading: 'どうにゅう' },
      { kanji: '人員配置基準', reading: 'じんいんはいちきじゅん' },
      { kanji: '緩和', reading: 'かんわ' },
      { kanji: '減', reading: 'へ' },
      { kanji: '補', reading: 'おぎな' },
      { kanji: '使用', reading: 'しよう' },
      { kanji: '施設', reading: 'しせつ' },
      { kanji: '研修', reading: 'けんしゅう' },
      { kanji: '基', reading: 'もと' },
      { kanji: '運用', reading: 'うんよう' },
      { kanji: '必要', reading: 'ひつよう' },
    ],
    linkMatch: '介護施設における介護ロボットに関する',
  },
  {
    kamoku_id: 2,
    order_index: 2,
    title_jp: '災害時の要配慮者支援',
    content_jp:
      '指定避難所では、高齢者や障害者、妊産婦などの要配慮者に対する合理的配慮が求められます。音声やピクトグラムによる情報提供、洋式トイレの整備、食物アレルギーなどに配慮した食事、過度な行動制限をしないことが基本です。',
    content_id:
      'Di tempat pengungsian resmi, diperlukan akomodasi yang wajar bagi lansia, penyandang disabilitas, ibu hamil, dan orang lain yang butuh perhatian khusus. Prinsip dasarnya: menyediakan informasi lewat suara dan piktogram, toilet duduk, makanan yang mempertimbangkan alergi, serta tidak membatasi ruang gerak secara berlebihan.',
    example_jp: '避難所の掲示物に、文字だけでなくピクトグラムを併記する。',
    example_id: 'Menambahkan piktogram, bukan hanya teks, pada papan pengumuman tempat pengungsian.',
    exam_point_jp: '「和式便器が望ましい」「同じ食事を全員に」「生活範囲を限定する」は要配慮者支援では不適切。',
    exam_point_id: 'Pilihan "toilet jongkok lebih baik", "makanan sama untuk semua", "membatasi ruang gerak" biasanya tidak sesuai dengan dukungan bagi orang yang butuh perhatian khusus.',
    furigana_map: [
      { kanji: '指定', reading: 'してい' },
      { kanji: '避難所', reading: 'ひなんじょ' },
      { kanji: '高齢者', reading: 'こうれいしゃ' },
      { kanji: '障害者', reading: 'しょうがいしゃ' },
      { kanji: '妊産婦', reading: 'にんさんぷ' },
      { kanji: '要配慮者', reading: 'ようはいりょしゃ' },
      { kanji: '対', reading: 'たい' },
      { kanji: '合理的配慮', reading: 'ごうりてきはいりょ' },
      { kanji: '求', reading: 'もと' },
      { kanji: '音声', reading: 'おんせい' },
      { kanji: '情報提供', reading: 'じょうほうていきょう' },
      { kanji: '洋式', reading: 'ようしき' },
      { kanji: '整備', reading: 'せいび' },
      { kanji: '食物', reading: 'しょくもつ' },
      { kanji: '配慮', reading: 'はいりょ' },
      { kanji: '食事', reading: 'しょくじ' },
      { kanji: '過度', reading: 'かど' },
      { kanji: '行動', reading: 'こうどう' },
      { kanji: '制限', reading: 'せいげん' },
      { kanji: '基本', reading: 'きほん' },
    ],
    linkMatch: '指定避難所での要配慮者に対する生活支援',
  },
  {
    kamoku_id: 2,
    order_index: 3,
    title_jp: 'ユニバーサルデザインの7原則',
    content_jp:
      'ユニバーサルデザインとは、年齢や障害の有無にかかわらず、すべての人が使いやすいように製品や環境をデザインする考え方です。①公平な利用②利用における柔軟性③単純で直感的な利用④わかりやすい情報⑤失敗に対する寛大さ⑥少ない身体的負担⑦十分な大きさと空間、の7原則からなります。特定の対象者だけに向けたデザインではない点が重要です。',
    content_id:
      'Desain universal adalah konsep merancang produk dan lingkungan agar mudah digunakan oleh siapa saja, tanpa memandang usia atau ada-tidaknya disabilitas. Terdiri dari 7 prinsip: ①penggunaan yang setara ②fleksibilitas penggunaan ③penggunaan yang sederhana & intuitif ④informasi yang mudah dipahami ⑤toleransi terhadap kesalahan ⑥beban fisik yang minim ⑦ukuran & ruang yang cukup. Poin pentingnya, desain ini tidak ditujukan hanya untuk kelompok tertentu.',
    example_jp: '取っ手が大きく、誰でも握りやすいドアノブを設置する。',
    example_id: 'Memasang gagang pintu besar yang mudah dipegang siapa saja.',
    exam_point_jp: '「高齢者だけを対象」「介護職の操作しやすさを優先」は誤り。UDは利用者本位かつ万人対象。',
    exam_point_id: '"Hanya untuk lansia" atau "mengutamakan kemudahan bagi staf kaigo" adalah jawaban salah. UD berpusat pada pengguna dan ditujukan untuk semua orang.',
    furigana_map: [
      { kanji: '年齢', reading: 'ねんれい' },
      { kanji: '障害', reading: 'しょうがい' },
      { kanji: '有無', reading: 'うむ' },
      { kanji: '製品', reading: 'せいひん' },
      { kanji: '環境', reading: 'かんきょう' },
      { kanji: '考', reading: 'かんが' },
      { kanji: '方', reading: 'かた' },
      { kanji: '公平', reading: 'こうへい' },
      { kanji: '利用', reading: 'りよう' },
      { kanji: '柔軟性', reading: 'じゅうなんせい' },
      { kanji: '単純', reading: 'たんじゅん' },
      { kanji: '直感的', reading: 'ちょっかんてき' },
      { kanji: '情報', reading: 'じょうほう' },
      { kanji: '失敗', reading: 'しっぱい' },
      { kanji: '対', reading: 'たい' },
      { kanji: '寛大', reading: 'かんだい' },
      { kanji: '少', reading: 'すく' },
      { kanji: '身体的', reading: 'しんたいてき' },
      { kanji: '負担', reading: 'ふたん' },
      { kanji: '十分', reading: 'じゅうぶん' },
      { kanji: '空間', reading: 'くうかん' },
      { kanji: '原則', reading: 'げんそく' },
      { kanji: '特定', reading: 'とくてい' },
      { kanji: '対象者', reading: 'たいしょうしゃ' },
      { kanji: '重要', reading: 'じゅうよう' },
    ],
    linkMatch: 'ユニバーサルデザイン（universal design）の7原則',
  },
  {
    kamoku_id: 2,
    order_index: 4,
    title_jp: '障害福祉サービスにおける外出支援',
    content_jp:
      '障害者総合支援法には、外出を支援する複数のサービスがあります。行動援護は、知的障害・精神障害があり行動上著しい困難を有する人の外出を支援します。同行援護は視覚障害者の外出を支援するサービスです。自立訓練は身体機能や生活能力の維持・向上のための訓練、自立生活援助は一人暮らしに移行した人への定期的な訪問・相談支援です。対象者の障害特性に応じて適切なサービスを選ぶことが重要です。',
    content_id:
      'Undang-Undang Dukungan Komprehensif bagi Penyandang Disabilitas Jepang memiliki beberapa layanan untuk mendukung aktivitas di luar rumah. Kōdō-engo mendukung keluar rumah bagi orang dengan disabilitas intelektual/mental yang mengalami kesulitan perilaku signifikan. Dōkō-engo adalah layanan pendampingan keluar rumah bagi tunanetra. Jiritsu-kunren adalah pelatihan untuk menjaga/meningkatkan fungsi tubuh atau kemampuan hidup, sedangkan jiritsu-seikatsu-enjo adalah dukungan kunjungan & konsultasi berkala bagi orang yang baru pindah ke kehidupan mandiri. Penting memilih layanan sesuai karakteristik disabilitas orang tersebut.',
    example_jp: '知的障害があり、こだわりの強い利用者の買物には行動援護を利用する。',
    example_id: 'Menggunakan layanan pendampingan perilaku untuk belanja bagi pengguna dengan disabilitas intelektual yang memiliki keteguhan kuat.',
    exam_point_jp: '行動援護＝知的・精神障害、同行援護＝視覚障害、と対象を混同しないこと。',
    exam_point_id: 'Jangan tertukar: kōdō-engo untuk disabilitas intelektual/mental, dōkō-engo untuk tunanetra.',
    furigana_map: [
      { kanji: '障害者総合支援法', reading: 'しょうがいしゃそうごうしえんほう' },
      { kanji: '複数', reading: 'ふくすう' },
      { kanji: '行動援護', reading: 'こうどうえんご' },
      { kanji: '知的障害', reading: 'ちてきしょうがい' },
      { kanji: '精神障害', reading: 'せいしんしょうがい' },
      { kanji: '著', reading: 'いちじる' },
      { kanji: '困難', reading: 'こんなん' },
      { kanji: '有', reading: 'ゆう' },
      { kanji: '同行援護', reading: 'どうこうえんご' },
      { kanji: '視覚障害者', reading: 'しかくしょうがいしゃ' },
      { kanji: '自立訓練', reading: 'じりつくんれん' },
      { kanji: '身体機能', reading: 'しんたいきのう' },
      { kanji: '生活能力', reading: 'せいかつのうりょく' },
      { kanji: '維持', reading: 'いじ' },
      { kanji: '向上', reading: 'こうじょう' },
      { kanji: '訓練', reading: 'くんれん' },
      { kanji: '自立生活援助', reading: 'じりつせいかつえんじょ' },
      { kanji: '移行', reading: 'いこう' },
      { kanji: '定期的', reading: 'ていきてき' },
      { kanji: '訪問', reading: 'ほうもん' },
      { kanji: '相談支援', reading: 'そうだんしえん' },
      { kanji: '対象者', reading: 'たいしょうしゃ' },
      { kanji: '特性', reading: 'とくせい' },
      { kanji: '応', reading: 'おう' },
      { kanji: '適切', reading: 'てきせつ' },
      { kanji: '選', reading: 'えら' },
      { kanji: '重要', reading: 'じゅうよう' },
    ],
    linkMatch: '共同生活援助（グループホーム）で生活をしている',
  },
  {
    kamoku_id: 2,
    order_index: 5,
    title_jp: '介護保険の予防給付サービス',
    content_jp:
      '要支援者向けには、介護予防を目的とした予防給付サービスがあります。介護予防住宅改修や介護予防小規模多機能型居宅介護などが該当します。夜間対応型訪問介護は要介護者向けのサービスのため、要支援者は対象外です。金銭管理を支援する日常生活自立支援事業は、介護保険制度ではなく社会福祉協議会が実施する事業である点に注意が必要です。',
    content_id:
      'Bagi orang dengan status 要支援 (butuh dukungan), tersedia layanan preventif yang bertujuan mencegah penurunan kondisi, seperti renovasi rumah pencegahan atau layanan multifungsi skala kecil pencegahan. Layanan kunjungan malam (夜間対応型訪問介護) khusus untuk status 要介護, sehingga status 要支援 tidak memenuhi syarat. Perlu diperhatikan bahwa layanan dukungan pengelolaan uang (日常生活自立支援事業) bukan bagian dari sistem asuransi perawatan, melainkan program dari Dewan Kesejahteraan Sosial setempat.',
    example_jp: '要支援2の人が、転倒予防のために手すりを設置する介護予防住宅改修を利用する。',
    example_id: 'Orang dengan status butuh-dukungan 2 memakai renovasi rumah pencegahan untuk memasang pegangan tangan agar tidak jatuh.',
    exam_point_jp: '「要支援」と「要介護」で使えるサービスが異なる点、介護保険外の事業(日常生活自立支援事業等)との違いが頻出。',
    exam_point_id: 'Yang sering keluar: perbedaan layanan yang bisa dipakai antara status 要支援 dan 要介護, serta perbedaan dengan program di luar asuransi perawatan.',
    furigana_map: [
      { kanji: '要支援者', reading: 'ようしえんしゃ' },
      { kanji: '介護予防', reading: 'かいごよぼう' },
      { kanji: '目的', reading: 'もくてき' },
      { kanji: '予防給付', reading: 'よぼうきゅうふ' },
      { kanji: '住宅改修', reading: 'じゅうたくかいしゅう' },
      { kanji: '小規模多機能型居宅介護', reading: 'しょうきぼたきのうがたきょたくかいご' },
      { kanji: '該当', reading: 'がいとう' },
      { kanji: '夜間対応型訪問介護', reading: 'やかんたいおうがたほうもんかいご' },
      { kanji: '要介護者', reading: 'ようかいごしゃ' },
      { kanji: '対象外', reading: 'たいしょうがい' },
      { kanji: '金銭管理', reading: 'きんせんかんり' },
      { kanji: '支援', reading: 'しえん' },
      { kanji: '日常生活自立支援事業', reading: 'にちじょうせいかつじりつしえんじぎょう' },
      { kanji: '介護保険制度', reading: 'かいごほけんせいど' },
      { kanji: '社会福祉協議会', reading: 'しゃかいふくしきょうぎかい' },
      { kanji: '実施', reading: 'じっし' },
      { kanji: '事業', reading: 'じぎょう' },
      { kanji: '注意', reading: 'ちゅうい' },
      { kanji: '必要', reading: 'ひつよう' },
    ],
    linkMatch: '一人暮らしの要支援者を支えるサービス',
  },
  {
    kamoku_id: 2,
    order_index: 6,
    title_jp: '生活史を尊重したかかわり',
    content_jp:
      '利用者にはそれぞれ、仕事や役割、大切にしてきた価値観を含む生活史があります。介護福祉職は、その生活史を否定せず尊重した声かけや支援を行うことが求められます。本人が自宅での生活継続を望む場合は、近隣住民の協力など地域資源を活用しながら、その意思を尊重した支援を検討します。',
    content_id:
      'Setiap pengguna layanan memiliki riwayat hidup masing-masing, termasuk pekerjaan, peran, dan nilai-nilai yang dijunjung. Pekerja kaigo dituntut untuk tidak menyangkal riwayat hidup tersebut dan memberi respons/dukungan yang menghormatinya. Jika pengguna ingin tetap tinggal di rumah, pertimbangkan dukungan yang menghargai keinginan itu dengan memanfaatkan sumber daya komunitas, misalnya kerja sama warga sekitar.',
    example_jp: '長年、教師をしていた利用者に「先生」と呼びかけ、その経歴を尊重する。',
    example_id: 'Memanggil pengguna layanan yang dulunya guru dengan sebutan "sensei" sebagai bentuk penghormatan atas latar belakangnya.',
    exam_point_jp: '本人の意思や過去の役割を否定する声かけ（「忘れて」「慣れてください」等）は不適切な選択肢になりやすい。',
    exam_point_id: 'Ucapan yang menyangkal keinginan atau peran masa lalu seseorang (misal "lupakan saja", "biasakan diri") biasanya jadi pilihan yang tidak tepat.',
    furigana_map: [
      { kanji: '利用者', reading: 'りようしゃ' },
      { kanji: '仕事', reading: 'しごと' },
      { kanji: '役割', reading: 'やくわり' },
      { kanji: '大切', reading: 'たいせつ' },
      { kanji: '価値観', reading: 'かちかん' },
      { kanji: '含', reading: 'ふく' },
      { kanji: '生活史', reading: 'せいかつし' },
      { kanji: '介護福祉職', reading: 'かいごふくししょく' },
      { kanji: '否定', reading: 'ひてい' },
      { kanji: '尊重', reading: 'そんちょう' },
      { kanji: '声', reading: 'こえ' },
      { kanji: '支援', reading: 'しえん' },
      { kanji: '求', reading: 'もと' },
      { kanji: '本人', reading: 'ほんにん' },
      { kanji: '自宅', reading: 'じたく' },
      { kanji: '生活継続', reading: 'せいかつけいぞく' },
      { kanji: '望', reading: 'のぞ' },
      { kanji: '場合', reading: 'ばあい' },
      { kanji: '近隣住民', reading: 'きんりんじゅうみん' },
      { kanji: '協力', reading: 'きょうりょく' },
      { kanji: '地域資源', reading: 'ちいきしげん' },
      { kanji: '活用', reading: 'かつよう' },
      { kanji: '意思', reading: 'いし' },
      { kanji: '検討', reading: 'けんとう' },
    ],
    linkMatch: '長年診療所の医師として地域医療に貢献',
  },
  {
    kamoku_id: 2,
    order_index: 7,
    title_jp: '施設における多職種連携',
    content_jp:
      '在宅復帰に向けた支援には、多職種の連携が欠かせません。作業療法士は自宅の環境評価（玄関の段差確認など）を担当し、理学療法士は身体機能訓練を行います。福祉用具専門相談員は福祉用具の選定・貸与、介護支援専門員（ケアマネジャー）はケアプランの作成、歯科医師は義歯の作成を担当します。介護福祉士は各職種と情報を共有しながら、日々の生活支援を行う役割を担います。',
    content_id:
      'Dukungan menuju kembalinya pengguna ke rumah membutuhkan kerja sama antarprofesi. Terapis okupasi menangani evaluasi lingkungan rumah (misal cek undakan di pintu masuk), sedangkan fisioterapis melakukan pelatihan fungsi tubuh. Konsultan alat bantu kesejahteraan memilih & menyewakan alat bantu, care manager (介護支援専門員) menyusun rencana perawatan (care plan), dan dokter gigi membuat gigi palsu. Pekerja kaigo berperan berbagi informasi dengan tiap profesi sembari menjalankan dukungan kehidupan sehari-hari.',
    example_jp: 'カンファレンスで、作業療法士が自宅の段差について報告する。',
    example_id: 'Dalam konferensi, terapis okupasi melaporkan soal undakan di rumah pengguna.',
    exam_point_jp: '職種と役割の組み合わせ（誰が何をするか）が頻出。義歯＝歯科医師、車いす貸与＝福祉用具専門相談員、訪問介護計画＝サービス提供責任者、など整理しておく。',
    exam_point_id: 'Pasangan profesi-tugas sering keluar. Ingat: gigi palsu = dokter gigi, penyewaan kursi roda = konsultan alat bantu, rencana kunjungan perawatan = penanggung jawab layanan (bukan care manager).',
    furigana_map: [
      { kanji: '在宅復帰', reading: 'ざいたくふっき' },
      { kanji: '多職種', reading: 'たしょくしゅ' },
      { kanji: '連携', reading: 'れんけい' },
      { kanji: '欠', reading: 'か' },
      { kanji: '作業療法士', reading: 'さぎょうりょうほうし' },
      { kanji: '自宅', reading: 'じたく' },
      { kanji: '環境評価', reading: 'かんきょうひょうか' },
      { kanji: '玄関', reading: 'げんかん' },
      { kanji: '段差', reading: 'だんさ' },
      { kanji: '確認', reading: 'かくにん' },
      { kanji: '担当', reading: 'たんとう' },
      { kanji: '理学療法士', reading: 'りがくりょうほうし' },
      { kanji: '身体機能訓練', reading: 'しんたいきのうくんれん' },
      { kanji: '福祉用具専門相談員', reading: 'ふくしようぐせんもんそうだんいん' },
      { kanji: '選定', reading: 'せんてい' },
      { kanji: '貸与', reading: 'たいよ' },
      { kanji: '介護支援専門員', reading: 'かいごしえんせんもんいん' },
      { kanji: '作成', reading: 'さくせい' },
      { kanji: '歯科医師', reading: 'しかいし' },
      { kanji: '義歯', reading: 'ぎし' },
      { kanji: '介護福祉士', reading: 'かいごふくしし' },
      { kanji: '各', reading: 'かく' },
      { kanji: '情報', reading: 'じょうほう' },
      { kanji: '共有', reading: 'きょうゆう' },
      { kanji: '日々', reading: 'ひび' },
      { kanji: '役割', reading: 'やくわり' },
      { kanji: '担', reading: 'にな' },
    ],
    linkMatch: '介護老人保健施設における在宅復帰に向けたカンファレンス',
  },
  {
    kamoku_id: 2,
    order_index: 8,
    title_jp: '介護現場のリスクマネジメント',
    content_jp:
      'リスクマネジメントは、個人ではなく組織で取り組むことが基本です。安全対策担当者を配置し、事故防止のための委員会を定期的に開催します。ヒヤリハットやインシデントは口頭だけでなく文書で報告・共有し、再発防止に活かします。私物の破損や苦情への対応も、職員個人の自己判断ではなく組織的な手順に沿って行います。',
    content_id:
      'Manajemen risiko pada dasarnya adalah upaya organisasi, bukan individu. Menempatkan penanggung jawab keselamatan dan mengadakan komite pencegahan kecelakaan secara berkala. Insiden nyaris celaka (ヒヤリハット) dan insiden lain dilaporkan & dibagikan secara tertulis, bukan hanya lisan, untuk mencegah kejadian berulang. Kerusakan barang pribadi atau keluhan pun ditangani lewat prosedur organisasi, bukan keputusan sepihak staf.',
    example_jp: 'ヒヤリハット報告書をもとに、事故防止委員会で対策を話し合う。',
    example_id: 'Membahas langkah pencegahan di komite pencegahan kecelakaan berdasarkan laporan insiden nyaris celaka.',
    exam_point_jp: '「職員個人の判断で対応」「口頭のみで報告」「参加を控える(過度な制限)」は組織的リスクマネジメントの原則に反し誤りになりやすい。',
    exam_point_id: '"Ditangani sepihak oleh staf", "laporan hanya lisan", "membatasi kegiatan secara berlebihan" bertentangan dengan prinsip manajemen risiko organisasi dan biasanya jawaban salah.',
    furigana_map: [
      { kanji: '個人', reading: 'こじん' },
      { kanji: '組織', reading: 'そしき' },
      { kanji: '取', reading: 'と' },
      { kanji: '組', reading: 'く' },
      { kanji: '基本', reading: 'きほん' },
      { kanji: '安全対策担当者', reading: 'あんぜんたいさくたんとうしゃ' },
      { kanji: '配置', reading: 'はいち' },
      { kanji: '事故防止', reading: 'じこぼうし' },
      { kanji: '委員会', reading: 'いいんかい' },
      { kanji: '定期的', reading: 'ていきてき' },
      { kanji: '開催', reading: 'かいさい' },
      { kanji: '口頭', reading: 'こうとう' },
      { kanji: '文書', reading: 'ぶんしょ' },
      { kanji: '報告', reading: 'ほうこく' },
      { kanji: '共有', reading: 'きょうゆう' },
      { kanji: '再発防止', reading: 'さいはつぼうし' },
      { kanji: '活', reading: 'い' },
      { kanji: '私物', reading: 'しぶつ' },
      { kanji: '破損', reading: 'はそん' },
      { kanji: '苦情', reading: 'くじょう' },
      { kanji: '対応', reading: 'たいおう' },
      { kanji: '職員', reading: 'しょくいん' },
      { kanji: '自己判断', reading: 'じこはんだん' },
      { kanji: '組織的', reading: 'そしきてき' },
      { kanji: '手順', reading: 'てじゅん' },
      { kanji: '沿', reading: 'そ' },
      { kanji: '行', reading: 'おこな' },
    ],
    linkMatch: '介護老人福祉施設におけるリスクマネジメント',
  },
  {
    kamoku_id: 2,
    order_index: 9,
    title_jp: '感染対策（レジオネラ菌）',
    content_jp:
      'レジオネラ菌は、循環式浴槽や加湿器のタンクなど、主に水系の環境で増殖します。対策としては、循環式浴槽を塩素系薬剤で消毒すること、加湿器のタンクの水を溜め置きせずこまめに交換することが重要です。ドアノブの消毒（次亜塩素酸ナトリウム）は接触感染対策であり、レジオネラ菌対策とは目的が異なる点に注意します。',
    content_id:
      'Bakteri Legionella terutama berkembang biak di lingkungan berair, seperti bak mandi bersirkulasi atau tangki humidifier. Langkah pencegahannya: mendisinfeksi bak mandi bersirkulasi dengan bahan kimia berbasis klorin, serta rutin mengganti air tangki humidifier alih-alih membiarkannya tergenang. Perlu diperhatikan bahwa disinfeksi gagang pintu (dengan sodium hipoklorit) adalah pencegahan penularan lewat sentuhan, tujuannya berbeda dari pencegahan Legionella.',
    example_jp: '循環式浴槽の配管を定期的に清掃し、塩素消毒を行う。',
    example_id: 'Membersihkan pipa bak mandi bersirkulasi secara berkala dan mendisinfeksinya dengan klorin.',
    exam_point_jp: '「加湿器の水を溜めておく」は逆効果で誤り。レジオネラ＝水系対策、ドアノブ等＝接触感染対策、と目的を区別する。',
    exam_point_id: '"Membiarkan air humidifier tergenang" justru berbahaya dan salah. Bedakan: Legionella = pencegahan lewat air, gagang pintu dsb. = pencegahan penularan sentuhan.',
    furigana_map: [
      { kanji: '循環式浴槽', reading: 'じゅんかんしきよくそう' },
      { kanji: '加湿器', reading: 'かしつき' },
      { kanji: '主', reading: 'おも' },
      { kanji: '水系', reading: 'すいけい' },
      { kanji: '環境', reading: 'かんきょう' },
      { kanji: '増殖', reading: 'ぞうしょく' },
      { kanji: '対策', reading: 'たいさく' },
      { kanji: '塩素系薬剤', reading: 'えんそけいやくざい' },
      { kanji: '消毒', reading: 'しょうどく' },
      { kanji: '水', reading: 'みず' },
      { kanji: '溜', reading: 'た' },
      { kanji: '置', reading: 'お' },
      { kanji: '交換', reading: 'こうかん' },
      { kanji: '重要', reading: 'じゅうよう' },
      { kanji: '次亜塩素酸', reading: 'じあえんそさん' },
      { kanji: '接触感染', reading: 'せっしょくかんせん' },
      { kanji: '目的', reading: 'もくてき' },
      { kanji: '異', reading: 'こと' },
      { kanji: '注意', reading: 'ちゅうい' },
    ],
    linkMatch: '介護現場におけるレジオネラ菌の感染対策',
  },
  {
    kamoku_id: 2,
    order_index: 10,
    title_jp: 'ストレスチェック制度',
    content_jp:
      'ストレスチェック制度は、労働者の心理的な負担の程度を把握することを目的とした制度で、常時50人以上の労働者を使用する事業場に年1回の実施が義務づけられています（50人未満は努力義務）。結果は本人の同意なく事業者に提供されません。高ストレスと判定され、面接指導を希望する場合は本人からの申出が必要で、産業医による治療が必須というわけではありません。',
    content_id:
      'Sistem pemeriksaan stres bertujuan mengetahui tingkat beban psikologis pekerja. Wajib dilaksanakan setahun sekali di tempat kerja dengan 50 pekerja tetap atau lebih (di bawah 50 orang hanya upaya sukarela). Hasilnya tidak diberikan ke pemberi kerja tanpa persetujuan pekerja. Jika dinilai berstres tinggi dan ingin konsultasi tatap muka, pekerja sendiri yang harus mengajukan permintaan — dan pengobatan oleh dokter industri bukanlah kewajiban.',
    example_jp: '年に1回、全職員がストレスチェックを受検する。',
    example_id: 'Seluruh staf menjalani pemeriksaan stres setahun sekali.',
    exam_point_jp: '「3年に1回」「100名で免除」「介護主任へ結果提供」「治療必須」はいずれも誤り。正しくは「1年に1回」「50名未満は努力義務」「本人同意が必要」「治療は必須ではない」。',
    exam_point_id: '"Setiap 3 tahun", "bebas kewajiban di 100 orang", "hasil diberikan ke penyelia", "wajib diobati" — semuanya salah. Yang benar: setahun sekali, di bawah 50 orang hanya upaya sukarela, perlu persetujuan pekerja, pengobatan tidak wajib.',
    furigana_map: [
      { kanji: '労働者', reading: 'ろうどうしゃ' },
      { kanji: '心理的', reading: 'しんりてき' },
      { kanji: '負担', reading: 'ふたん' },
      { kanji: '程度', reading: 'ていど' },
      { kanji: '把握', reading: 'はあく' },
      { kanji: '目的', reading: 'もくてき' },
      { kanji: '制度', reading: 'せいど' },
      { kanji: '常時', reading: 'じょうじ' },
      { kanji: '使用', reading: 'しよう' },
      { kanji: '事業場', reading: 'じぎょうば' },
      { kanji: '実施', reading: 'じっし' },
      { kanji: '義務', reading: 'ぎむ' },
      { kanji: '未満', reading: 'みまん' },
      { kanji: '努力義務', reading: 'どりょくぎむ' },
      { kanji: '結果', reading: 'けっか' },
      { kanji: '本人', reading: 'ほんにん' },
      { kanji: '同意', reading: 'どうい' },
      { kanji: '事業者', reading: 'じぎょうしゃ' },
      { kanji: '提供', reading: 'ていきょう' },
      { kanji: '判定', reading: 'はんてい' },
      { kanji: '面接指導', reading: 'めんせつしどう' },
      { kanji: '希望', reading: 'きぼう' },
      { kanji: '場合', reading: 'ばあい' },
      { kanji: '申出', reading: 'もうしで' },
      { kanji: '必要', reading: 'ひつよう' },
      { kanji: '産業医', reading: 'さんぎょうい' },
      { kanji: '治療', reading: 'ちりょう' },
      { kanji: '必須', reading: 'ひっす' },
    ],
    linkMatch: 'ストレスチェック制度に関する次の記述',
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

    // link to matching question(s) in the same kamoku
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
