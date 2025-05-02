import axios from "axios";
import { useEffect, useState } from "react";
import UploadBookForm from "../../components/UploadBookForm";

export default function ReadBooksFromNestJS() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/bookstore");
        setBooks(response.data);
      } catch (error) {
        setError("Failed to fetch books");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading)
    return <div className="text-center mt-10">Loading... Please wait.</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (books.length === 0)
    return <div className="text-center mt-10">No books found.</div>;

  console.log(books);

  //   return (
  //     <section className="text-gray-600 body-font">
  //       <div className="container px-5 mx-auto">
  //         <div className="flex flex-wrap -m-4">
  //           {books.map((data, index) => (
  //             <div className="p-4 md:w-1/4 pb-20" key={index}>
  //               <div className="h-auto border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
  //                 <img
  //                   className="h-[350px] w-full object-cover object-center"
  //                   src={data?.bookImageUrl}
  //                   alt={data?.bookName || "Book Cover"}
  //                 />
  //                 <div className="p-6">
  //                   <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
  //                     {data?.tags}
  //                   </h2>
  //                   <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
  //                     {data?.bookName}
  //                   </h1>
  //                   <p className="leading-relaxed mb-3">
  //                     {data?.bookCaption?.slice(0, 99)}...
  //                   </p>
  //                   <div className="flex items-center flex-wrap">
  //                     <a
  //                       href={data?.bookDownloadUrl}
  //                       className="text-indigo-500 inline-flex items-center hover:underline"
  //                       target="_blank"
  //                       rel="noopener noreferrer"
  //                     >
  //                       Download Now →
  //                     </a>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </section>
  //   );

  return <UploadBookForm />;
}
