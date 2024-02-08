import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Theme, SxProps } from '@mui/material/styles';

import { useActiveUser } from '../hooks/use-user';
import { varBounce, MotionContainer } from '../sections/error/animate';

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function RoleBasedGuard({ hasContent, roles, children, sx }: RoleBasedGuardProp) {
  const { isAdmin } = useActiveUser();

  const currentRole = isAdmin && isAdmin ? 'admin' : 'user';

  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', pt: 20, ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Button variant="contained" href="/" sx={{ mt: 5 }}>
            Back Home
          </Button>
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
