"use client";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import { normalize } from "../utils/functions";
import { useGetBooks } from "@/api/fetchers";
import BookCard from "@/components/books/BookCard";

export default function Explore() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const {
    res: { data, meta },
    loading,
    error,
  } = useGetBooks("category,image");

  useEffect(() => {
    if (data) {
      setBooks(normalize(data));
      setFilteredBooks(normalize(data));
    }
  }, [data]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    if (e.target.value.trim() === "") {
      // If search is empty, set the filtered list to the original complete list
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredBooks(filtered);
    }
  };

  const handleClick = (e) => {
    setSearch("");
  };

  return (
    <div className="flex">
      <div className="flex flex-wrap">
        <Input
          type="Search"
          placeholder="Search"
          onChange={(e) => handleSearch(e)}
        />
        {filteredBooks &&
          filteredBooks.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  );
}
