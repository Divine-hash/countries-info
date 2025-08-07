import { CountryData, CountryDataWithBorders } from "./definitions";

class HttpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

export async function fetchCountries(country: string, region: string): Promise<CountryData[]>  {
  if (region == 'all') {
    return await fetchData();
  } else if (country && region) {
    const regions = await fetchData(region);
    return regions.filter((region) => region.name.official.includes(country))
  } else if (country) {
    return await fetchData(country);
  } else if (region) {
    return await fetchData(region);
  }
  return await fetchData();
}

export async function fetchCountry(slug: string): Promise<CountryDataWithBorders> {
  const url = `https://restcountries.com/v3.1/alpha/${slug}?fields=name,population,subregion,region,capital,flags,currencies,borders,languages`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status} for country`)
    }
    return await res.json();
  } catch (err){
    console.log(err);
    throw err;
  }
}

export async function fetchBorderCountries(country: CountryDataWithBorders) {
  try {
    const requests = country.borders.map((border) => {
      return fetch(`https://restcountries.com/v3.1/alpha/${border}`);
    });

    const responses = await Promise.all(requests);

    // Check for non-200 responses and throw an error if one is found
    for (const response of responses) {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} for country border.`);
      }
    }

    const results = await Promise.all(responses.map((res) => res.json()));

    // The 'results' array will contain an array of country objects for each request.
    // The problem statement shows that we are returning result[0]
    // so we will need to handle this case
    return results.map((result) => {
        // We will make sure that the result array is not empty
        if (result.length > 0) {
            return result[0];
        } else {
            throw new Error('No country data found for one of the border codes.');
        }
    });

  } catch (error) {
    console.error("Failed to fetch border countries:", error);
    // You can re-throw the error, return an empty array, or handle it in another way
    // depending on your application's needs.
    return []; // For example, return an empty array on error.
  }
}



async function fetchData(query?: string): Promise<CountryData[]> {
  const url = getUrl(query);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status == 404) return [];
      throw new HttpError(`HTTP error!`, res.status);
    }
    const data = await res.json();
    return data;
  } catch(err) {
    console.log('Error fetching posts', err);
    if (err instanceof HttpError) {
      throw err
    } else if (err instanceof Error) {
      throw new Error(`An unexpected error occured: ${err.message}`)
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
}

function getUrl(query?: string) {
  let url = 'https://restcountries.com/v3.1/'
  if (query) {
    url += `name/${query}`;
  } else {
    url += 'all'
  }
  url += '?fields=name,population,region,capital,flags,cca3';
  return url;
}