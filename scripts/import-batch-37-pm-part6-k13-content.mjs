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
  { kamoku_id: 13, kanji: 'ホーエン・ヤール重症度分類', furigana: 'ほーえん・やーるじゅうしょうどぶんるい', meaning_id: 'Klasifikasi keparahan Hoehn-Yahr — 5 tahap keparahan penyakit Parkinson (I ringan sebelah - V kursi roda/terbaring)', example_sentence_jp: 'ホーエン・ヤール重症度分類でステージⅢと判断された。', example_sentence_id: 'Dinilai sebagai Stage III menurut klasifikasi Hoehn-Yahr.' },
  { kamoku_id: 13, kanji: '姿勢反射障害', furigana: 'しせいはんしゃしょうがい', meaning_id: 'Gangguan refleks postur — kesulitan menjaga keseimbangan saat berbalik arah/berhenti, tanda Parkinson tahap sedang', example_sentence_jp: '姿勢反射障害があると、方向転換が難しくなる。', example_sentence_id: 'Dengan gangguan refleks postur, berbalik arah jadi sulit.' },
  { kamoku_id: 13, kanji: '見当識障害', furigana: 'けんとうしきしょうがい', meaning_id: 'Disorientasi — kesulitan mengenali waktu, tempat, atau orang, gejala umum demensia', example_sentence_jp: '見当識障害により、曜日や場所がわからなくなることがある。', example_sentence_id: 'Karena disorientasi, kadang tidak tahu hari atau tempat.' },
  { kamoku_id: 13, kanji: '健康型有料老人ホーム', furigana: 'けんこうがたゆうりょうろうじんほーむ', meaning_id: 'Panti lansia berbayar tipe sehat — untuk lansia mandiri, tidak menangani perawatan berat seperti demensia lanjut', example_sentence_jp: '健康型有料老人ホームでは、要介護状態が進むと退去が必要になることがある。', example_sentence_id: 'Di panti tipe sehat, jika kondisi memburuk kadang perlu pindah fasilitas.' },
  { kamoku_id: 13, kanji: '介護付有料老人ホーム', furigana: 'かいごつきゆうりょうろうじんほーむ', meaning_id: 'Panti lansia berbayar dengan perawatan — fasilitas swasta yang bisa menangani demensia, sebagian mengizinkan hewan peliharaan', example_sentence_jp: '介護付有料老人ホームに入居し、認知症ケアを受ける。', example_sentence_id: 'Tinggal di panti berbayar dengan perawatan dan menerima perawatan demensia.' },
  { kamoku_id: 13, kanji: 'ベッカー型筋ジストロフィー', furigana: 'べっかーがたきんじすとろふぃー', meaning_id: 'Distrofi otot tipe Becker — penyakit genetik dengan degenerasi progresif serat otot', example_sentence_jp: 'ベッカー型筋ジストロフィーでは、筋線維が徐々に変性する。', example_sentence_id: 'Pada distrofi otot tipe Becker, serat otot berdegenerasi secara bertahap.' },
  { kamoku_id: 13, kanji: 'ジェノグラム', furigana: 'じぇのぐらむ', meaning_id: 'Genogram — diagram silsilah keluarga yang dipakai untuk memahami relasi keluarga pengguna layanan', example_sentence_jp: '初回訪問時にジェノグラムを確認し、家族構成を把握する。', example_sentence_id: 'Mengecek genogram saat kunjungan pertama untuk memahami susunan keluarga.' },
  { kamoku_id: 13, kanji: '自立生活運動', furigana: 'じりつせいかつうんどう', meaning_id: 'Gerakan hidup mandiri (IL movement) — dipelopori Ed Roberts, prinsip: menerima bantuan untuk hal yang perlu demi menjalani hidup sesuai diri sendiri', example_sentence_jp: '自立生活運動の考え方では、他者の助けを借りることも自立の一部である。', example_sentence_id: 'Dalam gerakan hidup mandiri, menerima bantuan orang lain pun bagian dari kemandirian.' },
  { kamoku_id: 13, kanji: '両側性感音難聴', furigana: 'りょうそくせいかんおんなんちょう', meaning_id: 'Tuli sensorineural bilateral — gangguan dari telinga dalam hingga saraf pendengaran di kedua telinga', example_sentence_jp: '両側性感音難聴があり、雑音の中では聞き取りにくい。', example_sentence_id: 'Dengan tuli sensorineural bilateral, sulit mendengar di tempat berisik.' },
  { kamoku_id: 13, kanji: '生活介護', furigana: 'せいかつかいご', meaning_id: 'Layanan perawatan hidup — aktivitas siang hari bagi penghuni fasilitas disabilitas, dikombinasikan dengan dukungan tempat tinggal', example_sentence_jp: '施設入所支援と生活介護を組み合わせて利用する。', example_sentence_id: 'Memakai kombinasi dukungan tempat tinggal fasilitas dan layanan perawatan hidup.' },
]

const materialSections = [
  {
    kamoku_id: 13, order_index: 1, title_jp: 'パーキンソン病の重症度と生活支援（総合問題）',
    content_jp: 'パーキンソン病の重症度は、ホーエン・ヤール分類で5段階に評価されます。方向転換の困難・急に止まれないといった症状は、姿勢反射障害の兆候でステージⅢに相当します。要介護認定の結果は申請から原則30日以内に通知されるのが通常のため、2週間程度の待機は正確に伝えることが重要です。また、症状の日内変動は服薬タイミングと密接に関連するため、医師への報告では服薬時間の記録が優先度の高い情報になります。',
    content_id: 'Keparahan penyakit Parkinson dinilai dalam 5 tahap dengan klasifikasi Hoehn-Yahr. Kesulitan berbalik arah & tak bisa berhenti mendadak adalah tanda gangguan refleks postur, setara Stage III. Hasil penetapan tingkat perawatan pada prinsipnya keluar dalam 30 hari sejak pengajuan, jadi penting menyampaikan info akurat soal masa tunggu ~2 minggu. Selain itu, fluktuasi gejala harian sangat terkait waktu minum obat, jadi catatan waktu obat adalah info prioritas saat lapor ke dokter.',
    example_jp: '歩行時に急に止まれない症状は、姿勢反射障害の兆候としてステージⅢの目安になる。', example_id: 'Gejala tak bisa berhenti mendadak saat berjalan menjadi patokan Stage III sebagai tanda gangguan refleks postur.',
    exam_point_jp: 'ホーエン・ヤール分類の各ステージの特徴、要介護認定の標準処理期間（原則30日）、パーキンソン病の症状変動と服薬タイミングの関連を覚える。',
    exam_point_id: 'Hafalkan ciri tiap tahap Hoehn-Yahr, masa proses standar penetapan tingkat perawatan (prinsipnya 30 hari), dan kaitan fluktuasi gejala Parkinson dengan waktu minum obat.',
    furigana_map: fm([['パーキンソン病', 'ぱーきんそんびょう'], ['重症度', 'じゅうしょうど'], ['ホーエン・ヤール分類', 'ほーえん・やーるぶんるい'], ['段階', 'だんかい'], ['方向転換', 'ほうこうてんかん'], ['困難', 'こんなん'], ['姿勢反射障害', 'しせいはんしゃしょうがい'], ['兆候', 'ちょうこう'], ['要介護認定', 'ようかいごにんてい'], ['申請', 'しんせい'], ['通知', 'つうち'], ['日内変動', 'にちないへんどう'], ['服薬', 'ふくやく'], ['優先度', 'ゆうせんど']]),
    linkMatch: '現在のＡさんの症状に該当するホーエン・ヤール重症度分類',
  },
  {
    kamoku_id: 13, order_index: 2, title_jp: '認知症の症状理解と施設選択（総合問題）',
    content_jp: '曜日や時間を忘れる、場所がわからなくなるといった症状は見当識障害にあたります。認知症が進行し健康型有料老人ホームでの対応が難しくなった場合、本人にとって大切な価値（ペットと暮らすこと等）を尊重した施設選びが重要です。介護福祉職は家族の意向を優先するのではなく、本人の意思を尊重するよう働きかける役割を担います。ペット可で認知症ケアにも対応する介護付有料老人ホームなどが選択肢になります。',
    content_id: 'Lupa hari/waktu atau tidak tahu lokasi adalah gejala disorientasi. Ketika demensia memburuk dan panti tipe sehat sudah tak sanggup menangani, pemilihan fasilitas perlu menghormati nilai penting bagi penderita (misal hidup dengan hewan peliharaan). Pekerja kaigo berperan mendorong penghormatan keinginan penderita, bukan mengutamakan keinginan keluarga. Panti berbayar dengan perawatan yang mengizinkan hewan peliharaan & menangani demensia bisa jadi pilihan.',
    example_jp: 'ペットと一緒に入所できる介護付有料老人ホームを探す。', example_id: 'Mencari panti berbayar dengan perawatan yang mengizinkan masuk bersama hewan peliharaan.',
    exam_point_jp: '見当識障害の典型症状、本人の意思決定支援（家族ではなく本人を尊重）、施設種別ごとの特徴（健康型・介護付有料老人ホーム等）の違いを覚える。',
    exam_point_id: 'Hafalkan gejala khas disorientasi, dukungan pengambilan keputusan berpusat pada pengguna (bukan keluarga), dan perbedaan tiap jenis fasilitas (tipe sehat, berbayar dengan perawatan, dll.).',
    furigana_map: fm([['曜日', 'ようび'], ['時間', 'じかん'], ['忘', 'わす'], ['場所', 'ばしょ'], ['見当識障害', 'けんとうしきしょうがい'], ['認知症', 'にんちしょう'], ['進行', 'しんこう'], ['健康型有料老人ホーム', 'けんこうがたゆうりょうろうじんほーむ'], ['本人', 'ほんにん'], ['価値', 'かち'], ['尊重', 'そんちょう'], ['施設選', 'しせつえら'], ['家族', 'かぞく'], ['意向', 'いこう'], ['介護付有料老人ホーム', 'かいごつきゆうりょうろうじんほーむ']]),
    linkMatch: '動物好きで長年ペットのオウムを飼っている',
  },
  {
    kamoku_id: 13, order_index: 3, title_jp: '筋ジストロフィーと自立生活の考え方（総合問題）',
    content_jp: 'ベッカー型筋ジストロフィーは、筋線維が進行性に変性・壊死する遺伝性疾患です。ジェノグラム（家族構成図）は、初回訪問時に家族関係を把握するための重要な情報源です。身体機能の低下により時間のかかる動作（着替え等）を介護サービスに任せ、本人が大切にしたい活動（絵を描くこと等）に時間を使うという考え方は、エド・ロバーツが創始した自立生活運動（IL運動）の自立観に基づいています。「すべて自分で行うことだけが自立ではない」という考え方です。',
    content_id: 'Distrofi otot tipe Becker adalah penyakit genetik dengan degenerasi & kematian progresif serat otot. Genogram (diagram silsilah keluarga) adalah sumber informasi penting untuk memahami relasi keluarga saat kunjungan pertama. Prinsip menyerahkan aktivitas yang memakan waktu (misal ganti baju) ke layanan perawatan agar penderita bisa memakai waktunya untuk hal yang penting baginya (misal melukis) berdasarkan pandangan kemandirian dari gerakan hidup mandiri (IL movement) yang dipelopori Ed Roberts — prinsip "kemandirian bukan berarti melakukan semuanya sendiri".',
    example_jp: '着替えの介助を受けることで、Ｄさんは絵を描く時間を確保できた。', example_id: 'Dengan menerima bantuan ganti baju, Dさん bisa punya waktu lebih banyak untuk melukis.',
    exam_point_jp: 'ジェノグラムの記号の読み取り（結婚・同居・死亡等）と、エド・ロバーツの自立生活運動の自立観（他者の助けを借りることも自立）を関連付けて覚える。',
    exam_point_id: 'Hubungkan cara membaca simbol genogram (menikah, tinggal bersama, meninggal, dll.) dengan pandangan kemandirian Ed Roberts (menerima bantuan orang lain pun bagian dari kemandirian).',
    furigana_map: fm([['筋ジストロフィー', 'きんじすとろふぃー'], ['筋線維', 'きんせんい'], ['変性', 'へんせい'], ['壊死', 'えし'], ['遺伝性疾患', 'いでんせいしっかん'], ['ジェノグラム', 'じぇのぐらむ'], ['家族構成図', 'かぞくこうせいず'], ['初回訪問', 'しょかいほうもん'], ['身体機能', 'しんたいきのう'], ['低下', 'ていか'], ['着替', 'きが'], ['自立生活運動', 'じりつせいかつうんどう'], ['自立観', 'じりつかん']]),
    linkMatch: 'ベッカー型筋ジストロフィー（Becker muscular dystrophy）である',
  },
  {
    kamoku_id: 13, order_index: 4, title_jp: '感音難聴のある人への配慮とサービス体系（総合問題）',
    content_jp: '感音難聴は内耳から聴神経にかけての障害で、伝音難聴（外耳・中耳の障害）とは損傷部位が異なります。施設入所支援は、日中活動系の生活介護等と組み合わせて利用するのが一般的です。感音難聴があり口の動きや表情から会話を理解できる人には、正面から向かい合い、はっきりした声で話すことが有効な配慮です。雑音（音楽を含む）は聞き取りを妨げるため避けます。',
    content_id: 'Tuli sensorineural adalah gangguan dari telinga dalam hingga saraf pendengaran, berbeda lokasi kerusakannya dari tuli konduktif (gangguan telinga luar/tengah). Dukungan tempat tinggal fasilitas umumnya dikombinasikan dengan layanan perawatan hidup untuk aktivitas siang hari. Bagi yang punya tuli sensorineural tapi bisa memahami percakapan dari gerak mulut & ekspresi, berbicara berhadapan langsung dengan suara jelas adalah bentuk perhatian efektif. Kebisingan (termasuk musik) dihindari karena mengganggu pendengaran.',
    example_jp: 'Ｇさんと向かい合って座り、口の動きが見えるようにはっきり話す。', example_id: 'Duduk berhadapan dengan Gさん dan bicara jelas agar gerak mulut terlihat.',
    exam_point_jp: '感音難聴＝内耳〜聴神経、伝音難聴＝外耳・中耳、という損傷部位の違い。施設入所支援＝生活介護と組み合わせ、が頻出。',
    exam_point_id: 'Bedakan lokasi kerusakan: tuli sensorineural = telinga dalam-saraf pendengaran, tuli konduktif = telinga luar/tengah. Dukungan tempat tinggal fasilitas = dikombinasikan layanan perawatan hidup, sering keluar.',
    furigana_map: fm([['感音難聴', 'かんおんなんちょう'], ['内耳', 'ないじ'], ['聴神経', 'ちょうしんけい'], ['伝音難聴', 'でんおんなんちょう'], ['外耳', 'がいじ'], ['中耳', 'ちゅうじ'], ['損傷部位', 'そんしょうぶい'], ['施設入所支援', 'しせつにゅうしょしえん'], ['生活介護', 'せいかつかいご'], ['組', 'く'], ['口', 'くち'], ['動', 'うご'], ['表情', 'ひょうじょう'], ['理解', 'りかい'], ['正面', 'しょうめん'], ['雑音', 'ざつおん'], ['妨', 'さまた'], ['避', 'さ']]),
    linkMatch: '両側性感音難聴（sensorineural hearing loss）があり',
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
