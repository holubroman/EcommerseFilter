import { supabase } from '../lib/supabase';

export async function fetchResource(resource: string, limit: number) {
  try {
    const response = await supabase.from(resource).select('*').range(0, limit);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: [], error, loading: false };
  }
}
