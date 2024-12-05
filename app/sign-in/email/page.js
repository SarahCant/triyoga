import { redirect } from "next/navigation";
import { auth, signIn } from "../../auth";
import Link from "next/link";
import SignInForm from "@/app/components/SignInForm";

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
      <section className="container">
        <h1>Log ind</h1>
        <SignInForm signInAction={handleSignInWithEmailAndPassword} />
        <p className="text-center">
          Har du ikke en profil?
          <Link href="/sign-up">Opret dig her.</Link>
        </p>
      </section>
    </main>
  );
}
