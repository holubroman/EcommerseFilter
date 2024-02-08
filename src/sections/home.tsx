import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Card, Grid, Skeleton } from '@mui/material';

import slider from 'src/assets/background/slider.webp';

import { paths } from '../routes/paths';
import { RouterLink } from '../routes/components';
import { selectBrands, fetchBrandsAsync } from '../store/brand.slice';
import { selectCategories, fetchCategoriesAsync } from '../store/category.slice';

interface Category {
  id: number;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

interface Brand {
  id: number;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

function Home() {

const dispatch = useDispatch();

  const { categories, error: categoriesError, status: categoriesStatus } = useSelector(selectCategories) ?? {};
  const { brands, error:brandsError, status: brandsStatus } = useSelector(selectBrands) ?? {};

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync())
  }, [dispatch]);

  const renderError = (
    <Typography variant="body1" color="error">
      An error occurred while fetching data.
    </Typography>
  );

  const renderEmpty = (
    <Typography variant="body1">
      No data available.
    </Typography>
  );

  const renderSkeleton = (
    <Grid container spacing={2}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid item key={index} xs={6} sm={4} md={2}>
          <Skeleton height={50} animation="wave" variant="rounded" />
        </Grid>
      ))}
    </Grid>
  );

  const renderPopularProducts = (
    <Grid container spacing={2}>
      {categories?.map((item: Category) => (
        <Grid item key={item.key} xs={6} sm={4} md={2}>
          <Card
            component={RouterLink}
            href={paths.product.filter('categories', item.value)}
            sx={{
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
            '&:hover': {
              cursor: 'pointer',
              transform: 'scale(1.1)',
            },
          }}>
            {item.value}
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderPopularBrands = (
    <Grid container spacing={2}>
      {brands?.map((item: Brand) => (
        <Grid item key={item.key} xs={6} sm={4} md={2}>
          <Card
            component={RouterLink}
            href={paths.product.filter('brands', item.value)}
            sx={{
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
            '&:hover': {
              cursor: 'pointer',
              transform: 'scale(1.1)',
            },
          }}>
            {item.value}
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Stack spacing={2} direction="column">
      <Box
        component="img"
        alt="slider"
        src={slider}
        sx={{
          objectFit: 'contain',
          boxShadow: 2,
          borderRadius: 2,
          width: 'calc(100%)',
          height: 'auto',
        }}
      />
      <Typography variant="h6" mt={2} gutterBottom>Popular Categories</Typography>
      {categoriesError && renderError}
      {categoriesStatus === 'loading' ? renderSkeleton : renderPopularProducts}
      {!categoriesError && categoriesStatus !== 'loading' && categories?.length === 0 && renderEmpty}
      <Typography variant="h6" mt={2} gutterBottom>Popular Brands</Typography>
      {brandsError && renderError}
      {brandsStatus === 'loading' ? renderSkeleton : renderPopularBrands}
      {!brandsError && brandsStatus !== 'loading' && brands?.length === 0 && renderEmpty}
    </Stack>
  );
}

export default Home;
