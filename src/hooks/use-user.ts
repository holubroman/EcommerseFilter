import { useSelector } from 'react-redux';

import { AuthUserType } from '../store/types';

export function useActiveUser() {
  const { user } = useSelector((state: AuthUserType) => state?.auth);

  const activeUser = localStorage.getItem('sb-ltyxrnjvvunfmkbsmnns-auth-token') || user || null

  const parsedUser = typeof activeUser === 'string' ? JSON.parse(activeUser): activeUser;

  console.log(parsedUser);

  const isAdmin = parsedUser?.user?.email.includes('admin');
  const isUser = parsedUser?.user?.email.includes('user');
  const displayName = parsedUser?.user?.email.split('@')[0];
  const authenticated = !!parsedUser;

  return { parsedUser, isUser, isAdmin, authenticated, displayName };
}
