//FUNCTIONALITY: SARAH + SOFIE
//STYLING: SOFIE
"use client";

import { useActionState } from "react";

export default function SignInForm({ signInAction }) {
  const [state, formAction] = useActionState(signInAction, {});

  return (
    <section id="sign-in">
      <form id="sign-in-form" action={formAction}>
        <div className="flex flex-col items-center gap-7 mt-7">
          <div className="flex flex-col md:flex-row md:gap-20">
            <div>
              <label htmlFor="email" className="mb-2">
                Skriv din e-mail:
              </label>
            </div>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={state?.email}
                placeholder="E-mail..."
                required
                className="pl-3 rounded-3xl border-solid border-x border-y border-black h-8 w-72"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-7">
            <div>
              <label htmlFor="password" className="mb-2">
                Skriv din adgangskode:
              </label>
            </div>
            <div>
              <input
                type="password"
                id="password"
                placeholder="Adgangskode..."
                name="password"
                className="pl-3 rounded-3xl border-solid border-x border-y border-black h-8 w-72"
              />
            </div>
          </div>
          <button type="submit" className="btns mt-2 mb-8">
            Log ind
          </button>
        </div>

        {state?.message && <p className="error-message">{state.message}</p>}
      </form>
    </section>
  );
}
