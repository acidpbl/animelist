import { useContext, useEffect, useState } from "react";
import Genre from "../types/Genre";
import { getCachedData, setCachedData } from "../functions/Cache";
import { getAnimeGenres } from "../functions/Api";
import { GenreCard } from "../components/GenreCard";
import ThemeContext from "../ThemeContext";
import { twMerge } from "tailwind-merge";
import { getRandomColor } from "../functions/Colors";
import { Loading } from "./Loading";
import { PiCaretLeft } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

type ThemeStyles = {
  bg: string;
  title: string;
  btn: string;
};

function Genres() {
  const ADULT_GENRES = ["Ecchi", "Yuri", "Yaoi", "Hentai"];

  const [animeGenres, setAnimeGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const theme = useContext(ThemeContext)?.theme;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const cachedAnimeGenres = getCachedData("animeGenres");

      try {
        const fetchAnimeGenres = cachedAnimeGenres
          ? Promise.resolve(cachedAnimeGenres)
          : getAnimeGenres();

        const animeGenres = await fetchAnimeGenres;
        setAnimeGenres(animeGenres.data);
        setTimeout(async () => {
          if (!cachedAnimeGenres) setCachedData("animeGenres", animeGenres);
        }, 2000);
      } catch (error) {
        console.error("Error searching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const styles: ThemeStyles = {
    bg: "",
    title: "",
    btn: "",
    ...(theme === "light" && {
      bg: "bg-indigo-100",
      title: "text-indigo-900",
      btn: "text-indigo-800 hover:text-indigo-900 border-indigo-800 hover:border-indigo-900",
    }),
    ...(theme === "dark" && {
      bg: "bg-neutral-800",
      title: "text-indigo-100",
      btn: "text-indigo-600 hover:text-indigo-700 border-indigo-600 hover:border-indigo-700",
    }),
  };

  return (
    <section
      className={twMerge(
        "flex flex-col gap-4 pt-20 min-h-screen items-center",
        styles.bg
      )}
    >
      <div className="w-full px-24 flex items-center justify-between">
        <button
          onClick={handleGoBack}
          className={twMerge(
            "flex gap-2 items-center border-2 py-1 px-2 rounded transition-all ease-linear",
            styles.btn
          )}
        >
          <PiCaretLeft size={24} className="transition-all ease-linear" />
          <span className="transition-all ease-linear">Back</span>
        </button>
        <h1 className={twMerge("font-semibold text-lg", styles.title)}>
          Genres
        </h1>
        <a className="flex gap-2 items-center border-2 py-1 px-2 rounded opacity-0 select-none">
          <PiCaretLeft size={24} />
          <span>Back</span>
        </a>
      </div>
      <div className="p-2 -mt-2 grid grid-cols-6 gap-2 overflow-y-scroll">
        {animeGenres
          .filter((genre) => !ADULT_GENRES.includes(genre.name))
          .map((genre, index) => (
            <GenreCard genre={genre} key={index} bgColor={getRandomColor()} />
          ))}
      </div>
    </section>
  );
}

export default Genres;
