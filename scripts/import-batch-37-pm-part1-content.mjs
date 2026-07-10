// Materi + kosakata untuk 第37回 午後 問題64-73 (kamoku 2 tambahan)
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
  { kamoku_id: 2, kanji: '福祉六法', furigana: 'ふくしろっぽう', meaning_id: 'Enam UU kesejahteraan dasar Jepang (生活保護法・児童福祉法・身体障害者福祉法・知的障害者福祉法・老人福祉法・母子父子寡婦福祉法)', example_sentence_jp: '福祉六法は日本の社会福祉制度の基礎となっている。', example_sentence_id: 'Enam UU kesejahteraan dasar menjadi fondasi sistem kesejahteraan sosial Jepang.' },
  { kamoku_id: 2, kanji: '信用失墜行為', furigana: 'しんようしっついこうい', meaning_id: 'Tindakan yang mencoreng kredibilitas profesi — dilarang bagi pekerja kaigo bersertifikat', example_sentence_jp: '介護福祉士は信用失墜行為をしてはならない。', example_sentence_id: 'Pekerja kaigo dilarang melakukan tindakan yang mencoreng kredibilitas profesinya.' },
  { kamoku_id: 2, kanji: 'ユニット型介護老人福祉施設', furigana: 'ゆにっとがたかいごろうじんふくししせつ', meaning_id: 'Panti wredha tipe unit — kelompok kecil huni dengan suasana seperti rumah', example_sentence_jp: 'ユニット型介護老人福祉施設では、少人数のグループで生活する。', example_sentence_id: 'Di panti wredha tipe unit, penghuni tinggal dalam kelompok kecil.' },
  { kamoku_id: 2, kanji: 'ＩＣＦ', furigana: 'あいしーえふ', meaning_id: 'ICF — Klasifikasi Internasional Fungsi, Disabilitas & Kesehatan (mencakup fungsi tubuh, aktivitas, partisipasi, faktor lingkungan)', example_sentence_jp: 'ＩＣＦの視点から利用者の生活全体を評価する。', example_sentence_id: 'Menilai keseluruhan kehidupan pengguna layanan dari sudut pandang ICF.' },
  { kamoku_id: 2, kanji: '生活援助', furigana: 'せいかつえんじょ', meaning_id: 'Bantuan hidup sehari-hari — kategori layanan kunjungan perawatan (masak, bersih-bersih, dll.)', example_sentence_jp: '生活援助として、利用者と一緒に掃除を行う。', example_sentence_id: 'Sebagai bantuan hidup sehari-hari, membersihkan rumah bersama pengguna layanan.' },
  { kamoku_id: 2, kanji: '労働安全衛生法', furigana: 'ろうどうあんぜんえいせいほう', meaning_id: 'UU Kesehatan & Keselamatan Kerja — mewajibkan pemeriksaan kesehatan berkala', example_sentence_jp: '労働安全衛生法に基づき、年1回の健康診断を受ける。', example_sentence_id: 'Menjalani pemeriksaan kesehatan setahun sekali berdasarkan UU ini.' },
  { kamoku_id: 2, kanji: '介護休業', furigana: 'かいごきゅうぎょう', meaning_id: 'Cuti perawatan keluarga — total 93 hari per anggota keluarga', example_sentence_jp: '親の介護のために介護休業を取得した。', example_sentence_id: 'Mengambil cuti perawatan keluarga untuk merawat orang tua.' },
  { kamoku_id: 2, kanji: '自助具', furigana: 'じじょぐ', meaning_id: 'Alat bantu mandiri — memudahkan pengguna melakukan aktivitas sendiri', example_sentence_jp: '自助具を使って、自分でスプーンを持てるようにする。', example_sentence_id: 'Memakai alat bantu mandiri agar bisa memegang sendok sendiri.' },
  { kamoku_id: 2, kanji: 'チームアプローチ', furigana: 'ちーむあぷろーち', meaning_id: 'Pendekatan tim — berbagai profesi berkolaborasi menuju tujuan bersama', example_sentence_jp: '多職種によるチームアプローチで課題を解決する。', example_sentence_id: 'Menyelesaikan masalah lewat pendekatan tim lintas profesi.' },
  { kamoku_id: 2, kanji: 'セルフヘルプグループ', furigana: 'せるふへるぷぐるーぷ', meaning_id: 'Kelompok dukungan sesama (peer support) — sesama pengalaman saling mendukung', example_sentence_jp: 'セルフヘルプグループで体験を語り合う。', example_sentence_id: 'Saling bercerita pengalaman di kelompok dukungan sesama.' },
  { kamoku_id: 2, kanji: '業務継続計画', furigana: 'ぎょうむけいぞくけいかく', meaning_id: 'Rencana keberlangsungan usaha (BCP) — wajib disusun fasilitas asuransi perawatan sejak 2021', example_sentence_jp: '災害時に備え、業務継続計画（ＢＣＰ）を策定する。', example_sentence_id: 'Menyusun rencana keberlangsungan usaha untuk mengantisipasi bencana.' },
  { kamoku_id: 2, kanji: '結核', furigana: 'けっかく', meaning_id: 'Tuberkulosis (TBC) — penyakit menular lewat udara, dicegah dengan skrining rontgen dada berkala', example_sentence_jp: '年に1回の胸部Ｘ線検査で結核の早期発見に努める。', example_sentence_id: 'Berupaya deteksi dini TBC lewat rontgen dada setahun sekali.' },
]

const materialSections = [
  {
    kamoku_id: 2,
    order_index: 11,
    title_jp: '介護福祉に関連する法律の全体像',
    content_jp:
      '介護福祉に関わる法律にはそれぞれ役割があります。介護保険法は「国民の共同連帯の理念」に基づき介護保険制度を設けています。社会福祉士の定義は社会福祉士及び介護福祉士法で規定され、社会福祉法ではありません。高齢者虐待防止法は福祉六法（生活保護法・児童福祉法・身体障害者福祉法・知的障害者福祉法・老人福祉法・母子父子寡婦福祉法）には含まれません。障害者基本計画は障害者基本法に基づくもので、障害者総合支援法の規定ではありません。',
    content_id:
      'Setiap UU terkait kaigo punya peran masing-masing. UU Asuransi Perawatan didirikan berdasarkan "prinsip solidaritas bersama warga negara". Definisi pekerja sosial diatur UU Pekerja Sosial & Pekerja Kaigo, bukan UU Kesejahteraan Sosial. UU Pencegahan Kekerasan Lansia tidak termasuk 6 UU kesejahteraan dasar. Rencana dasar disabilitas diatur UU Dasar Disabilitas, bukan UU Dukungan Komprehensif Disabilitas.',
    example_jp: '介護保険法第1条には、「国民の共同連帯の理念」に基づく制度であることが明記されている。',
    example_id: 'Pasal 1 UU Asuransi Perawatan menyatakan tegas bahwa sistem ini berdasarkan "prinsip solidaritas bersama warga negara".',
    exam_point_jp: '各法律の正式な規定内容を、似た名前の別の法律と混同しないこと。「誰が」「何を」定めているかを正確に整理する。',
    exam_point_id: 'Jangan tertukar isi ketentuan tiap UU dengan UU lain yang namanya mirip. Hafalkan dengan tepat "siapa" mengatur "apa".',
    furigana_map: fm([
      ['介護福祉', 'かいごふくし'], ['関連', 'かんれん'], ['法律', 'ほうりつ'], ['役割', 'やくわり'], ['介護保険法', 'かいごほけんほう'],
      ['国民', 'こくみん'], ['共同連帯', 'きょうどうれんたい'], ['理念', 'りねん'], ['制度', 'せいど'], ['社会福祉士', 'しゃかいふくしし'],
      ['定義', 'ていぎ'], ['規定', 'きてい'], ['社会福祉法', 'しゃかいふくしほう'], ['福祉六法', 'ふくしろっぽう'],
      ['障害者基本計画', 'しょうがいしゃきほんけいかく'], ['障害者基本法', 'しょうがいしゃきほんほう'],
    ]),
    linkMatch: '介護福祉に関連する法律に関する次の記述',
  },
  {
    kamoku_id: 2,
    order_index: 12,
    title_jp: '社会福祉士及び介護福祉士法の規定',
    content_jp:
      '介護福祉士には資格更新研修の義務はありません。社会福祉士の業務を介護福祉士が行うことを禁じる規定もなく、介護福祉士は名称独占（介護福祉士でない者がその名称を名乗れない）の資格です。信用失墜行為の禁止と秘密保持義務（業を辞した後も継続）が明記されています。国家試験合格だけでは足りず、登録を受けて初めて介護福祉士を名乗ることができます。',
    content_id:
      'Sertifikasi pekerja kaigo tidak memiliki kewajiban pelatihan pembaruan berkala. Tidak ada larangan pekerja kaigo melakukan tugas pekerja sosial; sertifikasi ini bersifat monopoli gelar (orang yang tidak bersertifikat dilarang memakai gelar tersebut). Larangan tindakan yang mencoreng kredibilitas dan kewajiban menjaga kerahasiaan (berlaku terus meski sudah berhenti berprofesi) tercantum jelas. Lulus ujian saja belum cukup — perlu registrasi resmi dulu sebelum boleh memakai gelar pekerja kaigo.',
    example_jp: '介護福祉士でなくなった後も、仕事で知った利用者の個人情報を漏らしてはならない。',
    example_id: 'Meski sudah tidak lagi berprofesi sebagai pekerja kaigo, tetap dilarang membocorkan info pribadi pengguna layanan yang diketahui selama bekerja.',
    exam_point_jp: '介護福祉士は名称独占資格（業務独占ではない）、秘密保持義務は退職後も継続、登録が必要（合格だけでは不可）という3点が頻出。',
    exam_point_id: '3 poin sering keluar: sertifikasi ini monopoli gelar (bukan monopoli tugas), kewajiban rahasia berlaku terus setelah berhenti kerja, perlu registrasi (lulus ujian saja tidak cukup).',
    furigana_map: fm([
      ['社会福祉士', 'しゃかいふくしし'], ['介護福祉士法', 'かいごふくししほう'], ['資格更新研修', 'しかくこうしんけんしゅう'],
      ['義務', 'ぎむ'], ['業務', 'ぎょうむ'], ['禁', 'きん'], ['名称独占', 'めいしょうどくせん'], ['資格', 'しかく'],
      ['信用失墜行為', 'しんようしっついこうい'], ['禁止', 'きんし'], ['秘密保持義務', 'ひみつほじぎむ'], ['継続', 'けいぞく'],
      ['国家試験', 'こっかしけん'], ['合格', 'ごうかく'], ['登録', 'とうろく'], ['名乗', 'なの'],
    ]),
    linkMatch: '社会福祉士及び介護福祉士法に関する次の記述',
  },
  {
    kamoku_id: 2,
    order_index: 13,
    title_jp: '認知症の人の生活史を活かした対応',
    content_jp:
      '認知症の人が不安から「帰らないと」「〜をしないと」と興奮する背景には、多くの場合、本人が大切にしてきた役割や生活史があります。対応としては、身体拘束（鍵をかける等）や薬剤の独断投与、事実の一方的な押しつけを避け、本人の役割（家事・仕事等）を一緒に行うなど、不安の背景にある気持ちに寄り添うことが基本です。',
    content_id:
      'Ketika penderita demensia menjadi cemas dan gelisah dengan ucapan seperti "harus pulang" atau "harus melakukan X", di baliknya sering ada peran/riwayat hidup yang penting bagi dirinya. Responsnya: hindari pembatasan fisik (mengunci pintu, dll.), pemberian obat sepihak, atau memaksakan fakta — dasarnya adalah mendampingi perasaan di balik kecemasan itu, misalnya dengan melakukan bersama peran (pekerjaan rumah, dll.) yang penting baginya.',
    example_jp: '「ご飯の支度をしないと」と不安がるＡさんに、一緒に夕食の準備をしてもらう。',
    example_id: 'Kepada Aさん yang cemas berkata "harus siapkan makan", mengajaknya menyiapkan makan malam bersama.',
    exam_point_jp: '身体拘束・独断での薬剤投与・事実の押しつけは不適切な選択肢になりやすい。本人の役割を活かす対応が正解になりやすい。',
    exam_point_id: 'Pembatasan fisik, pemberian obat sepihak, dan memaksakan fakta biasanya jawaban salah. Respons yang memanfaatkan peran penting bagi penderita biasanya jawaban benar.',
    furigana_map: fm([
      ['不安', 'ふあん'], ['興奮', 'こうふん'], ['背景', 'はいけい'], ['役割', 'やくわり'], ['生活史', 'せいかつし'],
      ['対応', 'たいおう'], ['身体拘束', 'しんたいこうそく'], ['薬剤', 'やくざい'], ['独断', 'どくだん'], ['投与', 'とうよ'],
      ['事実', 'じじつ'], ['押', 'お'], ['避', 'さ'], ['家事', 'かじ'], ['寄', 'よ'], ['添', 'そ'], ['基本', 'きほん'],
    ]),
    linkMatch: '血管性認知症（vascular dementia）を発症し',
  },
  {
    kamoku_id: 2,
    order_index: 14,
    title_jp: 'ICFの構成要素（心身機能・活動・参加）',
    content_jp:
      'ICF（国際生活機能分類）は、生活機能を「心身機能・身体構造」「活動」「参加」の3レベルと、それに影響する「環境因子」「個人因子」で捉えます。「活動」は本人が実際に行う行為（体操をする等）、「参加」は社会的な関わり（場に通う等）を指します。家族による代行や福祉用具の活用は、本人の活動・参加そのものではなく環境因子側の支援にあたります。',
    content_id:
      'ICF (Klasifikasi Internasional Fungsi) memahami fungsi kehidupan dalam 3 level: "fungsi tubuh & struktur tubuh", "aktivitas", "partisipasi", ditambah "faktor lingkungan" dan "faktor personal" yang memengaruhinya. "Aktivitas" adalah tindakan yang benar-benar dilakukan sendiri (misal senam), "partisipasi" adalah keterlibatan sosial (misal rutin datang ke suatu tempat). Bantuan pengganti dari keluarga atau pemakaian alat bantu termasuk dukungan faktor lingkungan, bukan aktivitas/partisipasi orang itu sendiri.',
    example_jp: '認知症カフェに通い（参加）、そこで体操をする（活動）ことは、ICFの2つの要素が関連する好例である。',
    example_id: 'Rutin datang ke kafe demensia (partisipasi) dan bersenam di sana (aktivitas) adalah contoh baik keterkaitan 2 unsur ICF.',
    exam_point_jp: '「本人が実際に行う行為」か「他者による代行・環境整備」かを見分ける。後者は活動・参加ではなく環境因子に分類される。',
    exam_point_id: 'Bedakan "tindakan yang benar-benar dilakukan orang itu sendiri" vs "diwakilkan orang lain/penataan lingkungan". Yang kedua diklasifikasikan sebagai faktor lingkungan, bukan aktivitas/partisipasi.',
    furigana_map: fm([
      ['国際生活機能分類', 'こくさいせいかつきのうぶんるい'], ['生活機能', 'せいかつきのう'], ['心身機能', 'しんしんきのう'],
      ['身体構造', 'しんたいこうぞう'], ['活動', 'かつどう'], ['参加', 'さんか'], ['環境因子', 'かんきょういんし'],
      ['個人因子', 'こじんいんし'], ['本人', 'ほんにん'], ['実際', 'じっさい'], ['行為', 'こうい'], ['社会的', 'しゃかいてき'],
      ['関', 'かか'], ['代行', 'だいこう'], ['福祉用具', 'ふくしようぐ'], ['活用', 'かつよう'],
    ]),
    linkMatch: '「参加」と「活動」の2つが関連した',
  },
  {
    kamoku_id: 2,
    order_index: 15,
    title_jp: '訪問介護のサービス範囲',
    content_jp:
      '訪問介護（ホームヘルパー）が行うサービスは、利用者本人の日常生活に直接必要な援助が基本です。掃除・調理などの家事を利用者と一緒に、あるいは本人に代わって行う「生活援助」は対象ですが、ペットの世話、庭の水やり、私的な外食への同行、金銭・貴重品の管理を伴う行為は、原則としてサービス範囲外です。',
    content_id:
      'Layanan kunjungan perawatan (home helper) pada dasarnya adalah bantuan yang langsung diperlukan bagi kehidupan sehari-hari pengguna. Membersihkan/memasak bersama atau mewakili pengguna termasuk "bantuan hidup sehari-hari" yang dicakup, tapi merawat hewan peliharaan, menyiram tanaman, menemani makan di luar untuk keperluan pribadi, dan pengelolaan uang/barang berharga pada prinsipnya di luar cakupan layanan.',
    example_jp: '利用者と一緒に部屋の掃除をするのは生活援助にあたるが、庭の花に水をやるのは対象外である。',
    example_id: 'Membersihkan kamar bersama pengguna termasuk bantuan hidup sehari-hari, tapi menyiram bunga di taman di luar cakupan.',
    exam_point_jp: '「本人の生活に直接必要か」で判断する。ペットの世話・私的な付き添い・金銭管理はいずれも対象外になりやすい。',
    exam_point_id: 'Nilai dari "apakah langsung diperlukan bagi kehidupan pengguna". Merawat hewan, menemani urusan pribadi, dan pengelolaan uang biasanya di luar cakupan.',
    furigana_map: fm([
      ['訪問介護', 'ほうもんかいご'], ['ホームヘルパー', 'ほーむへるぱー'], ['日常生活', 'にちじょうせいかつ'], ['直接', 'ちょくせつ'],
      ['援助', 'えんじょ'], ['基本', 'きほん'], ['掃除', 'そうじ'], ['調理', 'ちょうり'], ['家事', 'かじ'], ['代', 'か'],
      ['生活援助', 'せいかつえんじょ'], ['対象', 'たいしょう'], ['私的', 'してき'], ['同行', 'どうこう'], ['金銭', 'きんせん'],
      ['貴重品', 'きちょうひん'], ['管理', 'かんり'], ['原則', 'げんそく'], ['範囲外', 'はんいがい'],
    ]),
    linkMatch: '訪問介護員（ホームヘルパー）が行うサービス内容',
  },
  {
    kamoku_id: 2,
    order_index: 16,
    title_jp: '介護従事者を守る労働関連法規',
    content_jp:
      '労働安全衛生法は、年1回以上の定期健康診断の実施や、快適な職場環境の形成促進を事業者に義務づけています。労働時間・賃金・休暇などの労働条件は労働基準法で定められます。介護休業は対象家族1人につき通算93日まで取得でき、出生時育児休業（産後パパ育休）は子の出生後8週間以内に通算4週間まで取得できます。',
    content_id:
      'UU Kesehatan & Keselamatan Kerja mewajibkan pemberi kerja melakukan pemeriksaan kesehatan berkala minimal setahun sekali dan mempromosikan lingkungan kerja yang nyaman. Jam kerja, upah, cuti diatur UU Standar Ketenagakerjaan. Cuti perawatan keluarga bisa diambil total 93 hari per anggota keluarga, dan cuti ayah pasca kelahiran bisa diambil total 4 minggu dalam 8 minggu setelah kelahiran anak.',
    example_jp: '事業者は、労働者に対して年1回の定期健康診断を実施しなければならない。',
    example_id: 'Pemberi kerja wajib melakukan pemeriksaan kesehatan berkala setahun sekali bagi pekerjanya.',
    exam_point_jp: '介護休業＝通算93日（毎年ではない）、出生時育児休業＝8週間以内に4週間まで、という具体的な数字を正確に覚える。',
    exam_point_id: 'Hafalkan angka pastinya: cuti perawatan = total 93 hari (bukan tiap tahun), cuti ayah pasca kelahiran = maksimal 4 minggu dalam 8 minggu.',
    furigana_map: fm([
      ['介護従事者', 'かいごじゅうじしゃ'], ['労働関連法規', 'ろうどうかんれんほうき'], ['労働安全衛生法', 'ろうどうあんぜんえいせいほう'],
      ['定期健康診断', 'ていきけんこうしんだん'], ['実施', 'じっし'], ['快適', 'かいてき'], ['職場環境', 'しょくばかんきょう'],
      ['形成', 'けいせい'], ['促進', 'そくしん'], ['事業者', 'じぎょうしゃ'], ['義務', 'ぎむ'], ['労働条件', 'ろうどうじょうけん'],
      ['労働基準法', 'ろうどうきじゅんほう'], ['介護休業', 'かいごきゅうぎょう'], ['通算', 'つうさん'], ['出生時育児休業', 'しゅっしょうじいくじきゅうぎょう'],
    ]),
    linkMatch: '介護従事者を守る法制度として',
  },
  {
    kamoku_id: 2,
    order_index: 17,
    title_jp: '多文化背景をもつ利用者への対応',
    content_jp:
      '外国出身の利用者に対しては、母語や文化的アイデンティティを否定せず、本人のこれまでの生活様式や希望を尊重した支援が基本です。「自分のペースで食事をしたい」といった具体的な希望には、自助具の活用状況を確認するなど、自立を後押しする形で応えます。日本の生活様式への一方的な同化を求めたり、余暇活動の内容を介護福祉職が一方的に決めたりすることは、本人の自己決定を尊重する考え方に反します。',
    content_id:
      'Bagi pengguna layanan berlatar belakang asing, dasar dukungannya adalah tidak menyangkal bahasa ibu/identitas budayanya, dan menghormati gaya hidup & keinginannya selama ini. Untuk keinginan konkret seperti "ingin makan dengan ritme sendiri", responsnya mendukung kemandirian, misalnya mengecek pemakaian alat bantu makan. Memaksa asimilasi sepihak ke gaya hidup Jepang atau menentukan sepihak aktivitas waktu luangnya bertentangan dengan prinsip menghormati hak menentukan pilihan sendiri.',
    example_jp: 'Ｂさんが自分のペースで食事できるように、使いやすい自助具がないか確認する。',
    example_id: 'Mengecek apakah ada alat bantu makan yang cocok agar Bさん bisa makan dengan ritmenya sendiri.',
    exam_point_jp: '「母語を使わせない」「生活様式を一方的に決める」「介護職が余暇を判断する」は不適切な選択肢になりやすい。本人の希望に沿った自立支援が正解。',
    exam_point_id: '"Melarang bahasa ibu", "menentukan gaya hidup sepihak", "staf yang memutuskan waktu luang" biasanya jawaban salah. Dukungan kemandirian sesuai keinginan pengguna adalah jawaban benar.',
    furigana_map: fm([
      ['多文化', 'たぶんか'], ['背景', 'はいけい'], ['利用者', 'りようしゃ'], ['母語', 'ぼご'], ['文化的', 'ぶんかてき'],
      ['否定', 'ひてい'], ['生活様式', 'せいかつようしき'], ['希望', 'きぼう'], ['尊重', 'そんちょう'], ['自助具', 'じじょぐ'],
      ['活用状況', 'かつようじょうきょう'], ['確認', 'かくにん'], ['自立', 'じりつ'], ['後押', 'あとお'], ['同化', 'どうか'],
      ['余暇活動', 'よかかつどう'], ['自己決定', 'じこけってい'],
    ]),
    linkMatch: 'ヨーロッパで生まれ育ち、50歳のときに日本人と結婚',
  },
  {
    kamoku_id: 2,
    order_index: 18,
    title_jp: 'チームアプローチの考え方',
    content_jp:
      'チームアプローチとは、複数の専門職が共通の目標に向かって協働し、課題解決に取り組む考え方です。個別の訪問支援や、利用者に代わって専門職が一方的にサービスを決めることとは異なります。当事者同士が体験を語り合い支え合うセルフヘルプグループとも区別されます。',
    content_id:
      'Pendekatan tim adalah cara berpikir di mana berbagai profesi berkolaborasi menuju tujuan bersama untuk menyelesaikan masalah. Berbeda dari dukungan kunjungan individual, atau profesi yang sepihak menentukan layanan mewakili pengguna. Juga dibedakan dari kelompok dukungan sesama (peer support) di mana sesama pengalaman saling bercerita dan mendukung.',
    example_jp: 'ケアマネジャー、介護福祉士、看護師、リハビリ職が集まり、Ａさんの支援方針を話し合う。',
    example_id: 'Care manager, pekerja kaigo, perawat, dan tenaga rehabilitasi berkumpul membahas arah dukungan bagi Aさん.',
    exam_point_jp: 'チームアプローチ＝複数専門職の協働・共通目標。利用者の自己決定を無視する選択肢や、個人による支援の説明とは区別する。',
    exam_point_id: 'Pendekatan tim = kolaborasi lintas profesi & tujuan bersama. Bedakan dari pilihan yang mengabaikan hak menentukan pilihan sendiri, atau penjelasan dukungan individual.',
    furigana_map: fm([
      ['チームアプローチ', 'ちーむあぷろーち'], ['複数', 'ふくすう'], ['専門職', 'せんもんしょく'], ['共通', 'きょうつう'],
      ['目標', 'もくひょう'], ['協働', 'きょうどう'], ['課題解決', 'かだいかいけつ'], ['取', 'と'], ['考', 'かんが'],
      ['個別', 'こべつ'], ['訪問支援', 'ほうもんしえん'], ['一方的', 'いっぽうてき'], ['決', 'き'], ['当事者', 'とうじしゃ'],
      ['体験', 'たいけん'], ['語', 'かた'], ['支', 'ささ'], ['合', 'あ'], ['区別', 'くべつ'],
    ]),
    linkMatch: 'チームアプローチに関するものとして',
  },
  {
    kamoku_id: 2,
    order_index: 19,
    title_jp: '介護保険施設の防災対策とBCP',
    content_jp:
      '2021年度の介護報酬改定により、介護保険施設・事業者には業務継続計画（BCP：Business Continuity Plan）の策定が義務づけられました。飲料水・非常食は一般に3日分以上（できれば1週間分）の備蓄が推奨されます。個別避難計画の作成義務は市町村にあり、施設長個人の義務ではありません。災害派遣福祉チーム（DWAT）への参加や防災士資格の取得は義務ではなく、希望者による任意の取り組みです。',
    content_id:
      'Sejak revisi tarif perawatan tahun fiskal 2021, fasilitas/penyedia layanan asuransi perawatan diwajibkan menyusun rencana keberlangsungan usaha (BCP). Air minum & makanan darurat umumnya direkomendasikan cadangan minimal 3 hari (idealnya 1 minggu). Kewajiban menyusun rencana evakuasi individual ada pada pemerintah kota, bukan kewajiban pribadi kepala fasilitas. Partisipasi di Tim Kesejahteraan Bencana (DWAT) atau sertifikasi ahli kebencanaan bersifat sukarela, bukan kewajiban.',
    example_jp: '施設は、感染症や災害の発生時にサービスを継続できるよう、ＢＣＰを策定し訓練を行う。',
    example_id: 'Fasilitas menyusun BCP dan berlatih agar layanan tetap berjalan saat terjadi wabah atau bencana.',
    exam_point_jp: 'BCP策定は施設・事業者の義務（頻出）。個別避難計画は市町村の義務、DWAT参加・防災士資格取得は任意、という違いに注意。',
    exam_point_id: 'Penyusunan BCP adalah kewajiban fasilitas/penyedia layanan (sering keluar). Perhatikan bedanya: rencana evakuasi individual = kewajiban pemerintah kota, partisipasi DWAT/sertifikasi kebencanaan = sukarela.',
    furigana_map: fm([
      ['介護保険施設', 'かいごほけんしせつ'], ['防災対策', 'ぼうさいたいさく'], ['介護報酬改定', 'かいごほうしゅうかいてい'],
      ['業務継続計画', 'ぎょうむけいぞくけいかく'], ['策定', 'さくてい'], ['義務', 'ぎむ'], ['飲料水', 'いんりょうすい'],
      ['非常食', 'ひじょうしょく'], ['備蓄', 'びちく'], ['推奨', 'すいしょう'], ['個別避難計画', 'こべつひなんけいかく'],
      ['市町村', 'しちょうそん'], ['施設長', 'しせつちょう'], ['災害派遣福祉チーム', 'さいがいはけんふくしちーむ'], ['防災士', 'ぼうさいし'],
      ['資格', 'しかく'], ['任意', 'にんい'], ['取', 'と'], ['組', 'く'],
    ]),
    linkMatch: '介護保険施設における防災対策に関する',
  },
  {
    kamoku_id: 2,
    order_index: 20,
    title_jp: '結核の予防対策',
    content_jp:
      '結核は主に空気感染（飛沫核感染）する感染症で、換気が予防の基本です。胸部Ｘ線検査による定期的なスクリーニングは、結核の早期発見・予防対策として広く行われています。便座のアルコール消毒や次亜塩素酸Naでの消毒は接触感染対策、リネン類の熱湯洗濯は一般的な消毒法であり、いずれも結核（空気感染）の直接的な予防対策とはいえません。',
    content_id:
      'TBC adalah penyakit menular yang terutama ditularkan lewat udara (droplet nuclei), dan ventilasi adalah dasar pencegahannya. Skrining rontgen dada berkala secara luas dipakai untuk deteksi dini & pencegahan TBC. Disinfeksi alkohol pada dudukan toilet atau sodium hipoklorit adalah pencegahan penularan sentuhan, dan mencuci linen dengan air panas adalah metode disinfeksi umum — keduanya bukan pencegahan langsung untuk TBC (penularan udara).',
    example_jp: '施設内で結核の早期発見のため、職員に年1回の胸部Ｘ線検査を実施する。',
    example_id: 'Fasilitas melakukan rontgen dada setahun sekali bagi staf untuk deteksi dini TBC.',
    exam_point_jp: '結核＝空気感染、対策の基本は換気とＸ線検査。接触感染対策（消毒・洗濯等）と混同しないこと。',
    exam_point_id: 'TBC = penularan udara, dasar pencegahannya ventilasi & rontgen dada. Jangan tertukar dengan pencegahan penularan sentuhan (disinfeksi, cuci, dll.).',
    furigana_map: fm([
      ['結核', 'けっかく'], ['予防対策', 'よぼうたいさく'], ['空気感染', 'くうきかんせん'], ['飛沫核感染', 'ひまつかくかんせん'],
      ['感染症', 'かんせんしょう'], ['換気', 'かんき'], ['基本', 'きほん'], ['胸部', 'きょうぶ'], ['検査', 'けんさ'],
      ['定期的', 'ていきてき'], ['早期発見', 'そうきはっけん'], ['便座', 'べんざ'], ['消毒', 'しょうどく'], ['接触感染', 'せっしょくかんせん'],
      ['熱湯', 'ねっとう'], ['洗濯', 'せんたく'], ['直接的', 'ちょくせつてき'],
    ]),
    linkMatch: '結核（tuberculosis）の予防対策に該当するもの',
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
