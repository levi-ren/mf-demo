import {
  ADD_TO_CART,
  RoutePaths,
  useAuthUser,
  type Product,
} from "@mf-demo/shared";
import { useMutation } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router";

const ProductList = lazy(() =>
  import("products/product-list").catch(() => ({
    default: () => <p>Failed to load component</p>,
  })),
);

const SignInButton = () => {
  const auth = useAuthUser();

  if (auth) {
    return (
      <button className="aspect-square w-10 flex items-center justify-center text-lg font-medium shadow-md bg-sky-600 text-white rounded-full cursor-pointer uppercase">
        {auth.name.firstname[0]}
        {auth.name.lastname[0]}
      </button>
    );
  }
  return (
    <Link
      to={RoutePaths.SignIn}
      className="shadow rounded-full bg-sky-600 px-4 py-2 text-white hover:shadow-md transition-shadow"
    >
      Login/Sign-up
    </Link>
  );
};

type MutateCartResponse = {
  id: number;
  userId: number;
  products: Product[];
};

type MutateCartPayload = {
  id: number;
  userId: number;
  products: Product[];
};

const mutateCart = (cart: MutateCartPayload) =>
  fetch("https://fakestoreapi.com/carts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  }).then<MutateCartResponse>((response) => {
    if (!response.ok) {
      throw new Error("Invalid parameters");
    }
    return response.json();
  });

const Home = () => {
  const navigate = useNavigate();
  const userId = useAuthUser()?.id;
  const { mutate } = useMutation<MutateCartResponse, Error, Product>({
    mutationKey: [ADD_TO_CART],
    mutationFn: (product) => {
      if (!userId) {
        throw new Error("Unauthorized action");
      }
      return mutateCart({ id: 1, userId: userId, products: [product] });
    },
    onSuccess: () => alert(`Added to cart`),
  });
  return (
    <>
      <header className="px-4 py-6 shadow ">
        <div className="container m-auto flex items-center justify-between">
          <h1 className="text-3xl">MF</h1>
          <SignInButton />
        </div>
      </header>
      <main className="py-8 px-4">
        <Suspense fallback="Loading products...">
          <ProductList
            authCb={mutate}
            unAuthCb={() => navigate(RoutePaths.SignIn)}
          />
        </Suspense>
      </main>
    </>
  );
};

export default Home;
