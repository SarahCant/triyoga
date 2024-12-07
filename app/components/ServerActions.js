"use server";

import { redirect } from "next/navigation";
import { signOut } from "../auth";

export async function handleSignOut() {
  await signOut();
  redirect("/");
}

export async function handleSaveUser(formData, fbUid) {
  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${fbUid}.json`;
  const firstname = formData.get("firstname");
  const title = formData.get("title");

  const response = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify({ firstname, title }),
  });

  if (response.ok) {
    redirect("/profile");
  }
}
