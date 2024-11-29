"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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
    <header className="p-6 fixed top-0">
      {/* Image tag logo */}

      {/* Burger Button - Hidden on md and larger */}
      <button
        onClick={handleClick}
        className="flex flex-col justify-center items-center md:hidden"
      >
        <span
          className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        ></span>
        <span
          className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        ></span>
      </button>

      {/* Navigation Links */}
      <nav
        className={`transition-all duration-300 ease-out h-fit w-full md:w-auto md:flex md:items-center ${
          isOpen ? "flex flex-col" : "hidden"
        }`}
      >
        <Link href="/" className="p-2 md:p-4">
          Forside
        </Link>
        <Link href="/about" className="p-2 md:p-4">
          Om TriYoga
        </Link>
        <Link href="/offers" className="p-2 md:p-4">
          Tilbud
        </Link>
        <Link href="/booking" className="p-2 md:p-4">
          Booking
        </Link>
        <Link href="/profile" className="p-2 md:p-4">
          <button>Min profil</button>
        </Link>
      </nav>
    </header>
  );
}
