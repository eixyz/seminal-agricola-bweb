import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() ?? '';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() ?? '';

export const isSupabaseConfigured = supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackAnonKey = 'placeholder-anon-key';

export const supabase = createClient(
	isSupabaseConfigured ? supabaseUrl : fallbackUrl,
	isSupabaseConfigured ? supabaseAnonKey : fallbackAnonKey,
	{
		auth: {
			autoRefreshToken: isSupabaseConfigured,
			persistSession: isSupabaseConfigured,
			detectSessionInUrl: isSupabaseConfigured,
		},
	},
);
