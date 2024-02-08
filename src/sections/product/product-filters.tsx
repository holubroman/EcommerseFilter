import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { Switch, Skeleton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useSearchParams } from 'src/routes/hooks';

import { selectBrands, fetchBrandsAsync } from 'src/store/brand.slice';
import { selectCategories, fetchCategoriesAsync } from 'src/store/category.slice';

import Iconify from 'src/components/iconify';

import { IProductFilters, IProductFilterValue } from 'src/types/product';

type Props = {
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  //
  filters: IProductFilters;
  onFilters: (name: string, value: IProductFilterValue) => void;
  //
  canReset: boolean;
  onResetFilters: VoidFunction;
  //
};

export default function ProductFilters({
    open,
    onOpen,
    onClose,
    //
    filters,
    onFilters,
    //
    canReset,
    onResetFilters,
    //
  }: Props) {

  const dispatch = useDispatch();

  const { categories, error: categoriesError, status: categoriesStatus } = useSelector(selectCategories) ?? {};
  const { brands, error:brandsError, status: brandsStatus } = useSelector(selectBrands) ?? {};

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync())
  }, [dispatch]);

  const searchParams = useSearchParams();

  const selectedCategories = searchParams.get('categories') || null;
  const selectedBrands = searchParams.get('brands') || null;

  const handleFilterBrands = useCallback(
    (newValue: string) => {
      const checked = filters.brands.includes(newValue)
        ? filters.brands.filter((value: string) => value !== newValue)
        : [...filters.brands, newValue];
      onFilters('brands', checked);
    },
    [filters.brands, onFilters],
  );

  const handleFilterCategories = useCallback(
    (newValue: string) => {
      const checked = filters.categories.includes(newValue)
        ? filters.categories.filter((value: string) => value !== newValue)
        : [...filters.categories, newValue];
      onFilters('categories', checked);
    },
    [filters.categories, onFilters],
  );

  useEffect(() => {
    if(selectedBrands) handleFilterBrands(selectedBrands);
    if(selectedCategories) handleFilterCategories(selectedCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrands, selectedCategories]);

  const handleMinPrice = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('minPrice', event.target.value);
    },
    [onFilters],
  );

  const handleMaxPrice = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('maxPrice', event.target.value);
    },
    [onFilters],
  );

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Filters
      </Typography>

      <Tooltip title="Reset">
        <IconButton onClick={onResetFilters}>
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <IconButton onClick={onClose}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  const renderBrands = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Brands
      </Typography>
      {brands?.map((option) => (
        <FormControlLabel
          key={option.key}
          control={
            <Checkbox
              checked={filters.brands.includes(option.value)}
              onClick={() => handleFilterBrands(option.value)}
            />
          }
          label={option.value}
        />
      ))}
    </Stack>
  );

  const renderInStock = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        In Stock
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={filters.inStock}
            onClick={() => onFilters('inStock', !filters.inStock)}
          />
        }
        label={filters.inStock ? 'In Stock' : 'All'}
      />
    </Stack>
  );

  const renderHasDiscount = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Has Discount
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={filters.hasDiscount}
            onClick={() => onFilters('hasDiscount', !filters.hasDiscount)}
          />
        }
        label={filters.hasDiscount ? 'Has Discount' : 'All'}
      />
    </Stack>
  );

  const renderCategories = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Categories
      </Typography>
      {categories?.map((option) => (
        <FormControlLabel
          key={option.key}
          control={
            <Checkbox
              checked={filters.categories.includes(option.value)}
              onClick={() => handleFilterCategories(option.value)}
            />
          }
          label={option.value}
        />
      ))}
    </Stack>
  );

  const renderPrice = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Price
      </Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Min"
          type="number"
          value={filters.minPrice}
          onChange={handleMinPrice}
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: { min: 0 } }}
        />
        <TextField
          label="Max"
          type="number"
          value={filters.maxPrice}
          onChange={handleMaxPrice}
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: { min: 0 } }}
        />
      </Stack>
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpen}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 280 },
        }}
      >
        {renderHead}

        <Divider />

        <Stack sx={{ px: 2.5, py: 3, overflowY: 'auto', maxHeight: '90vh' }}>
          <Stack spacing={3}>
            {categoriesError &&
              <Typography variant='subtitle1' color="error">
                {categoriesError || 'Error while fetching categories'}
              </Typography>
            }
            {!categoriesError && categoriesStatus === 'loading' ? <Skeleton /> : renderCategories}
            <Divider sx={{ borderStyle: 'dashed' }} />
            {brandsError &&
              <Typography variant='subtitle1' color="error">
                {brandsError || 'Error while fetching brands'}
              </Typography>
            }
            {!brandsError && brandsStatus === 'loading' ? <Skeleton /> : renderBrands}
            <Divider sx={{ borderStyle: 'dashed' }} />
            {renderInStock}
            <Divider sx={{ borderStyle: 'dashed' }} />
            {renderHasDiscount}
            <Divider sx={{ borderStyle: 'dashed' }} />
            {renderPrice}
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}
