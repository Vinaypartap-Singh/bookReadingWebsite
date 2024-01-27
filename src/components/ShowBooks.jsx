import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import TextOnlyButton from "../utils/TextOnlyButton";

export default function ShowBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const bookRef = collection(db, "books");

    const unsubscribe = onSnapshot(bookRef, (snapshot) => {
      let documents = [];
      snapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      setBooks(documents);
    });

    return unsubscribe;
  }, []);
  return (
    <div>
      {books ? (
        <section class="text-gray-600 body-font">
          <div class="container px-5  mx-auto">
            <div class="flex flex-wrap -m-4">
              {books.map(({ uploadBookInfo }, index) => {
                return (
                  <div class="p-4 md:w-1/4 pb-20">
                    <div class="h-auto border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                      <img
                        class="h-[350px] w-full object-cover object-center"
                        src={uploadBookInfo.coverImageURL}
                        alt="blog"
                      />
                      <div class="p-6">
                        <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          {uploadBookInfo.genre}
                        </h2>
                        <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                          {uploadBookInfo.title}
                        </h1>
                        <p class="leading-relaxed mb-3">
                          {uploadBookInfo.description.slice(0, 99)}...
                        </p>
                        <div class="flex items-center flex-wrap ">
                          <TextOnlyButton
                            title={"Download Now"}
                            href={uploadBookInfo.bookPdfUrl}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <div>Loading Please Wait</div>
      )}
    </div>
  );
}
