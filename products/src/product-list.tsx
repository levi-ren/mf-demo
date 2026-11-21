import { useAuthContext } from "@mf-demo/shared";
import "./index.css";
import {
  useAllProducts,
  useFetchProductStatus,
  useProductCategories,
} from "./use-products";

const formatMoney = Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
}).format;

type ProductListProps = {
  authCb: () => void;
  unAuthCb: () => void;
};

export default function ProductList({ authCb, unAuthCb }: ProductListProps) {
  const { session } = useAuthContext();
  const products = useAllProducts();
  const isLoading = useFetchProductStatus();
  const categories = useProductCategories();

  if (isLoading) {
    return "Skeleton...";
  }

  return (
    <section className="space-y-4">
      <div className="container m-auto ">
        <h2 className="text-4xl font-medium">Our Products</h2>
        <p className="text-neutral-500 text-sm">
          Showing {products.length} products across {categories.length}{" "}
          categories
        </p>
        <div className="my-8">
          <p className="text-xl mb-4">Categories:</p>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                className="rounded-full shadow px-4 py-2 capitalize text-sm hover:bg-amber-500 transition-colors hover:text-white cursor-pointer min-w-fit"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 container m-auto">
        {products.map((product) => (
          <article
            key={product.id}
            className="shadow-md rounded-xl"
            title={product.title}
          >
            <img
              alt={product.title}
              src={product.image}
              className="aspect-square m-auto object-contain"
              width={200}
              height={200}
            />
            <div className="p-2 border-t border-t-neutral-100 mt-4 space-y-4">
              <div className="flex justify-between gap-10 items-center">
                <h3 className="line-clamp-2 h-12">{product.title}</h3>
                <p className="text-lg font-medium">
                  {formatMoney(product.price)}
                </p>
              </div>
              <h4 className="text-xs capitalize rounded-full py-1 px-2 bg-sky-50 inline-block text-neutral-600">
                {product.category}
              </h4>

              <h5 className="text-sm text-neutral-500 max-h-80 line-clamp-3 px-2 text-justify">
                {product.description}
              </h5>
              <div className="flex gap-2 items-center justify-end">
                <button
                  className="rounded-full px-4 py-2 shadow-md bg-amber-500 text-white text-sm"
                  onClick={() => {
                    if (session?.isAuthenticated) {
                      authCb();
                      return;
                    }

                    unAuthCb();
                  }}
                >
                  Add to Cart
                </button>
                <button className="rounded-full px-4 py-2 shadow-md bg-sky-600 text-white text-sm">
                  Buy Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
