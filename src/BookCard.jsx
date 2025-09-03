import React from "react";

const BookCard = ({ book, onClick, view }) => {
  const coverImg = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <div
      onClick={() => onClick(book)}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300 ${
        view === "list" ? "flex items-center gap-4 p-4" : "p-4"
      }`}
    >
      {coverImg ? (
        <img
          src={coverImg}
          alt={book.title}
          className={`${view === "list" ? "w-24 h-36" : "w-full h-60"} object-cover rounded-xl mb-3`}
          onError={(e) => (e.target.style.display = "none")}
        />
      ) : (
        <div
          className={`${
            view === "list" ? "w-24 h-36" : "w-full h-60"
          } bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium`}
        >
          No Cover
        </div>
      )}
      <div className={view === "list" ? "flex-1" : ""}>
        <h3 className="text-lg font-semibold line-clamp-2 text-gray-900 dark:text-white">{book.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{book.author_name?.join(", ")}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">📅 {book.first_publish_year || "N/A"}</p>
      </div>
    </div>
  );
};

export default BookCard;