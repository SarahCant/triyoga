import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer bg-[color:--main] text-[color:--background] flex flex-col p-6 gap-8 items-center md:flex-row md:justify-between">
      <section className="footer-contact flex flex-col justify-between gap-3 items-center">
        <h3 className="text-center">Kontakt</h3>
        <div className="flex flex-row gap-2">
          <img src="/img/icons/mail.png" alt="E-mail" className="h-4" />
          <p>birgitteeichild@hotmail.com</p>
        </div>
        <p className="flex flex-row gap-2">
          <Image
            src="/img/icons/phone.png"
            width={20}
            height={20}
            alt="Telefon"
          ></Image>
          +45 40 95 29 65
        </p>
        <p className="flex flex-row gap-2">
          <Image
            src="/img/icons/pin.png"
            width={20}
            height={20}
            alt="Adresse"
          ></Image>
          Bedervej 101 8320 Mårslet
        </p>
      </section>
      <section className="footer-some">
        <h3>Følg med</h3>
        <div className="flex flex-row gap-5">
          <Link href="https://www.facebook.com/triyogaAarhus/">
            <Image
              src="/img/icons/fb.png"
              width={20}
              height={20}
              alt="Facebook"
            ></Image>
          </Link>

          <Link href="https://www.instagram.com/birgitte_eichild/">
            <Image
              src="/img/icons/ig.png"
              width={40}
              height={40}
              alt="Instagram"
            ></Image>
          </Link>
        </div>
      </section>
      {/* logo */}
    </footer>
  );
}
