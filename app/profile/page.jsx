//SARAH FUNCTIONALITY + GENERAL STYLING
//SOFIE DETAIL STYLING ON MD SCREENS
import { auth, signOut } from "../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getWeekNumber } from "../components/CalculateWeekNumber";

export default async function ProfilePage() {
  const session = await auth();
  //check for sign in
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

  //handle sign out
  async function handleSignOut() {
    "use server";
    await signOut();
    redirect("/");
  }

  //capitalise first letter of team.day
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <main className="md:pt-10">
      <h1 className="mb-8">Min profil</h1>
      <div className="border-x-8 border-[color:--main] md:mx-20">
        <article className="bg-[color:#F9DDC3] py-7 px-8 border-x-8 border-[color:#769975]">
          <p className="leading-7">
            <span className="font-bold">Velkommen til {user.firstname}</span>,
            <br />
            &quot;Min Profil&quot; er ikke helt færdig endnu - men vi takker dig
            for din interesse! <br /> Her vil du kunne danne dig et overblik
            over tilmeldte hold, redigere i dine tilmeldinger og opdatere dine
            kontaktinformationer. Indtil da kan du se din holdoversigt, logge ud
            eller eventuelt navigere dig frem til en af de følgende sider:
          </p>
        </article>
      </div>

      <div className="pt-8 flex justify-center gap-6">
        <Link href="/">
          <button className="btns">Forside</button>
        </Link>
        <Link href="/booking">
          <button className="btns">Booking</button>
        </Link>
      </div>

      {/* display booked teams */}
      <section className="pt-10 md:mx-20">
        <h3 className="font-bold">Tilmeldte hold:</h3>
        {bookedTeams.length > 0 ? (
          <div>
            {bookedTeams.map((team, index) =>
              team ? (
                <p
                  key={index}
                  style={{ backgroundColor: team.color }}
                  className="p-5 my-3"
                >
                  <span className="font-bold">{team.name}: </span>
                  {capitalizeFirstLetter(team.day)}e kl. {team.startTime} -{" "}
                  {team.endTime}, uge {getWeekNumber(team.startDate)}-
                  {getWeekNumber(team.endDate)}. {team.niveau}.
                  <br />
                </p>
              ) : null
            )}
          </div>
        ) : (
          <p>Du har ikke tilmeldt dig et hold endnu.</p>
        )}
      </section>

      <div className="pt-12 flex justify-center gap-6">
        <button className="btns btn-cancel" onClick={handleSignOut}>
          Log ud
        </button>
      </div>
    </main>
  );
}
