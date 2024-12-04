import Image from "next/image";
import Calendar from "../components/Calendar";

export default async function Booking() {
  const response = await fetch(
    "https://triyoga-bbaf1-default-rtdb.firebaseio.com/teams.json"
  ); // fetch data from Firebase

  const dataObject = await response.json(); //convert response to JSON object
  //console.log(dataObject);

  const teams = Object.keys(dataObject).map((key) => {
    return {
      id: key,
      ...dataObject[key],
    };
  });

  //console.log(teams);

  return (
    <main className="md:pt-10">
      <h1 className="pb-4">Booking</h1>
      {/* outer border */}
      <div className="border-x-8 border-[color:--main] md:mx-20">
        {/* text section */}
        <div className="bg-[color:#F9DDC3] p-2 border-x-8 border-[color:#769975]">
          <p className="leading-7">
            <strong>I kalenderen nedenfor, </strong>
            ser du en oversigt over de yogahold og -workshops, som du kan
            tilmelde dig. For at tilmelde dig et bestemt hold, skal du trykke på
            “Book” knappen på dette hold. Herefter skal du oprette dig som
            bruger eller logge ind. Så bliver du ført til den endelige
            bookingside. Du kan læse mere om de enkelte tilbud ved at trykke på
            “Læs".
          </p>
          {/* icon section */}
          <section className="flex justify-evenly pt-6 pb-2 -ml-3 -mr-2.5 items-center">
            <div className="flex flex-col justify-center items-center ">
              <Image
                src="/img/icons/calendar.png"
                width={20}
                height={20}
                alt="Kalender"
              />
              <p className="leading-5 text-xs">Vælg hold</p>
            </div>

            <Image
              src="/img/icons/arrow-black.png"
              width={32}
              height={10}
              alt="Pil til højre"
            />

            <div className="flex flex-col justify-center items-center text-center">
              <Image
                src="/img/icons/profile.png"
                width={20}
                height={20}
                alt="Profil"
              />
              <p className="leading-4 text-xs">
                Log ind/
                <br />
                Opret bruger
              </p>
            </div>

            <Image
              src="/img/icons/arrow-black.png"
              width={32}
              height={10}
              alt="Pil til højre"
            />
            <div className="flex flex-col justify-center items-center">
              <Image
                src="/img/icons/checkmark.png"
                width={20}
                height={20}
                alt="Gennemført"
              />
              <p className="leading-5 text-xs">Book</p>
            </div>
          </section>
        </div>
      </div>

      {/* Calendar */}
      <h1 className="mt-8 mb-3">Kalender</h1>
      <Calendar />
    </main>
  );
}
