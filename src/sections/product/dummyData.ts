import { IProductItem } from 'src/types/product';

export const generateDummyBrands = (): { key: string; value: string }[] => {
  const brands = [{ key: 'byte', value: 'ByteBazaar' }, { key: 'cart', value: 'CircuitCart' }, { key: 'chip', value: 'ChipCharm' }, { key: 'logic', value: 'LogicLink' }, { key: 'pulse', value: 'PulseParts' }, { key: 'tech', value: 'TechTrove' }];
  return brands.map((brand) => ({ key: brand.key, value: brand.value }));
}

export const generateDummyCategories = (): { key: string; value: string }[] => {
  const categories = [{ key: 'phone', value: 'Phone' }, { key: 'camera', value: 'Camera' }, { key: 'tablet', value: 'Tablet' }, { key: 'monitor', value: 'Monitor' }, { key: 'laptop', value: 'Laptop' }, { key: 'headphone', value: 'Headphone' }];
  return categories.map((category) => ({ key: category.key, value: category.value }));
}

export const generateDummyProducts = (count: number): IProductItem[] => {
  const products: IProductItem[] = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= count; i++) {
    products.push({
      id: `product${i}`,
      name: `Product ${i}`,
      image: `https://via.placeholder.com/250?text=Product+${i}`,
      stock: Math.floor(Math.random() * 100) + 1,
      price: parseFloat((Math.random() * 100 + 1).toFixed(2)),
      discount: parseFloat((Math.random() * 30).toFixed(2)),
      brands: generateDummyBrands(),
      categories: generateDummyCategories(),
    });
  }
  return products;
};
