import { isSupabaseConfigured, supabase } from './supabase';
import type { Product, Service, NewsArticle, About } from './types';
import { products as localProducts, services as localServices, news as localNews } from './data';

function getLocalProducts(): Product[] {
  return localProducts.map((p, i) => ({
    id: `local-product-${i + 1}`,
    slug: p.slug,
    name: p.name,
    badge: p.badge,
    description: p.description,
    features: p.features,
    images: p.images,
    price: p.price,
    sort_order: i + 1,
    created_at: '',
    updated_at: '',
  }));
}

function getLocalServices(): Service[] {
  return localServices.map((s, i) => ({
    id: `local-service-${i + 1}`,
    slug: s.slug,
    icon: s.icon,
    title: s.title,
    short: s.short,
    description: s.description,
    features: s.features,
    image: s.image,
    gallery: s.gallery ?? [],
    sections: s.sections ?? [],
    sort_order: i + 1,
    created_at: '',
    updated_at: '',
  }));
}

function getLocalNews(): NewsArticle[] {
  return localNews.map((n, i) => ({
    id: `local-news-${i + 1}`,
    slug: n.slug,
    tag: n.tag,
    title: n.title,
    excerpt: n.excerpt,
    image: n.image,
    date: n.date,
    author: n.author,
    read_time: n.readTime,
    content: n.content,
    gallery: n.gallery ?? [],
    is_download: n.isDownload ?? false,
    sort_order: i + 1,
    created_at: '',
    updated_at: '',
  }));
}

export async function fetchProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return getLocalProducts();
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    return getLocalProducts().find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data as Product | null;
}

export async function fetchServices(): Promise<Service[]> {
  if (!isSupabaseConfigured) {
    return getLocalServices();
  }

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Service[];
}

export async function fetchService(slug: string): Promise<Service | null> {
  if (!isSupabaseConfigured) {
    return getLocalServices().find((s) => s.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data as Service | null;
}

export async function fetchNews(): Promise<NewsArticle[]> {
  if (!isSupabaseConfigured) {
    return getLocalNews();
  }

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as NewsArticle[];
}

export async function fetchNewsArticle(slug: string): Promise<NewsArticle | null> {
  if (!isSupabaseConfigured) {
    return getLocalNews().find((n) => n.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data as NewsArticle | null;
}

export async function fetchAbout(): Promise<About | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  const { data, error } = await supabase
    .from('about')
    .select('*')
    .eq('id', 1)
    .maybeSingle();
  if (error) throw error;
  return data as About | null;
}
