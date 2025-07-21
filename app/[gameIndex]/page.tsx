import React from "react";
import { data } from "../constants/data";

interface Props {
  params: {
    gameIndex: string;
  };
}

const page = ({ params: { gameIndex } }: Props) => {
  let game = data[Number(gameIndex)];
  console.log(game);
  return (
    <div className="max-w-7xl mx-auto text-white p-6 mt-10 space-y-8 lg:max-w-7xl lg:mx-auto lg:text-white lg:p-6 lg:mt-10 lg:space-y-8">
      {/* ✅ Title Centered */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center underline mb-10 sm:mb-14 md:mb-20 m-4 sm:m-6 md:m-6 lg:text-5xl lg:mb-20 lg:m-6">
        {game.title}
      </h1>

      {/* ✅ Image + Details Flex Layout */}
      <div className="flex flex-col md:flex-col lg:flex-row rounded-2xl sm:rounded-3xl shadow-[0_0_10px_rgba(255,255,255,0.3)] sm:shadow-[0_0_15px_rgba(255,255,255,0.4)] md:shadow-[0_0_20px_rgba(255,255,255,0.5)] overflow-hidden p-4 sm:p-6 md:p-8 lg:flex lg:rounded-3xl lg:shadow-[0_0_20px_rgba(255,255,255,0.5)] lg:overflow-hidden lg:p-6">
        {/* ✅ Left Side Image */}
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full md:w-4xl   object-cover mb-6 md:mb-0 md:pr-10  rounded-xl sm:rounded-2xl md:rounded-4xl lg:md:w-3xl lg:object-cover lg:pr-10 lg:rounded-4xl"
        />

        {/* ✅ Right Side Details */}
        <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-5 md:text-lg md:mt-5 text-sm sm:text-xl font-semibold truncate bg-gradient-to-tr from-black via-zinc-900 to-black rounded-xl sm:rounded-2xl lg:flex-1 lg:p-6 lg:space-y-5 lg:text-xl lg:font-semibold lg:truncate lg:bg-gradient-to-tr lg:from-black lg:via-zinc-900 lg:to-black lg:rounded-2xl">
          <p>
            <span className="font-bold">Rating:</span> {game.id}
          </p>
          <p>
            <span className="font-bold">Platform:</span> {game.platform}
          </p>
          <p>
            <span className="font-bold">Publisher:</span> {game.publisher}
          </p>
          <p>
            <span className="font-bold">Release Date:</span> {game.release_date}
          </p>
          <p>
            <span className="font-bold">Developer:</span> {game.developer}
          </p>
          <p>
            <span className="font-bold">Genre:</span> {game.genre}
          </p>
          <p>
            <span className="font-bold">Link:</span>{" "}
            <a
              href={game.game_url}
              target="_blank"
              className="underline text-purple-400"
            >
              {game.title}
            </a>
          </p>
        </div>
      </div>

      {/* ✅ Description Neeche Centered */}
      <p className="text-center underline max-w-2xl sm:max-w-3xl mx-auto p-6 text-lg sm:text-xl lg:text-center lg:underline lg:max-w-3xl lg:mx-auto lg:p-15 lg:text-xl">
        "{game.short_description}"
      </p>
    </div>
  );
};

export default page;
