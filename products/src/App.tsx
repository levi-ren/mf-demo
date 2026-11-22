import {
  ADD_TO_CART,
  LOGIN_USER,
  queryClient,
  useAuthUser,
  type Cart,
  type Product,
} from "@mf-demo/shared";
import { useMutation } from "@tanstack/react-query";
import ProductList from "./product-list";

const mutateCart = (cart: Cart) =>
  fetch("https://fakestoreapi.com/carts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  }).then<Cart>((response) => {
    if (!response.ok) {
      throw new Error("Invalid parameters");
    }
    return response.json();
  });

queryClient.setQueryData([LOGIN_USER, 1], {
  address: {
    geolocation: { lat: "-37.3159", long: "81.1496" },
    city: "kilcoole",
    street: "new road",
    number: 7682,
    zipcode: "12926-3874",
  },
  id: 1,
  email: "john@gmail.com",
  username: "johnd",
  password: "m38rmF$",
  name: { firstname: "john", lastname: "doe" },
  phone: "1-570-236-7033",
});

function App() {
  const userId = useAuthUser()?.id;
  const { mutate } = useMutation<Cart, Error, Product>({
    mutationKey: [ADD_TO_CART],
    mutationFn: (product) =>
      mutateCart({ id: 1, userId: userId || 1, products: [product] }),
    onSuccess: () => alert(`Added to cart`),
  });
  return <ProductList authCb={mutate} unAuthCb={() => alert("unauth")} />;
}

export default App;
