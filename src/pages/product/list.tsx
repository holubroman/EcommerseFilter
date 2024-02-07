import { Helmet } from 'react-helmet-async';

import ProdcutListView from 'src/sections/product/product-list-view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Product List | Wardiere </title>
      </Helmet>

      <ProdcutListView />
    </>
  );
}
