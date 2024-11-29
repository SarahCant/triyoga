import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-4x1 mx-auto">
      <section className="hero justify-center sm:flex-row items-center mb-12">
        {/* indsæt hero img med Image */}
        <div className="flex flex-col items-center">
          <h1>TriYoga</h1>
          <h3 className="italic">Yoga for krop og sjæl</h3>
        </div>
      </section>
    </main>
  );
}
