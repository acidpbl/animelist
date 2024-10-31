export function ellipsis(texto: string, maxCaracteres: number): string {
  if (texto.length > maxCaracteres) {
    return texto.substring(0, maxCaracteres) + "...";
  } else {
    return texto;
  }
}

export function capitalizeAll(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function capitalizeFirst(input: string): string {
  if (input.length === 0) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}
