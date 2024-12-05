"use client";

//import { useState } from "react";
//import { createUserWithEmailAndPassword } from "firebase/auth";
//import { auth } from "../firebase-config";
import { useActionState, signUpAction } from "react";

export default function SignUp({ signUpAction }) {
  //const [errorMessage, setErrorMessage] = useState("");
  const [state, formAction] = useActionState(signUpAction, {});

  /* function handleSignUp(event) {
    event.preventDefault();
    const form = event.target;

    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const mail = form.mail.value;
    const phone = form.phone.value;
    const password = form.password.value;

    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        //create user and sign in
        const user = userCredential.user;
        console.log(user);
        createUser(user.uid, firstname, lastname, mail, phone, password);
      })
      .catch((error) => {
        let code = error.code;
        console.log(code);
        code = code.replaceAll("-", " ");
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }

  async function createUser(uid, firstname, lastname, mail, phone, password) {
    const url = `https://triyoga-bbaf1-default-rtdb.firebaseio.com/users/${uid}.json`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ firstname, lastname, mail, phone, password }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("New user created: ", data);
    } else {
      setErrorMessage("Undskyld, noget gik galt");
    }
  } */

  return (
    <section id="sign-up" className="page">
      <h1>Opret bruger</h1>
      <form id="sign-up-form" action={formAction}>
        <label htmlFor="firstname">Fornavn</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Fornavn"
          required
        />
        <label htmlFor="last-name">Efternavn</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Efternavn"
          required
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={state?.email}
          placeholder="E-mail"
          required
          autoComplete="off"
          className={state.message ? "error" : ""}
        />
        <label htmlFor="phone">Tlf. nr.</label>
        <input type="tel" id="phone" name="last-name" placeholder="Tlf. nr." />

        <label htmlFor="password">Adgangskode</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-label="password"
          placeholder="Adgangskode"
          autoComplete="current-password"
          required
        />

        {/*       <label htmlFor="password">Gentag adgangskode</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-label="password"
          placeholder="Gentag adgangskode"
          autoComplete="current-password"
          required
        /> */}

        {/*   <div className="error-message">
          <p>{errorMessage}</p>
        </div> */}

        <button type="submit">Opret bruger</button>
        {state?.message && <p className="error-message">{state.message}</p>}
      </form>
    </section>
  );
}
