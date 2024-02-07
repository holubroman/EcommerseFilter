import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import GuestGuard from 'src/guard/guest-guard';
import CompactLayout from 'src/layouts/compact';

const Login = lazy(() => import('src/pages/auth/login'));

export const authRoutes = [
  {
    element: (
      <GuestGuard>
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      </GuestGuard>
    ),
    children: [
      { path: '/auth/login', element: <Login /> },
    ],
  },
];
