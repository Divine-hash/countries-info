'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function SelectInput() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('region', value);
    } else {
      params.delete('region');
    }

    replace(`${pathName}?${params.toString()}`)
  }

  return (
    <Select
      onValueChange={handleChange}
    >
      <SelectTrigger
        className="w-[180px] bg-white rounded-xs border-none shadow-sm py-5 [&_svg]:stroke-grey-950 dark:[&_svg]:stroke-white [&_svg]:stroke-3 text-sm [&[data-placeholder]]:text-grey-950 dark:[&[data-placeholder]]:text-white font-light dark:bg-blue-900 dark:hover:bg-blue-900 focus-visible:ring-1 focus-visible:ring-grey-400">
        <SelectValue placeholder="Filter by Region"/>
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-blue-900 rounded-xs border-none">
        <SelectItem value="all" className="select-item">All</SelectItem>
        <SelectItem value="africa" className="select-item">Africa</SelectItem>
        <SelectItem value="america" className="select-item">America</SelectItem>
        <SelectItem value="asia" className="select-item">Asia</SelectItem>
        <SelectItem value="europe" className="select-item">Europe</SelectItem>
        <SelectItem value="oceania" className="select-item">Oceania</SelectItem>
      </SelectContent>
    </Select>
  )
}