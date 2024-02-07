export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  is_active: boolean;
  surname: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}
