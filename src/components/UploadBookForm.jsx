import axios from "axios";
import React, { useState } from "react";

export default function UploadBookForm() {
  const [form, setForm] = useState({
    bookName: "",
    bookCaption: "",
    tags: "",
    bookImage: null, // File object for cover
    bookPdfUrl: "", // URL string for PDF
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("api_key", import.meta.env.REACT_APP_CLOUDINARY_API_KEY);
    data.append("cloud_name", import.meta.env.REACT_APP_CLOUDINARY_CLOUD_NAME);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.REACT_APP_CLOUDINARY_CLOUD_NAME
      }/upload`,
      { method: "POST", body: data }
    );
    const json = await res.json();
    if (json.error) throw new Error(json.error.message);
    return json.secure_url; // Return the URL of the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage("");

    try {
      // 1️⃣ Upload the cover image first
      const coverUrl = await uploadImageToCloudinary(form.bookImage);

      // 2️⃣ Send everything as JSON to your backend
      const payload = {
        bookName: form.bookName,
        bookCaption: form.bookCaption,
        tags: form.tags,
        bookImageUrl: coverUrl,
        bookPdfUrl: form.bookPdfUrl,
      };

      const { data } = await axios.post(
        "http://localhost:3000/bookstore",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("Book uploaded successfully!");
      console.log(data);
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Failed to upload book");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow my-10">
      <h2 className="text-2xl font-bold mb-4">Upload a New Book</h2>
      {message && <p className="mb-4 text-blue-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="bookName"
          placeholder="Book Title"
          value={form.bookName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="bookCaption"
          placeholder="Book Caption"
          value={form.bookCaption}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <div>
          <label className="block mb-1 font-medium">Book Cover Image</label>
          <input
            type="file"
            name="bookImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Book PDF Download URL
          </label>
          <input
            type="url"
            name="bookPdfUrl"
            placeholder="https://example.com/book.pdf"
            value={form.bookPdfUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {uploading ? "Uploading..." : "Upload Book"}
        </button>
      </form>
    </div>
  );
}
