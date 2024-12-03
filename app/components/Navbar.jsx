"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the burger menu
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  //close burger on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    //event listener for window resize
    window.addEventListener("resize", handleResize);

    //cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="px-4 py-3 fixed top-0 bg-[#fbf9ec] w-full md:py-2">
        <div className="flex items-center justify-between md:justify-center">
          {/* Logo */}
          <div>
            <Image
              src="/img/logo.png"
              height={55}
              width={55}
              alt="logo"
              className="md:pt-1"
            />
          </div>
          <div>
            {/* Burger Button - Hidden on md and larger */}
            <button
              onClick={handleClick}
              className="flex flex-col justify-center items-center float-right md:hidden"
            >
              <div className="flex flex-col items-center w-10">
                <div>
                  <span
                    className={`bg-[color:--main] block transition-all duration-300 ease-out h-0.5 w-7 rounded-sm ${
                      isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                    }`}
                  ></span>
                  <span
                    className={`bg-[color:--main] block transition-all duration-300 ease-out h-0.5 w-7 rounded-sm my-0.5 ${
                      isOpen ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`bg-[color:--main] block transition-all duration-300 ease-out h-0.5 w-7 rounded-sm ${
                      isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                    }`}
                  ></span>
                </div>
                <div>
                  <p className="pt-1 text-[color:--main] text-xs w-7 md:hidden">
                    Menu
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav
          className={`bg-[#fbf9ec] text-center transition-all duration-300 ease-out h-fit w-full md:w-auto md:flex md:justify-center md:items-center ${
            isOpen ? "flex flex-col" : "hidden"
          }`}
        >
          <Link href="/" className="p-3 pt-5 text-black md:py-1 md:w-36">
            Forside
          </Link>
          <Link href="/about" className="p-3 text-black md:py-1 md:w-36">
            Om TriYoga
          </Link>
          <Link href="/offers" className="p-3 text-black md:py-1 md:w-36">
            Tilbud
          </Link>
          <Link href="/booking" className="p-3 text-black md:py-1 md:w-36">
            Booking
          </Link>
          <Link href="/contact" className="p-3 text-black md:py-1 md:w-36">
            <button>Kontakt</button>
          </Link>
          <Link href="/profile" className="p-3 text-[#FBF9EC] md:py-1 md:w-36">
            <button className="bg-[#396238] rounded-3xl py-2 px-5">
              Min profil
            </button>
          </Link>
        </nav>
        <span className="bg-[color:--main] block h-0.5 w-full z-10"></span>
      </header>
    </>
  );
}
