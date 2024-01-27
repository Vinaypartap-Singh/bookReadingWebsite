import React, { useState } from "react";
import Button from "../utils/Button";
import IconButton from "../utils/IconButton";
import IconOnlyButton from "../utils/IconOnlyButton";
import { useAuth } from "../context/AuthContext";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, logOutUser } = useAuth();
  const [openNav, setOpenNav] = useState(false);

  const navItems = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Read Books",
      url: "/readBooks",
    },
  ];

  return (
    <div>
      {/* Mobile Navigation */}
      <div className="flex items-center justify-between p-4 md:hidden">
        <div>
          <h3 className="text-2xl font-semibold">BookVerse</h3>
        </div>
        <div>
          <IconOnlyButton
            outlined={true}
            onClick={() => setOpenNav(!openNav)}
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            }
          />
        </div>
        {/* Mobile Navigation */}

        <div
          className={`bg-red-100 h-screen w-full absolute ${
            openNav ? "top-0 left-0 p-10" : "left-[-1000px]"
          } transition-all z-10`}
        >
          <div className="flex items-end justify-end">
            <IconOnlyButton
              onClick={() => setOpenNav(!openNav)}
              outlined={true}
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              }
            />
          </div>
          {/* NavItems */}
          <div className="mt-10">
            <ul className="space-y-24">
              {navItems.map(({ title, url }, index) => {
                return (
                  <li key={index}>
                    <Link to={url} className="text-3xl">
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Buttons */}
          {currentUser ? (
            <div className="mt-20 flex justify-between">
              <Button
                outlined={true}
                title={"Upload Book"}
                onClick={() => navigate("/uploadBook")}
              />
              <Button outlined={true} title={"Log Out"} onClick={logOutUser} />
            </div>
          ) : (
            <div className="mt-20 flex justify-between">
              <Button
                outlined={true}
                title={"Sign up"}
                onClick={() => navigate("/register")}
              />
              <Button
                outlined={false}
                title={"Sign in"}
                onClick={() => navigate("/login")}
              />
            </div>
          )}
        </div>
      </div>
      {/* Parent Container */}
      <div className="hidden max-w-screen-xl m-auto p-4 md:flex items-center justify-between flex-wrap">
        {/* Brand Container Mobile*/}
        <div>
          <h3 className="text-2xl font-bold">BookVerse</h3>
        </div>
        {/* Nav */}
        <div className="gap-3 flex items-center">
          <ul className="flex items-center gap-4">
            {navItems.map(({ title, url }, index) => {
              return (
                <li key={index}>
                  <Link to={url}>{title}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Buttons */}
        {currentUser ? (
          <div className="space-x-2">
            <Button
              title={"Upload Book"}
              outlined={true}
              onClick={() => navigate("/uploadBook")}
            />
            <Button title={"Log Out"} onClick={logOutUser} />
          </div>
        ) : (
          <div className="space-x-2">
            <Button
              title={"Sign up"}
              outlined={true}
              onClick={() => navigate("/register")}
            />
            <Button title={"Sign in"} onClick={() => navigate("/login")} />
          </div>
        )}
      </div>
    </div>
  );
}
