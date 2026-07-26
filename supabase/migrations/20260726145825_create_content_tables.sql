/*
# Create content tables for editable site content (products, services, news, about)

1. New Tables
- `products`
  - `id` (uuid, primary key)
  - `slug` (text, unique, not null) — URL slug
  - `name` (text, not null)
  - `badge` (text, not null) — short category label
  - `description` (text, not null)
  - `features` (jsonb, not null, default '[]') — list of feature strings
  - `images` (jsonb, not null, default '[]') — list of image paths
  - `price` (text, not null, default 'Sob consulta')
  - `sort_order` (int, not null, default 0)
  - `created_at` / `updated_at` (timestamptz)
- `services`
  - `id` (uuid, primary key)
  - `slug` (text, unique, not null)
  - `icon` (text, not null) — lucide icon name
  - `title` (text, not null)
  - `short` (text, not null) — short summary
  - `description` (text, not null)
  - `features` (jsonb, not null, default '[]')
  - `image` (text, not null) — main image path
  - `gallery` (jsonb, not null, default '[]')
  - `sections` (jsonb, not null, default '[]') — optional content sections
  - `sort_order` (int, not null, default 0)
  - `created_at` / `updated_at`
- `news`
  - `id` (uuid, primary key)
  - `slug` (text, unique, not null)
  - `tag` (text, not null)
  - `title` (text, not null)
  - `excerpt` (text, not null)
  - `image` (text, not null)
  - `date` (text, not null) — display date string
  - `author` (text, not null)
  - `read_time` (text, not null)
  - `content` (jsonb, not null, default '[]') — sections with heading/body
  - `gallery` (jsonb, not null, default '[]')
  - `is_download` (boolean, not null, default false)
  - `sort_order` (int, not null, default 0)
  - `created_at` / `updated_at`
- `about`
  - `id` (int, primary key, fixed to 1) — single-row table
  - `intro_title` (text, not null)
  - `intro_paragraphs` (jsonb, not null, default '[]')
  - `mission` (text, not null)
  - `vision` (text, not null)
  - `values` (jsonb, not null, default '[]')
  - `updated_at` (timestamptz)

2. Security
- Enable RLS on all tables.
- Public SELECT for everyone (anon + authenticated): the marketing site must read content without login.
- INSERT/UPDATE/DELETE restricted to authenticated (admin) only.
- The `about` table is a single-row table; admin can update it.

3. Important Notes
- This is a single-tenant content site. There is no per-user ownership; any authenticated admin can edit all content.
- Arrays and nested structures are stored as jsonb (features, images, gallery, sections, content, values, intro_paragraphs).
- `updated_at` auto-updates via trigger.
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  badge text NOT NULL,
  description text NOT NULL,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  price text NOT NULL DEFAULT 'Sob consulta',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_products" ON products;
CREATE POLICY "admin_insert_products" ON products FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_products" ON products;
CREATE POLICY "admin_update_products" ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_products" ON products;
CREATE POLICY "admin_delete_products" ON products FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  icon text NOT NULL,
  title text NOT NULL,
  short text NOT NULL,
  description text NOT NULL,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  image text NOT NULL,
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_services" ON services;
CREATE POLICY "public_read_services" ON services FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_services" ON services;
CREATE POLICY "admin_insert_services" ON services FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_services" ON services;
CREATE POLICY "admin_update_services" ON services FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_services" ON services;
CREATE POLICY "admin_delete_services" ON services FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  tag text NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  image text NOT NULL,
  date text NOT NULL,
  author text NOT NULL,
  read_time text NOT NULL,
  content jsonb NOT NULL DEFAULT '[]'::jsonb,
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_download boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_news" ON news;
CREATE POLICY "public_read_news" ON news FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_news" ON news;
CREATE POLICY "admin_insert_news" ON news FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_news" ON news;
CREATE POLICY "admin_update_news" ON news FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_news" ON news;
CREATE POLICY "admin_delete_news" ON news FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS about (
  id int PRIMARY KEY DEFAULT 1,
  intro_title text NOT NULL DEFAULT 'SEMINAL AGRICOLA, SU, LDA',
  intro_paragraphs jsonb NOT NULL DEFAULT '[]'::jsonb,
  mission text NOT NULL DEFAULT '',
  vision text NOT NULL DEFAULT '',
  values jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT about_single_row CHECK (id = 1)
);
ALTER TABLE about ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_about" ON about;
CREATE POLICY "public_read_about" ON about FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_about" ON about;
CREATE POLICY "admin_insert_about" ON about FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_about" ON about;
CREATE POLICY "admin_update_about" ON about FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- updated_at trigger
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_updated_at ON products;
CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS services_updated_at ON services;
CREATE TRIGGER services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS services_updated_at ON services;
CREATE TRIGGER services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS news_updated_at ON news;
CREATE TRIGGER news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS about_updated_at ON about;
CREATE TRIGGER about_updated_at BEFORE UPDATE ON about
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
