export interface CountriesData {
  flags: {
    png: string;
    svg: string;
    alt: string;
  },
  name: {
    common: string;
    official: string;
    nativeName: {
      ron: {
        official: string;
        common: string;
      }
    }
  },
  cca3: string,
  capital: string[],
  region: string,
  population: number,
}