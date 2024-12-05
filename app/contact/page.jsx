/* import Link from "next/link";
//import { auth, signIn } from "../auth";

export default async function Contact() {
  const session = await auth;
  console.log("session", session);

  async function handleSignInWithMailPassword(formData) {
    "use server";

    await signIn("credentials", {
      redirectTo: "/profile",
    });
  }

  return (
    <main>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="text-5xl text-">Sign in</h1>
          <p className="text-center sm:text-left text-[#333] dark:text-[#ccc] max-w-[30ch]">
            Sign in with your mail account. You can view this page without being
            signed in.
          </p>

          {!session ? (
            <form action={handleSignInWithMailPassword}>
              <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
                Sign In with mail
              </button>
            </form>
          ) : (
            <Link
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="/profile"
            >
              You are signed in. Go to Protected Page
            </Link>
          )}
        </main>
      </div>
    </main>
  );
}
 */

"use client";
import { useState } from "react";
import PopUp from "../components/PopUp";

export default function Contact() {
  const [showPopUp, setShowPopUp] = useState(false);

  const handleOpen = () => {
    setShowPopUp(true);
  };

  const handleClose = () => {
    setShowPopUp(false);
  };

  return (
    <main>
      <h1>Kontakt</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <div className="">
        <button className="btns" onClick={handleOpen}>
          Prøv
        </button>
        {showPopUp && (
          <PopUp
            onClose={handleClose}
            popUpContent="Dette er indholdet af popuppen."
          />
        )}
      </div>
    </main>
  );
}
