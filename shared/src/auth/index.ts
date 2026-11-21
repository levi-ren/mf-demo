import { skipToken, useQuery } from "@tanstack/react-query";
import { LOGIN_USER } from "../constants";
import { useAuthContext } from "../context";

type User = {
  address: {
    geolocation: {
      lat: string;
      long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
};

const fetchUser = (id: number) =>
  fetch(`https://fakestoreapi.com/users/${id}`).then<User>((response) =>
    response.json(),
  );

const useAuth = (select?: (data?: User) => User | undefined) => {
  const { session } = useAuthContext();
  return useQuery<User | undefined>({
    queryKey: [LOGIN_USER, session?.id],
    queryFn: !!session ? () => fetchUser(session.id) : skipToken,
    select,
  });
};

export const useIsAuthenticated = () => !!useAuth((user) => user).data;
export const useAuthUser = () => useAuth((user) => user).data;
