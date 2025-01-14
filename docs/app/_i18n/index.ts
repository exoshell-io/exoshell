import 'server-only';

export const supportedLocales = ['en-US'] as const;

export const dictionaries: Record<
  (typeof supportedLocales)[number],
  () => Promise<Dictionary>
> = {
  'en-US': () => import('./enUs').then((mod) => mod.en),
};

export const isSupportedLocale = (
  locale: string,
): locale is keyof typeof dictionaries => locale in dictionaries;

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  if (!isSupportedLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  return dictionaries[locale]();
};

export type Dictionary = {
  title: string;
};
