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

const fetchUser = (id: number, cb: () => void) =>
  fetch(`https://fakestoreapi.com/users/${id}`)
    .then<User>((response) => response.json())
    .then((e) => {
      cb();
      return e;
    });

const useAuth = (select?: (data?: User) => User | undefined) => {
  const { session, setSession } = useAuthContext();
  return useQuery<User | undefined>({
    queryKey: [LOGIN_USER, session?.id],
    queryFn: !!session
      ? () =>
          fetchUser(session.id, () =>
            setSession({ ...session, isAuthenticated: true }),
          )
      : skipToken,
    select,
  });
};

export const useIsAuthenticated = () => !!useAuth((user) => user).data;
export const useAuthUser = () => useAuth((user) => user).data;
