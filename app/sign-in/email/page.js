import { redirect } from "next/navigation";
import { auth, signIn } from "../../auth";
import Link from "next/link";
import SignInForm from "@/app/components/SignInForm";
import Image from "next/image";

export default async function SignIn() {
  const session = await auth();
  // if the user is already signed in, redirect them to the profile page
  if (session) {
    redirect("/profile");
  }

  async function handleSignInWithEmailAndPassword(currentState, formData) {
    "use server";
    try {
      console.log("handleSignInWithEmailAndPassword", formData);
      const email = formData.get("email");
      const password = formData.get("password");
      console.log(email, password);

      await signIn("credentials", { email, password });
    } catch (error) {
      console.log(error);

      return {
        message: "Ikke rigtig e-mail eller password",
        email: formData.get("email"),
      };
    }
  }

  return (
    <main id="sign-in-page" className="page">
      <Link href="/sign-in">
        <div className="flex mt-36">
          <Image
            src="/img/icons/arrow-green.png"
            height={30}
            width={30}
            alt="Pil tilbage"
            className="mr-2"
          />
          <p className="text-[color:--main] text-base">Tilbage</p>
        </div>
      </Link>
      <section className="my-8">
        <h1>Log ind</h1>
        <SignInForm signInAction={handleSignInWithEmailAndPassword} />
        <div className="text-center underline">
          <p className="pb-3">Glemt adgangskode</p>
          <p>
            <Link href="/sign-up">Opret profil</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
