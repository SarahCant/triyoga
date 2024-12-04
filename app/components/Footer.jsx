import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[color:--main] text-[color:--background] p-6 md:px-20">
      <div className="flex flex-col items-center gap-10 md:grid md:grid-cols-2 md:items-start md:pt-2">
        {/* contact section */}
        <section className="flex flex-col gap-3 items-center md:items-start">
          <h3 className="text-center md:text-left">Kontakt</h3>
          <div className="flex items-center gap-3">
            <Image
              src="/img/icons/mail.png"
              width={20}
              height={20}
              alt="E-mail"
            />
            <p>birgitteeichild@hotmail.com</p>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/img/icons/phone.png"
              width={20}
              height={20}
              alt="Telefon"
            />
            <p>+45 40 95 29 65</p>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/img/icons/pin.png"
              width={20}
              height={20}
              alt="Adresse"
            />
            <p>Bedervej 101 8320 Mårslet</p>
          </div>
        </section>

        {/* SoMe section*/}
        <section className="flex flex-col items-center gap-3 md:items-end">
          <h3 className="text-center md:text-right">Følg med</h3>
          <div className="flex gap-5">
            <Link href="https://www.facebook.com/triyogaAarhus/">
              <Image
                src="/img/icons/fb.png"
                width={30}
                height={30}
                alt="Facebook"
              />
            </Link>
            <Link href="https://www.instagram.com/birgitte_eichild/">
              <Image
                src="/img/icons/ig.png"
                width={30}
                height={30}
                alt="Instagram"
              />
            </Link>
          </div>
        </section>
      </div>
      {/* logo */}
      <div className="flex justify-center mt-10 md:mt-5 opacity-70">
        <Link href="/">
          <Image src="/img/logo.png" width={50} height={50} alt="Logo" />
        </Link>
      </div>
    </footer>
  );
}
