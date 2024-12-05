import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signIn } from "../auth";

export default async function SignIn() {
  const session = await auth();
  console.log(session);

  // if the user is already signed in, redirect them to the profile page
  if (session) {
    redirect("/profile");
  }

  async function handleSignInWithGitHub() {
    "use server";

    await signIn("github", {
      redirectTo: "/posts",
    });
  }
  async function handleSignInWithGoogle() {
    "use server";

    await signIn("google", {
      redirectTo: "/posts",
    });
  }

  return (
    <main id="sign-in-page" className="page">
      <section className="container">
        <h1>Log ind</h1>
        <form className="form-providers">
          <button
            type="button"
            className="btn-github"
            onClick={handleSignInWithGitHub}
          >
            Log ind med GitHub
          </button>
          <button
            type="button"
            className="btn-google"
            onClick={handleSignInWithGoogle}
          >
            Log ind med Google
          </button>
          <Link href="/sign-in/email" className="btn-email">
            <button type="button">Log ind med e-mail</button>
          </Link>
        </form>
      </section>
    </main>
  );
}
