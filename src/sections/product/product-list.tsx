import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';

import { IProductItem } from 'src/types/product';

import ProductItem from './product-item';

type Props = {
  products: IProductItem[];
  loading: boolean;
};

export default function ProductList({ products, loading }: Props) {

  const renderSkeleton = (
    <>
      {[...Array(12)].map((_, index) => (
        <Skeleton key={index} height={200} animation="wave" variant="rounded" />
      ))}
    </>
  );

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(4, 1fr)',
      }}
    >
      {loading && renderSkeleton}
      {!loading && products?.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
        />
      ))}
    </Box>
  );
}
