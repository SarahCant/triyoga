//SOFIE
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="my-28 md:mt-52 md:mb-44 flex flex-col items-center text-center">
      <div className="w-4/5">
        <div className="flex justify-center">
          <Image src="/img/logo.png" width={50} height={50} alt="Logo" />
        </div>
        <h1 className="mt-5 mb-8">Hovsa, denne side er under udvikling</h1>
        <p className="text-lg">
          Men bare rolig, vi får dig tilbage til forsiden i løbet af en dyb
          vejrtrækning:
        </p>
        <div>
          <Link href="/">
            <button className="btns mt-6">Gå til forside</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
