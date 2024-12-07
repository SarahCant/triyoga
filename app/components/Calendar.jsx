"use client";
import { useEffect, useState } from "react";
import { fetchClassesForWeek } from "../firebase-config";
import Image from "next/image";

const Calendar = () => {
  const [week, setWeek] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(null);
  const [modalType, setModalType] = useState(null);

  const calculateWeekDates = (date) => {
    const monday = new Date(date);

    const day = monday.getDay() || 7; // Mon is 1, Sun is 7
    if (day !== 1) monday.setDate(monday.getDate() - day + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6); //Sun = Mon + 6 --> Sun = 7th day
    return { startOfWeek: monday, endOfWeek: sunday }; //startofWeek = Mon, endOfWeek = Sun
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

  // idé }, [fetchClassesForWeek, currentWeek]);

  const getISOWeekNumber = (date) => {
    const tempDate = new Date(date.getTime());
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    return Math.ceil(((tempDate - yearStart) / 86400000 + 1) / 7);
  };

  return (
    <div className="border-2 border-[color:#814F26] w-10/12 mx-auto my-11">
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
              key={index}
              className="p-4 flex flex-col items-center gap-4 md:px-0"
            >
              <h3 className="font-semibold">{day}</h3> {/* class cards */}
              {week
                .filter((c) => c.actualDate === currentDay)
                .map((c, i) => (
                  <div
                    key={i}
                    className="border p-2 w-full md:border-none"
                    style={{ backgroundColor: c.color }}
                  >
                    <div className="flex md:flex-col md:items-center">
                      <div className="w-2/3 md:w-auto">
                        <p className="text-s md:text-nowrap">
                          {c.startTime} - {c.endTime}
                        </p>
                        <p className="text-m font-semibold md:text-nowrap">
                          {c.name}
                        </p>
                        <p className="text-xs">{c.niveau}</p>

                        <p className="text-xs pt-2 md:pt-0">
                          Pladser: {c.maxParticipants - c.currentParticipants}
                        </p>
                      </div>
                      {/* buttons */}
                      <div className="flex flex-col gap-3 items-center p-2 md:flex-row md:items-baseline md:px-0 md:w-auto md:gap-1">
                        <button
                          className="btns text-xs md:px-3"
                          onClick={() => {
                            setSelectedClass(c);
                            setModalType("Læs mere");
                          }}
                        >
                          Læs
                        </button>

                        <button
                          className="btns text-xs md:px-3"
                          onClick={() => {
                            setSelectedClass(c);
                            setModalType("Book");
                          }}
                        >
                          Book
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
  );
};

export default Calendar;
