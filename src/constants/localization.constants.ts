import i18nConfig from "@config/i18n.config";

export const LOCALIZATION_LANGUAGES: {
  [key in Levelup.V2.Cm.Translation.Entity.TLanguageCode]: string;
} = {
  zh: "Chinese",
  es: "Spanish",
  en: "English",
  hi: "Hindi",
  ar: "Arabic",
  bn: "Bengali",
  pt: "Portuguese",
  ru: "Russian",
  ja: "Japanese",
  de: "German",
  ko: "Korean",
  fr: "French",
  tr: "Turkish",
  vi: "Vietnamese",
  ur: "Urdu",
  it: "Italian",
  th: "Thai",
  gu: "Gujarati",
  pl: "Polish",
  uk: "Ukrainian",
  ro: "Romanian",
  nl: "Dutch",
  el: "Greek",
  sv: "Swedish",
  sr: "Serbian",
  hu: "Hungarian",
  fa: "Persian",
  cs: "Czech",
  fi: "Finnish",
  sk: "Slovak",
  da: "Danish",
  bg: "Bulgarian",
  no: "Norwegian",
  he: "Hebrew",
  id: "Indonesian",
  ms: "Malay",
  lv: "Latvian",
  lt: "Lithuanian",
  et: "Estonian",
  hr: "Croatian",
  sl: "Slovenian",
  mt: "Maltese",
  is: "Icelandic",
  ga: "Irish",
  mk: "Macedonian",
  cy: "Welsh",
  ne: "Nepali",
  ml: "Malayalam",
  kn: "Kannada",
  mr: "Marathi",
  ta: "Tamil",
  te: "Telugu",
  pa: "Punjabi",
  sw: "Swahili",
  ka: "Georgian",
  am: "Amharic",
  ti: "Tigrinya",
  xh: "Xhosa",
  zu: "Zulu",
  yi: "Yiddish",
  so: "Somali",
  sn: "Shona",
  ny: "Chichewa",
  st: "Sesotho",
  tn: "Setswana",
  ts: "Tsonga",
  ss: "Swati",
  ve: "Venda",
  nr: "Ndebele",
};

export const LANGUAGE_TO_COUNTRY: {
  [key in Levelup.V2.Cm.Translation.Entity.TLanguageCode]: string;
} = {
  zh: "CN", // Chinese - China
  es: "ES", // Spanish - Spain (Note: Spanish is widely spoken in many countries in Latin America)
  en: "US", // English - United States (Note: English is an official language in several countries)
  hi: "IN", // Hindi - India
  ar: "DZ", // Arabic - Saudi Arabia (Note: Arabic is spoken in many countries across the Middle East and North Africa)
  bn: "BD", // Bengali - Bangladesh
  pt: "PT", // Portuguese - Portugal (Note: Brazilian Portuguese is slightly different and widely spoken in Brazil)
  ru: "RU", // Russian - Russia
  ja: "JP", // Japanese - Japan
  de: "DE", // German - Germany
  ko: "KR", // Korean - South Korea
  fr: "FR", // French - France (Note: French is also spoken in Belgium, Switzerland, Canada, and several African countries)
  tr: "TR", // Turkish - Turkey
  vi: "VN", // Vietnamese - Vietnam
  ur: "PK", // Urdu - Pakistan
  it: "IT", // Italian - Italy
  th: "TH", // Thai - Thailand
  gu: "IN", // Gujarati - India
  pl: "PL", // Polish - Poland
  uk: "UA", // Ukrainian - Ukraine
  ro: "RO", // Romanian - Romania
  nl: "NL", // Dutch - Netherlands
  el: "GR", // Greek - Greece
  sv: "SE", // Swedish - Sweden
  sr: "RS", // Serbian - Serbia
  hu: "HU", // Hungarian - Hungary
  fa: "IR", // Persian (Farsi) - Iran
  cs: "CZ", // Czech - Czech Republic
  fi: "FI", // Finnish - Finland
  sk: "SK", // Slovak - Slovakia
  da: "DK", // Danish - Denmark
  bg: "BG", // Bulgarian - Bulgaria
  no: "NO", // Norwegian - Norway
  he: "IL", // Hebrew - Israel
  id: "ID", // Indonesian - Indonesia
  ms: "MY", // Malay - Malaysia
  lv: "LV", // Latvian - Latvia
  lt: "LT", // Lithuanian - Lithuania
  et: "EE", // Estonian - Estonia
  hr: "HR", // Croatian - Croatia
  sl: "SI", // Slovenian - Slovenia
  mt: "MT", // Maltese - Malta
  is: "IS", // Icelandic - Iceland
  ga: "IE", // Irish - Ireland
  mk: "MK", // Macedonian - North Macedonia
  cy: "GB", // Welsh - United Kingdom (Wales)
  ne: "NP", // Nepali - Nepal
  ml: "IN", // Malayalam - India
  kn: "IN", // Kannada - India
  mr: "IN", // Marathi - India
  ta: "IN", // Tamil - India (Note: also spoken in Sri Lanka and Singapore)
  te: "IN", // Telugu - India
  pa: "IN", // Punjabi - India (Note: also spoken in Pakistan)
  sw: "TZ", // Swahili - Tanzania (Note: also widely spoken in Kenya and other parts of East Africa)
  ka: "GE", // Georgian - Georgia
  am: "ET", // Amharic - Ethiopia
  ti: "ET", // Tigrinya - Ethiopia
  xh: "ZA", // Xhosa - South Africa
  zu: "ZA", // Zulu - South Africa
  yi: "IL", // Yiddish - Israel (Note: historically Eastern Europe, now minority language in several countries)
  so: "SO", // Somali - Somalia
  sn: "ZW", // Shona - Zimbabwe
  ny: "MW", // Chichewa - Malawi
  st: "LS", // Sesotho - Lesotho
  tn: "BW", // Setswana - Botswana
  ts: "ZA", // Tsonga - South Africa
  ss: "SZ", // Swati - Eswatini (Swaziland)
  ve: "ZA", // Venda - South Africa
  nr: "ZA", // Ndebele - South Africa
};

export const LOCALIZATION_LANGUAGE_CODES = Object.keys(LOCALIZATION_LANGUAGES) as Levelup.V2.Cm.Translation.Entity.TLanguageCode[];
export const LOCALIZATION_LANGUAGE_NAMES = Object.values(LOCALIZATION_LANGUAGES) as string[];

export const SUPPORTED_LANGUAGES: Levelup.V2.Cm.Translation.Entity.TLanguageCode[] = i18nConfig.locales;
export const SUPPORTED_LANGUAGE_OBJECTS = SUPPORTED_LANGUAGES.map((lang) => ({
  language_code: lang,
  language_name: LOCALIZATION_LANGUAGES[lang],
  language_country_code: LANGUAGE_TO_COUNTRY[lang],
}));
