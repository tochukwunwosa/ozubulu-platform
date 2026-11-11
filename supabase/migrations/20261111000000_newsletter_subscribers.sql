-- Newsletter sign-ups from the homepage "Get archive updates" form.
-- Table design: docs/09-database-design.md (newsletter_subscribers).
--
-- Email addresses are personal data. Row-level security lets visitors add
-- themselves with the public (anon) key but never read, change or delete
-- the list; only the service role (editors, server tooling) can.

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (char_length(email) <= 254),
  subscribed_at timestamptz not null default now(),
  active boolean not null default true
);

alter table public.newsletter_subscribers enable row level security;

create policy "Visitors can subscribe"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (active = true);
