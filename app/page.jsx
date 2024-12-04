import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-4x1 mx-auto mt-12 md:mt-24">
      <section className="hero justify-center sm:flex-row items-center mb-12">
        {/* indsæt hero img med Image */}
        <Image
          src="/img/hero.png"
          height={4000}
          width={3000}
          alt="yogastudie"
          className="w-full h-full"
        />
        <div className="flex flex-col items-center absolute top-20 left-0 right-0">
          <h1 className="text-3xl">TriYoga</h1>
          <h3 className="italic">Yoga for krop og sjæl</h3>
          <div className="flex">
            <div>
              <Image
                src="/img/icons/yogi.png"
                height={50}
                width={50}
                alt="yogi"
              />
              <p>yoga</p>
              <span className="bg-white block w-10 h-10 rounded-3xl"></span>
            </div>
            <div>
              <Image
                src="/img/icons/wave.png"
                height={50}
                width={50}
                alt="yogi"
              />
              <p>åndedræt</p>
            </div>
            <div>
              <Image
                src="/img/icons/hand.png"
                height={50}
                width={50}
                alt="yogi"
              />
              <p>hånd mudras</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2>Velkommen til TriYoga Aarhus</h2>
      </section>
    </main>
  );
}
