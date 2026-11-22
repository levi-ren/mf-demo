import {
  ADD_TO_CART,
  FETCH_CART,
  queryClient,
  RoutePaths,
  useAuthUser,
  type Cart,
  type Product,
} from "@mf-demo/shared";
import { useMutation } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { useNavigate } from "react-router";

const ProductList = lazy(() =>
  import("products/product-list").catch(() => ({
    default: () => <p>Failed to load component</p>,
  })),
);

const mutateCart = (cart: Cart) =>
  fetch("https://fakestoreapi.com/carts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  }).then<Cart>((response) => {
    if (!response.ok) {
      throw new Error("Invalid parameters");
    }
    return response.json();
  });

const Home = () => {
  const navigate = useNavigate();
  const userId = useAuthUser()?.id;
  const { mutate } = useMutation<Cart, Error, Product>({
    mutationKey: [ADD_TO_CART],
    mutationFn: (product) => {
      const currentCart = structuredClone(
        queryClient.getQueryData<Cart>([FETCH_CART, userId]),
      );

      if (!userId || !currentCart) {
        throw new Error("Unauthorized action");
      }
      const item = currentCart.products.findIndex(
        (p) => p.productId === product.id,
      );
      if (item > -1) {
        currentCart.products[item].quantity! += 1;
      } else {
        currentCart.products.push({
          productId: product.id,
          quantity: 1,
        } as Product);
      }
      return mutateCart({
        id: 1,
        userId: userId,
        products: currentCart.products,
      });
    },
    onSuccess: (cart) => queryClient.setQueryData([FETCH_CART, userId], cart),
  });
  return (
    <main className="py-8 px-4">
      <Suspense
        fallback={
          <div className="container m-auto ">
            <div className="border-2 border-neutral-400 border-b-transparent rounded-full h-5 w-5 animate-spin m-auto" />
          </div>
        }
      >
        <ProductList
          authCb={mutate}
          unAuthCb={() => navigate(RoutePaths.SignIn)}
        />
      </Suspense>
    </main>
  );
};

export default Home;
