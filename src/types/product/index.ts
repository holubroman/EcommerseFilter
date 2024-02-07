export type IProductFilterValue = string | string[] | number | boolean;

export type IProductFilters = {
  inStock: boolean;
  brands: string[];
  hasDiscount: boolean;
  categories: string[];
  minPrice: number;
  maxPrice: number;
};

export type IProductBrands = {
  key: string;
  value: string;
};

export type IProductCategory = {
  key: string;
  value: string;
};

export type IProductItem = {
  id: string;
  name: string;
  image: string;
  stock: number;
  price: number;
  discount: number;
  brands: IProductBrands[];
  categories: IProductCategory[];
};
