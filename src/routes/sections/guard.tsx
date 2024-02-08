import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/guard';
import CompactLayout from 'src/layouts/compact';

// Product
const ProductCreate = lazy(() => import('src/pages/product/create'));

export const guardRoutes = [
  {
    element: (
      <AuthGuard>
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      </AuthGuard>
    ),
    children: [
      { path: '/product/create', element: <ProductCreate />, roles: ['admin']},
    ],
  },
];
