import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import ThemeContext from "../ThemeContext";
import { PiCaretLeft } from "react-icons/pi";
import { capitalizeAll } from "../functions/String";

type ThemeStyles = {
  bg: string;
  title: string;
  btn: string;
};

export function AnimeByGenre() {
  const { genre } = useParams();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const theme = useContext(ThemeContext)?.theme;

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
        "flex flex-col gap-4 px-4 pt-20 min-h-screen",
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
          {capitalizeAll(genre ? genre : "genre")}
        </h1>
        <a className="flex gap-2 items-center border-2 py-1 px-2 rounded opacity-0 select-none">
          <PiCaretLeft size={24} />
          <span>Back</span>
        </a>
      </div>
    </section>
  );
}
