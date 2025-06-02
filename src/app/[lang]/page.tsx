
import Link from "next/link";
import { getDictionary, type Locale } from "@/app/[lang]/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return {
    title: t.page.title,
    description: t.page.desc,
  };
}

export default async function Home({
  params,
}: { params: Promise<{ lang: Locale }>; }) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-24">
      <div className="space-x-2">
        <Link href="/en-US">English</Link><span>|</span>
        <Link href="/zh">中文(Chinese)</Link>
      </div>
      <div className="flex flex-col gap-6">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {t.home.title}
        </p>
        {t.home.desc}
      </div>
    </main>
  );
}
