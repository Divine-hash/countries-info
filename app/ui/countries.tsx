import Image from 'next/image';
import { fetchCountries } from '../lib/data';
import { CountriesData } from '../lib/definitions';
import { getPlaiceholder } from 'plaiceholder';
import Link from 'next/link';

// const allData = [
//   {
//     "flags": {
//       "png": "https://flagcdn.com/w320/md.png",
//       "svg": "https://flagcdn.com/md.svg",
//       "alt": "The flag of Moldova is composed of three equal vertical bands of blue, yellow and red, with the national coat of arms centered in the yellow band."
//     },
//     "name": {
//       "common": "Moldova",
//       "official": "Republic of Moldova",
//       "nativeName": {
//         "ron": {
//           "official": "Republica Moldova",
//           "common": "Moldova"
//         }
//       }
//     },
//     "capital": [
//       "Chișinău"
//     ],
//     "region": "Europe",
//     "population": 2617820
//   },
// ]

async function getPlaiceholderForImage(src: string) {
  try {
    const buffer = await fetch(src).then(async (res) => {
      // Throw an error if the response is not ok (e.g., 404, 500)
      if (!res.ok) {
        throw new Error(`Failed to fetch image: ${src} - Status: ${res.status}`);
      }
      return Buffer.from(await res.arrayBuffer());
    });

    const { base64 } = await getPlaiceholder(buffer);
    return {
      src,
      blurDataURL: base64,
    };
  } catch (err) {
    console.error(`Failed to get plaiceholder for ${src}:`, err);
    return {
      src,
      blurDataURL: '', // Provide a fallback
    };
  }
}


export default async function Countries({ country, region }: {country: string, region: string}) {
  const allCountries = await fetchCountries(country, region);

  // const flagsSrc = [...allCountries.map((country) => country.flags.png)];
  // const imagePlaceholders =
  //   await Promise.all(flagsSrc.map((flagSrc) => getPlaiceholderForImage(flagSrc)));


  return (
    <div className="grid justify-items-center md:grid-cols-[repeat(auto-fit,minmax(250,1fr))] md:justify-items-stretch gap-10">
      {allCountries.map((countryData, index) =>
        <Link
          key={countryData.name.common}
          href={`./about/${countryData.cca3}`}
        >
          <Country
            data={countryData}
            // placeholderImage={imagePlaceholders[index]}
            index={index}
            />
        </Link>
      )}
    </div>
  )
}

interface CountryProps {
  data: CountriesData;
  index: number;
  placeholderImage?: {
    src: string;
    blurDataURL: string;
  }
}



function Country({ data, index, placeholderImage }: CountryProps) {
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
          // placeholder={placeholderImage.blurDataURL ? 'blur' : 'empty'}
          // blurDataURL={placeholderImage.blurDataURL}
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