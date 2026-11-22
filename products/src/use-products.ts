import { useAllProducts } from "@mf-demo/shared";

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
