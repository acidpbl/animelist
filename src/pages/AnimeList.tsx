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
import { Loading } from "./Loading";

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

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const cachedPopular = getCachedData("popularAnimes");
      const cachedTop = getCachedData("topAnimes");
      const cachedUpcoming = getCachedData("upcomingAnimes");
      const cachedAiring = getCachedData("airingAnimes");

      try {
        if (!cachedPopular) {
          const popular = await getPopularAnimes();
          setPopularAnimes(popular.data);
          setCachedData("popularAnimes", popular);
          await delay(1000);
        } else {
          setPopularAnimes(cachedPopular.data);
        }

        if (!cachedTop) {
          const top = await getTopAnimes();
          setTopAnimes(top.data);
          setCachedData("topAnimes", top);
          await delay(1000);
        } else {
          setTopAnimes(cachedTop.data);
        }

        if (!cachedUpcoming) {
          const upcoming = await getUpcomingAnimes();
          setUpcomingAnimes(upcoming.data);
          setCachedData("upcomingAnimes", upcoming);
          await delay(1000);
        } else {
          setUpcomingAnimes(cachedUpcoming.data);
        }

        if (!cachedAiring) {
          const airing = await getAiringAnimes();
          setAiringAnimes(airing.data);
          setCachedData("airingAnimes", airing);
          await delay(1000);
        } else {
          setAiringAnimes(cachedAiring.data);
        }
      } catch (error) {
        console.error("Error searching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Loading />;
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
        "flex flex-col gap-4 px-4 pt-20 min-h-screen",
        styles.bg
      )}
    >
      <section className="flex flex-col gap-4 px-4 p">
        <div className="flex flex-col gap-2">
          <h1 className={twMerge("font-semibold text-lg pl-2", styles.title)}>
            Populat All Time
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
            Highest Rating
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
            Airing
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
            Upcoming
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
