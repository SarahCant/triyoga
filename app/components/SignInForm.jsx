"use client";

/* import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase-config"; */
import { useActionState } from "react";

export default function SignInForm({ signInAction }) {
  const [state, formAction] = useActionState(signInAction, {});
  //const [errorMessage, setErrorMessage] = useState("");

  /* function handleSignIn(event) {
    event.preventDefault();
    const mail = event.target.mail.value;
    const password = event.target.password.value;

    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        let code = error.code;
        console.log(code);
        code = code.replaceAll("-", " ");
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  } */

  return (
    <section id="sign-in">
      <h1>Log ind</h1>
      <form id="sign-in-form" action={formAction}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={state?.email}
          placeholder="Skriv din mail..."
          required
        />

        <label htmlFor="password">Adgangskode</label>
        <input
          type="password"
          id="password"
          placeholder="Skriv din adgangskode..."
          name="password"
        />

        <button type="submit">Log ind</button>

        {state?.message && <p className="error-message">{state.message}</p>}
      </form>

      {/* knap til opret bruger/tilbage knap */}
    </section>
  );
}
