import React, { useState } from "react";
import IconButton from "../utils/IconButton";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function RegisterAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createUser } = useAuth();

  const fields = [
    {
      title: "Username",
      onTextChange: (text) => setUsername(text.target.value),
      inputType: "text",
    },
    {
      title: "Email",
      onTextChange: (text) => setEmail(text.target.value),
      inputType: "email",
    },
    {
      title: "Password",
      onTextChange: (text) => setPassword(text.target.value),
      inputType: "password",
    },
  ];

  const registerUser = () => {
    if (username === "" || email === "" || password === "") {
      alert("Please fill all the details to continue");
    } else {
      createUser(email, password);
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create An Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            {fields.map(({ title, onTextChange, inputType }, index) => {
              return (
                <div>
                  <label
                    htmlFor={inputType}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={onTextChange}
                      id={inputType}
                      name={inputType}
                      type={inputType}
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              );
            })}

            <div>
              <IconButton
                title={"Create Account"}
                onClick={registerUser}
                icon={
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
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                }
              />
            </div>
          </div>

          <p className="mt-10 text-sm text-gray-500">
            Already have an account?
            <a
              href="#"
              className="font-semibold leading-6 text-black hover:underline transition-all"
            >
              {" "}
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
