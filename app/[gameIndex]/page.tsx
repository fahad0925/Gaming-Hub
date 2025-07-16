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
    <div className="max-w-7xl mx-auto text-white p-6 mt-10 space-y-8  ">
      {/* ✅ Title Centered */}
      <h1 className="text-5xl font-bold text-center underline mb-20 m-6">
        {game.title}
      </h1>

      {/* ✅ Image + Details Flex Layout */}
      <div className="flex flex-col md:flex-row rounded-3xl shadow-[0_0_20px_rgba(255,255,255,0.5)] overflow-hidden p-6">
        {/* ✅ Left Side Image */}
        <img
          src={game.thumbnail}
          alt={game.title}
          className="md:w-3xl  object-cover pr-10 rounded-4xl "
        />

        {/* ✅ Right Side Details */}
        <div className="flex-1 p-6 space-y-5 text-xl font-semibold truncate bg-gradient-to-tr from-black via-zinc-900 to-black rounded-2xl ">
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
      <p className=" text-center underline max-w-3xl mx-auto p-15 text-xl">
        "{game.short_description}"
      </p>
    </div>
  );
};

export default page;
