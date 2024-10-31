import { twMerge } from "tailwind-merge";
import Genre from "../types/Genre";

interface GenreCardProps {
  genre: Genre;
  bgColor: string;
}

export function GenreCard({ genre, bgColor }: GenreCardProps) {
  return (
    <a
      href={`#/genres/${genre.name.toLowerCase()}`}
      className={twMerge(
        "relative p-4 flex justify-center items-center rounded hover:scale-105 hover:rounded-md select-none text-indigo-200",
        bgColor
      )}
    >
      <span>{genre.name}</span>
    </a>
  );
}
