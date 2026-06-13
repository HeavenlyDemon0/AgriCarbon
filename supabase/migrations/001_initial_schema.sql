-- AgriCarbon initial schema
-- Run in Supabase SQL Editor or: supabase db push

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  company text,
  phone text,
  role text,
  created_at timestamptz not null default now()
);

-- Farms
create table if not exists public.farms (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  location text,
  area text,
  crop text,
  soil_type text,
  season text,
  icon text default '🌾',
  created_at timestamptz not null default now()
);

create index if not exists farms_user_id_idx on public.farms(user_id);

-- Impact metrics
create table if not exists public.impact_metrics (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references public.farms(id) on delete cascade,
  metric text not null,
  before_value numeric not null,
  after_value numeric not null,
  unit text not null,
  icon text,
  improvement text,
  unique (farm_id, metric)
);

-- Credit transactions (wallet)
create table if not exists public.credit_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  farm_id uuid references public.farms(id) on delete set null,
  transaction_date date not null default current_date,
  type text not null check (type in ('earned', 'pending', 'redeemed')),
  description text not null,
  credits integer not null,
  icon text,
  created_at timestamptz not null default now()
);

create index if not exists credit_transactions_user_id_idx on public.credit_transactions(user_id);

-- Reports
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  farm_id uuid references public.farms(id) on delete set null,
  title text not null,
  report_date date not null,
  icon text,
  size_label text,
  storage_path text,
  created_at timestamptz not null default now()
);

create index if not exists reports_user_id_idx on public.reports(user_id);

-- Report shares
create table if not exists public.report_shares (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.reports(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  target text not null check (target in ('bank', 'expert')),
  created_at timestamptz not null default now()
);

-- Verification submissions
create table if not exists public.verification_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  farm_id uuid references public.farms(id) on delete set null,
  practice_type text not null,
  voice_confirmed boolean not null default false,
  image_path text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  credits_awarded integer,
  created_at timestamptz not null default now()
);

-- Global weather snapshot (single row)
create table if not exists public.weather_snapshots (
  id text primary key default 'default',
  temp numeric not null,
  condition text not null check (condition in ('sunny', 'rainy', 'cloudy', 'storm', 'drought')),
  humidity integer not null,
  wind_speed numeric not null,
  icon text not null,
  description text not null
);

-- Global alerts
create table if not exists public.alerts (
  id text primary key,
  type text not null check (type in ('weather', 'pest', 'drought', 'flood')),
  severity text not null check (severity in ('low', 'medium', 'high', 'critical')),
  title text not null,
  description text not null,
  timestamp timestamptz not null,
  icon text not null
);

-- Global recommendations
create table if not exists public.recommendations (
  id text primary key,
  title text not null,
  description text not null,
  rationale text not null,
  cost text not null,
  benefit text not null,
  risk text not null,
  cost_icon text not null,
  benefit_icon text not null,
  risk_icon text not null,
  priority text not null check (priority in ('high', 'medium', 'low')),
  timeframe text not null check (timeframe in ('today', 'week', 'season')),
  sort_order integer not null default 0
);

-- RLS
alter table public.profiles enable row level security;
alter table public.farms enable row level security;
alter table public.impact_metrics enable row level security;
alter table public.credit_transactions enable row level security;
alter table public.reports enable row level security;
alter table public.report_shares enable row level security;
alter table public.verification_submissions enable row level security;
alter table public.weather_snapshots enable row level security;
alter table public.alerts enable row level security;
alter table public.recommendations enable row level security;

-- Profiles policies
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

-- Farms policies
create policy "farms_select_own" on public.farms for select using (auth.uid() = user_id);
create policy "farms_insert_own" on public.farms for insert with check (auth.uid() = user_id);
create policy "farms_update_own" on public.farms for update using (auth.uid() = user_id);
create policy "farms_delete_own" on public.farms for delete using (auth.uid() = user_id);

-- Impact metrics via farm ownership
create policy "impact_select_own" on public.impact_metrics for select using (
  exists (select 1 from public.farms f where f.id = farm_id and f.user_id = auth.uid())
);
create policy "impact_insert_own" on public.impact_metrics for insert with check (
  exists (select 1 from public.farms f where f.id = farm_id and f.user_id = auth.uid())
);

-- Credit transactions
create policy "credits_select_own" on public.credit_transactions for select using (auth.uid() = user_id);
create policy "credits_insert_own" on public.credit_transactions for insert with check (auth.uid() = user_id);

-- Reports
create policy "reports_select_own" on public.reports for select using (auth.uid() = user_id);
create policy "reports_insert_own" on public.reports for insert with check (auth.uid() = user_id);

-- Report shares
create policy "report_shares_select_own" on public.report_shares for select using (auth.uid() = user_id);
create policy "report_shares_insert_own" on public.report_shares for insert with check (auth.uid() = user_id);

-- Verifications
create policy "verifications_select_own" on public.verification_submissions for select using (auth.uid() = user_id);
create policy "verifications_insert_own" on public.verification_submissions for insert with check (auth.uid() = user_id);

-- Read-only global data for authenticated users
create policy "weather_read_authenticated" on public.weather_snapshots for select to authenticated using (true);
create policy "alerts_read_authenticated" on public.alerts for select to authenticated using (true);
create policy "recommendations_read_authenticated" on public.recommendations for select to authenticated using (true);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Storage bucket for verification images
insert into storage.buckets (id, name, public)
values ('verification-images', 'verification-images', false)
on conflict (id) do nothing;

create policy "verification_images_insert_own"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'verification-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "verification_images_select_own"
on storage.objects for select to authenticated
using (
  bucket_id = 'verification-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Seed global weather
insert into public.weather_snapshots (id, temp, condition, humidity, wind_speed, icon, description)
values (
  'default', 32, 'sunny', 65, 12, '☀️', 'Clear skies, good for field work'
)
on conflict (id) do update set
  temp = excluded.temp,
  condition = excluded.condition,
  humidity = excluded.humidity,
  wind_speed = excluded.wind_speed,
  icon = excluded.icon,
  description = excluded.description;

-- Seed alerts (matches frontend mock)
insert into public.alerts (id, type, severity, title, description, timestamp, icon) values
  ('1', 'weather', 'high', 'Heavy Rain Expected', 'Heavy rainfall expected in the next 48 hours. Secure crops and drainage.', '2026-06-13T10:00:00+00', '🌧️'),
  ('2', 'pest', 'medium', 'Pest Risk: Stem Borer', 'Moderate risk of stem borer infestation in paddy fields. Apply neem-based spray.', '2026-06-13T08:30:00+00', '🐛'),
  ('3', 'drought', 'low', 'Dry Spell Advisory', 'Mild dry conditions expected next week. Plan irrigation accordingly.', '2026-06-12T14:00:00+00', '🏜️'),
  ('4', 'weather', 'medium', 'Wind Advisory', 'Strong winds expected this afternoon. Protect young seedlings.', '2026-06-12T09:00:00+00', '💨'),
  ('5', 'flood', 'low', 'River Level Rising', 'Minor rise in nearby river levels. Monitor field drainage.', '2026-06-11T16:00:00+00', '🌊')
on conflict (id) do nothing;

-- Seed recommendations (matches frontend mock)
insert into public.recommendations (
  id, title, description, rationale, cost, benefit, risk,
  cost_icon, benefit_icon, risk_icon, priority, timeframe, sort_order
) values
  ('rec-1', 'Apply Organic Mulching', 'Cover the soil around your crops with organic matter like straw or dry leaves.',
   'Mulching retains moisture, suppresses weeds, and improves soil carbon content. This directly increases your carbon credit score and reduces water usage by 30%.',
   '₹200-400', '+3 Carbon Credits', 'Low Risk', '💰', '🌱', '✅', 'high', 'today', 1),
  ('w1', 'Install Drip Irrigation Line', 'Set up drip system in the south field.', 'Saves 40% water and earns 5 carbon credits.',
   '₹1,500', '+5 Credits', 'Low', '💰', '💧', '✅', 'high', 'week', 1),
  ('w2', 'Apply Neem-Based Spray', 'Organic pest control for paddy fields.', 'Prevents stem borer without chemicals. Earns organic farming credit.',
   '₹300', '+2 Credits', 'Low', '💰', '🛡️', '✅', 'medium', 'week', 2),
  ('w3', 'Set Up Compost Pit', 'Convert crop residue into valuable compost.', 'Reduces burning, improves soil health, earns carbon credits.',
   '₹500', '+4 Credits', 'Medium', '💰', '♻️', '⚠️', 'medium', 'week', 3),
  ('w4', 'Soil Testing', 'Send soil sample for nutrient analysis.', 'Targeted fertilizer use saves money and increases yield.',
   '₹150', 'Saves ₹2000', 'Low', '💰', '📊', '✅', 'low', 'week', 4),
  ('s1', 'Crop Rotation: Switch to Legumes', 'Plant pulses in the next cycle for nitrogen fixation.', 'Natural soil enrichment, reduces fertilizer costs by 50%.',
   '₹2,000', '+12 Credits', 'Low', '💰', '🫘', '✅', 'high', 'season', 1),
  ('s2', 'Agroforestry: Plant Border Trees', 'Plant neem or subabul trees on field borders.', 'Long-term carbon sequestration, windbreak, and additional income.',
   '₹3,000', '+20 Credits/yr', 'Low', '💰', '🌳', '✅', 'high', 'season', 2),
  ('s3', 'Zero-Till Farming Transition', 'Adopt no-tillage methods for wheat sowing.', 'Preserves soil structure, reduces diesel costs, massive carbon benefit.',
   '₹1,200', '+15 Credits', 'Medium', '💰', '🌾', '⚠️', 'medium', 'season', 3)
on conflict (id) do nothing;
