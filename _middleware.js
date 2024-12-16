//SARAH
import { getSession } from "next-auth/react";

export async function middleware(req) {
  const session = await getSession({ req });

  //if no session exists, redirect to sign-in page
  if (!session) {
    return Response.redirect(new URL("/sign-in", req.url));
  }

  //allow user to continue if they are authenticated
  return Response.next();
}
