import { LOGIN_USER, RoutePaths, useAuthContext } from "@mf-demo/shared";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useActionState } from "react";
import { Link } from "react-router";
import { UnauthorizedGuard } from "../route-guards/sign-in-guard";

type FormFields = {
  username: string;
  password: string;
};

type Response = { token: string };

const loginUser = (fields: FormFields) => {
  return fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  }).then<Response>((e) => {
    if (!e.ok) {
      throw new Error("Invalid username or password");
    }
    return e.json();
  });
};

const SignIn = () => {
  const { setSession } = useAuthContext();
  const { mutateAsync } = useMutation<Response, Error, FormFields>({
    mutationKey: [LOGIN_USER],
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { token } = data;

      const decoded = jwtDecode<{ sub: number }>(token);

      setSession({
        token,
        id: decoded.sub,
      });
    },
  });

  const [error, submitAction, isPending] = useActionState(
    async (_: void | string, formData: FormData) => {
      try {
        const username = String(formData.get("username"));
        const password = String(formData.get("password"));

        await mutateAsync({ username, password });
      } catch (error) {
        return error instanceof Error ? error.message : "Something went wrong";
      }
    },
    "",
  );

  return (
    <UnauthorizedGuard>
      <main className="from-amber-400 to-amber-600 bg-linear-to-tr ">
        <section className="max-w-105 ml-auto bg-white ">
          <div className="gap-y-4  shadow-2xl min-h-screen flex flex-col justify-center py-4">
            <Link
              to={RoutePaths.Home}
              className="aspect-square w-20 flex items-center justify-center font-medium shadow-md bg-sky-600 text-white rounded-full text-2xl mx-auto mb-8"
            >
              MF
            </Link>
            <h1 className="text-3xl font-medium  px-4 ">Sign In</h1>
            <h2 className="text-sm text-neutral-500 px-4 ">
              Sign in to your account and start shopping on our endless
              varieties of clothing, electorincs, jewelry and more!
            </h2>
            <div className="shadow-sm border-b border-b-neutral-200" />

            {error && (
              <div className="px-4 py-2">
                <p className="px-4 py-2 rounded border border-red-300 bg-red-100 text-red-500 text-center">
                  {error}
                </p>
              </div>
            )}
            <form className="space-y-4 px-4" action={submitAction}>
              <input
                name="username"
                id="username"
                placeholder="Username"
                className="rounded w-full border border-neutral-200 focus-visible:border-neutral-500 px-4 py-2 transition-colors outline-0 shadow"
                defaultValue="johnd"
              />
              <input
                name="password"
                id="password"
                placeholder="Password"
                className="rounded w-full border border-neutral-200 focus-visible:border-neutral-500 px-4 py-2 transition-colors outline-0 shadow"
                defaultValue="m38rmF$"
              />
              <label className="flex items-center gap-2  text-xs text-neutral-500">
                <input type="checkbox" /> Remember me
              </label>
              <button
                className="shadow rounded-full bg-sky-600 px-4 py-2 text-white hover:shadow-md transition-all flex items-center gap-x-2 disabled:bg-neutral-300 w-full justify-center"
                disabled={isPending}
              >
                {isPending && (
                  <span className="border-2 border-b-transparent animate-spin w-4 h-4 rounded-full" />
                )}
                Sign In
              </button>
            </form>
          </div>
        </section>
      </main>
    </UnauthorizedGuard>
  );
};

export default SignIn;
