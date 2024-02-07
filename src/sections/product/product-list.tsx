import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { IProductItem } from 'src/types/product';

import ProductItem from './product-item';

type Props = {
  products: IProductItem[];
};

export default function ProductList({ products }: Props) {

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
      >
        {products?.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </Box>

      {products?.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
