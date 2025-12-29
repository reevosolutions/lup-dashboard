import { countries } from "country-data";

export type Country = {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
};

export const COUNTRIES: Country[] = countries.all;
