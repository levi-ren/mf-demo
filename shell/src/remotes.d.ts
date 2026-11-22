declare module "products/product-list" {
  import type { Product } from "@mf-demo/shared";
  import type { ComponentType } from "react";

  const ProductList: ComponentType<{
    authCb: (product: Product) => void;
    unAuthCb: () => void;
  }>;

  export default ProductList;
}
