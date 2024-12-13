//SARAH
//SOFIE FINAL STYLING
"use client";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getWeekNumber } from "@/app/components/CalculateWeekNumber";
import { useRouter } from "next/navigation";

export default function YourBooking({ params }) {
  const { id } = params;
  const [team, setTeam] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      if (!session) {
        router.push("/sign-in");
      } else {
        setUser(session.user);
      }
    }

    checkSession();
  }, [router]);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const response = await fetch(
          `https://triyoga-bbaf1-default-rtdb.firebaseio.com/teams/${id}.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch team data.");
        }
        const data = await response.json();
        setTeam(data);
      } catch (error) {
        setError("Failed to load team data. Please try again.");
      }
    }
    fetchTeam();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!team) {
    return <p>Loading...</p>;
  }

  const startWeek = getWeekNumber(team.startDate);
  const endWeek = getWeekNumber(team.endDate);

  const handleBookingConfirmation = async () => {
    if (!user || !user.email) {
      setError("User not authenticated. Please sign in.");
      return;
    }

    try {
      // Update team's currentParticipants
      const updateResponse = await fetch(
        `https://triyoga-bbaf1-default-rtdb.firebaseio.com/teams/${id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentParticipants: (team.currentParticipants || 0) + 1,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update booking.");
      }

      // Fetch user data to get the unique ID
      const userFetchResponse = await fetch(
        `https://triyoga-bbaf1-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${user.email}"`
      );

      if (!userFetchResponse.ok) {
        throw new Error("Failed to fetch user data.");
      }

      const userData = await userFetchResponse.json();
      const userId = Object.keys(userData)[0];

      if (!userId) {
        throw new Error("User not found in database.");
      }

      // Update user's booked field with team ID
      const userUpdateResponse = await fetch(
        `https://triyoga-bbaf1-default-rtdb.firebaseio.com/users/${userId}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            booked: userData[userId].booked
              ? `${userData[userId].booked}, ${id}` // Store the team ID instead of name
              : id,
          }),
        }
      );

      if (!userUpdateResponse.ok) {
        throw new Error("Failed to update user's booking.");
      }

      router.push(`/confirmation/${id}`);
    } catch (error) {
      setError(`Error during booking confirmation: ${error.message}`);
    }
  };

  return (
    <main className="md:pt-12 min-h-screen">
      <h1>Din booking</h1>
      <p className="pb-4 text-center">
        Du er i gang med at tilmelde dig følgende hold:
      </p>
      <div className="border-x-8 border-[color:--main] md:mx-20">
        <article className="bg-[color:#F9DDC3] py-7 px-8 border-x-8 border-[color:#769975]">
          <h3>
            <span className="font-bold">Holdnavn: </span>
            {team.name}
          </h3>
          <p className="leading-7">
            <span className="font-bold">Tidspunkt: </span>
            {team.day}e kl.{team.startTime} - {team.endTime}, uge {startWeek}-
            {endWeek} <br />
            <span className="font-bold">Niveau: </span>
            {team.niveau} <br /> <br />
            <span className="font-bold">Pris: </span>
            {team.price}
          </p>
          <p className="py-4 leading-7">
            <span className="font-bold">Betalingsinformation</span> <br />
            Vi tilbyder mulighed for betaling via
            <span className="font-bold"> MobilePay </span>
            eller <span className="font-bold"> kontant </span>ved første
            undervisningsgang. Betalingen skal være på plads inden for den
            første undervisningstime, og vi opfordrer til, at du medbringer
            enten kontanter eller har MobilePay klar til at gennemføre
            betalingen. Hvis du har spørgsmål eller ønsker yderligere
            information om betalingsmulighederne, er du altid velkommen til at
            kontakte os enten på mobil eller på mail.
          </p>

          <div className="text-sm flex flex-col items-center w-7/12 m-auto mb-2 gap-6 pt-4 md:flex-row md:justify-center">
            <Link href={"/booking"} className="btns text-center">
              Tilbage til kalender
            </Link>
            <button
              className="btns"
              onClick={(e) => {
                e.preventDefault(); // Prevent default button behavior
                handleBookingConfirmation();
              }}
            >
              Bekræft booking
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}
