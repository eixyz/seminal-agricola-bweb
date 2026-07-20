/*
# Create contact inquiries and newsletter subscriptions tables

1. New Tables
- `contact_inquiries`
  - `id` (uuid, primary key)
  - `name` (text, not null) — submitter's full name
  - `email` (text, not null) — submitter's email address
  - `phone` (text, nullable) — optional phone number
  - `subject` (text, not null) — inquiry subject line
  - `message` (text, not null) — inquiry body
  - `created_at` (timestamptz, default now)
- `newsletter_subscribers`
  - `id` (uuid, primary key)
  - `email` (text, unique, not null) — subscriber email
  - `created_at` (timestamptz, default now)

2. Security
- Enable RLS on both tables.
- This is a no-auth public website, so policies allow `anon, authenticated` to INSERT only.
- No SELECT/UPDATE/DELETE policies — inquiries and subscriptions are write-only from the public frontend.
- `USING (true)` / `WITH CHECK (true)` is acceptable here because these are intentionally public write-only tables (anyone visiting the site can submit a contact form or subscribe).

3. Important Notes
- No user_id columns — this is a single-tenant marketing site with no sign-in.
- Only INSERT is exposed publicly; all reads are restricted (no SELECT policy = no reads via anon key).
- Newsletter email uniqueness is enforced by a UNIQUE constraint.
*/

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_inquiries" ON contact_inquiries;
CREATE POLICY "anon_insert_contact_inquiries" ON contact_inquiries
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_newsletter_subscribers" ON newsletter_subscribers;
CREATE POLICY "anon_insert_newsletter_subscribers" ON newsletter_subscribers
  FOR INSERT TO anon, authenticated WITH CHECK (true);
