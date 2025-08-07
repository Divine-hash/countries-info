// import Image from "next/image";
import { Container } from '@/components/container';
import SearchInput from './ui/searchInput';
import SelectInput from '@/components/selectInput';
import Countries from './ui/countries';
import { CountriesSkeleton } from './ui/skeletons';
import { Suspense } from 'react';


export default async function Page(
  props: {searchParams: Promise<{country: string, region: string}>}
) {
  const searchParams = await props.searchParams;
  const country = searchParams?.country || '';
  const region = searchParams?.region || '';

  return (
    <div>
      <main>
        <section>
          <Container width="w-[min(90%,1500px)]">
            <div className="py-8 flex flex-col md:flex-row md:justify-between gap-10">
              <SearchInput/>
              <SelectInput />
            </div>
          </Container>
        </section>
        <section>
          <Container width="w-[min(90%,1500px)]">
            <Suspense key={country + region} fallback={<CountriesSkeleton />}>
              <Countries country={country} region={region} />
            </Suspense>
          </Container>
        </section>
      </main>
    </div>
  );
}
