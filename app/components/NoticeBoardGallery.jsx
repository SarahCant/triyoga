"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      bgImage: "/img/fp-nb-1.png",
      headline: "Nytårsworkshop",
      text: "Denne workshop er for alle - vi skal lave skønne, rolige TriYoga flows og afspænding med klangskåle.",
      dateTime: "Søndag d. 5/1-2025 kl. 10.00 - 13.00",
    },
    {
      bgImage: "/img/fp-nb-2.png",
      headline: "1-dags yoga-retreat",
      text: "Vi skal både lave triyoga flows, afspænding og restorativ yoga.",
      dateTime: "Søndag d. 25/5-2025 kl. 10.00 - 15.30",
    },
    {
      bgImage: "/img/fp-nb-3.png",
      headline: "Tilmeldingsfrist til hensynstagende yogahold",
      text: "Så er det ved at være tid til at tilmelde dig næste runde af hensynstagende yogahold.",
      dateTime: "Frist: søndag d. 22/12-2025",
    },
    {
      bgImage: "/img/fp-nb-4.png",
      headline: "Tilmeldingsfrit til yoga for mænd",
      text: "Så er det ved at være tid til at tilmelde dig næste runde af yoga for mænd.",
      dateTime: "Frist: søndag d. 22/12-2025",
    },
    {
      bgImage: "/img/fp-nb-5.png",
      headline: "Tilmeldingsfrist til yogahold fra basic til level 2",
      text: "Så er det ved at være tid til at tilmelde dig næste runde af yogahold fra basic til level 2.",
      dateTime: "Frist: søndag d. 22/12-2025",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <button onClick={prevSlide} className="transform -translate-y-1/2">
          <Image
            src="/img/icons/arrow-brown.png"
            height={50}
            width={50}
            alt=""
          />
        </button>

        <div className="w-full h-[400px] relative mx-4 md:h-[300px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`top-0 left-0 w-full h-full transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.bgImage}
                layout="fill"
                alt=""
                className="object-cover"
              />
              <div className="absolute inset-0 bg-white bg-opacity-40 flex items-center justify-center">
                <div className="bg-[color:--orange] p-8 max-w-md">
                  <h2 className="text-base font-bold mb-2">{slide.headline}</h2>
                  <p className="mb-4">{slide.text}</p>
                  <p className="text-sm text-black font-bold">
                    {slide.dateTime}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className=" top-1/2 -right-14 transform -translate-y-1/2"
        >
          <Image
            src="/img/icons/arrow-brown.png"
            height={50}
            width={50}
            alt=""
            className="scale-x-[-1]"
          />
        </button>
      </div>

      <div className="flex justify-center space-x-2 mt-4 relative z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide
                ? "bg-[#804F26]"
                : "bg-[#804F26] bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
