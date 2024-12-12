//FUNCTIONALITY: SARAH + SOFIE
//STYLING: SOFIE
"use client";

import { useActionState, signUpAction } from "react";

export default function SignUp({ signUpAction }) {
  const [state, formAction] = useActionState(signUpAction, {});
  return (
    <section id="sign-up" className="page">
      <form id="sign-up-form" action={formAction}>
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
                pattern="[a-zA-ZæøåÆØÅ]+"
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
                pattern="[a-zA-ZæøåÆØÅ]+"
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
                className="pl-3 rounded-3xl border border-black h-8 w-72"
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
                pattern="[0-9]+"
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
                  id="conditions"
                  name="conditions"
                  value="Betingelser"
                  required
                ></input>
                <label htmlFor="conditions" className="pl-2">
                  Acceptér <span className="underline">betingelser</span>*
                </label>
              </div>
              <div className="flex justify-center pt-5 md:justify-end">
                <button type="submit" className="btns mt-2">
                  Opret profil
                </button>
              </div>
            </div>
          </div>
        </div>

        {state?.message && <p className="error-message">{state.message}</p>}
      </form>
    </section>
  );
}
