-- profiles
create table public.profiles (
  id    uuid primary key references auth.users(id) on delete cascade,
  email text not null
);
alter table public.profiles enable row level security;
create policy "profiles_public_read"  on public.profiles for select using (true);
create policy "profiles_self_insert"  on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_self_update"  on public.profiles for update using (auth.uid() = id);

-- trigger: auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- posts
create table public.posts (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  content    text not null,
  author_id  uuid not null references public.profiles(id) on delete cascade,
  is_notice  boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.posts enable row level security;
create policy "posts_public_read"   on public.posts for select using (true);
create policy "posts_auth_insert"   on public.posts for insert with check (auth.uid() = author_id);
create policy "posts_owner_update"  on public.posts for update using (auth.uid() = author_id);
create policy "posts_owner_delete"  on public.posts for delete using (auth.uid() = author_id);

-- comments
create table public.comments (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid not null references public.posts(id) on delete cascade,
  content    text not null,
  author_id  uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.comments enable row level security;
create policy "comments_public_read"  on public.comments for select using (true);
create policy "comments_auth_insert"  on public.comments for insert with check (auth.uid() = author_id);
create policy "comments_owner_delete" on public.comments for delete using (auth.uid() = author_id);
