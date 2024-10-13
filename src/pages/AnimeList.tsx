import { useContext, useEffect, useState } from "react";
import {
  getAiringAnimes,
  getPopularAnimes,
  getTopAnimes,
  getUpcomingAnimes,
} from "../functions/Api";
import { getCachedData, setCachedData } from "../functions/Cache";
import Anime from "../types/Anime";
import { AnimeCard } from "../components/AnimeCard";
import { twMerge } from "tailwind-merge";
import ThemeContext from "../ThemeContext";

type ThemeStyles = {
  bg: string;
  title: string;
};

const AnimeList = () => {
  const [popularAnimes, setPopularAnimes] = useState<Anime[]>([]);
  const [topAnimes, setTopAnimes] = useState<Anime[]>([]);
  const [upcomingAnimes, setUpcomingAnimes] = useState<Anime[]>([]);
  const [airingAnimes, setAiringAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const theme = useContext(ThemeContext)?.theme;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const cachedPopular = getCachedData("popularAnimes");
      const cachedTop = getCachedData("topAnimes");
      const cachedUpcoming = getCachedData("upcomingAnimes");
      const cachedAiring = getCachedData("airingAnimes");

      try {
        const fetchPopular = cachedPopular
          ? Promise.resolve(cachedPopular)
          : getPopularAnimes();
        const fetchTop = cachedTop
          ? Promise.resolve(cachedTop)
          : getTopAnimes();
        const fetchUpcoming = cachedUpcoming
          ? Promise.resolve(cachedUpcoming)
          : getUpcomingAnimes();
        const fetchAiring = cachedAiring
          ? Promise.resolve(cachedAiring)
          : getAiringAnimes();

        const popular = await fetchPopular;
        setPopularAnimes(popular.data);
        setTimeout(() => {
          if (!cachedPopular) setCachedData("popularAnimes", popular);
        }, 2000);

        const top = await fetchTop;
        setTopAnimes(top.data);
        setTimeout(() => {
          if (!cachedTop) setCachedData("topAnimes", top);
        }, 2000);

        const upcoming = await fetchUpcoming;
        setUpcomingAnimes(upcoming.data);
        setTimeout(() => {
          if (!cachedUpcoming) setCachedData("upcomingAnimes", upcoming);
        }, 2000);

        const airing = await fetchAiring;
        setAiringAnimes(airing.data);
        setTimeout(() => {
          if (!cachedAiring) setCachedData("airingAnimes", airing);
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
    <section className={twMerge("flex flex-col gap-4 px-4 pt-20", styles.bg)}>
      <section className="flex flex-col gap-4 px-4 p">
        <div className="flex flex-col gap-2">
          <h1 className={twMerge("font-semibold text-lg pl-2", styles.title)}>
            Popular desde sempre
          </h1>
          <div className="flex gap-1 overflow-x-scroll overflow-y-hidden scroll-smooth snap-mandatory p-2">
            {topAnimes
              .sort((a, b) => b.score - a.score)
              .map((anime, index) => (
                <AnimeCard anime={anime} key={index} />
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className={twMerge("font-semibold text-lg pl-2", styles.title)}>
            Melhor avaliados
          </h1>
          <div className="flex gap-1 overflow-x-scroll overflow-y-hidden scroll-smooth snap-mandatory p-2">
            {popularAnimes
              .sort((a, b) => b.score - a.score)
              .map((anime, index) => (
                <AnimeCard anime={anime} key={index} />
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className={twMerge("font-semibold text-lg pl-2", styles.title)}>
            Em lançamento
          </h1>
          <div className="flex gap-1 overflow-x-scroll overflow-y-hidden scroll-smooth snap-mandatory p-2">
            {airingAnimes
              .sort((a, b) => b.score - a.score)
              .map((anime, index) => (
                <AnimeCard anime={anime} key={index} />
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className={twMerge("font-semibold text-lg pl-2", styles.title)}>
            Lançamentos futuros
          </h1>
          <div className="flex gap-1 overflow-x-scroll overflow-y-hidden scroll-smooth snap-mandatory p-2">
            {upcomingAnimes.map((anime, index) => (
              <AnimeCard anime={anime} key={index} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default AnimeList;
