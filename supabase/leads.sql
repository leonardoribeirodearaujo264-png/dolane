-- ===========================================================================
-- Dolane Cleaning Services — leads table
--
-- Run this ONCE in the Supabase dashboard:
--   Project  →  SQL Editor  →  New query  →  paste all of this  →  Run.
--
-- It creates a single `leads` table that holds BOTH quote requests and chat
-- messages (the `type` column tells them apart), and a Row Level Security
-- policy that lets the website INSERT leads but never READ them back — so
-- customer data stays private and is only visible to you in the dashboard.
-- ===========================================================================

create table if not exists public.leads (
  id             bigint generated always as identity primary key,
  created_at     timestamptz not null default now(),
  type           text not null default 'quote',   -- 'quote' | 'contact'
  full_name      text,
  phone          text,
  email          text,
  city           text,
  zip            text,
  service_type   text,
  frequency      text,
  bedrooms       text,
  bathrooms      text,
  square_feet    text,
  preferred_date text,
  pets           text,
  last_cleaned   text,
  add_ons        text[],
  home_condition text,
  special_requests text,
  message        text,
  source         text
);

-- Turn on Row Level Security and allow inserts from the website's public key.
alter table public.leads enable row level security;

drop policy if exists "website can insert leads" on public.leads;
create policy "website can insert leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- Deliberately NO select/update/delete policy for the anon role, so leads can
-- be created by the site but only read by you inside the Supabase dashboard.
