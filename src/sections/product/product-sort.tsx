import React from 'react';

import Box from '@mui/material/Box';
import { Popover } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import Iconify from 'src/components/iconify';

type Props = {
  sort: string;
  onSort: (newValue: string) => void;
  sortOptions: {
    value: string;
    label: string;
  }[];
};

export default function ProductSort({ sort, onSort, sortOptions }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? 'popover' : undefined;

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleClick}
        endIcon={
          <Iconify
            icon={open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
          />
        }
        sx={{ fontWeight: 'fontWeightSemiBold' }}
      >
        Sort By:
        <Box
          component="span"
          sx={{
            ml: 0.5,
            fontWeight: 'fontWeightBold',
            textTransform: 'capitalize',
          }}
        >
          {sort}
        </Box>
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }} sx={{ width: 140 }}>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sort}
            onClick={() => {
              handleClose()
              onSort(option.value);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
