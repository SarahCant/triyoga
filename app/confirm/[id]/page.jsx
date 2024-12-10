import Link from "next/link";
export default function Confirm() {
  return (
    <main className="flex flex-col items-center text-center">
      <div className="leading-snug mt-8">
        <h1>Booking bekræftigelse</h1>
        <p>Tillykke! Du er nu tilmeldt:</p>
      </div>

      <p className="my-4">
        <strong>
          Holdnavn: {} <br />
        </strong>
        Tidspunkt: {/* day */} kl. {/* time */}, uge {/* calc week */}
        Niveau:
      </p>

      <div>
        <p>
          Du kan se dine tilmeldte hold under
          <Link href="/profile">
            <button className="btns">Min profil</button>
          </Link>
        </p>
      </div>

      <Link href="/booking" className="mt-8 font-thin md:font-normal">
        <button className="btns">Tilbage til kalender</button>
      </Link>
    </main>
  );
}
