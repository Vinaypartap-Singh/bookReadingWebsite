import React from "react";
import Book1Image from "../assets/book1.jpg";
import Book2Image from "../assets/book2.jpg";
import Book3Image from "../assets/book3.jpg";
import Book4Image from "../assets/book4.jpg";
import Book5Image from "../assets/book5.jpg";
import Book6Image from "../assets/book6.jpg";
import IconButton from "../utils/IconButton";

export default function HeroSection() {
  const imagesData = [
    {
      image: Book1Image,
      rotate: "rotate-12",
      position: "top-10 start-0",
    },
    {
      image: Book2Image,
      rotate: "rotate-[-12deg]",
      position: "top-10 left-[40%]",
    },
    {
      image: Book3Image,
      rotate: "rotate-12",
      position: "top-10 end-0",
    },
    {
      image: Book4Image,
      rotate: "rotate-12",
      position: "bottom-0 start-0",
    },
    {
      image: Book5Image,
      rotate: "rotate-12",
      position: "bottom-0 left-[40%]",
    },
    {
      image: Book6Image,
      rotate: "rotate-12",
      position: "bottom-0 end-0",
    },
  ];
  return (
    <div>
      <div className="min-h-[78vh] w-full m-auto relative flex items-center">
        {/* Images Div Section */}
        <div>
          {imagesData.map(({ image, rotate, position }, index) => {
            return (
              <img
                className={`absolute ${position} z-[-1] rounded-lg ${rotate} opacity-10 hover:z-[1] hover:opacity-100 transition-all w-96 h-96 object-contain`}
                src={image}
              />
            );
          })}
        </div>
        {/* Content Div */}
        <div className="max-w-7xl m-auto space-y-10">
          <h1 className="text-5xl leading-normal lg:text-7xl text-center lg:leading-relaxed z-10">
            Bookverse: Explore, Share, Read – Your Unlimited Library Online
          </h1>
          <div className="z-10 flex justify-center gap-10">
            <IconButton
              title={"Read Books"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              }
            />
            <IconButton
              outlined={true}
              title={"Upload Book"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
