import Image from "next/image";

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
    <main className="px-4 md:pt-10">
      <h1 className="text-center">Booking</h1>
      {/* text section */}
      <div className="border-x-8 border-[color:--main]">
        {/* outer border */}
        <div className="bg-[color:--orange] p-4 border-x-8 border-[color:#769975] ">
          <p>
            I kalenderen nedenfor, ser du en oversigt over de yogahold og
            -workshops, som du kan tilmelde dig. For at tilmelde dig et bestemt
            hold, skal du trykke på “Book” knappen på dette hold. Herefter skal
            du oprette dig som bruger eller logge ind. Så bliver du ført til den
            endelige bookingside. Du kan læse mere om de enkelte tilbud ved at
            trykke på “Læs mere”.
          </p>
          {/* icon section */}
          <section className="flex justify-evenly py-8 items-center">
            <div className="flex flex-col justify-center items-center ">
              <Image
                src="/img/icons/calendar.png"
                width={30}
                height={30}
                alt="Kalender"
              />
              <p>Vælg hold</p>
            </div>
            <Image
              src="/img/icons/arrow-black.png"
              width={30}
              height={10}
              alt="Pil til højre"
            />

            <div className="flex flex-col justify-center items-center text-center">
              <Image
                src="/img/icons/profile.png"
                width={30}
                height={30}
                alt="Profil"
              />
              <p>
                Log ind/
                <br />
                Opret bruger
              </p>
            </div>

            <Image
              src="/img/icons/arrow-black.png"
              width={30}
              height={10}
              alt="Pil til højre"
            />
            <div className="flex flex-col justify-center items-center">
              <Image
                src="/img/icons/checkmark.png"
                width={30}
                height={30}
                alt="Gennemført"
              />
              <p>Book</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
