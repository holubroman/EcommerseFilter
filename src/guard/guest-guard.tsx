import { useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthUserType } from '../store/types';
import { useActiveUser } from '../hooks/use-user';

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const { loading } = useSelector((state: AuthUserType) => state?.auth);

  return <>{loading ? <LoadingScreen /> : <Container>{children}</Container>}</>;
}

function Container({ children }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || paths.root;

  const { authenticated } = useActiveUser();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(returnTo);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
