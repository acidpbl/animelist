const bgColors = [
  "bg-slate-600",
  "bg-gray-600",
  "bg-zinc-600",
  "bg-neutral-600",
  "bg-stone-600",
  "bg-red-600",
  "bg-orange-600",
  "bg-amber-600",
  "bg-yellow-600",
  "bg-lime-600",
  "bg-green-600",
  "bg-emerald-600",
  "bg-teal-600",
  "bg-cyan-600",
  "bg-sky-600",
  "bg-blue-600",
  "bg-indigo-600",
  "bg-violet-600",
  "bg-purple-600",
  "bg-fuchsia-600",
  "bg-pink-600",
  "bg-rose-600",
];
let currentColors: string[] = [];
let colorIndex = 0;

function generateUniqueColors() {
  currentColors = [...bgColors].sort(() => Math.random() - 0.5).slice(0, 6);
  colorIndex = 0;
}

export function getRandomColor() {
  if (colorIndex === 0) {
    generateUniqueColors();
  }

  const color = currentColors[colorIndex];
  colorIndex = (colorIndex + 1) % 6;

  return color;
}
