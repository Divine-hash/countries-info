import { Container } from "@/components/container";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import About from "./ui/about";
import { Suspense } from "react";
import { CountryAboutSkeleton } from "@/app/ui/skeletons";

export default async function Page({ params }: {params: Promise<{slug: string}>}) {
  const { slug } = await params;


  return (
    <main>
      <div className="py-15">
        <Container  width="w-[min(90%,1500px)]">
          <Link
            href="/"
            className="btn-shadow rounded-xs flex gap-2 bg-white w-min py-2 px-6 items-center dark:bg-blue-900 dark:text-white"
          >
            <ArrowLeft className="h-4"/>
            <p>Back</p>
          </Link>
        </Container>
      </div>
      <Suspense fallback={<CountryAboutSkeleton />}>
        <About slug={slug} />
      </Suspense>
    </main>
  )
}