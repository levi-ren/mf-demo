declare module "products/product-list" {
  import type { ComponentType } from "react";

  const ProductList: ComponentType<{
    authCb: () => void;
    unAuthCb: () => void;
  }>;

  export default ProductList;
}
