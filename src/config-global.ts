import { paths } from 'src/routes/paths';

export const HOST_API = import.meta.env.VITE_HOST_API;

export const PATH_AFTER_LOGIN = paths.root;

export const SUPABASE_API = {
  url: import.meta.env.VITE_SUPABASE_URL,
  key: import.meta.env.VITE_SUPABASE_ANON_KEY,
};
