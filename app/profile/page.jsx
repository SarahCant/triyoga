import { auth, signOut } from "../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import FormUserProfile from "../components/FormUserProfile";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${session.fbUid}.json`;
  const response = await fetch(url, { cache: "no-store" });
  const user = await response.json();

  async function handleSaveUser(formData) {
    "use server";
    const firstname = formData.get("firstname");
    const title = formData.get("title");

    const saveResponse = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ firstname, title }),
    });

    if (saveResponse.ok) {
      redirect("/profile");
    }
  }

  async function handleSignOut() {
    "use server";
    await signOut();
    redirect("/");
  }

  return (
    <main className="md:pt-10">
      <h1 className="mb-8">Min profil</h1>
      <div className="border-x-8 border-[color:--main] md:mx-20">
        <div className="bg-[color:#F9DDC3] p-2 border-x-8 border-[color:#769975]">
          <p className="leading-7">
            <strong>Velkommen til {user.firstname}</strong>, <br />
            "Min Profil" er ikke helt færdig endnu - men vi takker dig for din
            interesse! Her vil du kunne danne dig et overblik over tilmeldte
            hold, redigere i dine telmeldinger og opdatere dine
            kontaktinformationer.
          </p>
        </div>
      </div>
      <div className="pt-8 flex justify-center gap-6">
        <button className="btns btn-cancel" onClick={handleSignOut}>
          Log ud
        </button>
        <Link href="/">
          <button className="btns">Forside</button>
        </Link>
      </div>
      {/*  <FormUserProfile /> */}
    </main>
  );
}
