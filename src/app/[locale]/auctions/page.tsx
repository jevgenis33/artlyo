import { setRequestLocale, getTranslations } from "next-intl/server";
import { AuctionsContent } from "@/components/auctions/AuctionsContent";

type Props = { params: Promise<{ locale: string }> };

export default async function AuctionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auctions");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-stone-900">{t("title")}</h1>
      <p className="mt-2 text-stone-600">{t("subtitle")}</p>
      <div className="mt-10">
        <AuctionsContent />
      </div>
    </div>
  );
}
