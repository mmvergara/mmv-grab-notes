
-- Tables
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  constraint username_length check (char_length(username) > 3)
);

alter table profiles
  enable row level security;


create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);


create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id,username)
  values (new.id,new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();






CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  notes_owner_id INTEGER REFERENCES profiles (id) NOT NULL
);
