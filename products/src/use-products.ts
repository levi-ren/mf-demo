import { FETCH_PRODUCTS, type Product } from "@mf-demo/shared";
import { useQuery } from "@tanstack/react-query";

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

export const useProductCategories = () => {
  const categories = useAllProducts()
    .reduce<Set<string>>((prev, curr) => {
      if (prev.has(curr.category)) {
        return prev;
      }
      return prev.add(curr.category);
    }, new Set())
    .values();

  return Array.from(categories);
};

export const useFetchProductStatus = () => {
  const { isLoading } = useProducts();

  return isLoading;
};
