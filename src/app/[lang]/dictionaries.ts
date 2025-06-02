import 'server-only';


import enDictionary from './dictionaries/en-US.json'; // Import one dictionary to infer the type
export type Dictionary = typeof enDictionary; // Infer the Dictionary type from the actual JSON structure

export type Locale = 'en-US' | 'zh';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  'en-US': () => import('./dictionaries/en-US.json').then((module) => module.default),
  'zh': () => import('./dictionaries/zh.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  try {
    return (await dictionaries[locale]());
  } catch (error) {
    console.error(`Failed to load dictionary for locale "${locale}":`, error);
    return dictionaries['en-US'](); // Fallback to English if the requested locale fails
  }
}