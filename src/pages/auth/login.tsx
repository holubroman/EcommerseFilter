import { Helmet } from 'react-helmet-async';

import LoginView from 'src/sections/auth/login-view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Login | Wardiere</title>
      </Helmet>

      <LoginView />
    </>
  );
}
