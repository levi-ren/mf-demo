import { FETCH_CART, useAuthContext } from "@mf-demo/shared";
import { skipToken, useQuery } from "@tanstack/react-query";

type FetchCartResponse = {
  id: number;
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
};

const fetchCart = (id: number) =>
  fetch(`https://fakestoreapi.com/carts/${id}`).then<FetchCartResponse>(
    (response) => response.json(),
  );

const useCart = <T = FetchCartResponse>(
  select?: (data: FetchCartResponse) => T,
) => {
  const userId = useAuthContext().session?.id;
  return useQuery({
    queryKey: [FETCH_CART, userId],
    queryFn: userId ? () => fetchCart(userId) : skipToken,
    select,
  });
};

export const useCartProducts = () =>
  useCart((data) => data.products).data || [];

export const useCartTotalItemCount = () =>
  useCartProducts().reduce((prev, curr) => {
    return prev + curr.quantity;
  }, 0);

export const useCartIds = () =>
  useCart((data) => ({ id: data.id, userId: data.userId })).data;

export const useCartStatus = () => useCart().isLoading;
