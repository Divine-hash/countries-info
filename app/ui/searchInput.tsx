'use client';

import { Search } from "lucide-react"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('country', term);
    } else {
      params.delete('country');
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300);

  return (
    <div className="relative shadow-sm rounded-sm overflow-hidden focus-within:outline focus-within:outline-grey-950 dark:focus-within:outline-grey-400 md:w-[400px]">
      <label htmlFor="search" className="sr-only">search</label>
      <input
        id="search"
        placeholder="Search for a country..."
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
        autoComplete="off"
        className="placeholder:text-sm placeholder:text-grey-400 dark:placeholder:text-white w-full font-light py-3 bg-white dark:bg-blue-900 pl-18 outline-none text-grey-950 dark:text-white"
        />
      <Search className="absolute left-8 top-0 bottom-0 my-auto w-4 stroke-grey-400 dark:stroke-white" />
    </div>
  )
}