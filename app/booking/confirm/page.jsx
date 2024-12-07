export default function Confirm() {
  return (
    <main>
      <div className="flex flex-col text-center mb-4">
        <h1>Din booking</h1>
        <p>Du er ved at tilmelde dig følgende hold</p>
      </div>
      <div className="border-x-8 border-[color:--main] md:mx-20">
        <div className="bg-[color:#F9DDC3] p-2 border-x-8 border-[color:#769975]">
          <article className="leading-7">
            <h2>Holdnavn: {}</h2>
            <p>
              Tidspunkt: {} <br />
              Niveau {} <br /> <strong>Pris: {}</strong>
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
