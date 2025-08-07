import Image from 'next/image';
import { fetchCountries } from '../lib/data';
import { CountryData } from '../lib/definitions';
import Link from 'next/link';

export default async function Countries({ country, region }: {country: string, region: string}) {
  const allCountries = await fetchCountries(country, region);
  return (
    <div className="grid justify-items-center md:grid-cols-[repeat(auto-fill,minmax(250,1fr))] md:justify-items-stretch gap-10 pb-15">
      {allCountries.map((countryData, index) =>
        <Link
          key={countryData.name.common}
          href={`./about/${countryData.cca3}`}
        >
          <Country
            data={countryData}
            index={index}
            />
        </Link>
      )}
    </div>
  )
}

function Country({ data, index }: {data: CountryData, index: number}) {
  return (
    <div className="bg-white dark:bg-blue-900 w-[260px] md:w-auto shadow-lg h-full rounded-sm overflow-hidden">
      <div className="group relative w-full h-50 overflow-hidden">
        <Image
          src={data.flags.png}
          alt={data.flags.alt}
          fill={true}
          sizes='260px'
          priority={index == 0 || index == 3}
          className="object-cover transition-transform duration-500 group-hover:transform-[scale(1.2)]"
        />
      </div>
      <div className="px-8 pt-8 pb-15 text-grey-950 dark:text-white">
        <h2 className="font-extrabold text-xl mb-5">{data.name.official}</h2>
        <p className="font-semibold">
          Population: <span className="font-light">{data.population}</span>
        </p>
        <p className="font-semibold">
          Region: <span className="font-light">{data.region}</span>
        </p>
        <p className="font-semibold">
          Capital: <span className="font-light">{data.capital[0]}</span>
        </p>
      </div>
    </div>
  )
}