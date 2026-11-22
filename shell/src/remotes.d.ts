declare module "products/product-list" {
  import type { Product } from "@mf-demo/shared";
  import type { ComponentType } from "react";

  const ProductList: ComponentType<{
    authCb: (product: Product) => void;
    unAuthCb: () => void;
  }>;

  export default ProductList;
}
declare module "cart/cart-button" {
  import type { ComponentType } from "react";

  const CartButton: ComponentType;
  const CartButtonLoader: ComponentType;

  export { CartButton, CartButtonLoader };
}
declare module "cart/cart-page" {
  import type { ComponentType } from "react";

  const CartPage: ComponentType<{
    mutate: (product: Product[]) => void;
    isMutating: boolean;
  }>;

  export default CartPage;
}
