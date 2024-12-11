import { getSession } from "next-auth/react";

export async function middleware(req) {
  const session = await getSession({ req });

  // If no session exists, redirect to the sign-in page
  if (!session) {
    return Response.redirect(new URL("/sign-in", req.url));
  }

  // Allow the user to continue if they are authenticated
  return Response.next();
}
