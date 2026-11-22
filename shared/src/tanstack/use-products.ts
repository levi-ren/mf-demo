import { useQuery } from "@tanstack/react-query";
import { FETCH_PRODUCTS } from "../constants";
import { Product } from "../types";

const fetchProducts = () =>
  fetch("https://fakestoreapi.com/products").then<Product[]>((response) =>
    response.json(),
  );

const useProducts = <T = Product[]>(select?: (data: Product[]) => T) =>
  useQuery({
    queryKey: [FETCH_PRODUCTS],
    queryFn: fetchProducts,
    select: select,
  });

export const useAllProducts = () => {
  return useProducts((products) => products).data || [];
};

export const useFetchProductStatus = () => {
  const { isLoading } = useProducts();

  return isLoading;
};
