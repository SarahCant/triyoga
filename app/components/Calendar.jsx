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

    const day = monday.getDay() || 7; // Monday is 1, Sunday is 7
    if (day !== 1) monday.setDate(monday.getDate() - day + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
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

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        const dayOfWeek = d
          .toLocaleString("default", { weekday: "long" })
          .toLowerCase();
        if (dayOfWeek === c.day.toLowerCase()) {
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
    <div className="border-2 border-[color:#814F26]">
      <div className="flex items-center justify-between bg-[color:#F6B485] bg-opacity-60 p-4 border-b-2 border-[color:#814F26]">
        <button onClick={() => navigateWeek(-1)}>
          <Image
            src="/img/icons/arrow-brown.png"
            width={35}
            height={20}
            alt="Pil til venstre"
          />
          Forrige uge
        </button>
        <h1 className="text-lg font-bold">
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
            className="scale-x-[-1] ml-10"
          />
          Næste uge
        </button>
      </div>

      <div className="grid grid-cols-7 bg-[color:--orange] divide-x divide-[color:#814F26] text-center">
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
              className="p-4 bg-[color:--background] flex flex-col items-center gap-4"
            >
              <h3 className="font-semibold">{day}</h3>

              {/* class cards */}
              {week
                .filter((c) => c.actualDate === currentDay)
                .map((c, i) => (
                  <div
                    key={i}
                    className="border p-2 w-full"
                    style={{ backgroundColor: c.color }}
                  >
                    <p className="text-s">{c.startTime}</p>
                    <p className="text-m font-semibold">{c.name}</p>
                    <p className="text-xs">{c.niveau}</p>
                    <p className="text-xs">
                      Pladser: {c.maxParticipants - c.currentParticipants}
                    </p>

                    {/* buttons */}
                    <div className="flex justify-evenly">
                      <button
                        className="bg-[color:--main] text-[--background] p-1.5 rounded-xl text-xs"
                        onClick={() => {
                          setSelectedClass(c);
                          setModalType("Læs mere");
                        }}
                      >
                        Læs
                      </button>

                      <button
                        className="bg-[color:--main] text-[--background] p-1.5 rounded-xl text-xs"
                        onClick={() => {
                          setSelectedClass(c);
                          setModalType("Book");
                        }}
                      >
                        Book
                      </button>
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
