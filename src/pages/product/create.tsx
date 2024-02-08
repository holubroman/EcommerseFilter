import { Helmet } from 'react-helmet-async';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import RoleBasedGuard from 'src/guard/role-based-guard';

export default function Page() {
  return (
    <RoleBasedGuard hasContent roles={['admin']}>
      <Helmet>
        <title> Product Create | Wardiere </title>
      </Helmet>

      <Stack height={500} justifyContent="center" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Create Product Page
        </Typography>
        <Typography variant="h6" gutterBottom>
          Admin Only
        </Typography>
        <Button variant="contained" href="/" sx={{ mt: 5 }}>
          Back Home
        </Button>
      </Stack>
    </RoleBasedGuard>
  );
}
