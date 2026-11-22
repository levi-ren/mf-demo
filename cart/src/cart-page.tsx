import {
  formatMoney,
  useAllProducts,
  useFetchProductStatus,
  type Product,
} from "@mf-demo/shared";
import "./index.css";
import {
  useCartProducts,
  useCartStatus,
  useCartTotalItemCount,
} from "./use-cart";

const SHIPPING_FEE = 39.99;
const TAX_RATE = 0.12;
const DISCOUNT = 14.56;

type CartPageProps = {
  mutate: (product: Product[]) => void;
  isMutating: boolean;
};
export default function CartPage({ mutate, isMutating }: CartPageProps) {
  const cartProducts = useCartProducts();
  const isCartLoading = useCartStatus();
  const products = useAllProducts();
  const isProductLoading = useFetchProductStatus();
  const isLoading = isCartLoading || isProductLoading;
  const itemCount = useCartTotalItemCount();

  const productList = cartProducts.map((product) => ({
    ...product,
    ...products.find((p) => p.id === product.productId),
  }));

  const subtotal = productList.reduce((prev, curr) => {
    return prev + curr.quantity * (curr?.price || 0);
  }, 0);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING_FEE + tax - DISCOUNT;

  if (isLoading) {
    return "Loading...";
  }

  return (
    <main className="container m-auto p-4 space-y-4 ">
      <h1 className="text-3xl font-medium">Your Cart</h1>
      <section className="flex gap-4 flex-col lg:flex-row">
        <ul className="space-y-6 flex-3">
          {productList.map((product) => (
            <li
              key={product.id}
              className="flex gap-4 rounded shadow p-4 items-center"
            >
              <img
                src={product.image}
                width={75}
                height={75}
                className="aspect-square object-contain"
              />
              <div>
                <p className="line-clamp-1">{product.title}</p>
                <p className="text-xs capitalize rounded-full py-1 px-2 bg-sky-50 inline-block text-neutral-600">
                  {product.category}
                </p>
                <p>{formatMoney(product?.price || 0)}</p>
              </div>
              <div className="ml-auto space-x-2 shrink-0">
                <button
                  className="rounded-full aspect-square w-6 shadow-md text-center cursor-pointer hover:bg-rose-600 hover:text-white transition-colors disabled:bg-neutral-300 disabled:text-white disabled:shadow-xs"
                  disabled={isMutating}
                  onClick={() => {
                    const d = productList.map((p) =>
                      p.id === product.productId
                        ? { ...p, quantity: p.quantity - 1 }
                        : p,
                    );
                    mutate(d as Product[]);
                  }}
                >
                  -
                </button>
                <input
                  readOnly
                  value={product.quantity}
                  className="max-w-5 text-center"
                />
                <button
                  className="rounded-full aspect-square w-6 shadow-md text-center cursor-pointer hover:bg-emerald-600 hover:text-white transition-colors disabled:bg-neutral-300 disabled:text-white disabled:shadow-xs"
                  disabled={isMutating}
                  onClick={() => {
                    const d = productList.map((p) =>
                      p.id === product.productId
                        ? { ...p, quantity: p.quantity + 1 }
                        : p,
                    );
                    mutate(d as Product[]);
                  }}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <aside className="p-4 flex-1 shadow-lg rounded space-y-4">
          <div className="flex items-center gap-x-4 justify-between">
            <div>
              <p className="font-semibold text-lg">Order Summary</p>
              <p className="text-neutral-500 text-sm ">
                Total items: {itemCount}
              </p>
            </div>
            <button className="cursor-pointer text-sm px-2 py-1  text-amber-400 font-medium underline underline-offset-4">
              Add Items
            </button>
          </div>
          <div className="shadow border-b border-neutral-300 " />
          <div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Subtotal:</p>
              <p className="font-semibold">{formatMoney(subtotal)}</p>
            </div>
            <ul className="px-2 text-[10px] text-neutral-400 font-bold ">
              {productList.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center justify-between gap-x-2 "
                >
                  <p className="line-clamp-1">
                    {product.quantity}x - {product.title}
                  </p>
                  <span>
                    {formatMoney(product.quantity * (product?.price || 0))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Shipping fee:</p>
            <p className="font-semibold text-rose-500">
              {formatMoney(SHIPPING_FEE)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Tax (12%):</p>
            <p className="font-semibold text-rose-500">{formatMoney(tax)}</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Discount:</p>
              <p className="text-[10px] text-neutral-400 font-bold px-2">
                PROMO-53 / CASH-DISCOUNT
              </p>
            </div>
            <p className="font-semibold text-emerald-500">
              {formatMoney(DISCOUNT)}
            </p>
          </div>
          <div className="shadow border-b border-neutral-300 " />
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg">Total:</p>
            <p className="font-bold text-emerald-500">{formatMoney(total)}</p>
          </div>
          <div className="shadow border-b border-neutral-300 " />

          <button
            className="w-full text-white bg-sky-600 rounded-full px-4 py-3 shadow-md text-sm cursor-pointer flex items-center gap-x-2 justify-center disabled:bg-neutral-300"
            disabled={isMutating}
          >
            {isMutating && (
              <div className="border-2 border-b-transparent border-white animate-spin h-4 w-4 rounded-full " />
            )}
            Proceed to Checkout
          </button>
          <em className="text-center text-xs text-neutral-400 block font-medium underline underline-offset-8">
            Terms and Conditions apply
          </em>
        </aside>
      </section>
    </main>
  );
}
