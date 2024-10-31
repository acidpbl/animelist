import { PiMagnifyingGlassBold, PiMoonFill, PiSunFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import { useTheme } from "../ThemeContext";

type ThemeStyles = {
  span: string;
  inputButton: string;
  inputWrapper: string;
  input: string;
  button: { primary: string; secondary: string };
};

export function Header() {
  const { theme, toggleTheme } = useTheme();

  const styles: ThemeStyles = {
    span: "",
    input: "",
    inputButton: "",
    inputWrapper: "",
    button: {
      primary: "",
      secondary: "",
    },
    ...(theme === "light" && {
      span: "text-indigo-800",
      inputButton: "text-indigo-800",
      inputWrapper: "bg-indigo-300 focus-within:outline-indigo-800",
      input:
        "text-indigo-800 placeholder:text-indigo-700 placeholder:opacity-75",
      button: {
        primary:
          "focus:outline focus:outline-2 text-indigo-800 focus:outline-indigo-500 bg-indigo-500 hover:bg-indigo-600 p-2 rounded",
        secondary:
          "focus:outline focus:outline-2 text-indigo-300 focus:outline-indigo-500 bg-transparent text-indigo-600 border-2 border-indigo-500 focus:bg-indigo-500 hover:bg-indigo-500 hover:text-indigo-300 focus:text-indigo-300 py-1 px-2 rounded",
      },
    }),
    ...(theme === "dark" && {
      span: "text-indigo-600",
      inputButton: "text-indigo-600",
      inputWrapper: "bg-neutral-800 focus-within:outline-indigo-500",
      input:
        "text-indigo-100 placeholder:text-indigo-500 placeholder:opacity-50",
      button: {
        primary:
          "focus:outline focus:outline-2 text-indigo-200 focus:outline-indigo-500 bg-indigo-700 hover:bg-indigo-800 p-2 rounded",
        secondary:
          "focus:outline focus:outline-2 text-indigo-300 focus:outline-indigo-500 bg-transparent text-indigo-600 border-2 border-indigo-700 focus:bg-indigo-700 hover:bg-indigo-700 hover:text-indigo-300 focus:text-indigo-300 py-1 px-2 rounded",
      },
    }),
  };

  return (
    <header
      className={twMerge(
        "fixed z-50 h-16 w-full flex items-center justify-between px-4",
        theme === "light" ? "bg-indigo-200" : "bg-neutral-900"
      )}
    >
      <a
        href="/animelist"
        className={twMerge("text-lg font-bold w-1/3", styles.span)}
      >
        AnimeList
      </a>
      <div className="flex gap-2 px-2 w-1/3 justify-end">
        <div
          className={twMerge(
            "flex rounded overflow-hidden focus-within:outline focus-within:outline-2 w-2/3",
            styles.inputWrapper
          )}
        >
          <input
            type="text"
            className={twMerge(
              "bg-transparent focus:outline-none pl-2 text-sm w-full",
              styles.input
            )}
            placeholder="Find your next anime here..."
          />
          <button
            type="button"
            className={twMerge(
              "py-1 px-2 focus:outline-none",
              styles.inputButton
            )}
          >
            <PiMagnifyingGlassBold />
          </button>
        </div>
        <button
          type="button"
          className={twMerge(styles.button.primary)}
          onClick={() => {
            toggleTheme();
          }}
        >
          {theme == "light" ? <PiMoonFill /> : <PiSunFill />}
        </button>
      </div>
    </header>
  );
}
