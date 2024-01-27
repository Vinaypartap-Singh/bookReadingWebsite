import React, { useEffect, useState } from "react";
import IconButton from "../utils/IconButton";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default function UploadBook() {
  // required Options: Title, Author, Genre/Category, Description/Summary, Upload PDF, Cover Image, Language
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [bookPdf, setBookPdf] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [language, setLanguage] = useState("");
  const [pdfProgress, setPdfProgress] = useState(null);

  const [uploadBookInfo, setUploadBookInfo] = useState({
    title: title,
    author: author,
    genre: genre,
    description: description,
    language: language,
  });

  const options = [
    {
      title: "Title",
      onChngeTxt: (e) => setTitle(e.target.value),
      inputType: "text",
    },
    {
      title: "Author Name",
      onChngeTxt: (e) => setAuthor(e.target.value),
      inputType: "text",
    },
    {
      title: "Genere/Category",
      onChngeTxt: (e) => setGenre(e.target.value),
      inputType: "text",
    },
    {
      title: "Description/Summary",
      onChngeTxt: (e) => setDescription(e.target.value),
      inputType: "text",
    },
    {
      title: "Language",
      onChngeTxt: (e) => setLanguage(e.target.value),
      inputType: "text",
    },
    {
      title: "Upload Book PDF",
      onChngeTxt: (e) => setBookPdf(e.target.files[0]),
      inputType: "file",
      acceptType: "pdf",
    },
    {
      title: "Book Cover Image",
      onChngeTxt: (e) => setCoverImage(e.target.files[0]),
      inputType: "file",
      acceptType: "image",
    },
  ];

  useEffect(() => {
    if (bookPdf === null) return;

    const storageRef = ref(storage, `bookPDF/${bookPdf.name + Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, bookPdf);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progresss =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPdfProgress(progresss);

        switch (snapshot.state) {
          case "paused":
            console.log("Paused");
            break;

          case "running":
            console.log("Running");
            break;

          case "success":
            alert("Image Uploaded");
            break;

          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((bookDownloadUrl) => {
            setUploadBookInfo((prev) => ({
              ...prev,
              bookPdfUrl: bookDownloadUrl,
            }));

            setUploadBookInfo((prev) => ({
              ...prev,
              title: title,
              author: author,
              genre: genre,
              description: description,
              language: language,
            }));
          })
          .catch((error) => {
            console.log("Pdf Error", error);
          });
      }
    );
  }, [bookPdf]);

  useEffect(() => {
    if (coverImage === null) return;

    const imageStorageRef = ref(
      storage,
      `coverImages/${coverImage.name + Date.now()}`
    );
    const uploadCoverImage = uploadBytesResumable(imageStorageRef, coverImage);

    uploadCoverImage.on(
      "state_changed",
      (snapshot) => {
        const progresss =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPdfProgress(progresss);
        switch (snapshot.state) {
          case "paused":
            console.log("Paused");
            break;

          case "running":
            console.log("Running");
            break;

          case "success":
            alert("Image Uploaded");
            break;

          default:
            break;
        }
      },
      (error) => {
        console.log("Book error", error);
      },
      () => {
        getDownloadURL(uploadCoverImage.snapshot.ref)
          .then((downloadURL) => {
            console.log("Image Uploaded");
            setUploadBookInfo((prev) => ({
              ...prev,
              coverImageURL: downloadURL,
            }));

            setUploadBookInfo((prev) => ({
              ...prev,
              title: title,
              author: author,
              genre: genre,
              description: description,
              language: language,
            }));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  }, [coverImage]);

  const getAllInfo = () => {
    if (
      author === "" ||
      title === "" ||
      genre === "" ||
      description === "" ||
      language === "" ||
      bookPdf === null ||
      coverImage === null
    ) {
      alert(
        "Please fill all the details and recheck whether it's correct or not."
      );
    } else {
      setUploadBookInfo((prev) => ({
        ...prev,
        title: title,
        author: author,
        genre: genre,
        description: description,
        language: language,
      }));

      console.log("Logged", uploadBookInfo);
      try {
        const bookDocRef = doc(db, "books", `${title}`);
        setDoc(bookDocRef, {
          uploadBookInfo,
        });

        alert("Book Uploaded Successfully.");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="max-w-7xl  m-auto p-5">
        <h1 className="text-2xl font-bold mt-10">Upload a Book</h1>
        <div className="mt-10 space-y-10">
          {options.map(
            ({ title, onChngeTxt, inputType, acceptType }, index) => {
              return (
                <div key={index}>
                  <label
                    htmlFor={inputType}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </label>
                  <div className="mt-2">
                    {inputType === "file" ? (
                      <input
                        id={inputType}
                        name={inputType}
                        type={inputType}
                        autoComplete={inputType === "email"}
                        onChange={onChngeTxt}
                        required
                        accept={
                          acceptType === "pdf" ? "application/pdf" : "image/*"
                        }
                        className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    ) : (
                      <input
                        id={inputType}
                        name={inputType}
                        type={inputType}
                        autoComplete={inputType === "email"}
                        onChange={onChngeTxt}
                        required
                        className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    )}
                  </div>
                </div>
              );
            }
          )}

          <div>
            <IconButton
              disabled={pdfProgress !== null && pdfProgress < 100}
              onClick={getAllInfo}
              title={"Upload"}
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
