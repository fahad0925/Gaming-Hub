"use client";

import { useRef, useState, useEffect } from "react";
import { data } from "./constants/data";
import { SiGamejolt } from "react-icons/si";
import Link from "next/link";
import Particles from "./components/Particles";
import { FaSearch } from "react-icons/fa";
import { FaWindows, FaGlobe } from "react-icons/fa";
import { FaPlaystation } from "react-icons/fa";

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
  //  Common Filter Function
  const SearchAll = (
    platform = selectPlatForm,
    genre = selectedGenre,
    order = orderBy,
    query = inputRef.current?.value.toLowerCase().trim() || ""
  ) => {
    let filtered = data;
    // platfrom
    if (platform !== "all" && platform !== "") {
      filtered = filtered.filter((game) =>
        game.platform.toLowerCase().includes(platform.toLowerCase())
      );
    }
    // genre
    if (genre) {
      filtered = filtered.filter(
        (game) => game.genre.toLowerCase() === genre.toLowerCase()
      );
    }
    // query
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

  //  Platform Select
  const PlatFormOption = (platform: string) => {
    setSelectPlatForm(platform);
    SearchAll(platform, selectedGenre);
  };

  // Unique Genres
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
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {/* Navbar */}
        <div className="flex flex-row md:flex-row md:items-center py-1 pt-5 p-2  bg-gradient-to-tr from-black-950 via-blue-950 to-black border border-gray-700 fixed top-0 w-full z-50 gap-1 md:gap-0 h-20 lg:flex lg:py-3 lg:pl-3 lg:pr-5 lg:bg-gradient-to-tr lg:from-black-950 lg:via-blue-950 lg:to-black lg:border lg:border-gray-700 lg:fixed lg:top-0 lg:w-full lg:z-50 lg:gap-3 lg:md:gap-0 lg:h-20">
          <div className="mb-2 md:mb-0 lg:mb-2 lg:md:mb-0">
            <SiGamejolt className="w-10 h-10  text-purple-100 lg:w-10 lg:h-10 lg:mr-2 lg:text-purple-100" />
          </div>
          <div className="relative w-full md:w-auto flex-grow lg:relative lg:w-full lg:md:w-auto lg:flex-grow">
            <FaSearch className="absolute left-5 top-5.5 -translate-y-1/2 text-gray-400 text-lg lg:absolute lg:left-5 lg:top-1/2 lg:-translate-y-1/2 lg:text-gray-400 lg:text-lg" />
            <input
              ref={inputRef}
              onChange={Search}
              type="text"
              placeholder="Search Games..."
              className="w-full p-2 pl-12 pr-3 rounded-4xl border-2 border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-800 hover:shadow-[0_0_15px_rgba(168,85,247,0.7)] transition-all duration-200 lg:w-full lg:p-2 lg:pl-12 lg:pr-3 lg:rounded-4xl lg:border-2 lg:border-gray-700 lg:bg-gray-800 lg:text-white lg:placeholder-gray-400 lg:focus:outline-none lg:focus:border-purple-700 lg:focus:ring-1 lg:focus:ring-purple-800 lg:hover:shadow-[0_0_15px_rgba(168,85,247,0.7)] lg:transition-all lg:duration-200"
            />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-12 pt-20 lg:grid-cols-1 lg:md:grid-cols-6 lg:pt-20">
          {/* Sidebar */}
          <div className="hidden md:block md:col-span-3  bg-gradient-to-tr from-gray-800 via-slate-900 to-black p-4 text-white border border-gray-700 sticky top-20 h-[calc(100vh-1rem)] overflow-auto lg:hidden lg:md:block lg:md:col-span-1 lg:bg-gradient-to-tr lg:from-gray-800 lg:via-slate-900 lg:to-black lg:p-4 lg:text-white lg:border lg:border-gray-700 lg:sticky lg:top-20 lg:h-[calc(100vh-1rem)] lg:overflow-auto ">
            <ul className="space-y-6 text-md  lg:space-y-6 lg:text-md">
              <li
                onClick={() => {
                  setSelectedGenre("");
                  SearchAll(selectPlatForm, "");
                }}
                className="cursor-pointer hover:underline text-white  text-xl flex lg:cursor-pointer lg:hover:underline lg:text-white lg:text-xl lg:flex"
              >
                <FaPlaystation className="h-9 w-9 mr-3 lg:h-9 lg:w-9 lg:mr-3" />
                All Genres
              </li>

              {uniqueGenres.map((game, i) => (
                <li
                  key={game.genre}
                  onClick={() => handleGenreClick(game.genre)}
                  className="cursor-pointer hover:underline text-white flex lg:cursor-pointer lg:hover:underline lg:text-white lg:flex"
                >
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-9 h-9 rounded-xs mr-3   object-cover lg:w-9 lg:h-9 lg:rounded-xs lg:mr-3 lg:object-cover"
                  />
                  {game.genre}
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9  lg:w-full sm:  bg-gradient-to-tr from-blue-950 via-slate-900 to-black-950 border border-gray-700 lg:md:col-span-5 lg:bg-gradient-to-tr lg:from-blue-950 lg:via-slate-900 lg:to-black-950 lg:border lg:border-gray-700">
            <div className=" lg:flex lg:justify-between lg:flex-row flex flex-col justify-center items-center">
              <div>
                <h1 className="text-3xl font-bold pt-5 text-white lg:text-4xl  xl:text-5xl lg:font-bold lg:pl-10 lg:pt-5 lg:text-white ">
                  {selectedGenre
                    ? `${selectedGenre} Games (${filteredData.length})`
                    : `All Games (${filteredData.length})`}
                </h1>
              </div>

              {/* Platform Selector */}
              <div className="flex flex-row gap-4 lg:gap-0 ">
                <select
                  value={orderBy}
                  onChange={(e) => setOrderBy(e.target.value)}
                  className="bg-[#1f1f1f] text-gray-200 lg:h-10 lg:mt-5 font-medium border  mt-3 border-gray-600 rounded-xl p-2 w-45 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-all duration-200 ease-in-out cursor-pointer m-3,4 lg:bg-[#1f1f1f] lg:text-gray-200 lg:font-medium lg:border lg:border-gray-600 lg:rounded-xl lg:p-2 lg:w-3xs lg:shadow-md lg:focus:outline-none lg:focus:ring-2 lg:focus:ring-blue-500 lg:focus:border-blue-500 lg:hover:border-blue-400 lg:transition-all lg:duration-200 lg:ease-in-out lg:cursor-pointer lg:m-3,4  "
                >
                  <option value="relevance">Relevance</option>
                  <option value="id">Id</option>
                  <option value="name">Name</option>
                </select>

                <select
                  value={selectPlatForm}
                  onChange={(e) => PlatFormOption(e.target.value)}
                  className="bg-[#1f1f1f] text-gray-200 lg:h-10 font-medium border lg:mt-5 mt-3  border-gray-600 rounded-xl p-2 w-45 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-all duration-200 ease-in-out cursor-pointer  lg:bg-[#1f1f1f] lg:text-gray-200 lg:font-medium lg:border lg:border-gray-600 lg:rounded-xl lg:p-2 lg:w-3xs lg:shadow-md lg:focus:outline-none lg:focus:ring-2 lg:focus:ring-blue-500 lg:focus:border-blue-500 lg:hover:border-blue-400 lg:transition-all lg:duration-200 lg:ease-in-out lg:cursor-pointer lg:m-5"
                >
                  <option value="all">All Platforms</option>
                  <option value="pc">PC Games</option>
                  <option value="web">Web Games</option>
                </select>
              </div>
            </div>

            {/* Games Display */}
            <div className="max-w-9xl p-4  lg:max-w-9xl lg:p-4">
              {filteredData.length === 0 ? (
                <h2 className="text-white text-3xl lg:text-white lg:text-3xl">
                  No Game Found 😢
                </h2>
              ) : (
                <div className="grid gap-4  sm:grid-cols-2 md:grid-cols-2  xl:grid-cols-4  lg:grid lg:gap-4 md:gap-4 lg:grid-cols-1  lg:sm:grid-cols-2 lg:md:grid-cols-3 lg:xl:grid-cols-4">
                  {filteredData.map((game, i) => (
                    <Link key={i} href={`${i}`}>
                      <div className="  bg-white/10 backdrop-blur-lg rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.6)] border border-white/20 text-white overflow-hidden transform transition-all duration-300 hover:scale-105 hover:border-purple-700 hover:shadow-[0_0_22px_rgba(168,85,247,0.7)] lg:bg-white/10 lg:backdrop-blur-lg lg:rounded-lg lg:shadow-[0_0_20px_rgba(0,0,0,0.6)] lg:border lg:border-white/20 lg:text-white lg:overflow-hidden lg:transform lg:transition-all lg:duration-300 lg:hover:scale-105 lg:hover:border-purple-700 lg:hover:shadow-[0_0_22px_rgba(168,85,247,0.7)]    sm:max-h-60 lg:max-h-62 xl:max-h-89">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="w-full h-60  sm:h-40 sm:object-cover object-cover lg:h-42  lg:w-full xl:h-60 lg:object-cover xl:object-cover"
                        />
                        <div className="p-4 lg:p-4 sm:p-2">
                          <div className="flex items-center justify-between lg:flex lg:items-center lg:justify-between">
                            <h3 className="text-lg sm:text-sm font-semibold truncate lg:text-lg lg:font-semibold lg:truncate">
                              {game.title}
                            </h3>
                            <span className="text-sm  text-gray-500 bg-green-100 rounded-b-md py-1 px-2 lg:text-sm lg:text-gray-500 lg:bg-green-100 lg:rounded-b-md lg:py-1 lg:px-2">
                              {game.id}
                            </span>
                          </div>
                          <div className="flex gap-2 lg:flex lg:gap-2">
                            <p className="text-sm sm:text-[11px] text-gray-300 lg:text-sm lg:text-gray-300">
                              {game.genre}
                            </p>
                            <p>
                              {game.platform.toLowerCase().includes("pc") ? (
                                <FaWindows className="text-gray-400 pt-1 lg:w-4 sm:pt-0 sm:w-2  lg:text-gray-400 lg:pt-1" />
                              ) : (
                                <FaGlobe className="pt-0.5 lg:pt-0.5 lg:w-4 sm:w-2 sm:pt-0" />
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
