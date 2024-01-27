import React from "react";

export default function IconButton({
  icon,
  title,
  onClick,
  outlined,
  disabled,
}) {
  return (
    <button
      onClick={onClick ? onClick : null}
      disabled={disabled ? disabled : null}
      className={`${
        outlined ? "bg-transparent border border-gray-400" : "bg-black"
      } ${
        outlined ? "text-black" : "text-white"
      } px-6 py-3 rounded-lg flex items-center gap-1`}
    >
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
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      )}
      {title ? title : "Button"}
    </button>
  );
}
