"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Toggle the burger menu
  const handleClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(!isOpen);
    }
  };

  // Close burger when logo is clicked
  const handleLogoClick = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
    }
  };

  // Close burger on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className=" py-3 fixed top-0 bg-[color:--background] w-full z-20 md:py-2">
        <div className="flex items-center justify-between md:justify-center">
          {/* Logo */}
          <div>
            <Link href="/" onClick={handleLogoClick}>
              <Image
                src="/img/logo.png"
                height={55}
                width={55}
                alt="logo"
                className="pl-4 md:pt-1 md:pl-0"
              />
            </Link>
          </div>
          <div>
            {/* Burger Button - Hidden on md and larger */}
            <button
              onClick={handleClick}
              className="flex flex-col justify-center items-center float-right md:hidden"
            >
              <div className="flex flex-col items-center w-10 pr-4">
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
          className={`font-sans-[encode-sans-expanded] bg-[color:--background] text-black  text-center transition-all duration-300 ease-out h-fit w-full md:w-auto md:flex md:justify-center md:items-center ${
            isOpen ? "flex flex-col" : "hidden"
          }`}
        >
          <Link
            href="/"
            onClick={handleClick}
            className={`p-3 pt-5 active:text-[var(--main)] md:py-1 md:w-32 md:hover:text-[var(--main)] ${
              pathname === "/"
                ? "active underline underline-offset-4 text-[var(--main)]"
                : ""
            }`}
          >
            Forside
          </Link>
          <Link
            href="/about"
            onClick={handleClick}
            className={`p-3 pt-5 active:text-[var(--main)] md:py-1 md:w-32 md:hover:text-[var(--main)] ${
              pathname === "/about"
                ? "active underline underline-offset-4 text-[var(--main)]"
                : ""
            }`}
          >
            Om TriYoga
          </Link>
          <Link
            href="/offers"
            onClick={handleClick}
            className={`p-3 pt-5 active:text-[var(--main)] md:py-1 md:w-32 md:hover:text-[var(--main)] ${
              pathname === "/offers"
                ? "active underline underline-offset-4 text-[var(--main)]"
                : ""
            }`}
          >
            Tilbud
          </Link>
          <Link
            href="/booking"
            onClick={handleClick}
            className={`p-3 pt-5 active:text-[var(--main)] md:py-1 md:w-32 md:hover:text-[var(--main)] ${
              pathname === "/booking"
                ? "active underline underline-offset-4 text-[var(--main)]"
                : ""
            }`}
          >
            Booking
          </Link>
          <Link
            href="/contact"
            onClick={handleClick}
            className={`p-3 pt-5 active:text-[var(--main)] md:py-1 md:w-32 md:hover:text-[var(--main)] ${
              pathname === "/contact"
                ? "active underline underline-offset-4 text-[var(--main)]"
                : ""
            }`}
          >
            Kontakt
          </Link>
          <Link
            href="/profile"
            onClick={handleClick}
            className="p-2 text-[var(--background)] md:py-1 md:w-32"
          >
            <button
              className={`bg-[color:--main] rounded-3xl py-2 px-5 border-solid border-2 border-[color:--main] active:bg-[#224021] active:border-[#224021] md:hover:bg-[#224021] md:hover:border-[#224021] ${
                pathname === "/profile"
                  ? "active bg-[var(--background)] text-[var(--main)] border-solid border-2 border-[color:--main] hover:text-[var(--background)]"
                  : ""
              }`}
            >
              Min profil
            </button>
          </Link>
        </nav>
        <span className="bg-[color:--main] block h-0.5 w-full z-10 absolute bottom-0"></span>
      </header>
    </>
  );
}
