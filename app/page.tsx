"use client";

import { useRef, useState, useEffect } from "react";
import { data } from "./constants/data";
import { SiGamejolt } from "react-icons/si";
import Link from "next/link";
import Particles from "./components/Particles";
import { FaSearch } from "react-icons/fa";
import { FaWindows, FaGlobe } from "react-icons/fa";

type Deal = {
  title: string;
  thumbnail: string;
  genre: string;
  platform: string;
};

export default function Page() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredData, setFilteredData] = useState(data);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectPlatForm, setSelectPlatForm] = useState("all");
  const [orderBy, setOrderBy] = useState("relevance");
  // ✅ Common Filter Function
  const SearchAll = (
    platform = selectPlatForm,
    genre = selectedGenre,
    order = orderBy,
    query = inputRef.current?.value.toLowerCase().trim() || ""
  ) => {
    let filtered = data;
    // for platform
    if (platform !== "all" && platform !== "") {
      filtered = filtered.filter((game) =>
        game.platform.toLowerCase().includes(platform.toLowerCase())
      );
    }
    // sidebar
    if (genre) {
      filtered = filtered.filter(
        (game) => game.genre.toLowerCase() === genre.toLowerCase()
      );
    }
    // search
    if (query !== "") {
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(query)
      );
    }
    // order
    if (order === "id") {
      filtered = [...filtered].sort((a, b) => a.id - b.id); // ID ascending
    } else if (order === "name") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title)); // Title A-Z
    }

    setFilteredData(filtered);
  };

  //  Search Input
  const Search = () => {
    SearchAll(selectPlatForm, selectedGenre);
  };

  //  Genre Click
  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre);
    SearchAll(selectPlatForm, genre);
  };

  // Platform Select
  const PlatFormOption = (platform: string) => {
    setSelectPlatForm(platform);
    SearchAll(platform, selectedGenre);
  };

  //  Unique Genres
  const uniqueGenres = data.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.genre === item.genre)
  );

  useEffect(() => {
    SearchAll();
  }, [orderBy, selectPlatForm, selectedGenre]);
  return (
    <>
      <Particles
        particleColors={["#ffffff", " #ffffff", "#ffffff", "#ffffff"]}
        particleCount={2000}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={false}
      />
      <div className="min-h-screen bg-gradient-to-tr from-black-950 via-blue-950 to-black-950">
        {/* Navbar */}
        <div className="flex flex-col md:flex-row md:items-center py-3 px-4 border-b border-gray-700 fixed top-0 w-full z-50 bg-gradient-to-tr from-black-950 via-blue-950 to-black">
          <div className="mb-2 md:mb-0">
            <SiGamejolt className="w-10 h-10 text-purple-100" />
          </div>
          <div className="relative w-full md:w-auto flex-grow">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              ref={inputRef}
              onChange={Search}
              type="text"
              placeholder="Search Games..."
              className="w-full p-2 pl-12 rounded-3xl border-2 border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-800 hover:shadow-[0_0_15px_rgba(168,85,247,0.7)] transition"
            />
          </div>
        </div>

        {/* col-6 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-6 pt-24">
          {/* Sidebar */}
          <div className="hidden lg:block col-span-1 bg-gradient-to-tr from-gray-800 via-slate-900 to-black p-4 text-white border-r border-gray-700 sticky top-24 h-[calc(100vh-6rem)] overflow-auto">
            <ul className="space-y-4 text-md">
              <li
                onClick={() => setSelectedGenre("")}
                className="cursor-pointer hover:underline"
              >
                All Genres
              </li>
              {uniqueGenres.map((game, i) => (
                <li
                  key={i}
                  onClick={() => setSelectedGenre(game.genre)}
                  className="cursor-pointer hover:underline"
                >
                  {game.genre}
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-span-1 lg:col-span-5 p-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left mb-4 text-white line-clamp-2">
              {selectedGenre
                ? `${selectedGenre} Games (${filteredData.length})`
                : `All Games (${filteredData.length})`}
            </h1>

            <div className="flex flex-col sm:flex-row sm:justify-end gap-2 mb-4">
              <select
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
                className="p-1 sm:p-2 text-sm sm:text-base bg-[#1f1f1f] text-gray-200 rounded-lg border border-gray-600"
              >
                <option value="relevance">Relevance</option>
                <option value="id">ID</option>
                <option value="name">Name</option>
              </select>
              <select
                value={selectPlatForm}
                onChange={(e) => setSelectPlatForm(e.target.value)}
                className="p-1 sm:p-2 text-sm sm:text-base bg-[#1f1f1f] text-gray-200 rounded-lg border border-gray-600"
              >
                <option value="all">All Platforms</option>
                <option value="pc">PC</option>
                <option value="web">Web</option>
              </select>
            </div>

            {/* Cards */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredData.length === 0 ? (
                <h2 className="text-white text-xl">No Game Found 😢</h2>
              ) : (
                filteredData.map((game, i) => (
                  <Link key={i} href={`/${i}`}>
                    <div className="bg-white/10 rounded-lg shadow-md backdrop-blur-md p-2 hover:scale-105 transform transition">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-40 md:h-60 object-cover rounded-md"
                      />
                      <div className="p-2">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {game.title}
                        </h3>
                        <div className="flex justify-between items-center text-sm text-gray-300">
                          <span>{game.genre}</span>
                          {game.platform.toLowerCase().includes("pc") ? (
                            <FaWindows />
                          ) : (
                            <FaGlobe />
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
