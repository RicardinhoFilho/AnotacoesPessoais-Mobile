export function capitalize(frase: string): string {
  const primeiroCaractere = frase.slice(0, 1);
  const primeiroCaractereMaiusculo = primeiroCaractere.toUpperCase();
  const restoDaFrase = frase.slice(1, frase.length).toLowerCase();
  const fraseCapitalizada = primeiroCaractereMaiusculo + restoDaFrase;

  return fraseCapitalizada;
}
