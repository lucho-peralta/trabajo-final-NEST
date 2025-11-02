export function direccionTieneNumero(direccion: string): boolean {
  for (let i = 0; i < direccion.length; i++) {
    const char = direccion[i];
    const esNumero = !isNaN(Number(char));
    if (esNumero) {
      return true;
    }
  }
  return false;
}

