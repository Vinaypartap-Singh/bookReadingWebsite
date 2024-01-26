import React from "react";

export default function Button({ title, onClick, outlined }) {
  return (
    <button
      onClick={onClick ? onClick : null}
      className={`${
        outlined ? "bg-transparent border border-gray-400" : "bg-black"
      } ${outlined ? "text-black" : "text-white"} px-6 py-3 rounded-lg`}
    >
      {title ? title : "Button"}
    </button>
  );
}
