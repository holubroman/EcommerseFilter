import { Helmet } from 'react-helmet-async';

import Home from 'src/sections/home';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Home | Wardiere </title>
      </Helmet>

      <Home />
    </>
  );
}
