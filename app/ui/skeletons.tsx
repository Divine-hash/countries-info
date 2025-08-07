import { Container } from "@/components/container";

const shimmer = "before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-white/60 dark:before:via-white/10 before:to-transparent before:-translate-x-full before:animate-[shimmer_1.5s_linear_infinite]";

function CountrySkeleton() {
  return (
    <div className="bg-white dark:bg-blue-900 min-w-[260px]">
      <div className={`${shimmer} overflow-hidden relative w-full h-50 bg-slate-100 dark:bg-slate-700`}></div>
      <div className="px-8 pt-8 pb-15 [&_div]:bg-slate-100 dark:[&_div]:bg-slate-700">
        <div className={`${shimmer} overflow-hidden relative  mb-5 bg-slate-100 h-5`}></div>
        <div className={`${shimmer} overflow-hidden relative  h-3 w-30 mb-2`}></div>
        <div className={`${shimmer} overflow-hidden relative  h-3 w-30 mb-2`}></div>
        <div className={`${shimmer} overflow-hidden relative  h-3 w-30 mb-2`}></div>
      </div>
    </div>
  )
}

export function CountriesSkeleton() {
  return (
    <div className="grid justify-items-center md:grid-cols-[repeat(auto-fit,minmax(250,1fr))] md:justify-items-stretch gap-10">
      <CountrySkeleton />
      <CountrySkeleton />
      <CountrySkeleton />
      <CountrySkeleton />
      <CountrySkeleton />
      <CountrySkeleton />
      <CountrySkeleton />
      <CountrySkeleton />
    </div>
  )
}

export function CountryAboutSkeleton() {
  return (
    <div>
       <Container width="w-[min(90%,1500px)]">
        <div className="grid gap-10 md:gap-30 md:grid-cols-2 grid-row-[1fr] pb-50">
          <div className={`${shimmer} h-60 md:h-auto bg-slate-100 dark:bg-slate-700 relative overflow-hidden`}></div>
          <div className="md:pt-10">
            <div className={`${shimmer} overflow-hidden relative h-5 w-50 bg-slate-100 dark:bg-slate-700 mb-4`}></div>
            <div className="flex flex-col gap-8 md:gap-20 mb-8 md:mb-15 md:flex-row">
              <div className="[&_div]:h-2 [&_div]:bg-slate-100 dark:[&_div]:bg-slate-700 *:mb-5">
                <div className={`${shimmer} overflow-hidden relative w-50`}></div>
                <div className={`${shimmer} overflow-hidden relative w-60`}></div>
                <div className={`${shimmer} overflow-hidden relative w-70`}></div>
                <div className={`${shimmer} overflow-hidden relative w-80`}></div>
                <div className={`${shimmer} overflow-hidden relative w-50`}></div>
              </div>
              <div className="[&_div]:h-2 [&_div]:bg-slate-100 dark:[&_div]:bg-slate-700 *:mb-5" >
                <div className={`${shimmer} overflow-hidden relative w-30`}></div>
                <div className={`${shimmer} overflow-hidden relative w-40`}></div>
                <div className={`${shimmer} overflow-hidden relative w-30`}></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className={`${shimmer} overflow-hidden relative w-30 h-3 bg-slate-100 dark:bg-slate-700`}></div>
              <div className="flex flex-wrap gap-5 [&_div]:h-8 [&_div]:w-20 [&_div]:bg-slate-100 dark:[&_div]:bg-slate-700">
                <div className={`${shimmer} overflow-hidden relative rounded-xs`}></div>
                <div className={`${shimmer} overflow-hidden relative rounded-xs`}></div>
                <div className={`${shimmer} overflow-hidden relative rounded-xs`}></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}