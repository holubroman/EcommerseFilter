import { useState, useEffect } from 'react';
import { PostgrestError } from '@supabase/supabase-js';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Card, Grid, Skeleton } from '@mui/material';

import slider from 'src/assets/background/slider.webp';

import { paths } from '../routes/paths';
import { fetchResource } from '../api/fetch';
import { RouterLink } from '../routes/components';

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
  const [categories, setCategories] = useState<{ data: Category[], error: PostgrestError | null, loading: boolean }>({
    data: [],
    error: null,
    loading: false,
  });

  const [brands, setBrands] = useState<{ data: Brand[], error: PostgrestError | null, loading: boolean }>({
    data: [],
    error: null,
    loading: false,
  });

  useEffect(() => {
    setCategories({ data: [], error: null, loading: true });
    setBrands({ data: [], error: null, loading: true });
    const fetchCategories = async () => {
      try {
        const categoryResponse = await fetchResource('categories', 6);
        const brandResponse = await fetchResource('brands', 6);
        setCategories({ data: categoryResponse.data || [], error: categoryResponse.error, loading: false });
        setBrands({ data: brandResponse.data || [], error: brandResponse.error, loading: false });
      } catch (error) {
        setCategories({ data: [], error, loading: false });
        setBrands({ data: [], error, loading: false });
      }
    };
    fetchCategories();
  }, []);

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
      {categories?.data?.map((item: Category) => (
        <Grid item key={item.key} xs={6} sm={4} md={2}>
          <Card
            component={RouterLink}
            href={paths.product.filter('categories', item.key)}
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
      {brands?.data?.map((item: Brand) => (
        <Grid item key={item.key} xs={6} sm={4} md={2}>
          <Card
            component={RouterLink}
            href={paths.product.filter('brands', item.key)}
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
          borderRadius: 2,
          width: 'calc(100%)',
          height: 'auto',
        }}
      />
      <Typography variant="h6" mt={2} gutterBottom>Popular Categories</Typography>
      {categories.error && renderError}
      {categories.loading ? renderSkeleton : renderPopularProducts}
      {!categories.error && !categories.loading && categories.data.length === 0 && renderEmpty}
      <Typography variant="h6" mt={2} gutterBottom>Popular Brands</Typography>
      {brands.error && renderError}
      {brands.loading ? renderSkeleton : renderPopularBrands}
      {!brands.error && !brands.loading && brands.data.length === 0 && renderEmpty}
    </Stack>
  );
}

export default Home;
