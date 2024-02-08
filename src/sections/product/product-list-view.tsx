import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { InputAdornment } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { selectProducts, fetchProductsAsync } from 'src/store/product.slice';

import Iconify from 'src/components/iconify';

import { IProductItem, IProductFilters, IProductFilterValue } from 'src/types/product';

import ProductList from './product-list';
import ProductSort from './product-sort';
import ProductFilters from './product-filters';
import ProductFiltersResult from './product-filters-result';

const defaultFilters: IProductFilters = {
  name: '',
  brands: [],
  categories: [],
  minPrice: 0,
  maxPrice: 0,
  inStock: false,
  hasDiscount: false,
};

const SORT_OPTIONS = [
  { value: 'htl', label: 'Price: High to Low' },
  { value: 'lth', label: 'Price: Low to High' },
];

export default function ProdcutListView() {
  const router = useRouter();

  const dispatch = useDispatch();

  const searchParams = useSearchParams();

  const selectedCategories = searchParams.get('categories') || null;
  const selectedBrands = searchParams.get('brands') || null;

  const { products, error, status } = useSelector(selectProducts) ?? {};

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('lth');

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: products,
    filters,
    sortBy,
  });

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = !dataFiltered.length && canReset;

  const handleFilters = useCallback((name: string, value: IProductFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFilters('name', event.target.value);
    },
    [handleFilters],
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
    if (selectedBrands || selectedCategories) {
      router.push(paths.product.root);
    }
    ;
  }, [router, selectedBrands, selectedCategories]);

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleNavigateCreateProduct = useCallback(() => {
    router.push(paths.product.create);
  }, [router]);

  const renderEmptyContent = (
    <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ py: 10 }}>
      <Typography variant="h4">No Data</Typography>
    </Stack>
  );

  const renderError = (
    <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ py: 10 }}>
      <Typography variant="h4">{error || 'Error while fetching products'}</Typography>
    </Stack>
  );

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <TextField
        fullWidth
        value={filters.name}
        onChange={handleFilterName}
        placeholder="Search product..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        sx={{ maxWidth: 300 }}
      />
      <Stack direction="row" spacing={1} flexShrink={0}>
        <ProductFilters
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          //
          filters={filters}
          onFilters={handleFilters}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
        />

        <ProductSort sort={sortBy} onSort={handleSortBy} sortOptions={SORT_OPTIONS} />
      </Stack>
    </Stack>
  );

  const renderResults = (
    <ProductFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={dataFiltered.length}
    />
  );

  return (
    <Container maxWidth="lg">
      <Stack>
        <Button sx={{marginLeft: 'auto'}} onClick={handleNavigateCreateProduct} variant='contained'>
          Create Product
        </Button>
      </Stack>
      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {canReset && renderResults}
      </Stack>

      {error &&  renderError}

      {!error && notFound && status !== 'loading' && renderEmptyContent}

      <ProductList products={dataFiltered} loading={status === 'loading'} />
    </Container>
  );
}


const applyFilter = ({ inputData, filters, sortBy }: {
  inputData: IProductItem[]; filters: IProductFilters; sortBy: string;
}) => {
  const { name, brands, categories, minPrice, hasDiscount, maxPrice, inStock } = filters;

  if (name) {
    inputData = inputData.filter((product) =>
      product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1,
    );
  }

  if (sortBy === 'htl') {
    inputData = orderBy(inputData, ['price'], ['desc']);
  }

  if (sortBy === 'lth') {
    inputData = orderBy(inputData, ['price'], ['asc']);
  }

  if (brands.length) {
    inputData = inputData.filter((product) => brands.includes(product.brandValue),
    );
  }

  if (categories.length) {
    inputData = inputData.filter((product) => categories.includes(product.categoryValue),
    );
  }

  if (minPrice && maxPrice) {
    inputData = inputData.filter((product) => product.price >= minPrice && product.price <= maxPrice);
  }

  if (minPrice && !maxPrice) {
    inputData = inputData.filter((product) => product.price >= minPrice);
  }

  if (maxPrice && !minPrice) {
    inputData = inputData.filter((product) => product.price <= maxPrice);
  }

  if (inStock) {
    inputData = inputData.filter((product) => product.stock > 0);
  }

  if (hasDiscount) {
    inputData = inputData.filter((product) => product.discount > 0);
  }

  return inputData;
};
