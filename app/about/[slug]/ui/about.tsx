import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { fetchCountry, fetchBorderCountries } from "@/app/lib/data";

export default async function About({slug}: {slug: string}) {
  const country = await fetchCountry(slug);
  const borderCountries = await fetchBorderCountries(country);

  type Lang = keyof typeof country.languages;
  type Code = keyof typeof country.currencies;
  const lang: Lang = Object.keys(country.languages).at(-1) as Lang;
  const code: Code = Object.keys(country.currencies).at(0) as Code;
  const allLang = Object.values(country.languages).join(', ');

  return (
    <Container width="w-[min(90%,1500px)]">
        <div className="grid gap-10 md:gap-30 md:grid-cols-2 grid-row-[1fr] pb-50">
          <div className="relative h-60 md:h-auto">
            <Image
              src={country.flags.png}
              alt={country.flags.alt}
              fill={true}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="text-grey-950 dark:text-white md:pt-10">
            <h2 className="text-2xl font-extrabold mb-4">{country.name.common}</h2>
            <div className="flex flex-col gap-8 md:gap-20 mb-8 md:mb-15 [&_p]:font-semibold [&_span]:font-light [&_p]:leading-8 md:flex-row">
              <div>
                <p>Native Name: <span>{country.name.nativeName[lang].common}</span></p>
                <p>Population: <span>{country.population}</span></p>
                <p>Region: <span>{country.region}</span></p>
                <p>Sub Region: <span>{country.subregion}</span></p>
                <p>Capital: <span>{country.capital}</span></p>
              </div>
              <div>
                <p>Top Level Domain: <span>.be</span></p>
                <p>Currencies: <span>{country.currencies[code].name}</span></p>
                <p>Languages: <span>{allLang}</span></p>
              </div>
            </div>
            <div className="flex gap-2">
              <h3 className="font-semibold">Border Countries:</h3>
              <ul className="flex flex-wrap gap-5">
                {borderCountries.map((ctr) =>
                  <li key={ctr.name.common}>
                    <Link
                      href={`/about/${ctr.cca3}`}
                      className="btn-shadow px-6 py-1 bg-white dark:bg-blue-900 rounded-xs"
                    >
                      {ctr.name.common}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </Container>
  )
}