import { Helmet } from 'react-helmet-async';

import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> 403 Permission Denied!</title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
