export type Product = {
  id: string;
  slug: string;
  name: string;
  badge: string;
  description: string;
  features: string[];
  images: string[];
  price: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ServiceSection = {
  heading: string;
  body: string;
  list?: { title: string; desc: string }[];
};

export type Service = {
  id: string;
  slug: string;
  icon: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  image: string;
  gallery: string[];
  sections: ServiceSection[];
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type NewsContent = { heading: string; body: string };

export type NewsArticle = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  read_time: string;
  content: NewsContent[];
  gallery: string[];
  is_download: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type About = {
  id: number;
  intro_title: string;
  intro_paragraphs: string[];
  mission: string;
  vision: string;
  values: string[];
  updated_at: string;
};
