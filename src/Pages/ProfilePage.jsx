import { doc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import TextOnlyButton from "../utils/TextOnlyButton";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    const userDocRef = doc(db, "users", `${auth.currentUser.uid}`);
    const userDocSnap = onSnapshot(userDocRef, (doc) => {
      const userData = [];
      userData.push({
        id: doc.id,
        ...doc.data(),
      });
      setUserProfile(userData);
    });
  }, []);
  return (
    <div className="max-w-7xl m-auto">
      {userProfile?.map((data, index) => {
        console.log(data);
        return (
          <div key={index} className="px-3 space-y-3">
            <h1 className="text-2xl">Hello, {data.username}</h1>
            <p className="text-gray-400">
              If you have published, saved any book. All the information will be
              displayed here.
            </p>
            {data.booksPublished.length > 0 ? (
              <div>
                <h3 className="text-3xl mb-3">Books You Shared</h3>
                <section class="text-gray-600 body-font">
                  <div class="container px-5  mx-auto">
                    <div class="flex flex-wrap -m-4">
                      {data.booksPublished.map((uploadBookInfo, index) => {
                        return (
                          <div class="p-4 md:w-1/3 pb-20" key={index}>
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
              </div>
            ) : (
              <p>No Book Published Yet. Upload A Book To View Here</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
