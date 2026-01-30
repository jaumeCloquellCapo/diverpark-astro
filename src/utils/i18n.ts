import es from '../locales/es.json';
import ca from '../locales/ca.json';
import en from '../locales/en.json';

const messages: Record<string, Record<string, unknown>> = { es, ca, en };

function get(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : undefined;
}

/** Get translated string. Supports interpolation: t(locale, 'key', 'val0', 'val1') replaces {0}, {1} in the string. */
export function t(locale: string, path: string, ...params: string[]): string {
  const localeMessages = messages[locale] ?? messages.es;
  let out = get(localeMessages as Record<string, unknown>, path) ?? get(messages.es as Record<string, unknown>, path) ?? path;
  params.forEach((p, i) => {
    out = out.replace(new RegExp(`\\{${i}\\}`, 'g'), p);
  });
  return out;
}
