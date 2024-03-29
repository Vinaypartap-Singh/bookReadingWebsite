import React from "react";
import { Link } from "react-router-dom";

export default function TextOnlyButton({
  icon,
  title,
  href,
  disabled,
  siteLink,
}) {
  return (
    <>
      {siteLink ? (
        <Link to={href ? href : "#"} className={`flex items-center `}>
          {title ? title : "Button"}
        </Link>
      ) : (
        <a
          target="_blank"
          href={href ? href : "#"}
          className={`flex items-center gap-1 text-gray-500  hover:border-b hover:text-red-500 tracking-wider`}
        >
          {title ? title : "Button"}{" "}
          {icon ? (
            icon
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          )}
        </a>
      )}
    </>
  );
}
