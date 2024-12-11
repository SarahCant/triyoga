import Image from "next/image";
import Link from "next/link";
import NoticeBoardGallery from "./components/NoticeBoardGallery";

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <section className="hero justify-center sm:flex-row items-center mt-12 md:mt-24">
        {/* indsæt hero img med Image */}
        <Image
          src="/img/fp-hero.png"
          height={4000}
          width={3000}
          alt="yogastudie"
          className="w-full h-60 object-cover md:h-96"
        />
        <div className="flex flex-col items-center absolute top-20 left-0 right-0 text-[var(--background)]">
          <h1 className="drop-shadow-md tracking-wider text-4xl md:pt-28 md:text-7xl">
            TriYoga
          </h1>
          <h3 className="italic pt-2 text-xl md:text-2xl">
            Yoga for krop og sjæl
          </h3>
          <div className="flex mt-8 justify-center w-full pt-6 md:mt-12">
            <div className="w-24 md:w-32">
              <div className="relative flex justify-center items-center">
                <Image
                  src="/img/icons/yogi.png"
                  height={50}
                  width={50}
                  alt="yogi"
                  className="z-10 absolute w-10"
                />
                <span className="bg-[color:--background] block w-16 h-16 rounded-full absolute opacity-75"></span>
              </div>
              <p className="mt-6 text-center pt-2">yoga</p>
            </div>
            <div className="w-24 md:w-32">
              <div className="relative flex justify-center items-center">
                <Image
                  src="/img/icons/wave.png"
                  height={50}
                  width={50}
                  alt="bølge"
                  className="z-10 absolute w-14"
                />
                <span className="bg-[color:--background] block w-16 h-16 rounded-full absolute opacity-75"></span>
              </div>
              <p className="mt-6 text-center pt-2">åndedræt</p>
            </div>
            <div className="w-24 md:w-32">
              <div className="relative flex justify-center items-center">
                <Image
                  src="/img/icons/hand.png"
                  height={50}
                  width={50}
                  alt="hånd"
                  className="z-10 absolute w-13 pl-0.5"
                />
                <span className="bg-[color:--background] block w-16 h-16 rounded-full absolute opacity-75"></span>
              </div>
              <p className="mt-6 text-center pt-2">hånd mudras</p>
            </div>
          </div>
        </div>
      </section>
      <main className="max-w-4x1 mx-auto m-12 w-full">
        <div className="flex justify-center">
          <div className="w-4/5">
            <h2 className="text-center tracking-wider pt-3 pb-10 md:pt-5 md:pb-12">
              Velkommen til TriYoga Aarhus
            </h2>
          </div>
        </div>
        {/* About TriYoga and Vilhemlsborg */}
        <section className="flex justify-center text-center items-center md:pb-10">
          <div className="w-4/5 flex flex-col items-center md:flex-row md:items-start">
            <div className="pb-8 md:w-full">
              <h2 className="font-thin">TriYoga</h2>
              <p className="leading-10 text-base">
                Hos TriYoga Aarhus, bruger vi yoga, åndedræt og håndmudras til
                at bringe dig ned i kroppen, øge din kropsbevidsthed og løsne op
                for eventuelle spændinger, så energien kan flyde frit, så både
                krop og sind fyldes med fornyet energi.
              </p>
            </div>
            <div className="w-full flex justify-center items-center pb-8 md:px-20 md:max-w-96 md:min-w-96">
              <Image
                src="/img/fp-v.png"
                height={500}
                width={500}
                alt="Vilhelmsborg bygning"
                className="border-solid border-8 w-full border-[color:--orange]"
              />
            </div>
            <div className="pb-8 md:w-full">
              <h2 className="font-thin">Vilhelmsborg</h2>
              <p className="leading-10 text-base">
                Vi er så hedige at holde til i smukke Vilhelmsborg. Her er en
                fantastisk ro og atmosfære, da vi er omringet af den smukke
                park, skoven, rislende vandløb og fuglekvidder. Når vejret
                tillader det, trækker vi udenfor på plænen og nyder naturen.
              </p>
            </div>
          </div>
        </section>
        {/* Content divider */}
        <div className="flex items-center justify-center w-full">
          <span className="bg-[color:--main] block h-0.5 w-full"></span>
          <Image
            src="/img/logo.png"
            height={100}
            width={100}
            alt=""
            className="px-5"
          />
          <span className="bg-[color:--main] block h-0.5 w-full"></span>
        </div>
        {/* Notice Board with upcomming events */}
        <section className="flex flex-col items-center text-center pb-20">
          <div className="w-4/5">
            <h2 className="tracking-wider pt-16 pb-8">Opslagstavle</h2>
            <div className="md:relative">
              <div className="flex flex-col w-full md:flex-row">
                <p className="leading-10 text-base pb-5 md:text-left md:w-1/3">
                  Her finder du information om nuværende og kommende hold,
                  workshops og tilmeldingsfrister:
                </p>
                <div className="md:w-2/3 md:-mr-10">
                  <NoticeBoardGallery />
                </div>
              </div>
              <Link href="/booking">
                <button className="bg-[color:--main] text-[color:--background] rounded-3xl py-2 px-5 mt-10 active:bg-[#224021] active:border-[#224021] md:hover:bg-[#224021] md:hover:border-[#224021] md:float-left md:absolute md:top-[125px] md:left-0">
                  Gå til booking
                </button>
              </Link>
            </div>
          </div>
        </section>
        {/* Stretch of the week */}
        <section className="bg-[#F9DDC3] flex justify-center text-center items-center relative">
          <div className="w-4/5 flex flex-col items-center pt-4">
            <Image
              src="/img/logo.png"
              height={100}
              width={100}
              alt=""
              className="px-5 absolute -top-6"
            />
            <h2 className="tracking-wider pt-16 pb-8">Ugens stræk</h2>
            <div className="flex flex-col md:flex-row md:text-left md:pb-10">
              <div className="flex flex-col items-center pb-8">
                <Image
                  src="/img/fp-stretch.png"
                  height={400}
                  width={400}
                  alt="yogastilling"
                  className="border-solid border-8 border-[color:--background] md:min-w-96"
                />
              </div>
              <div className="md:pl-16">
                <h2 className="font-thin">Ardha Matsyendrasana</h2>
                <p className="leading-10 text-base pb-8">
                  Half Lord of the Fishes Pose på engelsk. Det er en siddende
                  vridningsposition, der strækker ryggen, åbner brystkassen og
                  giver et godt stræk i hofterne. Denne stilling er god for at
                  lindre smerter i lænden, taljen og bækkenområdet samt modvirke
                  rygspænding.
                </p>
                <p className="italic pb-8 text-xl leading-10 md:text-right">
                  &quot; Smile, breathe and go slowly. &quot;
                  <br />- Thich Nhat Hanh
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Newsletter */}
        <section className="flex justify-center text-center items-center">
          <div className="w-4/5 flex flex-col items-center pt-8">
            <h2 className="tracking-wider pt-8 pb-5">
              Tilmeld dig mit nyhedsbrev
            </h2>
            <p className="text-base">
              Her sender jeg nyt ud om mine hold og workshops.
            </p>
            <form>
              <label htmlFor="email"></label>
              <div className="pt-8 md:flex md:items-center">
                <div className="md:pr-3">
                  <input
                    type="email"
                    placeholder="Indtast din e-mail"
                    className="pl-3 rounded-3xl border-solid border-x border-y border-black h-8 w-72"
                  />
                </div>
                <div className="pt-5 md:pt-0">
                  <button className="bg-[color:--main] text-[color:--background] rounded-3xl py-2 px-8 active:bg-[#224021] md:hover:bg-[#224021] md:float-left">
                    Tilmeld
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
        {/* SoMe photos */}
        <section className="flex justify-center text-center items-center pt-10">
          <div className="w-4/5 flex flex-col items-center pt-12">
            <h2>Følg med på Instagram</h2>
            <div className="flex flex-col items-center md:flex-row md:justify-center md:gap-4">
              <Link href="https://www.instagram.com/birgitte_eichild/">
                <div>
                  <Image
                    src="/img/fp-ig-1.png"
                    height={300}
                    width={300}
                    alt=""
                    className="my-5 w-72 h-72 object-cover md:mx-5"
                  />
                </div>
              </Link>
              <Link href="https://www.instagram.com/birgitte_eichild/">
                <div>
                  <Image
                    src="/img/fp-ig-2.png"
                    height={300}
                    width={300}
                    alt=""
                    className="hidden my-5 w-72 h-72 object-cover md:mx-5 md:flex"
                  />
                </div>
              </Link>
              <Link href="https://www.instagram.com/birgitte_eichild/">
                <div>
                  <Image
                    src="/img/fp-ig-3.png"
                    height={300}
                    width={300}
                    alt=""
                    className="hidden my-5 w-72 h-72 object-cover md:mx-5 md:flex"
                  />
                </div>
              </Link>
            </div>
            <Link href="https://www.instagram.com/birgitte_eichild/">
              <h3>@birgitte_eichild</h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
