//SARAH
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getWeekNumber } from "@/app/components/CalculateWeekNumber";

export default function Confirm({ params }) {
  const { id } = params;
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <main className="flex flex-col items-center text-center">
      <div className="leading-snug mt-8">
        <h1>Booking bekræftigelse</h1>
        <p>Tillykke! Du er nu tilmeldt:</p>
      </div>

      <p className="my-4">
        <strong>
          Holdnavn: {team.name} <br />
        </strong>
        Tidspunkt: {team.day}e kl. {team.startTime} - {team.endTime}, uge{" "}
        {startWeek}-{endWeek} <br />
        Niveau: {team.niveau} <br />
        Du kan se dine tilmeldte hold under
      </p>

      <div className="flex flex-col md:flex-row gap-4 font-thin md:font-normal">
        <Link href="/profile">
          <button className="btns">Min profil</button>
        </Link>
        <Link href="/booking">
          <button className="btns">Tilbage til kalender</button>
        </Link>{" "}
      </div>
    </main>
  );
}
