"use client";
import Image from "next/image";

export default function ReadMorePopUp({ selectedClass, modalType, onClose }) {
  if (!selectedClass || modalType !== "Læs") return null;

  //close popup on clicks outside of it
  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") {
      onClose();
    }
  };

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
    <div
      id="backdrop"
      className="fixed inset-0 bg-black bg-opacity-20 z-40 flex justify-center items-center"
      onClick={handleBackdropClick}
    >
      <section className="bg-[color:#fff8e5] border-2 border-[color:--main] w-10/12 h-2/3 shadow-lg relative p-3 overflow-y-auto md:w-6/12">
        {/* enable scroll if needed */}
        <Image
          src="/img/icons/x.png"
          width={25}
          height={25}
          alt="Luk Pop-Up"
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer"
        />
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

          <Image
            src={selectedClass.imageURL}
            alt="Undervisningsbillede"
            width={500}
            height={200}
            className="m-auto py-3 md:size-2/3 md:col-start-2 md:row-start-1 md:row-span-2 "
          />
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
    </div>
  );
}
