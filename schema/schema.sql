CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  notes_owner_id INTEGER references auth.users on delete cascade not null
);


CREATE POLICY "only note owners can do actions to their notes" ON "public"."notes"
AS PERMISSIVE FOR ALL
TO authenticated
USING (auth.uid() = notes_owner_id)
WITH CHECK (auth.uid() = notes_owner_id)