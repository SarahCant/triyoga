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

  const calculateWeekDates = (date) => {
    const monday = new Date(date);
    const day = monday.getDay() || 7; // Mon is 1, Sun is 7
    if (day !== 1) monday.setDate(monday.getDate() - day + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6); // Sun = Mon + 6
    return { startOfWeek: monday, endOfWeek: sunday };
  };

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

    const { startOfWeek, endOfWeek } = calculateWeekDates(currentWeek);
    const startOfWeekDate = new Date(startOfWeek);
    const endOfWeekDate = new Date(endOfWeek);

    const fetchedTeams = Object.keys(dataObject)
      .map((key) => ({
        id: key,
        ...dataObject[key],
        startDate: new Date(dataObject[key].startDate),
        endDate: new Date(dataObject[key].endDate),
      }))
      .filter(
        (team) =>
          team.startDate <= endOfWeekDate && team.endDate >= startOfWeekDate
      );

    setTeams(fetchedTeams);
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

    setWeek(expandedClasses);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + direction * 7);
    setCurrentWeek(newDate);
  };

  useEffect(() => {
    fetchTeams();
  }, [currentWeek]);

  useEffect(() => {
    fetchWeekClasses();
  }, [currentWeek]);

  const getISOWeekNumber = (date) => {
    const tempDate = new Date(date.getTime());
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    return Math.ceil(((tempDate - yearStart) / 86400000 + 1) / 7);
  };

  const today = new Date().toISOString().split("T")[0];

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
          ].map((day, index) => {
            const date = new Date(currentWeek);
            date.setDate(date.getDate() - date.getDay() + 1 + index);
            const dateString = date.toISOString().split("T")[0];

            return (
              <div
                key={index}
                className="p-4 flex flex-col items-center gap-4 md:px-0"
              >
                <h3
                  className={`font-semibold p-2 ${
                    dateString === today
                      ? "text-[color:--main] px-6 pb-0 border-b-2 border-[color:--main]"
                      : ""
                  }`}
                >
                  {day}
                </h3>
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
                        Pladser:{" "}
                        {team.maxParticipants - team.currentParticipants}
                      </p>
                      <div className="flex flex-col gap-3 items-center p-2 md:flex-row md:justify-center md:px-0 md:w-auto md:gap-1">
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
