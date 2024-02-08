import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import CompactLayout from 'src/layouts/compact';

const Page403 = lazy(() => import('src/pages/403'));
const Page404 = lazy(() => import('src/pages/404'));
const Page500 = lazy(() => import('src/pages/500'));
// home
const IndexPage = lazy(() => import('src/pages/home/home'));
// Product
const ProductList = lazy(() => import('src/pages/product/list'));

export const mainRoutes = [
  {
    element: (
      <CompactLayout>
        <Outlet />
      </CompactLayout>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: '/product', element: <ProductList /> },
      { path: '/403', element: <Page403 /> },
      { path: '/404', element: <Page404 /> },
      { path: '/500', element: <Page500 /> },
    ],
  },
];
