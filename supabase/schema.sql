-- Artlyo MVP schema for Supabase
-- Run in Supabase SQL Editor: https://supabase.com/dashboard

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  artwork_id text not null,
  artwork_title text not null,
  artist_name text not null,
  buyer_name text not null,
  buyer_email text not null,
  message text not null,
  locale text default 'en',
  created_at timestamptz default now()
);

create table if not exists seller_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  portfolio_url text,
  about text not null,
  status text default 'pending',
  created_at timestamptz default now()
);

alter table inquiries enable row level security;
alter table seller_applications enable row level security;

-- Service role bypasses RLS; anon cannot read/write directly from browser
create policy "Service role only" on inquiries for all using (false);
create policy "Service role only apps" on seller_applications for all using (false);
