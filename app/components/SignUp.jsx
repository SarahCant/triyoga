"use client";

//import { useState } from "react";
//import { createUserWithEmailAndPassword } from "firebase/auth";
//import { auth } from "../firebase-config";
import { useActionState, signUpAction } from "react";
import { useState, useEffect } from "react";

export default function SignUp({ signUpAction }) {
  //const [errorMessage, setErrorMessage] = useState("");
  const [state, formAction] = useActionState(signUpAction, {});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    switch (name) {
      case "firstname":
      case "lastname":
        newValue = value.replace(/[^a-zA-ZæøåÆØÅ\s]/g, "");
        break;
      case "phone":
        newValue = value.replace(/\D/g, "").slice(0, 8);
        break;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    const isValid =
      formData.firstname.trim() !== "" &&
      formData.lastname.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      (formData.phone === "" || formData.phone.length === 8) &&
      setIsFormValid(isValid);
  }, [formData]);

  const handleSubmit = (e) => {
    if (!isFormValid) {
      e.preventDefault();
      alert("Venligst udfyld alle felter korrekt.");
    }
  };

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
      <form id="sign-up-form" action={formAction} onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mt-5 md:gap-16 md:flex-row md:items-start md:justify-center">
          <div>
            <div className="flex flex-col pb-5">
              <label htmlFor="firstname" className="mb-2">
                Skriv dit fornavn:*
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Fornavn"
                required
                onChange={handleInputChange}
                className="pl-3 rounded-3xl border-solid border-x border-y border-black h-8 w-72"
              />
            </div>
            <div className="flex flex-col pb-5">
              <label htmlFor="last-name" className="mb-2">
                Skriv dit efternavn:*
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Efternavn"
                required
                onChange={handleInputChange}
                className="pl-3 rounded-3xl border-solid border-x border-y border-black h-8 w-72"
              />
            </div>
            <div className="flex flex-col pb-5">
              <label htmlFor="email" className="mb-2">
                Skriv din e-mail:*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={state?.email}
                placeholder="E-mail"
                required
                autoComplete="off"
                className={`pl-3 rounded-3xl border border-black h-8 w-72 ${
                  state.message ? "error" : ""
                }`}
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col pb-5">
              <label htmlFor="phone" className="mb-2">
                Skriv dit telefonnummer:
              </label>
              <input
                type="tel"
                id="phone"
                name="last-name"
                placeholder="Telefonnummer"
                onChange={handleInputChange}
                className="pl-3 rounded-3xl border-solid border-x border-y border-black h-8 w-72"
              />
            </div>
            <div className="flex flex-col pb-5">
              <label htmlFor="password" className="mb-2">
                Skriv en adgangskode:*
              </label>
              <input
                type="password"
                id="password"
                name="password"
                aria-label="password"
                placeholder="Adgangskode"
                autoComplete="current-password"
                required
                className="pl-3 rounded-3xl border-solid border-x border-y border-black h-8 w-72"
              />
            </div>
            <div className="flex flex-col">
              <div className="py-1">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  value="Nyhedsbrev"
                ></input>
                <label htmlFor="newsletter" className="pl-2">
                  Tilmeld nyhedsbrev
                </label>
              </div>
              <div className="py-1">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  value="Nyhedsbrev"
                ></input>
                <label htmlFor="newsletter" className="pl-2">
                  Acceptér <span className="underline">betingelser</span>*
                </label>
              </div>
              <div className="flex justify-center pt-5 md:justify-end">
                <button
                  type="submit"
                  className="btns mt-2"
                  disabled={!isFormValid}
                >
                  Opret profil
                </button>
              </div>
            </div>
          </div>
        </div>

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

        {state?.message && <p className="error-message">{state.message}</p>}
      </form>
    </section>
  );
}
