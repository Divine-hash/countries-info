export type CountryData = {
  flags: {
    png: string;
    svg: string;
    alt: string;
  },
  name: {
    common: string;
    official: string;
    nativeName: Record<string, {official: string; common: string}>
  },
  cca3: string,
  capital: string[],
  region: string,
  population: number,
}

type CountryDataNoCode = Omit<CountryData, 'cca3'>

export type CountryDataWithBorders = {
  currencies: Record<string, {name: string, symbol: string}>;
  subregion: string;
  borders: string[];
  languages: Record<string, string>
} & CountryDataNoCode;

