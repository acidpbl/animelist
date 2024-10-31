import { useContext } from "react";
import { PiCircleNotchBold } from "react-icons/pi";
import ThemeContext from "../ThemeContext";
import { twMerge } from "tailwind-merge";

type ThemeStyles = {
  bg: string;
  color: string;
};

export function Loading() {
  const theme = useContext(ThemeContext)?.theme;

  const styles: ThemeStyles = {
    bg: "",
    color: "",
    ...(theme === "light" && {
      bg: "bg-indigo-100",
      color: "text-indigo-500",
    }),
    ...(theme === "dark" && {
      bg: "bg-neutral-800",
      color: "text-indigo-600",
    }),
  };
  return (
    <div
      className={twMerge(
        "w-screen h-screen absolute top-0 left-0 z-[10000] flex items-center justify-center",
        styles.bg
      )}
    >
      <PiCircleNotchBold
        className={twMerge("animate-spin", styles.color)}
        size={60}
      />
    </div>
  );
}
