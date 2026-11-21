import { RoutePaths, useAuthUser } from "@mf-demo/shared";
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

const Home = () => {
  const navigate = useNavigate();
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
            authCb={() => alert("Add to cart")}
            unAuthCb={() => navigate(RoutePaths.SignIn)}
          />
        </Suspense>
      </main>
    </>
  );
};

export default Home;
