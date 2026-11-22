import { RoutePaths, useAuthUser } from "@mf-demo/shared";
import { lazy, Suspense } from "react";
import { Link, Outlet } from "react-router";

const CartButton = lazy(() =>
  import("cart/cart-button")
    .then((e) => ({ default: e.CartButton }))
    .catch(() => ({
      default: () => <p>Failed to load component</p>,
    })),
);
const CartButtonLoader = lazy(() =>
  import("cart/cart-button")
    .then((e) => ({ default: e.CartButtonLoader }))
    .catch(() => ({
      default: () => <p>Failed to load component</p>,
    })),
);

const CartIconComp = () => {
  const auth = useAuthUser();

  if (auth) {
    return <CartButton />;
  }

  return null;
};

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

export const Layout = () => {
  return (
    <>
      <header className="px-4 py-6 shadow ">
        <div className="container m-auto flex items-center gap-4">
          <Link
            to={RoutePaths.Home}
            className="aspect-square w-10 flex items-center justify-center font-medium shadow-md bg-sky-600 text-white rounded-full text-lg mr-auto"
          >
            MF
          </Link>
          <Suspense fallback={<CartButtonLoader />}>
            <CartIconComp />
          </Suspense>
          <SignInButton />
        </div>
      </header>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <footer className="px-4 py-20 bg-sky-600 ">
        <div className="container m-auto text-white text-center gap-4 text-xs flex flex-col md:flex-row items-center">
          <Link
            to={RoutePaths.Home}
            className="aspect-square w-10 flex items-center justify-center font-medium shadow-md bg-white text-sky-600 rounded-full text-lg mx-auto md:mx-0"
          >
            MF
          </Link>
          <p className="underline underline-offset-8">About us</p>
          <p className="underline underline-offset-8">Contact</p>
          <p className="underline underline-offset-8">Privacy Notice</p>
          <p className="underline underline-offset-8">Terms & Condition</p>
          <p className="text-base md:ml-auto">
            Property of MF Corp | Copyright @ 2026
          </p>
        </div>
      </footer>
    </>
  );
};

export const HeadlessLayout = () => {
  return <Outlet />;
};
