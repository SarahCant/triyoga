import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { createUser, getUserByMail } from "../auth/helpers";
import SignUp from "../components/SignUp";

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
      <section className="container">
        <h1>Opret bruger</h1>
        <SignUp signUpAction={handleSignUpWithEmailAndPassword} />
      </section>
    </main>
  );
}
