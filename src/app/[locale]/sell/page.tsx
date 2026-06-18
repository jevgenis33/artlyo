import { setRequestLocale, getTranslations } from "next-intl/server";
import { SellerApplicationForm } from "@/components/sell/SellerApplicationForm";
import { Palette, Globe, Upload, TrendingUp } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export default async function SellPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sell");

  const benefits = [
    { icon: Palette, title: t("benefit1Title"), desc: t("benefit1Desc") },
    { icon: Globe, title: t("benefit2Title"), desc: t("benefit2Desc") },
    { icon: Upload, title: t("benefit3Title"), desc: t("benefit3Desc") },
    { icon: TrendingUp, title: t("benefit4Title"), desc: t("benefit4Desc") },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl text-stone-900">{t("title")}</h1>
        <p className="mt-4 text-lg text-stone-600">{t("subtitle")}</p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="rounded-2xl border border-stone-200 bg-white p-6"
          >
            <b.icon className="h-7 w-7 text-amber-800" />
            <h3 className="mt-4 font-serif text-lg text-stone-900">{b.title}</h3>
            <p className="mt-2 text-sm text-stone-600">{b.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl text-stone-900">{t("formTitle")}</h2>
          <p className="mt-2 text-sm text-stone-600">
            Join the first wave of artists on Artlyo. Free listing during the pilot phase.
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <SellerApplicationForm />
        </div>
      </div>
    </div>
  );
}
