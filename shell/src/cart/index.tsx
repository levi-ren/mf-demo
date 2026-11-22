import {
  FETCH_CART,
  queryClient,
  UPDATE_CART,
  useAuthUser,
  type Cart as CartType,
  type Product,
} from "@mf-demo/shared";
import { useMutation } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { AuthorizedGuard } from "../route-guards/sign-in-guard";

const CartPage = lazy(() =>
  import("cart/cart-page").catch(() => ({
    default: () => <p>Failed to load component</p>,
  })),
);

const mutateCart = (id: number, cart: CartType) =>
  fetch(`https://fakestoreapi.com/carts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  }).then<CartType>((response) => {
    if (!response.ok) {
      throw new Error("Invalid parameters");
    }
    return response.json();
  });

const Content = () => {
  const userId = useAuthUser()?.id;
  const { mutate, isPending } = useMutation<CartType, Error, Product[]>({
    mutationKey: [UPDATE_CART],
    mutationFn: (products) => {
      if (!userId) {
        throw new Error("Unauthorized action");
      }
      return mutateCart(userId, { id: 1, userId: userId, products });
    },
    onSuccess: (cart) => queryClient.setQueryData([FETCH_CART, userId], cart),
  });
  return (
    <>
      <Suspense fallback="Loading cart...">
        <CartPage mutate={mutate} isMutating={isPending} />
      </Suspense>
    </>
  );
};

export default function Cart() {
  return (
    <AuthorizedGuard>
      <Content />
    </AuthorizedGuard>
  );
}
