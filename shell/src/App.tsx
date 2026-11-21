import { lazy, Suspense } from "react";

const ProductList = lazy(() =>
  import("products/product-list").catch(() => ({
    default: () => <p>Failed to load component</p>,
  })),
);
function App() {
  return (
    <>
      <header className="px-4 py-6 shadow ">
        <div className="container m-auto flex items-center justify-between">
          <h1 className="text-3xl">MF</h1>
          <div className="">
            <button className="shadow rounded-full bg-sky-600 px-4 py-2 text-white hover:shadow-md transition-shadow">
              Login/Sign-up
            </button>
          </div>
        </div>
      </header>
      <main className="py-8 px-4">
        <Suspense fallback="Loading products...">
          <ProductList />
        </Suspense>
      </main>
    </>
  );
}

export default App;
