import {
  FETCH_CART,
  queryClient,
  UPDATE_CART,
  useAuthContext,
  type Cart,
  type Product,
} from "@mf-demo/shared";
import { useMutation } from "@tanstack/react-query";
import CartPage from "./cart-page";

const mutateCart = (id: number, cart: Cart) =>
  fetch(`https://fakestoreapi.com/carts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  }).then<Cart>((response) => {
    if (!response.ok) {
      throw new Error("Invalid parameters");
    }
    return response.json();
  });

function App() {
  const userId = useAuthContext().session?.id;
  const { mutate, isPending } = useMutation<Cart, Error, Product[]>({
    mutationKey: [UPDATE_CART],
    mutationFn: (product) =>
      mutateCart(userId || 1, {
        id: 1,
        userId: userId || 1,
        products: product,
      }),
    onSuccess: (cart) => {
      queryClient.setQueryData([FETCH_CART, userId], cart);
    },
  });
  return (
    <>
      {/* <CartButton />
      <CartButtonLoader /> */}
      <CartPage mutate={mutate} isMutating={isPending} />
    </>
  );
}

export default App;
