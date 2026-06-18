import { setRequestLocale, getTranslations } from "next-intl/server";
import { ExploreGrid } from "@/components/explore/ExploreGrid";

type Props = { params: Promise<{ locale: string }> };

export default async function ExplorePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("explore");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-stone-900">{t("title")}</h1>
      <p className="mt-2 text-stone-600">{t("subtitle", { count: 15 })}</p>
      <div className="mt-10">
        <ExploreGrid />
      </div>
    </div>
  );
}
