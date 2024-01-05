export const publicRoutes = [
  "/",
  "/verify-email",
  "/new-password",
  "/reset-password",
];

export const authRoutes = ["/login", "/signup"];

// we'll make sure auth api route is always public.
export const apiRoute = "/api/auth";

// redirect users to this path after login
export const DEFAULT_LOGIN_REDIRECT = "/users";
