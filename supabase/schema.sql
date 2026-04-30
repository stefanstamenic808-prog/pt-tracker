-- ============================================
-- StamenicFitt Tracker — Supabase schema
-- Pokreni ovu skriptu u Supabase SQL Editor-u
-- ============================================

-- ============================================
-- TABELE
-- ============================================

-- Paketi (tipovi članarina koje trener nudi)
create table if not exists public.packages (
  id            bigserial primary key,
  user_id       uuid not null references auth.users(id) on delete cascade,
  type          text not null check (type in ('p','s','g')), -- p=personal, s=semi, g=group
  sessions      int not null check (sessions > 0),
  price         numeric not null check (price >= 0),
  name          text default '',
  duration_days int not null default 30 check (duration_days > 0),
  created_at    timestamptz not null default now()
);
create index if not exists packages_user_idx on public.packages(user_id);

-- Klijenti
create table if not exists public.clients (
  id              bigserial primary key,
  user_id         uuid not null references auth.users(id) on delete cascade,
  name            text not null,
  package_id      bigint references public.packages(id) on delete set null,
  package_start   date,
  package_used    int default 0,
  status          text not null default 'active' check (status in ('active','due','overdue','paused')),
  renewed_at      date,
  renew_note      text default '',
  archived        boolean not null default false,
  note            text default '',
  created_at      timestamptz not null default now()
);
create index if not exists clients_user_idx on public.clients(user_id);
create index if not exists clients_package_idx on public.clients(package_id);

-- Treninzi (uneti / odrađeni)
create table if not exists public.sessions (
  id          bigserial primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  client_id   bigint not null references public.clients(id) on delete cascade,
  date        date not null,
  time        text default '',
  duration    int default 60,
  type        text default '',
  note        text default '',
  created_at  timestamptz not null default now()
);
create index if not exists sessions_user_idx on public.sessions(user_id);
create index if not exists sessions_client_idx on public.sessions(client_id);
create index if not exists sessions_date_idx on public.sessions(date);

-- Grupe klijenata
create table if not exists public.groups (
  id          bigserial primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  color       text not null default '#cc2200',
  members     bigint[] not null default '{}', -- niz client.id
  created_at  timestamptz not null default now()
);
create index if not exists groups_user_idx on public.groups(user_id);

-- Termini u rasporedu (recurring weekly slots)
create table if not exists public.slots (
  id            bigserial primary key,
  user_id       uuid not null references auth.users(id) on delete cascade,
  client_id     bigint not null references public.clients(id) on delete cascade,
  day_of_week   int not null check (day_of_week between 0 and 6), -- 0=Mon
  time          text not null,
  duration      int default 60,
  note          text default '',
  created_at    timestamptz not null default now()
);
create index if not exists slots_user_idx on public.slots(user_id);
create index if not exists slots_client_idx on public.slots(client_id);

-- Izometrija testovi
create table if not exists public.iso_tests (
  id          bigserial primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  client_id   bigint not null references public.clients(id) on delete cascade,
  date        date not null,
  data        jsonb not null default '{}'::jsonb, -- {vp:{v1,v2,v3,avg}, kpR:{...}, ...}
  note        text default '',
  created_at  timestamptz not null default now()
);
create index if not exists iso_tests_user_idx on public.iso_tests(user_id);
create index if not exists iso_tests_client_idx on public.iso_tests(client_id);

-- FMS testovi
create table if not exists public.fms_tests (
  id            bigserial primary key,
  user_id       uuid not null references auth.users(id) on delete cascade,
  client_id     bigint not null references public.clients(id) on delete cascade,
  date          date not null,
  scores        jsonb not null default '{}'::jsonb, -- {deep_squat:2, hurdle_step:3, ...}
  total         int not null default 0,
  note          text default '',
  auto_comment  text default '',
  created_at    timestamptz not null default now()
);
create index if not exists fms_tests_user_idx on public.fms_tests(user_id);
create index if not exists fms_tests_client_idx on public.fms_tests(client_id);

-- Ruffier testovi
create table if not exists public.ruf_tests (
  id          bigserial primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  client_id   bigint not null references public.clients(id) on delete cascade,
  date        date not null,
  p1          int not null,
  p2          int not null,
  p3          int not null,
  idx         numeric not null,
  note        text default '',
  created_at  timestamptz not null default now()
);
create index if not exists ruf_tests_user_idx on public.ruf_tests(user_id);
create index if not exists ruf_tests_client_idx on public.ruf_tests(client_id);

-- 1RM testovi
create table if not exists public.rm_tests (
  id          bigserial primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  client_id   bigint not null references public.clients(id) on delete cascade,
  date        date not null,
  results     jsonb not null default '{}'::jsonb, -- {bench:{weight,reps,rm}, squat:{...}}
  bw          numeric, -- body weight (opciono)
  note        text default '',
  created_at  timestamptz not null default now()
);
create index if not exists rm_tests_user_idx on public.rm_tests(user_id);
create index if not exists rm_tests_client_idx on public.rm_tests(client_id);

-- Korisnička podešavanja (jedan red po treneru)
create table if not exists public.user_settings (
  user_id       uuid primary key references auth.users(id) on delete cascade,
  dark_mode     boolean not null default false,
  language      text not null default 'sr' check (language in ('sr','en','ru')),
  trainer_name  text not null default 'StamenicFitt',
  wa_template   text default '',
  updated_at    timestamptz not null default now()
);

-- ============================================
-- ROW-LEVEL SECURITY (RLS)
-- Svaki trener vidi/menja samo svoje podatke
-- ============================================

alter table public.packages       enable row level security;
alter table public.clients        enable row level security;
alter table public.sessions       enable row level security;
alter table public.groups         enable row level security;
alter table public.slots          enable row level security;
alter table public.iso_tests      enable row level security;
alter table public.fms_tests      enable row level security;
alter table public.ruf_tests      enable row level security;
alter table public.rm_tests       enable row level security;
alter table public.user_settings  enable row level security;

-- Helper za pravljenje policies
do $$
declare
  tbl text;
  tables text[] := array[
    'packages','clients','sessions','groups','slots',
    'iso_tests','fms_tests','ruf_tests','rm_tests'
  ];
begin
  foreach tbl in array tables loop
    execute format('drop policy if exists "select_own" on public.%I', tbl);
    execute format('drop policy if exists "insert_own" on public.%I', tbl);
    execute format('drop policy if exists "update_own" on public.%I', tbl);
    execute format('drop policy if exists "delete_own" on public.%I', tbl);

    execute format('create policy "select_own" on public.%I for select using (auth.uid() = user_id)', tbl);
    execute format('create policy "insert_own" on public.%I for insert with check (auth.uid() = user_id)', tbl);
    execute format('create policy "update_own" on public.%I for update using (auth.uid() = user_id) with check (auth.uid() = user_id)', tbl);
    execute format('create policy "delete_own" on public.%I for delete using (auth.uid() = user_id)', tbl);
  end loop;
end$$;

-- user_settings ima poseban PK (user_id), zato odvojeno
drop policy if exists "select_own" on public.user_settings;
drop policy if exists "insert_own" on public.user_settings;
drop policy if exists "update_own" on public.user_settings;
drop policy if exists "delete_own" on public.user_settings;

create policy "select_own" on public.user_settings for select using (auth.uid() = user_id);
create policy "insert_own" on public.user_settings for insert with check (auth.uid() = user_id);
create policy "update_own" on public.user_settings for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete_own" on public.user_settings for delete using (auth.uid() = user_id);

-- ============================================
-- DONE
-- ============================================
