import ProductList from "./product-list";

function App() {
  return (
    <ProductList
      authCb={() => alert("auth")}
      unAuthCb={() => alert("unauth")}
    />
  );
}

export default App;
