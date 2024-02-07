import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import { InputAdornment } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';

import { IProductItem, IProductFilters, IProductFilterValue } from 'src/types/product';

import ProductList from './product-list';
import ProductSort from './product-sort';
import ProductFilters from './product-filters';
import ProductFiltersResult from './product-filters-result';
import { generateDummyBrands, generateDummyProducts, generateDummyCategories } from './dummyData';

const defaultFilters: IProductFilters = {
  brands: [],
  categories: [],
  minPrice: 0,
  maxPrice: 0,
  inStock: false,
  hasDiscount: false,
};

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
];

export default function ProdcutListView() {

  const openFilters = useBoolean();

  const _products = generateDummyProducts(50);

  const [sortBy, setSortBy] = useState('latest');

  const [search, setSearch] = useState<{ query: string; results: IProductItem[] }>({
    query: '',
    results: [],
  });

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: _products,
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

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearchContacts = useCallback(
    (inputValue: string) => {
      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = _products.filter((product) =>
          product.name.toLowerCase().includes(inputValue)
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [_products]
  );

  const renderEmptyContent = (
    <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ py: 10 }}>
      <Typography variant="h4">No Data</Typography>
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
        value={search.query}
        onChange={(event) => handleSearchContacts(event.target.value)}
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
          //
          categoryOptions={generateDummyCategories().map((item: any) => item.value)}
          brandOptions={generateDummyBrands().map((item: any) => item.value)}
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
      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {canReset && renderResults}
      </Stack>

      {notFound && renderEmptyContent}

      <ProductList products={dataFiltered} />
    </Container>
  );
}


const applyFilter = ({ inputData, filters, sortBy }: {
  inputData: IProductItem[]; filters: IProductFilters; sortBy: string;
}) => {
  const { brands, categories, minPrice, hasDiscount, maxPrice, inStock } = filters;

  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (brands.length) {
    inputData = inputData.filter((product) =>
      product.brands.some((item) => brands.includes(item.value)),
    );
  }

  if (categories.length) {
    inputData = inputData.filter((product) =>
      product.categories.some((item) => categories.includes(item.value)),
    );
  }

  if (minPrice && maxPrice) {
    inputData = inputData.filter((product) => product.price >= minPrice && product.price <= maxPrice);
  }

  if (inStock) {
    inputData = inputData.filter((product) => product.stock > 0);
  }

  if (hasDiscount) {
    inputData = inputData.filter((product) => product.discount > 0);
  }

  return inputData;
};
