const ROOTS = {
  HOME: '/',
  AUTH: '/auth',
};

export const paths = {
  root: ROOTS.HOME,
  auth: {
    login: `${ROOTS.AUTH}/login`,
  },
  product: {
    root: '/product',
    list: '/product/list',
    detail: '/product/detail',
  },
};
