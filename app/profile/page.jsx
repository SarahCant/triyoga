import { redirect } from "next/navigation";
import { auth, signOut } from "../auth";
import FormUserProfile from "../components/FormUserProfile";

export default async function Profile() {
  const session = await auth();
  console.log("session", session);
  if (!session) {
    redirect("/sign-in");
  }

  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${session.fbUid}.json`;
  const response = await fetch(url);
  const user = await response.json();

  async function handleSignOut() {
    "use server";
    await signOut();
    redirect("/");
  }

  async function handleSaveUser(formData) {
    "use server";
    const name = formData.get("firstname");
    const title = formData.get("title");
    const image = formData.get("image");

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ name, title, image }),
    });
    if (response.ok) {
      redirect("/profile");
    }
  }

  return (
    <main className="page">
      <div className="container">
        <h1>Min profil</h1>
        <FormUserProfile action={handleSaveUser} user={user} />
        <div className="btns">
          <button className="btn-cancel" onClick={handleSignOut}>
            Log ud
          </button>
        </div>
      </div>
    </main>
  );
}
