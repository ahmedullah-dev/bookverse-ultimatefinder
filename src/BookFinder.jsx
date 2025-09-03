import React, { useState, useEffect, useRef, useMemo } from "react";
import { Search, Loader2, LayoutGrid, List, Filter, X } from "lucide-react";
import BookCard from "./BookCard";
import BookModal from "./BookModal";

const BookFinder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ year: "", language: "", isbn: "" });
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [view, setView] = useState("grid");
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const searchBooks = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError("");
    try {
      const encodedQuery = encodeURIComponent(searchQuery);
      let apiUrl = `https://openlibrary.org/search.json?${searchType}=${encodedQuery}&limit=20`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setBooks(data.docs || []);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (books) => {
    return books.filter((book) => {
      const matchYear = filters.year ? book.first_publish_year?.toString() === filters.year : true;
      const matchLang = filters.language ? book.language?.includes(filters.language.toLowerCase()) : true;
      const matchIsbn = filters.isbn ? book.isbn?.includes(filters.isbn) : true;
      return matchYear && matchLang && matchIsbn;
    });
  };

  const filteredBooks = useMemo(() => applyFilters(books), [books, filters]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchBooks();
  };

  const handleExampleSearch = (query, type) => {
    setSearchQuery(query);
    setSearchType(type);
    searchBooks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 flex flex-col transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400 flex items-center gap-2 animate-fadeIn">
            <span className="text-5xl">📚</span>
            <span>
              Book<span className="text-pink-500 dark:text-pink-400">Verse</span>
              <span className="ml-2 text-base font-bold text-indigo-500 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900 px-2 py-1 rounded-full shadow">Ultimate Finder</span>
            </span>
          </h1>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto">
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-500 flex items-center gap-1 transition-all duration-200 shadow-md">
            Home
          </button>
          <div className="relative flex-1 w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Search by ${searchType}...`}
                className="pl-10 pr-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
              />
            </div>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="subject">Subject</option>
              <option value="isbn">ISBN</option>
            </select>
            <button
              onClick={searchBooks}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-500 flex items-center gap-1 transition-all duration-200 shadow-md"
            >
              <Search size={18} /> Search
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-1 transition-all duration-200"
            >
              <Filter size={18} /> Filters
            </button>
          </div>
        </div>
      </header>

      {showFilters && (
        <div className="bg-white dark:bg-gray-800 shadow-md max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-4 animate-fadeIn">
          <input
            type="number"
            placeholder="Publish Year"
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            className="px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 flex-1 min-w-[150px]"
          />
          <input
            type="text"
            placeholder="Language (e.g., eng)"
            value={filters.language}
            onChange={(e) => setFilters({ ...filters, language: e.target.value })}
            className="px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 flex-1 min-w-[150px]"
          />
          <input
            type="text"
            placeholder="ISBN"
            value={filters.isbn}
            onChange={(e) => setFilters({ ...filters, isbn: e.target.value })}
            className="px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 flex-1 min-w-[150px]"
          />
          <button
            onClick={() => setFilters({ year: "", language: "", isbn: "" })}
            className="text-red-600 dark:text-red-400 flex items-center gap-1"
          >
            <X size={18} /> Clear
          </button>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto p-4 md:p-6">
        {error && (
          <p className="text-red-600 dark:text-red-400 text-center mb-4 flex items-center justify-center gap-1">
            <X size={20} /> {error}
          </p>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-indigo-600 dark:text-indigo-400" size={48} />
          </div>
        ) : filteredBooks.length > 0 ? (
          <>
            <div className="flex justify-end mb-4">
              <div className="flex bg-gray-200 dark:bg-gray-700 rounded-full p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-full ${view === "grid" ? "bg-white dark:bg-gray-800 shadow" : ""} transition-all`}
                >
                  <LayoutGrid size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-full ${view === "list" ? "bg-white dark:bg-gray-800 shadow" : ""} transition-all`}
                >
                  <List size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                  : "space-y-4"
              }
            >
              {filteredBooks.map((book, idx) => (
                <BookCard key={idx} book={book} onClick={setSelectedBook} view={view} />
              ))}
            </div>
          </>
        ) : books.length === 0 ? (
          <div className="text-center mt-16 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Welcome to <span className="text-indigo-600 dark:text-indigo-400">BookVerse Ultimate Finder</span></h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Discover, explore, and unlock the world of books. Try one of these example searches:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => handleExampleSearch("Harry Potter", "title")}
                className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all"
              >
                Title: Harry Potter
              </button>
              <button
                onClick={() => handleExampleSearch("J.K. Rowling", "author")}
                className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all"
              >
                Author: J.K. Rowling
              </button>
              <button
                onClick={() => handleExampleSearch("Science Fiction", "subject")}
                className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all"
              >
                Subject: Science Fiction
              </button>
              <button
                onClick={() => handleExampleSearch("9780743273565", "isbn")}
                className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all"
              >
                ISBN: 9780743273565 (The Great Gatsby)
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No results found. Try adjusting your search or filters.</p>
        )}
      </main>

      {selectedBook && <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />}
    </div>
  );
};

export default BookFinder;