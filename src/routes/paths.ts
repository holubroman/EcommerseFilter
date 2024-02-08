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
    filter: (slug: string, values: string) => `${ROOTS.HOME}product?${slug}=${values}`,
    create: '/product/create',
  },
};
