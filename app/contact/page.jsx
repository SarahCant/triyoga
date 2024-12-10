/* import Link from "next/link";
//import { auth, signIn } from "../auth";

export default async function Contact() {
  const session = await auth;
  console.log("session", session);

  async function handleSignInWithMailPassword(formData) {
    "use server";

    await signIn("credentials", {
      redirectTo: "/profile",
    });
  }

  return (
    <main>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="text-5xl text-">Sign in</h1>
          <p className="text-center sm:text-left text-[#333] dark:text-[#ccc] max-w-[30ch]">
            Sign in with your mail account. You can view this page without being
            signed in.
          </p>

          {!session ? (
            <form action={handleSignInWithMailPassword}>
              <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
                Sign In with mail
              </button>
            </form>
          ) : (
            <Link
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="/profile"
            >
              You are signed in. Go to Protected Page
            </Link>
          )}
        </main>
      </div>
    </main>
  );
}
 */

/* "use client";
import { useState } from "react";
import PopUp from "../components/PopUp";

export default function Contact() {
  const [showPopUp, setShowPopUp] = useState(false);

  const handleOpen = () => {
    setShowPopUp(true);
  };

  const handleClose = () => {
    setShowPopUp(false);
  };


  return (
    <main>
      <h1>Kontakt</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <div className="">
        <button className="btns" onClick={handleOpen}>
          Prøv
        </button>
        {showPopUp && (
          <PopUp
            onClose={handleClose}
            popUpContent="Dette er indholdet af popuppen."
          />
        )}
      </div>
    </main>
  );
}
 */

//for yourbooking
/* 
import Link from "next/link";

export default async function Contact() {
  const response = await fetch(
    "https://triyoga-bbaf1-default-rtdb.firebaseio.com/teams.json"
  );
  const dataObject = await response.json();
  console.log(dataObject);

  const teams = Object.keys(dataObject).map((key) => {
    return {
      id: key,
      ...dataObject[key],
    };
  });

  console.log(teams);

  return (
    <main>
      <ol>
        {teams.map((team) => {
          return (
            <li key={team.id}>
              {" "}
              <Link href={`booking/${team.id}`}>{team.name}</Link>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
 */

//Updated Calendar component:
/* 
"use client";
import { useEffect, useState } from "react";
import { fetchClassesForWeek } from "../firebase-config";
import Image from "next/image";
import ReadMorePopUp from "../components/ReadMorePopUp";
import Link from "next/link";

export default function Calendar() {
  const [week, setWeek] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [teams, setTeams] = useState([]);

  // Fetch teams from Firebase
  const fetchTeams = async () => {
    const response = await fetch(
      "https://triyoga-bbaf1-default-rtdb.firebaseio.com/teams.json"
    );
    const dataObject = await response.json();
    const fetchedTeams = Object.keys(dataObject).map((key) => {
      return {
        id: key,
        ...dataObject[key],
      };
    });
    setTeams(fetchedTeams);
  };

  useEffect(() => {
    fetchTeams(); // Fetch teams when component mounts
  }, []);

  const calculateWeekDates = (date) => {
    const monday = new Date(date);
    const day = monday.getDay() || 7; //Mon is 1, Sun is 7
    if (day !== 1) monday.setDate(monday.getDate() - day + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6); //sun = Mon + 6 --> Sun = 7th day
    return { startOfWeek: monday, endOfWeek: sunday }; //startOfWeek = Mon, endOfWeek = Sun
  };

  const fetchWeekClasses = async () => {
    const { startOfWeek, endOfWeek } = calculateWeekDates(currentWeek);
    const formattedStart = startOfWeek.toISOString().split("T")[0];
    const formattedEnd = endOfWeek.toISOString().split("T")[0];
    const classes = await fetchClassesForWeek(formattedStart, formattedEnd);

    if (!classes || classes.length === 0) {
      console.warn(
        "No classes fetched for the week:",
        formattedStart,
        formattedEnd
      );
      setWeek([]);
      return;
    }

    const expandedClasses = classes.flatMap((c) => {
      const startDate = new Date(teams.startDate);
      const endDate = new Date(teams.endDate);
      const occurrences = [];
      const classDayIndex = [
        "søndag",
        "mandag",
        "tirsdag",
        "onsdag",
        "torsdag",
        "fredag",
        "lørdag",
      ].indexOf(teams.day);

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        // Check if this date falls on the desired weekday
        if (d.getDay() === classDayIndex) {
          occurrences.push({
            ...c,
            actualDate: new Date(d).toISOString().split("T")[0],
          });
        }
      }

      return occurrences;
    });

    setWeek(expandedClasses);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + direction * 7);
    setCurrentWeek(newDate);
  };

  useEffect(() => {
    fetchWeekClasses();
  }, [currentWeek]);

  const getISOWeekNumber = (date) => {
    const tempDate = new Date(date.getTime());
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    return Math.ceil(((tempDate - yearStart) / 86400000 + 1) / 7);
  };

  //find today to visualise it later
  const isCurrentDay = (day) => {
    const today = new Date().toISOString().split("T")[0];
    return day === today;
  };

  return (
    <section className="w-10/12 mx-auto my-11">
      <button
        onClick={() => setCurrentWeek(new Date())}
        className="text-lg underline text-[color:#814F26] font-bold"
      >
        I dag
      </button>
      <div className="border-2 border-[color:#814F26]">
        <div className="flex items-center text-xs md:text-base justify-between bg-[color:#F6B485] bg-opacity-60 p-4 border-b-2 border-[color:#814F26]">
          <button onClick={() => navigateWeek(-1)}>
            <Image
              src="/img/icons/arrow-brown.png"
              width={35}
              height={20}
              alt="Pil til venstre"
            />
            Forrige uge
          </button>

          <h1 className="text-sm md:text-lg md:font-bold">
            Uge {getISOWeekNumber(currentWeek)} <br />
            {currentWeek.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
            <br />
          </h1>
          <button onClick={() => navigateWeek(1)}>
            <Image
              src="/img/icons/arrow-brown.png"
              width={35}
              height={20}
              alt="Pil til højre"
              className="scale-x-[-1] ml-6 md:ml-10"
            />
            Næste uge
          </button>
        </div>

        <div className="grid md:grid-cols-7 divide-y-4 md:divide-x md:divide-y-0 divide-[color:#814F26] text-center">
          {teams.map((team) => (
            <div
              key={team.id}
              className="border p-2 w-full md:border-none"
              style={{ backgroundColor: team.color }}
            >
              {" "}
              <div className="w-2/3 md:w-auto">
                <p className="text-s md:text-nowrap">
                  {team.startTime} - {team.endTime}
                </p>
                <p className="text-m font-semibold md:text-nowrap">
                  {team.name}
                </p>
                <p className="text-xs">{team.niveau}</p>

                <p className="text-xs pt-2 md:pt-0">
                  Pladser: {team.maxParticipants - team.currentParticipants}
                </p>
              </div>
              <div className="flex flex-col gap-3 items-center p-2 md:flex-row md:items-baseline md:px-0 md:w-auto md:gap-1">
                <button
                  className="btns text-xs md:px-3"
                  onClick={() => {
                    setSelectedClass(team);
                    setModalType("Læs");
                  }}
                >
                  Læs
                </button>

                <Link
                  href={`/booking/${team.id}`}
                  className="btns text-xs md:px-3"
                >
                  Book
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-7 divide-y-4 md:divide-x md:divide-y-0 divide-[color:#814F26] text-center">
          {[
            "Mandag",
            "Tirsdag",
            "Onsdag",
            "Torsdag",
            "Fredag",
            "Lørdag",
            "Søndag",
          ].map((day, index) => {
            const currentDay = new Date(
              calculateWeekDates(currentWeek).startOfWeek.getTime() +
                index * 86400000
            )
              .toISOString()
              .split("T")[0];

            return (
              <div
                key={index}
                className="p-4 flex flex-col items-center gap-4 md:px-0"
              >
                <h3
                  className={`font-semibold ${
                    isCurrentDay(currentDay)
                      ? "text-[color:--main] px-4 border-b-2 border-[color:--main]"
                      : ""
                  }`}
                >
                  {day}
                </h3>
                {week
                  .filter((team) => team.actualDate === currentDay)
                  .map((team, index) => (
                    <div
                      key={index}
                      className="border p-2 w-full md:border-none"
                      style={{ backgroundColor: team.color }}
                    >
                      <div className="flex md:flex-col md:items-center">
                        <div className="w-2/3 md:w-auto">
                          <p className="text-s md:text-nowrap">
                            {team.startTime} - {team.endTime}
                          </p>
                          <p className="text-m font-semibold md:text-nowrap">
                            {team.name}
                          </p>
                          <p className="text-xs">{team.niveau}</p>

                          <p className="text-xs pt-2 md:pt-0">
                            Pladser:{" "}
                            {team.maxParticipants - team.currentParticipants}
                          </p>
                        </div>
                        <div className="flex flex-col gap-3 items-center p-2 md:flex-row md:items-baseline md:px-0 md:w-auto md:gap-1">
                          <button
                            className="btns text-xs md:px-3"
                            onClick={() => {
                              setSelectedClass(team);
                              setModalType("Læs");
                            }}
                          >
                            Læs
                          </button>

                          <button>
                            <Link
                              href={`/booking/${team.id}`}
                              className="btns text-xs md:px-3"
                            >
                              Book
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </div>

      {selectedClass && modalType === "Læs" && (
        <ReadMorePopUp
          selectedClass={selectedClass}
          modalType={modalType}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </section>
  );
}
 */

//--------- NOTE: CLOSE BUT STYLING'S OFF (TEXT OUTSIDE BOXES IN MD) + IKKE TAGET HØJDE FOR DATOER SÅ TING GENTAGES UENDELIGT
/* 
"use client";
import { useEffect, useState } from "react";
import { fetchClassesForWeek } from "../firebase-config";
import Image from "next/image";
import ReadMorePopUp from "../components/ReadMorePopUp";
import Link from "next/link";

export default function Calendar() {
  const [week, setWeek] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [teams, setTeams] = useState([]);

  // Fetch teams from Firebase
  const fetchTeams = async () => {
    const response = await fetch(
      "https://triyoga-bbaf1-default-rtdb.firebaseio.com/teams.json"
    );
    const dataObject = await response.json();
    const fetchedTeams = Object.keys(dataObject).map((key) => {
      return {
        id: key,
        ...dataObject[key],
      };
    });
    setTeams(fetchedTeams);
  };

  useEffect(() => {
    fetchTeams(); // Fetch teams when component mounts
  }, []);

  const calculateWeekDates = (date) => {
    const monday = new Date(date);
    const day = monday.getDay() || 7; //Mon is 1, Sun is 7
    if (day !== 1) monday.setDate(monday.getDate() - day + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6); //sun = Mon + 6 --> Sun = 7th day
    return { startOfWeek: monday, endOfWeek: sunday }; //startOfWeek = Mon, endOfWeek = Sun
  };

  const fetchWeekClasses = async () => {
    const { startOfWeek, endOfWeek } = calculateWeekDates(currentWeek);
    const formattedStart = startOfWeek.toISOString().split("T")[0];
    const formattedEnd = endOfWeek.toISOString().split("T")[0];
    const classes = await fetchClassesForWeek(formattedStart, formattedEnd);

    if (!classes || classes.length === 0) {
      console.warn(
        "No classes fetched for the week:",
        formattedStart,
        formattedEnd
      );
      setWeek([]);
      return;
    }

    const expandedClasses = classes.flatMap((c) => {
      const startDate = new Date(c.startDate);
      const endDate = new Date(c.endDate);
      const occurrences = [];
      const classDayIndex = [
        "søndag",
        "mandag",
        "tirsdag",
        "onsdag",
        "torsdag",
        "fredag",
        "lørdag",
      ].indexOf(c.day);

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        // Check if this date falls on the desired weekday
        if (d.getDay() === classDayIndex) {
          occurrences.push({
            ...c,
            actualDate: new Date(d).toISOString().split("T")[0],
          });
        }
      }

      return occurrences;
    });

    setWeek(expandedClasses);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + direction * 7);
    setCurrentWeek(newDate);
  };

  useEffect(() => {
    fetchWeekClasses();
  }, [currentWeek]);

  const getISOWeekNumber = (date) => {
    const tempDate = new Date(date.getTime());
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    return Math.ceil(((tempDate - yearStart) / 86400000 + 1) / 7);
  };

  return (
    <section className="w-10/12 mx-auto my-11">
  
      <button
        onClick={() => setCurrentWeek(new Date())}
        className="text-lg underline text-[color:#814F26] font-bold"
      >
        I dag
      </button>
      <div className="border-2 border-[color:#814F26]">
        <div className="flex items-center text-xs md:text-base justify-between bg-[color:#F6B485] bg-opacity-60 p-4 border-b-2 border-[color:#814F26]">
          <button onClick={() => navigateWeek(-1)}>
            <Image
              src="/img/icons/arrow-brown.png"
              width={35}
              height={20}
              alt="Pil til venstre"
            />
            Forrige uge
          </button>

          <h1 className="text-sm md:text-lg md:font-bold">
            Uge {getISOWeekNumber(currentWeek)} <br />
            {currentWeek.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
            <br />
          </h1>
          <button onClick={() => navigateWeek(1)}>
            <Image
              src="/img/icons/arrow-brown.png"
              width={35}
              height={20}
              alt="Pil til højre"
              className="scale-x-[-1] ml-6 md:ml-10"
            />
            Næste uge
          </button>
        </div>

        <div className="grid md:grid-cols-7 divide-y-4 md:divide-x md:divide-y-0 divide-[color:#814F26] text-center">
          {[
            "Mandag",
            "Tirsdag",
            "Onsdag",
            "Torsdag",
            "Fredag",
            "Lørdag",
            "Søndag",
          ].map((day, index) => (
            <div key={index} className="border p-2 w-full md:border-none">
              <p className="font-semibold">{day}</p>
              {teams
                .filter((team) => team.day === day.toLowerCase()) // Filter teams by day
                .map((team) => (
                  <div
                    key={team.id}
                    className="border p-2 w-full"
                    style={{ backgroundColor: team.color }}
                  >
                    <p className="text-s md:text-nowrap">
                      {team.startTime} - {team.endTime}
                    </p>
                    <p className="text-m font-semibold md:text-nowrap">
                      {team.name}
                    </p>
                    <p className="text-xs">{team.niveau}</p>
                    <p className="text-xs pt-2 md:pt-0">
                      Pladser: {team.maxParticipants - team.currentParticipants}
                    </p>
                    <div className="flex flex-col gap-3 items-center p-2 md:flex-row md:items-baseline md:px-0 md:w-auto md:gap-1">
                      <button
                        className="btns text-xs md:px-3"
                        onClick={() => {
                          setSelectedClass(team);
                          setModalType("Læs");
                        }}
                      >
                        Læs
                      </button>

                      <Link
                        href={`/booking/${team.id}`}
                        className="btns text-xs md:px-3"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} */

//---------------- RIGHT LOOK + MAPPING BUT BOOK BTNS DON'T WORK
/* 
"use client";
import { useEffect, useState } from "react";
import { fetchClassesForWeek } from "../firebase-config";
import Image from "next/image";
import ReadMorePopUp from "../components/ReadMorePopUp";
import Link from "next/link";

export default function Calendar() {
  const [week, setWeek] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [teams, setTeams] = useState([]);

  // Fetch teams from Firebase
  const fetchTeams = async () => {
    const response = await fetch(
      "https://triyoga-bbaf1-default-rtdb.firebaseio.com/teams.json"
    );
    const dataObject = await response.json();

    //to check if the team data is being returned from firebase
    if (!dataObject) {
      console.error("No team data returned from Firebase");
      setTeams([]);
      return;
    }

    const fetchedTeams = Object.keys(dataObject).map((key) => ({
      id: key,
      ...dataObject[key],
    }));
    setTeams(fetchedTeams);

    //to check the fetchedTeams
    //if (dataObject) { console.log({ fetchedTeams });}
  };

  useEffect(() => {
    fetchTeams(); // Fetch teams when component mounts
  }, []);

  const calculateWeekDates = (date) => {
    const monday = new Date(date);
    const day = monday.getDay() || 7; // Mon is 1, Sun is 7
    if (day !== 1) monday.setDate(monday.getDate() - day + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6); // Sun = Mon + 6
    return { startOfWeek: monday, endOfWeek: sunday }; // startOfWeek = Mon, endOfWeek = Sun
  };

  const fetchWeekClasses = async () => {
    const { startOfWeek, endOfWeek } = calculateWeekDates(currentWeek);
    const formattedStart = startOfWeek.toISOString().split("T")[0];
    const formattedEnd = endOfWeek.toISOString().split("T")[0];
    const classes = await fetchClassesForWeek(formattedStart, formattedEnd);

    if (!classes || classes.length === 0) {
      console.warn(
        "No classes fetched for the week:",
        formattedStart,
        formattedEnd
      );
      setWeek([]);
      return;
    }

    const expandedClasses = classes.flatMap((c) => {
      const startDate = new Date(c.startDate);
      const endDate = new Date(c.endDate);
      const occurrences = [];
      const classDayIndex = [
        "søndag",
        "mandag",
        "tirsdag",
        "onsdag",
        "torsdag",
        "fredag",
        "lørdag",
      ].indexOf(c.day);

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        if (d.getDay() === classDayIndex) {
          occurrences.push({
            ...c,
            actualDate: new Date(d).toISOString().split("T")[0],
            id: c.id,
          });
        }
      }

      return occurrences;
    });
    // console.log("Expanded classes w/ ids:", expandedClasses); //check the expandedClasses data

    setWeek(expandedClasses);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + direction * 7);
    setCurrentWeek(newDate);
  };

  useEffect(() => {
    fetchWeekClasses();
  }, [currentWeek]);

  //check week content
  //useEffect(() => {console.log("Updated week:", week);}, [week]);

  const getISOWeekNumber = (date) => {
    const tempDate = new Date(date.getTime());
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    return Math.ceil(((tempDate - yearStart) / 86400000 + 1) / 7);
  };

  const isCurrentDay = (day) => {
    const today = new Date().toISOString().split("T")[0];
    return day === today;
  };

  return (
    <section className="w-10/12 mx-auto my-80">
      <button
        onClick={() => setCurrentWeek(new Date())}
        className="text-lg underline text-[color:#814F26] font-bold"
      >
        I dag
      </button>
      <div className="border-2 border-[color:#814F26]">
        <div className="flex items-center text-xs md:text-base justify-between bg-[color:#F6B485] bg-opacity-60 p-4 border-b-2 border-[color:#814F26]">
          <button onClick={() => navigateWeek(-1)}>
            <Image
              src="/img/icons/arrow-brown.png"
              width={35}
              height={20}
              alt="Pil til venstre"
            />
            Forrige uge
          </button>
          <h1 className="text-sm md:text-lg md:font-bold">
            Uge {getISOWeekNumber(currentWeek)} <br />
            {currentWeek.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h1>
          <button onClick={() => navigateWeek(1)}>
            <Image
              src="/img/icons/arrow-brown.png"
              width={35}
              height={20}
              alt="Pil til højre"
              className="scale-x-[-1] ml-6 md:ml-10"
            />
            Næste uge
          </button>
        </div>
        <div className="grid md:grid-cols-7 divide-y-4 md:divide-x md:divide-y-0 divide-[color:#814F26] text-center">
          {[
            "Mandag",
            "Tirsdag",
            "Onsdag",
            "Torsdag",
            "Fredag",
            "Lørdag",
            "Søndag",
          ].map((day, index) => {
            const currentDay = new Date(
              calculateWeekDates(currentWeek).startOfWeek.getTime() +
                index * 86400000
            )
              .toISOString()
              .split("T")[0];

            return (
              <div
                key={currentDay} // was key={index}
                className="p-4 flex flex-col items-center gap-4 md:px-0"
              >
                <h3
                  className={`font-semibold ${
                    isCurrentDay(currentDay)
                      ? "text-[color:--main] px-4 border-b-2 border-[color:--main]"
                      : ""
                  }`}
                >
                  {day}
                </h3>
                {week
                  .filter((c) => c.actualDate === currentDay)
                  .map((team, index) => (
                    //console.log("Team data:", team), //checking team
                    //  console.log("Team ID:", team.id), //checking team ids. there aren't any
                    <div
                      key={team.id || `team-${index}`} //was key={team.id}. fallback to index if id is missing
                      className="border p-2 w-full md:border-none"
                      style={{ backgroundColor: team.color }}
                    >
                      <div className="flex md:flex-col md:items-center">
                        <div className="w-2/3 md:w-auto">
                          <p className="text-s">
                            {team.startTime} - {team.endTime}
                          </p>
                          <p className="text-m font-semibold">{team.name}</p>
                          <p className="text-xs">{team.niveau}</p>
                          <p className="text-xs pt-2">
                            Pladser:{" "}
                            {team.maxParticipants - team.currentParticipants}
                          </p>
                        </div>
                        <div className="flex flex-col gap-3 items-center p-2">
                          <button
                            className="btns text-xs"
                            onClick={() => {
                              setSelectedClass(team);
                              setModalType("Læs");
                            }}
                          >
                            Læs
                          </button>

                          <Link
                            href={`/booking/${team.id}`}
                            className="btns text-xs"
                          >
                            Book
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </div>
      {selectedClass && modalType === "Læs" && (
        <ReadMorePopUp
          selectedClass={selectedClass}
          modalType={modalType}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </section>
  );
}
 */

// --------------------- BOOK BTNS WORK BUT CLASSES SHOWN REGARDLESS OF START/END DATES
/* 
"use client";
import { useEffect, useState } from "react";
import { fetchClassesForWeek } from "../firebase-config";
import Image from "next/image";
import ReadMorePopUp from "../components/ReadMorePopUp";
import Link from "next/link";

export default function Calendar() {
  const [week, setWeek] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [teams, setTeams] = useState([]);

  // Fetch teams from Firebase
  const fetchTeams = async () => {
    const response = await fetch(
      "https://triyoga-bbaf1-default-rtdb.firebaseio.com/teams.json"
    );
    const dataObject = await response.json();

    if (!dataObject) {
      console.error("No team data returned from Firebase");
      setTeams([]);
      return;
    }

    const fetchedTeams = Object.keys(dataObject).map((key) => ({
      id: key,
      ...dataObject[key],
    }));
    setTeams(fetchedTeams);
  };

  useEffect(() => {
    fetchTeams(); // Fetch teams when component mounts
  }, []);

  const calculateWeekDates = (date) => {
    const monday = new Date(date);
    const day = monday.getDay() || 7; // Mon is 1, Sun is 7
    if (day !== 1) monday.setDate(monday.getDate() - day + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6); // Sun = Mon + 6
    return { startOfWeek: monday, endOfWeek: sunday };
  };

  const fetchWeekClasses = async () => {
    const { startOfWeek, endOfWeek } = calculateWeekDates(currentWeek);
    const formattedStart = startOfWeek.toISOString().split("T")[0];
    const formattedEnd = endOfWeek.toISOString().split("T")[0];
    const classes = await fetchClassesForWeek(formattedStart, formattedEnd);

    if (!classes || classes.length === 0) {
      console.warn(
        "No classes fetched for the week:",
        formattedStart,
        formattedEnd
      );
      setWeek([]);
      return;
    }

    const expandedClasses = classes.flatMap((c) => {
      const startDate = new Date(c.startDate);
      const endDate = new Date(c.endDate);
      const occurrences = [];
      const classDayIndex = [
        "søndag",
        "mandag",
        "tirsdag",
        "onsdag",
        "torsdag",
        "fredag",
        "lørdag",
      ].indexOf(c.day);

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        if (d.getDay() === classDayIndex) {
          occurrences.push({
            ...c,
            actualDate: new Date(d).toISOString().split("T")[0],
            id: c.id, // Ensure the id is being passed here
          });
        }
      }

      return occurrences;
    });

    setWeek(expandedClasses);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + direction * 7);
    setCurrentWeek(newDate);
  };

  useEffect(() => {
    fetchWeekClasses();
  }, [currentWeek]);

  const getISOWeekNumber = (date) => {
    const tempDate = new Date(date.getTime());
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    return Math.ceil(((tempDate - yearStart) / 86400000 + 1) / 7);
  };

  return (
    <section className="w-10/12 mx-auto my-80">
      <button
        onClick={() => setCurrentWeek(new Date())}
        className="text-lg underline text-[color:#814F26] font-bold"
      >
        I dag
      </button>
      <div className="border-2 border-[color:#814F26]">
        <div className="flex items-center text-xs md:text-base justify-between bg-[color:#F6B485] bg-opacity-60 p-4 border-b-2 border-[color:#814F26]">
          <button onClick={() => navigateWeek(-1)}>
            <Image
              src="/img/icons/arrow-brown.png"
              width={35}
              height={20}
              alt="Pil til venstre"
            />
            Forrige uge
          </button>

          <h1 className="text-sm md:text-lg md:font-bold">
            Uge {getISOWeekNumber(currentWeek)} <br />
            {currentWeek.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
            <br />
          </h1>
          <button onClick={() => navigateWeek(1)}>
            <Image
              src="/img/icons/arrow-brown.png"
              width={35}
              height={20}
              alt="Pil til højre"
              className="scale-x-[-1] ml-6 md:ml-10"
            />
            Næste uge
          </button>
        </div>

        <div className="grid md:grid-cols-7 divide-y-4 md:divide-x md:divide-y-0 divide-[color:#814F26] text-center">
          {[
            "Mandag",
            "Tirsdag",
            "Onsdag",
            "Torsdag",
            "Fredag",
            "Lørdag",
            "Søndag",
          ].map((day, index) => (
            <div key={index} className="border p-2 w-full md:border-none">
              <p className="font-semibold">{day}</p>
              {teams
                .filter((team) => team.day === day.toLowerCase())
                .map((team) => (
                  <div
                    key={team.id}
                    className="border p-2 w-full"
                    style={{ backgroundColor: team.color }}
                  >
                    <p className="text-s md:text-nowrap">
                      {team.startTime} - {team.endTime}
                    </p>
                    <p className="text-m font-semibold md:text-nowrap">
                      {team.name}
                    </p>
                    <p className="text-xs">{team.niveau}</p>
                    <p className="text-xs pt-2 md:pt-0">
                      Pladser: {team.maxParticipants - team.currentParticipants}
                    </p>
                    <div className="flex flex-col gap-3 items-center p-2 md:flex-row md:items-baseline md:px-0 md:w-auto md:gap-1">
                      <button
                        className="btns text-xs md:px-3"
                        onClick={() => {
                          setSelectedClass(team);
                          setModalType("Læs");
                        }}
                      >
                        Læs
                      </button>

                      <Link
                        href={`/booking/${team.id}`}
                        className="btns text-xs md:px-3"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
      {selectedClass && modalType === "Læs" && (
        <ReadMorePopUp
          selectedClass={selectedClass}
          modalType={modalType}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </section>
  );
}
 */
