import { useContext, useEffect, useState } from "react";
import Genre from "../types/Genre";
import { getCachedData, setCachedData } from "../functions/Cache";
import { getAnimeGenres } from "../functions/Api";
import { GenreCard } from "../components/GenreCard";
import ThemeContext from "../ThemeContext";
import { twMerge } from "tailwind-merge";
import { getRandomColor } from "../functions/Colors";

type ThemeStyles = {
  bg: string;
  title: string;
};

function Genres() {
  const ADULT_GENRES = ["Ecchi", "Yuri", "Yaoi", "Hentai"];

  const [animeGenres, setAnimeGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const theme = useContext(ThemeContext)?.theme;

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
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const styles: ThemeStyles = {
    bg: "",
    title: "",
    ...(theme === "light" && {
      bg: "bg-indigo-100",
      title: "text-indigo-900",
    }),
    ...(theme === "dark" && {
      bg: "bg-neutral-800",
      title: "text-indigo-100",
    }),
  };

  return (
    <section
      className={twMerge(
        "flex flex-col gap-4 pt-20 min-h-screen items-center",
        styles.bg
      )}
    >
      <h1 className={twMerge("font-semibold text-lg", styles.title)}>
        Gêneros
      </h1>
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
