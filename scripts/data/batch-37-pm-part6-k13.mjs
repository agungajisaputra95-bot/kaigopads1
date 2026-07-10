// 第37回（令和6年度）午後 問題114-125（総合問題, kamoku 13）
export const SOURCE = '過去問_第37回_2024（想定解答）'

const fm = (pairs) => pairs.map(([kanji, reading]) => ({ kanji, reading }))

const case1Intro =
  '次の事例を読んで、問題114から問題116までについて答えなさい。\n〔事例〕\nＡさん（70歳、男性）は、妻と二人で暮らしている。旅行や釣りが趣味で、会社員として勤務していたころは、活動的な生活を送っていた。66歳のときにパーキンソン病（Parkinson disease）と診断されたが、内服治療が開始され、症状はあまり気にならなかった。1年前から顔の表情が乏しくなり、歩行開始時に、はじめの一歩が出にくくなった。3か月前からは、歩き始めると方向転換が難しく、急に止まることができないことがある。\nＡさんは、今後の生活について相談するために、地域包括支援センターに行った。センターで対応してくれたＢ主任介護支援専門員は、介護福祉士としての実務経験が豊富だった。Ａさんは信頼して、気になっていたことをすべて話すことができた。Ａさんは、要介護認定を申請することを勧められ、後日、市役所に行き、要介護認定の申請を行った。\n\n'

const case2Intro =
  '次の事例を読んで、問題117から問題119までについて答えなさい。\n〔事例〕\nＣさん（90歳、女性）は、動物好きで長年ペットのオウムを飼っている。5年前に夫が亡くなったときも、ペットが大きな心の支えになった。2年前、身体の衰えから買物や調理などの家事が難しくなり、一人暮らしが困難になったので、ペットと入所できる健康型有料老人ホームに入所した。\n最近Ｃさんは、毎週楽しみにしていたレクリエーションがある曜日や時間を忘れてしまう、トイレの場所がわからず失禁するなどの症状が繰り返し生じるようになってきた。心配した娘がＣさんと病院を受診したところ、アルツハイマー型認知症（dementia of the Alzheimer’s type）と診断を受けた。\n健康型有料老人ホームでは対応が困難になってきたため、心配した娘はＣさんが入所できる施設に移ることを検討し始めた。\n\n'

const case3Intro =
  '次の事例を読んで、問題120から問題122までについて答えなさい。\n〔事例〕\nＤさん（男性、障害支援区分4）は、ベッカー型筋ジストロフィー（Becker muscular dystrophy）である。自宅で家族と生活をしている。Ｄさんは、食事は自立しているが、排泄｛はいせつ｝、入浴に介護が必要である。歩行はできず、移動は電動車いすを使用している。絵を描くことが趣味であり、日中は創作活動に取り組んでいる。\nこれまでＤさんは自宅で家族の介護を受けながら生活してきたが、Ｄさんの身体機能の低下に伴い、家族の介護負担が増えたため、居宅介護を利用することになった。\n\n'

const case4Intro =
  '次の事例を読んで、問題123から問題125までについて答えなさい。\n〔事例〕\nＧさん（38歳、女性）は、母親（65歳）と暮らしていた。両側性感音難聴（sensorineural hearing loss）があり、雑音がある場所では話を聞き取りにくい。相手の口の動きや表情から会話の内容を理解することはできる。Ｇさんは、脳梗塞（cerebral infarction）を発症し、左片麻痺｛ひだりかたまひ｝で車いすの生活となり、障害支援区分4と認定された。母親による介護が難しくなったため、障害者支援施設に入所することになった。\nＧさんは、写真を撮ることが好きで、施設で近くの公園に出かけたときに、介護福祉職に手伝ってもらいながら好きな風景を撮影している。Ｇさんは、その写真をアルバムにして、母親にプレゼントしたいと考えている。\nある日、Ｇさんから、「アルバムを作りたい。飾りの付け方やメッセージの書き方を教えてほしい」と相談があった。介護福祉職は、Ｇさんとアルバムを作ることにした。\n\n'

export const questions = [
  {
    kamoku_id: 13, correct_answer: 3, difficulty: 'hard', exam_frequency: 'high',
    question_text_jp: case1Intro + '問題114　現在のＡさんの症状に該当するホーエン・ヤール重症度分類として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['パーキンソン病', 'ぱーきんそんびょう'], ['内服治療', 'ないふくちりょう'], ['表情', 'ひょうじょう'], ['乏', 'とぼ'], ['歩行開始', 'ほこうかいし'], ['方向転換', 'ほうこうてんかん'], ['ホーエン・ヤール', 'ほーえん・やーる'], ['重症度分類', 'じゅうしょうどぶんるい']]),
    options: [
      { n: 1, text: 'ステージⅠ', exp_jp: 'ステージⅠは症状が身体の片側のみに限られる段階で、Ａさんの症状はすでにそれを超えています。', exp_id: 'Stage I gejalanya hanya di satu sisi tubuh; gejala Aさん sudah melampaui itu.' },
      { n: 2, text: 'ステージⅡ', exp_jp: 'ステージⅡは両側性の症状はあるが姿勢反射障害がない段階で、Ａさんにみられる方向転換の困難や突進現象はこの段階を超えています。', exp_id: 'Stage II ada gejala di kedua sisi tapi belum ada gangguan refleks postur; kesulitan berbalik arah pada Aさん sudah melampaui tahap ini.' },
      { n: 3, text: 'ステージⅢ', exp_jp: '方向転換が難しい、急に止まれないといった症状は姿勢反射障害の兆候で、日常生活に多少の介助が必要となるステージⅢに該当します。', exp_id: 'Kesulitan berbalik arah & tak bisa berhenti mendadak adalah tanda gangguan refleks postur, sesuai Stage III yang butuh sedikit bantuan sehari-hari.', correct: true },
      { n: 4, text: 'ステージⅣ', exp_jp: 'ステージⅣは介助なしでは立位・歩行が困難な段階で、Ａさんはまだ自力で歩行できています。', exp_id: 'Stage IV sulit berdiri/berjalan tanpa bantuan; Aさん masih bisa berjalan sendiri.' },
      { n: 5, text: 'ステージⅤ', exp_jp: 'ステージⅤは車いすまたは寝たきりの段階で、Ａさんの状態とは異なります。', exp_id: 'Stage V adalah tahap kursi roda atau terbaring, berbeda dari kondisi Aさん.' },
    ],
  },
  {
    kamoku_id: 13, correct_answer: 2, difficulty: 'medium', exam_frequency: 'medium',
    question_text_jp: '問題115　要介護認定を申請してから2週間が経過した。Ａさんは要介護認定の認定結果が届かないことが気になった。そこで、以前に対応してくれたＢ主任介護支援専門員に電話で相談した。\n次のうち、Ｂ主任介護支援専門員の応答として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['要介護認定', 'ようかいごにんてい'], ['申請', 'しんせい'], ['経過', 'けいか'], ['認定結果', 'にんていけっか'], ['主任介護支援専門員', 'しゅにんかいごしえんせんもんいん'], ['応答', 'おうとう']]),
    options: [
      { n: 1, text: '「次の受診時に主治医に相談しましょう」', exp_jp: '認定結果の遅延は主治医の管轄ではありません。', exp_id: 'Keterlambatan hasil penetapan bukan wewenang dokter yang merawat.' },
      { n: 2, text: '「通常1か月程度かかるので、あと2週間くらい待ってみましょう」', exp_jp: '要介護認定の結果は申請から原則30日以内に通知されるため、2週間経過はまだ通常の範囲内であり、正確な情報提供です。', exp_id: 'Hasil penetapan tingkat perawatan pada prinsipnya keluar dalam 30 hari sejak pengajuan; 2 minggu masih dalam rentang wajar, jawaban ini memberi info akurat.', correct: true },
      { n: 3, text: '「以前に自宅に来てくれた認定調査員に相談しましょう」', exp_jp: '調査員は結果の進捗について答える立場ではありません。', exp_id: 'Petugas survei bukan pihak yang berwenang menjawab soal progres hasil.' },
      { n: 4, text: '「念のためにもう一度要介護認定を申請してください」', exp_jp: '通常の範囲内の待ち時間であり、不要な二重申請を勧めるのは適切ではありません.', exp_id: 'Ini masih dalam waktu tunggu wajar; menyarankan pengajuan ulang yang tidak perlu kurang tepat.' },
      { n: 5, text: '「通常であれば認定結果は出ていると思います」', exp_jp: '2週間はまだ通常の範囲内であり、不安をあおる不正確な情報です。', exp_id: '2 minggu masih dalam rentang wajar; jawaban ini memberi info tidak akurat yang memicu kecemasan.' },
    ],
  },
  {
    kamoku_id: 13, correct_answer: 1, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp:
      '問題116　最近、Ａさんは急に体の動きが悪くなる時間帯があり、不安を感じた。そこでＡさんは、週に2回利用している訪問介護員（ホームヘルパー）に相談した。相談を受けた訪問介護員（ホームヘルパー）はＡさんに、日々の症状の変化とその時間、さらにもう一点をメモして、医師に伝えるようにと助言した。\n日々の症状の変化とその時間に加えて、Ａさんが医師に伝える内容として、最も優先度の高いものを1つ選びなさい。',
    furigana_map: fm([['体', 'からだ'], ['動', 'うご'], ['不安', 'ふあん'], ['訪問介護員', 'ほうもんかいごいん'], ['相談', 'そうだん'], ['助言', 'じょげん'], ['優先度', 'ゆうせんど']]),
    options: [
      { n: 1, text: '服薬の時間', exp_jp: 'パーキンソン病では、症状の日内変動（急に動きが悪くなる等）が服薬のタイミングと密接に関連するため、服薬時間の記録が医師の判断に最も重要です。', exp_id: 'Pada Parkinson, fluktuasi gejala harian (tiba-tiba sulit bergerak) sangat terkait waktu minum obat; catatan waktu obat paling penting bagi keputusan dokter.', correct: true },
      { n: 2, text: '起床の時間', exp_jp: '症状の急な変動との直接的な関連性は服薬時間ほど高くありません。', exp_id: 'Kaitannya dengan fluktuasi gejala mendadak tidak sekuat waktu minum obat.' },
      { n: 3, text: '食事の時間', exp_jp: '間接的に影響しうるものの、服薬時間ほど優先度は高くありません。', exp_id: 'Bisa berpengaruh tidak langsung, tapi prioritasnya tidak setinggi waktu minum obat.' },
      { n: 4, text: '排便の時間', exp_jp: '症状の急な変動との直接的な関連性は低い情報です。', exp_id: 'Kaitannya dengan fluktuasi gejala mendadak rendah.' },
      { n: 5, text: '入浴の時間', exp_jp: '症状の急な変動との直接的な関連性は低い情報です。', exp_id: 'Kaitannya dengan fluktuasi gejala mendadak rendah.' },
    ],
  },
  {
    kamoku_id: 13, correct_answer: 2, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: case2Intro + '問題117　次のうち、最近のＣさんの症状に該当するものとして、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['動物好', 'どうぶつず'], ['夫', 'おっと'], ['一人暮', 'ひとりぐ'], ['健康型有料老人ホーム', 'けんこうがたゆうりょうろうじんほーむ'], ['入所', 'にゅうしょ'], ['曜日', 'ようび'], ['失禁', 'しっきん'], ['娘', 'むすめ'], ['診断', 'しんだん']]),
    options: [
      { n: 1, text: '妄想', exp_jp: '妄想は実在しないことを事実だと信じ込む症状で、曜日や場所を忘れる様子とは異なります。', exp_id: 'Delusi adalah meyakini hal yang tidak nyata sebagai fakta, berbeda dari lupa hari/tempat.' },
      { n: 2, text: '見当識障害', exp_jp: '曜日や時間を忘れる、トイレの場所がわからなくなるのは、時間・場所の認識が難しくなる見当識障害の典型的な症状です。', exp_id: 'Lupa hari/waktu dan tidak tahu lokasi toilet adalah gejala khas disorientasi (kesulitan mengenali waktu/tempat).', correct: true },
      { n: 3, text: '失語', exp_jp: '失語は言語機能の障害で、Ｃさんの症状とは異なります。', exp_id: 'Afasia adalah gangguan fungsi bahasa, berbeda dari gejala Cさん.' },
      { n: 4, text: '遂行機能障害', exp_jp: '遂行機能障害は計画的に物事を進める能力の障害で、Ｃさんの症状とは異なります。', exp_id: 'Gangguan fungsi eksekutif adalah gangguan kemampuan merencanakan, berbeda dari gejala Cさん.' },
      { n: 5, text: '観念失行', exp_jp: '観念失行は動作の順序がわからなくなる症状で、Ｃさんの症状とは異なります。', exp_id: 'Apraksia ideasional adalah gangguan urutan gerakan, berbeda dari gejala Cさん.' },
    ],
  },
  {
    kamoku_id: 13, correct_answer: 1, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp:
      '問題118　娘はＣさんの病状を心配して、「お父さんが残してくれた貯金があるから、もっとお母さんのお世話をしてくれる施設に移ろう」と提案した。Ｃさんは、「ペットと一緒に暮らせなくなるのは嫌だ」とつぶやき、うつむいた。困った娘は健康型有料老人ホームの介護福祉士に相談した。\n次のうち、娘への介護福祉士の応答として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['病状', 'びょうじょう'], ['心配', 'しんぱい'], ['貯金', 'ちょきん'], ['提案', 'ていあん'], ['応答', 'おうとう']]),
    options: [
      { n: 1, text: '「Ｃさんがペットを大事にしている意思を尊重してはいかがですか」', exp_jp: 'Ｃさんの「ペットと暮らしたい」という意思を尊重するよう促すことは、本人主体の意思決定支援の考え方に沿っています。', exp_id: 'Mendorong penghormatan pada keinginan Cさん "ingin hidup bersama peliharaan" sesuai prinsip dukungan pengambilan keputusan berpusat pada pengguna.', correct: true },
      { n: 2, text: '「Ｃさんが新しい施設に行くことが最優先です」', exp_jp: 'Ｃさんの意思を無視した一方的な結論の押しつけです。', exp_id: 'Memaksakan kesimpulan sepihak yang mengabaikan keinginan Cさん.' },
      { n: 3, text: '「あなたの意向を優先してはいかがですか」', exp_jp: '娘の意向を優先するのは、本人（Ｃさん）主体の原則に反します。', exp_id: 'Mengutamakan keinginan anak perempuan bertentangan dengan prinsip berpusat pada Cさん sendiri.' },
      { n: 4, text: '「Ｃさんがペットを飼うことは優先度の高いニーズとは言えません」', exp_jp: 'Ｃさんにとって重要な価値（ペットとの生活）を軽視する発言です。', exp_id: 'Ucapan yang meremehkan nilai penting bagi Cさん (hidup bersama peliharaan).' },
      { n: 5, text: '「Ｃさんが新しい施設に行くことを受け入れるように説得してください」', exp_jp: '本人の意思を無視した一方的な説得の提案で不適切です。', exp_id: 'Usulan membujuk sepihak yang mengabaikan keinginan Cさん, tidak tepat.' },
    ],
  },
  {
    kamoku_id: 13, correct_answer: 5, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp:
      '問題119　Ｃさんと娘は介護福祉士と相談し、希望に沿った施設を見つけることができた。\n次のうち、Ｃさんが入所する施設として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['希望', 'きぼう'], ['沿', 'そ'], ['施設', 'しせつ'], ['入所', 'にゅうしょ']]),
    options: [
      { n: 1, text: '経過的軽費老人ホーム（Ｂ型）', exp_jp: '自炊が可能な高齢者向けの軽費施設で、認知症ケアやペットとの生活を前提とした施設ではありません。', exp_id: 'Fasilitas biaya rendah bagi lansia yang bisa masak sendiri, tidak dirancang untuk perawatan demensia atau hidup dengan hewan peliharaan.' },
      { n: 2, text: '介護医療院', exp_jp: '医療的なケアの必要度が高い人向けの施設で、ペットとの生活は通常想定されていません。', exp_id: 'Fasilitas untuk orang dengan kebutuhan medis tinggi, umumnya tidak mengakomodasi hewan peliharaan.' },
      { n: 3, text: '介護老人保健施設', exp_jp: '在宅復帰を目指す一時的な入所施設で、ペットとの生活が可能な施設は一般的ではありません。', exp_id: 'Fasilitas sementara menuju kembali ke rumah, umumnya tidak mengakomodasi hewan peliharaan.' },
      { n: 4, text: '養護老人ホーム', exp_jp: '経済的理由等で生活が困難な高齢者向けの施設で、Ｃさんの状況やペット同伴の希望とは異なります。', exp_id: 'Fasilitas bagi lansia yang kesulitan hidup karena alasan ekonomi, berbeda dari situasi Cさん dan keinginannya membawa peliharaan.' },
      { n: 5, text: '介護付有料老人ホーム', exp_jp: '施設によっては認知症ケアに対応しペットとの入居も可能な民間施設があり、Ｃさんの希望に最も沿う選択肢です。', exp_id: 'Beberapa fasilitas swasta jenis ini menangani perawatan demensia dan mengizinkan hewan peliharaan — pilihan paling sesuai keinginan Cさん.', correct: true },
    ],
  },
  {
    kamoku_id: 13, correct_answer: 1, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: case3Intro + '問題120　Ｄさんの疾患で生じる病態として、適切なものを1つ選びなさい。',
    furigana_map: fm([['障害支援区分', 'しょうがいしえんくぶん'], ['筋ジストロフィー', 'きんじすとろふぃー'], ['排泄', 'はいせつ'], ['入浴', 'にゅうよく'], ['電動車', 'でんどうくるま'], ['創作活動', 'そうさくかつどう'], ['病態', 'びょうたい']]),
    options: [
      { n: 1, text: '筋線維の変性', exp_jp: '筋ジストロフィーは、筋線維が進行性に変性・壊死していくことを特徴とする疾患です。', exp_id: 'Distrofi otot ditandai degenerasi & kematian progresif serat otot.', correct: true },
      { n: 2, text: '運動神経の変性', exp_jp: 'これはALS（筋萎縮性側索硬化症）等の運動ニューロン疾患の説明です。', exp_id: 'Ini penjelasan penyakit neuron motorik seperti ALS, bukan distrofi otot.' },
      { n: 3, text: '網膜の変性', exp_jp: 'これは網膜色素変性症等、目の疾患の説明です。', exp_id: 'Ini penjelasan penyakit mata seperti retinitis pigmentosa.' },
      { n: 4, text: '自己免疫の低下', exp_jp: '筋ジストロフィーは遺伝性疾患であり、自己免疫の異常が主因ではありません。', exp_id: 'Distrofi otot adalah penyakit genetik, bukan disebabkan gangguan autoimun.' },
      { n: 5, text: '脳細胞の変性', exp_jp: 'これは認知症等、脳の疾患の説明です。', exp_id: 'Ini penjelasan penyakit otak seperti demensia, bukan distrofi otot.' },
    ],
  },
  {
    kamoku_id: 13, correct_answer: 2, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp:
      '問題121　この問題は、視覚素材問題です。Ｄさんのジェノグラムが示されています。ジェノグラムに示されていることを説明します。Ｄさん男性は、結婚し息子と３人で暮らしている。Ｄさんの兄は独身である。Ｄさんは、母親と一緒に暮らしていない。Ｄさんの父親は、死亡している。Ｄさんの妻は一人娘で、両親は生存している。\n問題　Ｅ居宅介護事業所に勤務するＦ介護福祉職は、Ｄさん宅を初回訪問するにあたりフェイスシートのジェノグラムを確認した。以下のジェノグラムからＦ介護福祉職が把握した内容として、適切なものを1つ選びなさい。',
    furigana_map: fm([['視覚素材問題', 'しかくそざいもんだい'], ['ジェノグラム', 'じぇのぐらむ'], ['結婚', 'けっこん'], ['息子', 'むすこ'], ['兄', 'あに'], ['独身', 'どくしん'], ['母親', 'ははおや'], ['父親', 'ちちおや'], ['死亡', 'しぼう'], ['妻', 'つま'], ['一人娘', 'ひとりむすめ'], ['両親', 'りょうしん'], ['生存', 'せいぞん'], ['居宅介護事業所', 'きょたくかいごじぎょうしょ'], ['初回訪問', 'しょかいほうもん'], ['フェイスシート', 'ふぇいすしーと'], ['把握', 'はあく']]),
    options: [
      { n: 1, text: 'Ｄさんは、Ｄさんの母親と同居している。', exp_jp: '事例には「Ｄさんは、母親と一緒に暮らしていない」と明記されています。', exp_id: 'Kasus secara jelas menyatakan "Dさん tidak tinggal bersama ibunya".' },
      { n: 2, text: 'Ｄさんには息子がいる。', exp_jp: '「結婚し息子と3人で暮らしている」と明記されており、Ｄさんには息子がいます。', exp_id: 'Disebutkan jelas "menikah dan tinggal bertiga dengan anak laki-lakinya" — Dさん punya anak laki-laki.', correct: true },
      { n: 3, text: 'Ｄさんの兄は結婚している。', exp_jp: '「Ｄさんの兄は独身である」と明記されています。', exp_id: 'Disebutkan jelas "kakak laki-laki Dさん masih lajang".' },
      { n: 4, text: 'Ｄさんの父親は生存している。', exp_jp: '「Ｄさんの父親は、死亡している」と明記されています。', exp_id: 'Disebutkan jelas "ayah Dさん sudah meninggal".' },
      { n: 5, text: 'Ｄさんの妻には兄弟姉妹がいる。', exp_jp: '「Ｄさんの妻は一人娘」と明記されており、兄弟姉妹はいません。', exp_id: 'Disebutkan jelas "istri Dさん adalah anak tunggal perempuan", jadi tidak punya saudara kandung.' },
    ],
  },
  {
    kamoku_id: 13, correct_answer: 3, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp:
      '問題122　Ｄさんが居宅介護を利用してから数年が経過し、Ｄさんの身体機能は徐々に低下して、着替えに時間がかかるようになった。Ｄさんは自分のことはできるだけ自分で行いたいという思いがあり、時間がかかっても自分で着替えをしていた。\nある日、ＤさんはＦ介護福祉職に、「着替えをすると疲れてしまい、絵を描くことができない」とつぶやいた。Ｆ介護福祉職は、「着替えは私たちや家族の介護を利用して、Ｄさんは好きな絵を描いたらいいのではないですか」と伝えた。その後、Ｄさんは介護福祉職と家族の介護を利用して、短時間で着替えを済ませ、絵を描くことに専念できるようになった。\nＦ介護福祉職が発言した自立観を示した人物として、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['身体機能', 'しんたいきのう'], ['低下', 'ていか'], ['着替', 'きが'], ['疲', 'つか'], ['専念', 'せんねん'], ['自立観', 'じりつかん'], ['人物', 'じんぶつ']]),
    options: [
      { n: 1, text: 'ヴィクトール・フランクル（Frankl, V.）', exp_jp: 'フランクルは実存分析（意味への意志）を提唱した心理学者で、この自立観とは異なります。', exp_id: 'Frankl adalah psikolog pencetus analisis eksistensial (kehendak akan makna), berbeda dari pandangan kemandirian ini.' },
      { n: 2, text: 'バンク－ミケルセン（Bank-Mikkelsen, N.）', exp_jp: 'バンク-ミケルセンはノーマライゼーションの提唱者で、この自立観とは異なります。', exp_id: 'Bank-Mikkelsen adalah pencetus normalisasi, berbeda dari pandangan kemandirian ini.' },
      { n: 3, text: 'エド・ロバーツ（Roberts, E.）', exp_jp: 'エド・ロバーツは自立生活運動（IL運動）の創始者で、「必要な部分は他者の助けを借りてでも、自分らしく生きることが自立」という考え方を提唱しました。Ｆ介護福祉職の発言はこの自立観に基づいています。', exp_id: 'Ed Roberts adalah pencetus gerakan hidup mandiri (IL movement), berprinsip "menerima bantuan orang lain untuk hal yang perlu, demi menjalani hidup sesuai diri sendiri, adalah kemandirian" — sesuai ucapan pekerja kaigo F.', correct: true },
      { n: 4, text: 'フェリックス・バイステック（Biestek, F.）', exp_jp: 'バイステックはケースワークの7原則の提唱者で、この自立観とは異なります。', exp_id: 'Biestek adalah pencetus 7 prinsip casework, berbeda dari pandangan kemandirian ini.' },
      { n: 5, text: 'ミルトン・メイヤロフ（Mayeroff, M.）', exp_jp: 'メイヤロフは「ケアの本質」の著者でケアリング理論を提唱しましたが、この自立観そのものとは異なります。', exp_id: 'Mayeroff penulis "On Caring" dan pencetus teori caring, berbeda dari pandangan kemandirian ini.' },
    ],
  },
  {
    kamoku_id: 13, correct_answer: 4, difficulty: 'hard', exam_frequency: 'medium',
    question_text_jp: case4Intro + '問題123　次のうち、Ｇさんが施設入所支援と同時に利用している障害福祉サービスとして、適切なものを1つ選びなさい。',
    furigana_map: fm([['両側性感音難聴', 'りょうそくせいかんおんなんちょう'], ['雑音', 'ざつおん'], ['聞', 'き'], ['取', 'と'], ['口', 'くち'], ['動', 'うご'], ['表情', 'ひょうじょう'], ['理解', 'りかい'], ['脳梗塞', 'のうこうそく'], ['左片麻痺', 'ひだりかたまひ'], ['車', 'くるま'], ['障害支援区分', 'しょうがいしえんくぶん'], ['認定', 'にんてい'], ['障害者支援施設', 'しょうがいしゃしえんしせつ'], ['入所', 'にゅうしょ'], ['施設入所支援', 'しせつにゅうしょしえん']]),
    options: [
      { n: 1, text: '自立生活援助', exp_jp: '自立生活援助は一人暮らしへ移行した人向けのサービスで、施設入所支援とは組み合わせません。', exp_id: 'Dukungan hidup mandiri untuk yang pindah ke hidup sendiri, tidak dikombinasikan dengan dukungan tempat tinggal fasilitas.' },
      { n: 2, text: '療養介護', exp_jp: '療養介護は常時医療的ケアが必要な人向けで、主に病院等で提供されるサービスです。', exp_id: 'Perawatan medis untuk yang butuh perawatan medis terus-menerus, umumnya disediakan di rumah sakit.' },
      { n: 3, text: '短期入所', exp_jp: '短期入所は短期的な利用を想定したサービスで、長期の施設入所支援とは別のものです。', exp_id: 'Short stay untuk penggunaan jangka pendek, berbeda dari dukungan tempat tinggal jangka panjang.' },
      { n: 4, text: '生活介護', exp_jp: '生活介護は施設入所者の日中活動として一般的に組み合わせて利用されるサービスです。', exp_id: 'Layanan perawatan hidup umumnya dikombinasikan sebagai aktivitas siang hari bagi penghuni fasilitas.', correct: true },
      { n: 5, text: '居宅介護', exp_jp: '居宅介護は在宅生活者向けのサービスで、施設入所者には通常適用されません。', exp_id: 'Layanan perawatan rumah untuk yang tinggal di rumah sendiri, umumnya tidak berlaku bagi penghuni fasilitas.' },
    ],
  },
  {
    kamoku_id: 13, correct_answer: 1, difficulty: 'medium', exam_frequency: 'medium',
    question_text_jp: '問題124　次のうち、Ｇさんの難聴の原因となっている損傷部位に該当するものとして、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['難聴', 'なんちょう'], ['原因', 'げんいん'], ['損傷部位', 'そんしょうぶい'], ['該当', 'がいとう']]),
    options: [
      { n: 1, text: '内耳から聴神経', exp_jp: 'Ｇさんの難聴は「感音難聴」であり、これは内耳から聴神経にかけての障害によるものです。', exp_id: 'Gangguan pendengaran Gさん adalah "tuli sensorineural", disebabkan gangguan dari telinga dalam hingga saraf pendengaran.', correct: true },
      { n: 2, text: '外耳道から中耳', exp_jp: 'これは伝音難聴の損傷部位で、感音難聴とは異なります。', exp_id: 'Ini lokasi kerusakan tuli konduktif, berbeda dari tuli sensorineural.' },
      { n: 3, text: '耳介から中耳', exp_jp: 'これは伝音系の損傷部位で、感音難聴とは異なります。', exp_id: 'Ini bagian sistem konduktif, berbeda dari tuli sensorineural.' },
      { n: 4, text: '耳介から外耳道', exp_jp: 'これは伝音系の損傷部位で、感音難聴とは異なります。', exp_id: 'Ini bagian sistem konduktif, berbeda dari tuli sensorineural.' },
      { n: 5, text: '耳介', exp_jp: 'これは伝音系の一部で、感音難聴の原因部位とは異なります。', exp_id: 'Ini bagian sistem konduktif, bukan lokasi penyebab tuli sensorineural.' },
    ],
  },
  {
    kamoku_id: 13, correct_answer: 5, difficulty: 'medium', exam_frequency: 'high',
    question_text_jp: '問題125　次の記述のうち、Ｇさんに介護福祉職がアルバムの作り方を説明するときに配慮することとして、最も適切なものを1つ選びなさい。',
    furigana_map: fm([['アルバム', 'あるばむ'], ['作', 'つく'], ['方', 'かた'], ['説明', 'せつめい'], ['配慮', 'はいりょ']]),
    options: [
      { n: 1, text: 'Ｇさんの左側に座る。', exp_jp: 'Ｇさんは両側性の難聴であり、左側に座ることに根拠はありません。正面から話しかけ、口の動きを見せることが重要です。', exp_id: 'Gangguan pendengaran Gさん bilateral, duduk di sisi kiri tidak berdasar. Yang penting berbicara dari depan agar gerak mulut terlihat.' },
      { n: 2, text: '閉じられた質問を用いる。', exp_jp: 'アルバム作りの相談には具体的な説明が必要で、閉じられた質問だけでは不十分です。', exp_id: 'Konsultasi membuat album butuh penjelasan konkret, pertanyaan tertutup saja tidak cukup.' },
      { n: 3, text: '小さな声で話す。', exp_jp: '難聴があるため、小さい声はかえって聞き取りにくくなります。', exp_id: 'Karena ada gangguan pendengaran, suara pelan justru membuatnya sulit didengar.' },
      { n: 4, text: 'Ｇさんの好きな音楽を流す。', exp_jp: 'Ｇさんは雑音があると聞き取りにくいと説明されており、音楽はかえって聞き取りを妨げます。', exp_id: 'Dijelaskan Gさん sulit mendengar di tempat berisik, musik justru mengganggu pendengarannya.' },
      { n: 5, text: '1対1で向かい合って話す。', exp_jp: 'Ｇさんは相手の口の動きや表情から会話内容を理解できるため、正面から向かい合って話すことが最も有効な配慮です。', exp_id: 'Gさん bisa memahami percakapan dari gerak mulut & ekspresi lawan bicara, jadi berbicara berhadapan langsung adalah bentuk perhatian paling efektif.', correct: true },
    ],
  },
]
