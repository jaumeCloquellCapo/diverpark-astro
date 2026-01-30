/**
 * Extract castle/service name from image path (filename).
 */
export function getCastleName(imagePath: string): string {
  const fileName = (imagePath.split('/').pop() || '').trim();
  if (!fileName) return 'castillo';

  let castleName = fileName
    .replace(/\.jpg$/i, '')
    .replace(/^castillo-hinchable-(pequeno|grande|acuatico|tobogan)-/, '')
    .replace(/^fiesta-espuma-/, '')
    .replace(/^animacion-infantil-/, '')
    .replace(/^toro-mecanico_/, '')
    .replace(/-\d+$/, '')
    .replace(/\s+\d+$/, '')
    .trim();

  const normalizeMap: Record<string, string> = {
    'castillo-agua': 'castillo-agua',
    'castilloagua': 'castillo-agua',
    'catapulta': 'catapulta',
    'tatamis': 'tatamis',
    'spider': 'spider',
    'globos': 'globos',
    'caramelo': 'caramelo',
    'bob': 'bob',
    'kity': 'kity',
    'multimarino': 'multimarino',
    'pressingcatch': 'pressingcatch',
    'safari-park': 'safari-park',
    'romano': 'romano',
    'dragonkan': 'dragonkan',
    'toro-dragonkan': 'toro-dragonkan',
    'toro-mecanico': 'toro-mecanico',
    'avion': 'avion',
    'barco': 'barco',
    'galactico': 'galactico',
    'rodeo': 'rodeo',
    'formula': 'formula',
    'dragon': 'dragon',
    'fantasia': 'fantasia',
    'robot': 'robot',
    'granja': 'granja',
    'ola': 'ola',
    'espuma': 'canon-espuma',
    '2e40b1bf': 'canon-espuma',
    'fe3fafa5': 'canon-espuma',
    'anmadoras': 'animadoras',
    'cucorba': 'cucorba',
    'flip-flop': 'flip-flop',
    'magic-cloquell': 'magic-cloquell',
    'mago-felix': 'mago-felix',
    'surf': 'surf',
  };

  for (const [key, value] of Object.entries(normalizeMap)) {
    if (castleName.includes(key)) return value;
  }
  if (/^[0-9a-f]{8}-/.test(castleName)) return 'piscina-bolas';
  return castleName || 'castillo';
}

const DISPLAY_NAMES: Record<string, string> = {
  'toro-mecanico': 'Toro Mecánico',
  'surf': 'Tabla de Surf',
  'castillo-agua': 'Castillo Acuático',
  'catapulta': 'Castillo con Catapulta',
  'tatamis': 'Castillo con Tatamis',
  'spider': 'Castillo Spider',
  'globos': 'Castillo de Globos',
  'caramelo': 'Castillo Caramelo',
  'bob': 'Castillo Bob Esponja',
  'kity': 'Castillo Hello Kitty',
  'multimarino': 'Castillo Multimarino',
  'pressingcatch': 'Castillo Pressing Catch',
  'safari-park': 'Castillo Safari Park',
  'romano': 'Castillo Romano',
  'dragonkan': 'Castillo Dragón',
  'toro-dragonkan': 'Castillo Toro Dragón',
  'avion': 'Castillo Avión',
  'barco': 'Castillo Barco',
  'galactico': 'Castillo Galáctico',
  'rodeo': 'Castillo Rodeo',
  'formula': 'Castillo Fórmula 1',
  'dragon': 'Castillo Dragón',
  'fantasia': 'Castillo Fantasía',
  'robot': 'Castillo Robot',
  'granja': 'Castillo Granja',
  'ola': 'Castillo Ola',
  'canon-espuma': 'Cañón de Espuma',
  'piscina-bolas': 'Piscina de Bolas',
  'animadoras': 'Animadoras Infantiles',
  'cucorba': 'Cucorba',
  'flip-flop': 'Flip Flop',
  'magic-cloquell': 'Magic Cloquell',
  'mago-felix': 'Mago Félix',
};

export function getCastleDisplayName(castleName: string): string {
  return DISPLAY_NAMES[castleName] ?? castleName.charAt(0).toUpperCase() + castleName.slice(1).replace(/-/g, ' ');
}

export function getWhatsAppLinkForCastle(castleName: string): string {
  const display = getCastleDisplayName(castleName);
  const message = encodeURIComponent(`Hola! Estoy interesado en alquilar: ${display}`);
  return `https://wa.me/34625458704?text=${message}`;
}

export interface GalleryGroup {
  name: string;
  mainImage: string;
  images: string[];
  count: number;
}

export function groupImagesByCastle(images: string[], groupByCastle: boolean): GalleryGroup[] {
  const valid = (images || []).filter((img): img is string => typeof img === 'string' && img.length > 0);
  if (!valid.length) return [];

  if (!groupByCastle) {
    return valid.map((img, idx) => ({
      name: `image-${idx}`,
      mainImage: img,
      images: [img],
      count: 1,
    }));
  }

  const groups: Record<string, GalleryGroup> = {};
  for (const image of valid) {
    const castleName = getCastleName(image);
    if (!groups[castleName]) {
      groups[castleName] = { name: castleName, images: [], mainImage: image, count: 0 };
    }
    groups[castleName].images.push(image);
    groups[castleName].count++;
  }
  return Object.values(groups).sort((a, b) => a.name.localeCompare(b.name));
}
