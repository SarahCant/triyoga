"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase-config";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");

  function handleSignIn(event) {
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
  }

  return (
    <section id="sign-in">
      <h1>Log ind</h1>
      <form id="sign-in-form" onSubmit={handleSignIn}>
        <label htmlFor="mail">Mail</label>
        <input
          type="email"
          id="mail"
          name="mail"
          aria-label="mail"
          placeholder="Skriv din mail..."
          required
        />

        <label htmlFor="password">Adgangskode</label>
        <input
          type="password"
          id="password"
          aria-label="password"
          placeholder="Skriv din adgangskode..."
          autoComplete="cuttent-password"
        />

        <div className="error-message">
          <p>{errorMessage}</p>
        </div>

        <div className="btns">
          <button>Log ind</button>
        </div>
      </form>

      {/* knap til opret bruger/tilbage knap */}
    </section>
  );
}
