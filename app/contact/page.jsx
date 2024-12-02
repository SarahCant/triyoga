import { auth, signIn } from "../auth";
import SignIn from "../components/SignIn";
import Link from "next/link";

export default async function Contact() {
  const session = await auth();
  console.log("session", session);

  async function handleSignInWithMailPassword(formData) {
    "use server";

    await signIn("mailpassword", {
      redirectTo: "/protected",
    });
  }
  return (
    <main>
      <h1>du fik logget ind</h1>

      {!session ? (
        <SignIn />
      ) : (
        <Link
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          href="/protected"
        >
          You are signed in. Go to Protected Page
        </Link>
      )}
    </main>
  );
}
