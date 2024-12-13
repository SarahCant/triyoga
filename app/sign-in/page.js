//FUNCTIONALITY: SARAH + SOFIE
//STYLING: SOFIE

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signIn } from "../auth";

export default async function SignIn() {
  const session = await auth();
  console.log(session);

  // If the user is already signed in, redirect them to the profile page
  if (session) {
    redirect("/profile");
  }

  return (
    <main id="sign-in-page" className="page">
      {/* Log in or create user options */}
      <section className="flex flex-col items-center my-44">
        <h1>Log ind / Opret profil</h1>
        <p className="text-base mt-5 mb-14 text-center">
          For at booke dig på et hold skal du enten logge ind eller oprette en
          profil:
        </p>
        <form>
          <Link href="/sign-in/email" className="btns m-2 md:m-5">
            <button type="button">Log ind</button>
          </Link>
          <Link href="/sign-up" className="btns m-2 md:m-5">
            <button type="button">Opret profil</button>
          </Link>
        </form>
      </section>
    </main>
  );
}
