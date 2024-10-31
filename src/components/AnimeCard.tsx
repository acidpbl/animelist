import { PiStarFill } from "react-icons/pi";
import Anime from "../types/Anime";

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard(props: AnimeCardProps) {
  return (
    <div className="relative min-h-48 min-w-36 snap-center hover:scale-105 hover:rounded-md overflow-hidden select-none group">
      <img
        src={props.anime.images.jpg.image_url}
        alt={`${
          props.anime.title_english
            ? props.anime.title_english
            : props.anime.title
        } Background`}
        className="w-full h-full object-cover rounded group-hover:scale-125 group-hover:blur-[2px]"
      />
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-transparent hover:bg-indigo-950 hover:bg-opacity-80 opacity-0 transition-opacity hover:opacity-100 flex flex-col max-h-full justify-between p-2 gap-2">
        <div className="w-full flex justify-end">
          {props.anime.score && (
            <span className="text-[10px] flex gap-1 items-center font-jetbrains text-amber-400">
              <PiStarFill className="-mt-0.5" /> {props.anime.score?.toFixed(1)}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold leading-[1] text-indigo-100 text-sm">
            {props.anime.title}
          </h1>
          <div className="flex flex-wrap leading-4">
            <p className="text-indigo-100 opacity-90 text-[10px] leading-[1] line-clamp-3">
              {props.anime.synopsis}
            </p>

            <a
              href=""
              className="text-[10px] font-jetbrains text-indigo-400 underline"
            >
              {`see more ->`}
            </a>
          </div>
          <div className="w-full flex flex-wrap gap-0.5">
            {props.anime.genres.map((genre, index) => (
              <a
                key={index}
                href=""
                className="text-[10px] p-0.5 border rounded border-indigo-300 text-indigo-300"
              >
                {genre.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
