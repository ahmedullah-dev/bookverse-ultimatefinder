import React from "react";
import { X } from "lucide-react";

const BookModal = ({ book, onClose }) => {
  if (!book) return null;

  const coverImg = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl max-w-md w-full p-6 relative shadow-2xl border border-white/20 dark:border-gray-700/20 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200"
        >
          <X size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        {coverImg && (
          <img
            src={coverImg}
            alt={book.title}
            className="w-40 h-60 object-cover mx-auto mb-6 rounded-xl shadow-lg"
          />
        )}
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">{book.title}</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">{book.author_name?.join(", ")}</p>
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <p><span className="font-semibold text-gray-800 dark:text-gray-200">First Published:</span> {book.first_publish_year || "Unknown"}</p>
          <p><span className="font-semibold text-gray-800 dark:text-gray-200">Language:</span> {book.language?.join(", ") || "Unknown"}</p>
          <p><span className="font-semibold text-gray-800 dark:text-gray-200">Publisher:</span> {book.publisher?.[0] || "Unknown"}</p>
          <p><span className="font-semibold text-gray-800 dark:text-gray-200">ISBN:</span> {book.isbn?.[0] || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;