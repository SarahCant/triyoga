/* import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function YourBooking({ searchParams }) {
  const { classId } = await searchParams;

  if (!classId) {
    return (
      <p>
        Det ligner, at du ikke har valgt et hold. Prøv at gå tilbage til
        oversigten igen.
      </p>
    );
  }

  const classDataUrl = `${process.env.NEXT_PUBLIC_FB_DB_URL}/classes/${classId}.json`;
  const classResponse = await fetch(classDataUrl, { cache: "no-store" });
  const classData = await classResponse.json();

  if (!classData) {
    return (
      <p>
        Der er ikke fundet nogen data for det valgte hold. Prøv igen eller
        kontakt os enten via mail eller telefon.
      </p>
    );
  }

  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }

  const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${session.fbUid}.json`;
  const response = await fetch(url, { cache: "no-store" });
  const user = await response.json();

  return (
    <main>
      <div className="flex flex-col text-center mb-4">
        <h1>Din booking</h1>
        <p>Du er ved at tilmelde dig følgende hold</p>
      </div>
      <div className="border-x-8 border-[color:--main] md:mx-20">
        <div className="bg-[color:#F9DDC3] p-2 border-x-8 border-[color:#769975]">
          <article className="leading-7">
            <h2>Holdnavn: {classData.name}</h2>
            <p>
              Tidspunkt: {classData.startTime} - {classData.endTime} <br />
              Niveau {classData.niveau} <br />
              <strong>Pris: {}</strong>
            </p>
            <p className="py-4">
              <strong>Betalingsinformation</strong> <br />
              Vi tilbyder mulighed for betaling via MobilePay eller kontant ved
              første undervisningsgang. Betalingen skal være på plads inden for
              den første undervisningstime, og vi opfordrer til, at du
              medbringer enten kontanter eller har MobilePay klar til at
              gennemføre betalingen. Hvis du har spørgsmål eller ønsker
              yderligere information om betalingsmulighederne, er du altid
              velkommen til at kontakte os enten på mobil eller på mail.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
 */
/* 
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default function YourBooking() {
  const [classData, setClassData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const classId = searchParams.get("classId");

  useEffect(() => {
    const fetchData = async () => {
      if (!classId) {
        setError(
          "Det ligner, at du ikke har valgt et hold. Prøv at gå tilbage til oversigten igen."
        );
        setLoading(false);
        return;
      }

      try {
        const classDataUrl = `${process.env.NEXT_PUBLIC_FB_DB_URL}/classes/${classId}.json`;
        const classResponse = await fetch(classDataUrl, { cache: "no-store" });
        const classData = await classResponse.json();

        if (!classData) {
          setError(
            "Der er ikke fundet nogen data for det valgte hold. Prøv igen eller kontakt os enten via mail eller telefon."
          );
          setLoading(false);
          return;
        }

        setClassData(classData);

        const session = await auth();
        if (!session) {
          redirect("/sign-in");
        }

        const url = `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${session.fbUid}.json`;
        const userResponse = await fetch(url, { cache: "no-store" });
        const user = await userResponse.json();
        setUserData(user);
        setLoading(false);
      } catch (error) {
        setError("Der opstod en fejl under hentning af data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [classId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <div className="flex flex-col text-center mb-4">
        <h1>Din booking</h1>
        <p>Du er ved at tilmelde dig følgende hold</p>
      </div>
      <div className="border-x-8 border-[color:--main] md:mx-20">
        <div className="bg-[color:#F9DDC3] p-2 border-x-8 border-[color:#769975]">
          <article className="leading-7">
            <h2>Holdnavn: {classData.name}</h2>
            <p>
              Tidspunkt: {classData.startTime} - {classData.endTime} <br />
              Niveau {classData.niveau} <br />
              <strong>Pris: {classData.price}</strong>
            </p>
            <p className="py-4">
              <strong>Betalingsinformation</strong> <br />
              Vi tilbyder mulighed for betaling via MobilePay eller kontant ved
              første undervisningsgang. Betalingen skal være på plads inden for
              den første undervisningstime, og vi opfordrer til, at du
              medbringer enten kontanter eller har MobilePay klar til at
              gennemføre betalingen. Hvis du har spørgsmål eller ønsker
              yderligere information om betalingsmulighederne, er du altid
              velkommen til at kontakte os enten på mobil eller på mail.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
 */
/* 
"use client";
import { useEffect, useState } from "react";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function YourBooking() {
  const searchParams = useSearchParams();
  const classId = searchParams.get("classId");

  const [classData, setClassData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("ClassId:", classId);

      if (!classId) {
        console.error("No classId provided");
        setLoading(false);
        return;
      }

      try {
        const classDataUrl = `${process.env.NEXT_PUBLIC_FB_DB_URL}/teams/${classId}.json`;
        const classResponse = await fetch(classDataUrl, { cache: "no-store" });

        if (!classResponse.ok) {
          throw new Error(`HTTP error! status: ${classResponse.status}`);
        }

        const classData = await classResponse.json();

        if (!classData || !classData.name) {
          console.error("No class data or name found for classId:", classId);
          setLoading(false);
          return;
        }

        setClassData(classData);

        const session = await auth();
        if (!session) {
          redirect("/sign-in");
        }

        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_FB_DB_URL}/users/${session.fbUid}.json`,
          { cache: "no-store" }
        );
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [classId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!classData) {
    return (
      <p>
        Det ligner, at der opstod en fejl ved indlæsning af holddata. Prøv
        venligst igen eller kontakt os enten på mail eller telefon.
      </p>
    );
  }

  return (
    <main>
      <div className="flex flex-col text-center mb-4">
        <h1>Din booking</h1>
        <p>Du er ved at tilmelde dig følgende hold</p>
      </div>
      <div className="border-x-8 border-[color:--main] md:mx-20">
        <div className="bg-[color:#F9DDC3] p-2 border-x-8 border-[color:#769975]">
          <article className="leading-7">
            <h2>Holdnavn: {classData.name}</h2>
            <p>
              Tidspunkt: {classData.startTime} - {classData.endTime} <br />
              Niveau {classData.niveau} <br />
              <strong>Pris: {classData.price}</strong>
            </p>
            <p className="py-4">
              <strong>Betalingsinformation</strong> <br />
              Vi tilbyder mulighed for betaling via MobilePay eller kontant ved
              første undervisningsgang. Betalingen skal være på plads inden for
              den første undervisningstime, og vi opfordrer til, at du
              medbringer enten kontanter eller har MobilePay klar til at
              gennemføre betalingen. Hvis du har spørgsmål eller ønsker
              yderligere information om betalingsmulighederne, er du altid
              velkommen til at kontakte os enten på mobil eller på mail.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
 */

/* 
"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const YourBookingPage = () => {
  const router = useRouter();
  const { classId } = router.query; // Get classId from URL query parameter

  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    if (classId) {
      // Fetch class details based on classId
      fetchClassDetails(classId);
    }
  }, [classId]);

  const fetchClassDetails = async (id) => {
    // Fetch the class details using the id
    const response = await fetch(`/api/classes/${id}`);
    const data = await response.json();
    setClassDetails(data);
  };

  if (!classDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Booking Details for Class: {classDetails.name}</h1>
      <p>{classDetails.description}</p>
      {/* Add the booking form or whatever functionality here */ /*}
    </div>
  );
};

export default YourBookingPage;
 */
/* 
"use client";

export default function YourBooking({ selectedClass, modalType }) {
  if (!selectedClass || modalType !== "Book") return null;

  //change first letter of weekday to uppercase
  const formattedDay = selectedClass.day
    ? selectedClass.day.charAt(0).toUpperCase() + selectedClass.day.slice(1)
    : "";

  //calculate week no. from dates
  function getWeekNumber(date) {
    const currentDate = new Date(date);
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor(
      (currentDate - startOfYear) / (24 * 60 * 60 * 1000)
    );
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    return weekNumber < 10 ? `0${weekNumber}` : weekNumber; //add 0 in front of weeks less than 10
  }

  const startWeek = getWeekNumber(selectedClass.startDate);
  const endWeek = getWeekNumber(selectedClass.endDate);

  return (
    <main className="">
      <section className="bg-[color:#fff8e5] border-2 border-[color:--main] w-10/12 h-2/3 shadow-lg relative p-3 overflow-y-auto md:w-6/12">
 

        <div className="md:grid md:grid-cols-2">
          <div className="md:col-start-1">
            <h2>{selectedClass.name}</h2>
            <p>
              {formattedDay} kl.{selectedClass.startTime} -{" "}
              {selectedClass.endTime}, uge {startWeek}-{endWeek}
              <br />
              {selectedClass.niveau || "Alle velkommen"}
            </p>
          </div>

          <div className="md:col-start-1 md:row-start-2">
            <p className="pb-6">{selectedClass.description}</p>

            <p className="text-lg">
              <strong>
                {selectedClass.maxParticipants -
                  selectedClass.currentParticipants}{" "}
                ledige pladser
              </strong>
            </p>
            <p> Total antal pladser: {selectedClass.maxParticipants}</p>
          </div>

          <div className="md:col-start-1"></div>
          <div className="py-6 flex justify-around md:py-0">
            <button className="btns">Læs mere</button>
            <button
              className="btns "
              onClick={() => {
                setSelectedClass(c);
                setModalType("Book");
              }}
            >
              Book
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
 */
/* 
"use client";
import { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { firebaseConfig } from "@/app/firebase-config";

const YourBooking = ({ classId }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (classId) {
      const fetchClass = async () => {
        try {
          const database = getDatabase();
          const classRef = ref(database, `teams/${classId}`); // Using classId as the key of the class (like 'Workshop1')
          const snapshot = await get(classRef);

          if (snapshot.exists()) {
            setSelectedClass(snapshot.val()); // Set the class data from Firebase
          } else {
            setError("No such class found!");
          }
        } catch (err) {
          setError("Failed to fetch class data");
        } finally {
          setLoading(false);
        }
      };

      fetchClass();
    }
  }, [classId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{selectedClass?.name}</h1>
      <p>{selectedClass?.description}</p>
      <p>
        Start: {selectedClass?.startDate} at {selectedClass?.startTime}
      </p>
      <p>Location: {selectedClass?.day}</p>
   
    </div>
  );
};

export default YourBooking;
 */
/* import { getWeekNumber } from "@/app/components/CalculateWeekNumber";
import Link from "next/link";


export default async function YourBooking({ params }) {
  const { id } = await params;

  const response = await fetch(
    `https://triyoga-bbaf1-default-rtdb.firebaseio.com/teams/${id}.json`
  );

  const team = await response.json();

  const startWeek = getWeekNumber(team.startDate);
  const endWeek = getWeekNumber(team.endDate);

  return (
    <main className="md:pt-12">
      <h1>Din booking</h1>
      <p className="pb-4 text-center">
        Du er i gang med at tilmelde dig følgende hold
      </p>
      <div className="border-x-8 border-[color:--main] md:mx-20">
        <article className=" bg-[color:#F9DDC3] p-2 border-x-8 border-[color:#769975] py-6">
          <h3>Holdnavn: {team.name}</h3>
          <p className="leading-5">
            Tidspunkt: {team.day}e kl.{team.startTime} - {team.endTime}, uge{" "}
            {startWeek}-{endWeek} <br />
            Niveau: {team.niveau} <br /> <br />
            <strong className="">Pris: {team.price}</strong>
          </p>
          <p className="py-4 leading-7">
            <strong>Betalingsinformation</strong> <br />
            Vi tilbyder mulighed for betaling via <strong>
              MobilePay
            </strong>{" "}
            eller <strong>kontant</strong> ved første undervisningsgang.
            Betalingen skal være på plads inden for den første
            undervisningstime, og vi opfordrer til, at du medbringer enten
            kontanter eller har MobilePay klar til at gennemføre betalingen.
            Hvis du har spørgsmål eller ønsker yderligere information om
            betalingsmulighederne, er du altid velkommen til at kontakte os
            enten på mobil eller på mail.
          </p>

          <div className="text-xs flex flex-col w-7/12 m-auto gap-6 pt-4 md:flex-row">
            <Link href={"/booking"} className="btns">
              Tilbage til kalender
            </Link>
            <button className="btns">Bekræft booking</button>
          </div>
        </article>
      </div>
    </main>
  );
}
 */

//--------------- WORKS BUT MISSING LOG UNDER USER IN FIREBASE --------

"use client";

import { getWeekNumber } from "@/app/components/CalculateWeekNumber";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/app/auth";

export default function YourBooking({ params }) {
  const { id } = params; // No need for `await` here in client components
  const [team, setTeam] = useState(null);
  const router = useRouter();

  const session = auth();

  // if the user is already signed in, redirect them to the profile page
  if (session) {
    redirect("/profile");
  }

  // Fetch data on component mount
  useEffect(() => {
    async function fetchTeam() {
      const response = await fetch(
        `https://triyoga-bbaf1-default-rtdb.firebaseio.com/teams/${id}.json`
      );
      if (!response.ok) {
        console.error("Failed to fetch team data.");
        return;
      }
      const data = await response.json();
      setTeam(data);
    }
    fetchTeam();
  }, [id]);

  if (!team) {
    return <p>Loading...</p>;
  }

  const startWeek = getWeekNumber(team.startDate);
  const endWeek = getWeekNumber(team.endDate);

  const handleBookingConfirmation = async () => {
    try {
      //pdate Firebase
      const updateResponse = await fetch(
        `https://triyoga-bbaf1-default-rtdb.firebaseio.com/teams/${id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentParticipants: (team.currentParticipants || 0) + 1,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update booking.");
      }

      // Redirect to confirm page
      router.push(`/confirm/${id}`);
    } catch (error) {
      console.error("Error during booking confirmation:", error);
    }
  };

  return (
    <main className="md:pt-12">
      <h1>Din booking</h1>
      <p className="pb-4 text-center">
        Du er i gang med at tilmelde dig følgende hold
      </p>
      <div className="border-x-8 border-[color:--main] md:mx-20">
        <article className=" bg-[color:#F9DDC3] p-2 border-x-8 border-[color:#769975] py-6">
          <h3>Holdnavn: {team.name}</h3>
          <p className="leading-5">
            Tidspunkt: {team.day}e kl.{team.startTime} - {team.endTime}, uge{" "}
            {startWeek}-{endWeek} <br />
            Niveau: {team.niveau} <br /> <br />
            <strong className="">Pris: {team.price}</strong>
          </p>
          <p className="py-4 leading-7">
            <strong>Betalingsinformation</strong> <br />
            Vi tilbyder mulighed for betaling via <strong>
              MobilePay
            </strong>{" "}
            eller <strong>kontant</strong> ved første undervisningsgang.
            Betalingen skal være på plads inden for den første
            undervisningstime, og vi opfordrer til, at du medbringer enten
            kontanter eller har MobilePay klar til at gennemføre betalingen.
            Hvis du har spørgsmål eller ønsker yderligere information om
            betalingsmulighederne, er du altid velkommen til at kontakte os
            enten på mobil eller på mail.
          </p>

          <div className="text-xs flex flex-col w-7/12 m-auto gap-6 pt-4 md:flex-row">
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
