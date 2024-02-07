import { useDispatch } from 'react-redux';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useActiveUser } from 'src/hooks/use-user';
import { useOffSetTop } from 'src/hooks/use-off-set-top';

import { bgBlur } from 'src/theme/css';
import { logout } from 'src/store/auth.slice';
import { customShadows } from 'src/theme/custom-shadows';

import Logo from 'src/components/logo';

import { HEADER } from '../config-layout';
import Label from '../../components/label';

// ----------------------------------------------------------------------

export default function HeaderSimple() {
  const theme = useTheme();

  const { authenticated, isAdmin } = useActiveUser();

  const dispatch = useDispatch();

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  const renderHeader = (
    <Label variant="soft" color={(isAdmin && 'info') || 'default'}>
      {isAdmin ? 'Admin' : 'User'}
    </Label>
  );

  return (
    <AppBar>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          boxShadow: customShadows().z1,
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.paper,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Logo />

        <Stack direction="row" alignItems="center" spacing={1}>

          {authenticated ? (
            <>
              {renderHeader}
              <Link
                component={Button} onClick={() => dispatch(logout())}
                color="inherit"
                sx={{ typography: 'subtitle2' }}>
                Logout
              </Link>
            </>
          ) : (
            <Link
              component={RouterLink}
              href={paths.auth.login}
              color="inherit"
              sx={{ typography: 'subtitle2' }}>
              Login
            </Link>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
