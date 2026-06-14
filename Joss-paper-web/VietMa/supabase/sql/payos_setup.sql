alter table public."Users"
add column if not exists auth_user_id uuid unique references auth.users(id) on delete cascade;

alter table public."Users"
alter column "Phone" drop not null;

alter table public."Users"
alter column "Address" drop not null;

alter table public."Invoices"
add column if not exists amount int8,
add column if not exists status text default 'PENDING',
add column if not exists payment_provider text,
add column if not exists payment_order_code int8 unique,
add column if not exists payment_link_id text,
add column if not exists checkout_url text,
add column if not exists paid_at timestamptz;

alter table public."Users" enable row level security;
alter table public."Invoices" enable row level security;

drop policy if exists "Users can read own profile" on public."Users";
drop policy if exists "Users can insert own profile" on public."Users";
drop policy if exists "Users can update own profile" on public."Users";

create policy "Users can read own profile"
on public."Users"
for select
to authenticated
using (auth_user_id = auth.uid());

create policy "Users can insert own profile"
on public."Users"
for insert
to authenticated
with check (auth_user_id = auth.uid());

create policy "Users can update own profile"
on public."Users"
for update
to authenticated
using (auth_user_id = auth.uid())
with check (auth_user_id = auth.uid());

drop policy if exists "Users can read own invoices" on public."Invoices";

create policy "Users can read own invoices"
on public."Invoices"
for select
to authenticated
using (
  exists (
    select 1
    from public."Users"
    where public."Users"."Id" = public."Invoices"."UserId"
      and public."Users".auth_user_id = auth.uid()
  )
);

update public."Users" u
set auth_user_id = au.id
from auth.users au
where u."Email" = au.email
  and u.auth_user_id is null;
