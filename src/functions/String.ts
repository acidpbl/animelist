export function ellipsis(texto: string, maxCaracteres: number): string {
  if (texto.length > maxCaracteres) {
    return texto.substring(0, maxCaracteres) + "...";
  } else {
    return texto;
  }
}
