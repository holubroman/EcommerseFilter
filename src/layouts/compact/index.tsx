import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import Footer from './footer';
import Header from './header-simple';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function CompactLayout({ children }: Props) {
  return (
    <>
      <Header />

      <Container component="main">
        <Stack
          sx={{
            pt: 12,
            m: 'auto',
            minHeight: '100vh',
          }}
        >
          {children}
        </Stack>

      </Container>

      <Footer />
    </>
  );
}
