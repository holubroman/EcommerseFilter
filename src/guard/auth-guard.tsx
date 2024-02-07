import { useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthUserType } from '../store/types';
import { useActiveUser } from '../hooks/use-user';

const loginPaths: Record<string, string> = {
  supabase: paths.auth.login,
};

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { loading } = useSelector((state: AuthUserType) => state?.auth);

  return <>{loading ? <LoadingScreen /> : <Container>{children}</Container>}</>;
}

function Container({ children }: Props) {
  const router = useRouter();

  const { authenticated } = useActiveUser();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const href = `${loginPaths.supabase}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
