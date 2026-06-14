"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./Searchbar.css";

export default function SearchBar() {
  const [query, setQuery] =
    useState("");

  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;

    router.push(
      `/products?search=${encodeURIComponent(
        query
      )}`
    );
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search mobiles, laptops, headphones..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />

      <button
        onClick={handleSearch}
      >
        🔍
      </button>
    </div>
  );
}