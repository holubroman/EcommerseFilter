import { useCallback } from 'react';

import { Switch } from '@mui/material';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

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
  categoryOptions: string[];
  brandOptions: string[];
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
    categoryOptions,
    brandOptions,
  }: Props) {
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
      {brandOptions?.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={filters.brands.includes(option)}
              onClick={() => handleFilterBrands(option)}
            />
          }
          label={option}
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
      {categoryOptions?.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={filters.categories.includes(option)}
              onClick={() => handleFilterCategories(option)}
            />
          }
          label={option}
        />
      ))}
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

        <Stack sx={{ px: 2.5, py: 3 }}>
          <Stack spacing={3}>
            {renderCategories}
            <Divider sx={{ borderStyle: 'dashed' }} />
            {renderBrands}
            <Divider sx={{ borderStyle: 'dashed' }} />
            {renderInStock}
            <Divider sx={{ borderStyle: 'dashed' }} />
            {renderHasDiscount}
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}
