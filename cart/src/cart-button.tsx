import { CartIcon, RoutePaths } from "@mf-demo/shared";
import { Link } from "react-router";
import "./index.css";
import { useCartStatus, useCartTotalItemCount } from "./use-cart";

export const CartButton = () => {
  const products = useCartTotalItemCount();
  const isLoading = useCartStatus();

  return (
    <Link
      to={RoutePaths.Cart}
      className="shadow-md rounded-full flex items-center justify-center bg-amber-500 p-2 text-white relative"
    >
      {products > 0 && (
        <>
          <div className="text-xs text-white rounded-full flex items-center justify-center absolute -right-1 top-0 bg-rose-700 aspect-square w-4 z-20">
            {isLoading ? (
              <div className="border border-b-transparent rounded-full border-white animate-spin w-2 aspect-square" />
            ) : (
              products
            )}
          </div>
          <div className="rounded-full absolute -right-0.5 top-0.5 bg-rose-700 aspect-square w-3 animate-ping z-10"></div>
        </>
      )}

      <CartIcon className="w-5 h-5" />
    </Link>
  );
};

export const CartButtonLoader = () => {
  return (
    <button className="shadow-md rounded-full flex items-center justify-center bg-neutral-300 p-2 text-white relative animate-pulse">
      <CartIcon className="w-5 h-5" />
    </button>
  );
};
