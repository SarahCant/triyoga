//SARAH + SOFIE
"use client";
import Image from "next/image";

export default function PopUp({ popUpContent, isVisible, onClose }) {
  if (!isVisible) return null; // Don't render if not visible

  // Close PopUp when onclick on backdrop
  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") {
      onClose();
    }
  };

  return (
    <div
      id="backdrop"
      className="fixed inset-0 bg-black bg-opacity-20 z-40 flex justify-center items-center"
      onClick={handleBackdropClick}
    >
      <section className="bg-[color:#fff8e5] border-2 border-[color:--main] w-2/3 h-1/2 shadow-lg relative p-2">
        <Image
          src="/img/icons/x.png"
          width={30}
          height={30}
          className="absolute top-2 right-2 cursor-pointer"
          alt="Close PopUp"
          onClick={onClose}
        />
        <div>{popUpContent}</div>
      </section>
    </div>
  );
}
