import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { createUser, getUserByMail } from "../auth/helpers";
import SignUp from "../components/SignUp";
import Image from "next/image";
import Link from "next/link";

export default async function SignIn() {
  const session = await auth();
  // if the user is already signed in, redirect them to the profile page
  if (session) {
    redirect("/profile");
  }

  async function handleSignUpWithEmailAndPassword(currentState, formData) {
    "use server"; // this code will run on the server only
    // get the form data
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");

    // check if the user already exists in database
    const user = await getUserByMail(email);

    if (user) {
      return {
        message: "Der findes allerede en bruger med denne mail ",
        firstname,
        lastname,
        email,
      };
    }

    // hash the password
    const salt = await bcrypt.genSalt(10); // generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // hash the password

    // create the user
    await createUser({
      firstname,
      lastname,
      email,
      password: hashedPassword, // save the hashed password
    });

    // redirect the user to the sign-in page
    redirect("/sign-in");
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
        <h1>Opret profil</h1>
        <SignUp signUpAction={handleSignUpWithEmailAndPassword} />
      </section>
    </main>
  );
}
