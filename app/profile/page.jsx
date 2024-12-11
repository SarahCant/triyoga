import { auth, signOut } from "../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getWeekNumber } from "../components/CalculateWeekNumber";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${session.fbUid}.json`;
  const response = await fetch(url, { cache: "no-store" });
  const user = await response.json();

  //fetch booked teams to display later
  let bookedTeams = [];
  if (user.booked) {
    const teamIds = user.booked.split(",").map((id) => id.trim()); //split and trim users booked value to get the individual bookings

    const teamFetchPromises = teamIds.map(async (teamId) => {
      const teamResponse = await fetch(
        `${process.env.NEXT_PUBLIC_FB_DB_URL}/teams/${teamId}.json`
      );
      if (teamResponse.ok) {
        return await teamResponse.json();
      }
      return null;
    });

    bookedTeams = await Promise.all(teamFetchPromises);
  }

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

  //handle sign out
  async function handleSignOut() {
    "use server";
    await signOut();
    redirect("/");
  }

  //capitalize the first letter of team.day
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <main className="md:pt-10">
      <h1 className="mb-8">Min profil</h1>
      <div className="border-x-8 border-[color:--main] md:mx-20">
        <div className="bg-[color:#F9DDC3] p-2 border-x-8 border-[color:#769975]">
          <p className="leading-7">
            <strong>Velkommen til {user.firstname}</strong>, <br />
            &quot;Min Profil&quot; er ikke helt færdig endnu - men vi takker dig
            for din interesse! Her vil du kunne danne dig et overblik over
            tilmeldte hold, redigere i dine tilmeldinger og opdatere dine
            kontaktinformationer. <br />
            Indtil da kan du se din holdoversigt, logge ud eller eventuelt
            navigere dig frem til en af de følgende sider:
          </p>
        </div>
      </div>

      {/* display booked teams */}
      <div className="pt-8">
        <h3>Tilmeldte hold:</h3>
        {bookedTeams.length > 0 ? (
          <p>
            {bookedTeams.map((team, index) =>
              team ? (
                <p key={index}>
                  <strong>{team.name}: </strong>
                  {capitalizeFirstLetter(team.day)}e kl. {team.startTime} -{" "}
                  {team.endTime}, uge {getWeekNumber(team.startDate)}-
                  {getWeekNumber(team.endDate)}. {team.niveau}.
                </p>
              ) : null
            )}
          </p>
        ) : (
          <p>Du har ikke tilmeldt dig nogen hold endnu.</p>
        )}
      </div>

      <div className="pt-8 flex justify-center gap-6">
        <button className="btns btn-cancel" onClick={handleSignOut}>
          Log ud
        </button>
        <Link href="/">
          <button className="btns">Forside</button>
        </Link>
      </div>
    </main>
  );
}
