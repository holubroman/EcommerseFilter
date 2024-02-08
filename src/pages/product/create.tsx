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

      <Stack
        height={500}
        justifyContent="center"
        alignItems="center"
        sx={{ bgcolor: 'white', py: 5, boxShadow: 2, borderRadius: 2 }}
      >
        <Typography variant="h4" gutterBottom>
          Create Product Page
        </Typography>
        <Typography variant="body2" gutterBottom>
          This page is designed for admin users only
        </Typography>
        <Button variant="contained" href="/" sx={{ mt: 5 }}>
          Back Home
        </Button>
      </Stack>
    </RoleBasedGuard>
  );
}
