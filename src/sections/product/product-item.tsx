import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { IProductItem } from 'src/types/product';

type Props = {
  product: IProductItem;
};

export default function ProductItem({ product }: Props) {
  const { name, price, stock, discount, image } = product;

  const discountRate = (price / discount) * 100
  return (
    <Card>
      {stock > 10 && (
        <Label sx={{position: 'absolute', top: 10, right: 10}} variant="soft" color='info'>
          <Iconify  icon="foundation:burst-sale" />
        </Label>
      )}
      {discountRate > 100 && (
        <Label sx={{position: 'absolute', top: 10, left: 10}} variant="soft" color='error'>
          <Iconify width={16} icon="iconamoon:discount-fill" />
        </Label>
      )}
      <Stack sx={{ p: 3, pb: 2 }} alignItems='center'>
        <Stack alignItems='center'>
        <Avatar
          alt={name}
          src={image}
          variant="rounded"
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        </Stack>
        <ListItemText
          sx={{ mb: 1 }}
          primary={
            <Typography color="subtitle1">
              {name}
            </Typography>
          }
          secondary={`$${price}`}
          primaryTypographyProps={{
            textAlign: 'center',
            typography: 'subtitle1',
          }}
          secondaryTypographyProps={{
            mt: 1,
            textAlign: 'center',
            typography: 'h6',
          }}
        />
      </Stack>
    </Card>
  );
}
