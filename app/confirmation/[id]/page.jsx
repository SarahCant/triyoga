//SARAH FUNCTIONALITY + GENERAL STYLING
//SOFIE DETAIL STYLING ON MD SCREENS
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getWeekNumber } from "@/app/components/CalculateWeekNumber";
import { useRouter } from "next/compat/router";

//get and use unique params
export default function Confirm({ params }) {
  const router = useRouter();
  const { id } = params;
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);

  //force /profile reload on navigation
  const handleReload = () => {
    router.reload();
  };

  //get fetched team's info from firebase
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
  //week numbers
  const startWeek = getWeekNumber(team.startDate);
  const endWeek = getWeekNumber(team.endDate);

  return (
    <main className="flex flex-col items-center text-center mt-36">
      <div className="leading-snug mt-8">
        <h1>Bookingbekræftelse</h1>
        <p className="text-base py-3">Tillykke! Du er nu tilmeldt:</p>
      </div>

      <p className="my-4 text-base leading-9">
        <span className="font-bold">
          Holdnavn: {team.name} <br />
        </span>
        <span className="font-bold">Tidspunkt: </span>
        {team.day}e kl. {team.startTime} - {team.endTime}, uge {startWeek}-
        {endWeek} <br />
        <span className="font-bold">Niveau: </span>
        {team.niveau} <br />
        Du kan se dine tilmeldte hold under:
      </p>

      <div className="flex flex-col gap-4 font-thin md:font-normal -mb-4">
        <button className="btns mt-1" onClick={handleReload}>
          <Link href="/profile">Min profil</Link>
        </button>

        <Link href="/booking">
          <button className="btns mt-6">Tilbage til kalender</button>
        </Link>
      </div>
    </main>
  );
}
