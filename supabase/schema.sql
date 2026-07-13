-- KaigoPads — Initial Supabase Schema
-- Jalankan file ini di Supabase Dashboard → SQL Editor

-- Kamoku (13 subjects, fixed data)
create table kamoku (
  id smallint primary key,
  part char(1) not null check (part in ('A', 'B', 'C')),
  name_jp text not null,
  name_furigana text,
  name_id text not null,
  bank_question_count int default 0,
  order_index smallint not null
);

-- Materi (section-based, bukan 1 blok besar)
create table material_sections (
  id uuid primary key default gen_random_uuid(),
  kamoku_id smallint references kamoku(id),
  title_jp text not null,
  title_furigana text,
  content_jp text not null,
  content_id text not null,
  example_jp text,
  example_id text,
  exam_point_jp text,
  exam_point_id text,
  furigana_map jsonb,          -- [{kanji, reading}, ...]
  order_index smallint
);

-- Soal
create table questions (
  id uuid primary key default gen_random_uuid(),
  kamoku_id smallint references kamoku(id),
  source text,                 -- '過去問_2015' / 'original' / 'custom'
  difficulty text check (difficulty in ('easy','medium','hard')),
  question_text_jp text not null,
  correct_answer smallint check (correct_answer between 1 and 5),
  exam_frequency text check (exam_frequency in ('high','medium','low')),
  furigana_map jsonb,
  created_at timestamptz default now()
);

-- Opsi jawaban (5 per soal)
create table question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references questions(id) on delete cascade,
  option_number smallint check (option_number between 1 and 5),
  option_text_jp text not null,
  option_furigana_map jsonb,      -- [{kanji, reading}, ...]
  explanation_jp text,
  explanation_id text,
  explanation_furigana_map jsonb  -- [{kanji, reading}, ...]
);

-- Relasi many-to-many: soal <-> materi (bidirectional linking)
create table question_material_links (
  question_id uuid references questions(id) on delete cascade,
  material_section_id uuid references material_sections(id) on delete cascade,
  primary key (question_id, material_section_id)
);

-- Kosakata (untuk tap-to-reveal dictionary)
create table vocabulary (
  id uuid primary key default gen_random_uuid(),
  kanji text not null,
  furigana text not null,
  meaning_id text not null,
  example_sentence_jp text,
  example_sentence_id text,
  kamoku_id smallint references kamoku(id)
);

-- Progress user (SM-2 spaced repetition)
create table user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  question_id uuid references questions(id),
  is_correct boolean,
  user_answer smallint,
  quality_response smallint,
  interval_days int default 1,
  ease_factor float default 2.5,
  next_review_date date,
  is_weak_flagged boolean default false,
  answered_at timestamptz default now()
);

-- Premium status
create table user_premium (
  user_id uuid primary key references auth.users(id),
  is_premium boolean default false,
  premium_until timestamptz,
  payment_confirmed_at timestamptz
);

-- Riwayat percobaan mock exam / latihan per tahun (untuk tren skor & skor prediksi)
create table exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  source text not null,           -- 'random' (Mock Exam acak) atau '過去問_2015' dst.
  total_questions int not null,
  correct_count int not null,
  part_breakdown jsonb,           -- [{part, correct, total}, ...]
  taken_at timestamptz default now()
);

-- Seed data: 13 kamoku resmi (lihat PRD 6.12)
insert into kamoku (id, part, name_jp, name_id, bank_question_count, order_index) values
  (1,  'A', '人間の尊厳と自立', 'Martabat dan Kemandirian Manusia', 24, 1),
  (2,  'A', '介護の基本', 'Dasar-Dasar Perawatan (Kaigo)', 120, 2),
  (3,  'A', '社会の理解', 'Pemahaman Masyarakat', 144, 3),
  (4,  'A', '人間関係とコミュニケーション', 'Hubungan Antarmanusia dan Komunikasi', 48, 4),
  (5,  'A', 'コミュニケーション技術', 'Teknik Komunikasi', 72, 5),
  (6,  'A', '生活支援技術', 'Teknik Dukungan Kehidupan Sehari-hari', 312, 6),
  (7,  'B', 'こころとからだのしくみ', 'Mekanisme Pikiran dan Tubuh', 144, 7),
  (8,  'B', '発達と老化の理解', 'Pemahaman Perkembangan dan Penuaan', 96, 8),
  (9,  'B', '認知症の理解', 'Pemahaman Demensia', 120, 9),
  (10, 'B', '障害の理解', 'Pemahaman Disabilitas', 120, 10),
  (11, 'B', '医療的ケア', 'Perawatan Medis', 60, 11),
  (12, 'C', '介護過程', 'Proses Perawatan (Kaigo)', 96, 12),
  (13, 'C', '総合問題', 'Soal Komprehensif/Terintegrasi', 144, 13);

-- Row Level Security
-- Tabel konten (kamoku, materi, soal, kosakata) — dibaca oleh siapa saja yang sudah login,
-- ditulis lewat service role (Admin CMS) saja.
alter table kamoku enable row level security;
alter table material_sections enable row level security;
alter table questions enable row level security;
alter table question_options enable row level security;
alter table question_material_links enable row level security;
alter table vocabulary enable row level security;

create policy "Konten bisa dibaca user login" on kamoku for select to authenticated using (true);
create policy "Konten bisa dibaca user login" on material_sections for select to authenticated using (true);
create policy "Konten bisa dibaca user login" on questions for select to authenticated using (true);
create policy "Konten bisa dibaca user login" on question_options for select to authenticated using (true);
create policy "Konten bisa dibaca user login" on question_material_links for select to authenticated using (true);
create policy "Konten bisa dibaca user login" on vocabulary for select to authenticated using (true);

-- Tabel milik user (progress, premium) — hanya bisa diakses oleh pemiliknya sendiri.
alter table user_progress enable row level security;
alter table user_premium enable row level security;

create policy "User kelola progress miliknya sendiri" on user_progress
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "User baca status premium miliknya sendiri" on user_premium
  for select to authenticated using (auth.uid() = user_id);

alter table exam_attempts enable row level security;

create policy "User kelola exam_attempts miliknya sendiri" on exam_attempts
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Admin flag (dipakai middleware untuk gating /admin/**).
-- Set manual lewat Supabase Dashboard: update user_premium set is_admin = true where user_id = '<uuid owner>';
alter table user_premium add column if not exists is_admin boolean default false;

-- Spaced repetition untuk kosakata (tap-to-reveal), terpisah dari user_progress (soal).
-- Lihat PRD 5.2/5.3: kata yang di-tap ikut masuk sistem pengulangan SM-2.
create table vocabulary_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  vocabulary_id uuid references vocabulary(id) on delete cascade,
  interval_days int default 1,
  ease_factor float default 2.5,
  next_review_date date,
  is_weak_flagged boolean default false,
  tap_count int default 1,
  last_reviewed_at timestamptz default now(),
  unique (user_id, vocabulary_id)
);

alter table vocabulary_progress enable row level security;

create policy "User kelola vocabulary_progress miliknya sendiri" on vocabulary_progress
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Kritik & saran dari user, dibaca lewat Admin CMS.
create table feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  message text not null,
  created_at timestamptz default now()
);

alter table feedback enable row level security;

create policy "User kirim & lihat feedback miliknya sendiri" on feedback
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Web push subscription per device, dipakai untuk pengingat belajar harian ("Pengingat Belajar" di Profil).
create table push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz default now()
);

alter table push_subscriptions enable row level security;

create policy "User kelola push_subscriptions miliknya sendiri" on push_subscriptions
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
