import { setRequestLocale, getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const roadmap = [
    t("roadmap1"),
    t("roadmap2"),
    t("roadmap3"),
    t("roadmap4"),
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-stone-900">{t("title")}</h1>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-stone-900">{t("missionTitle")}</h2>
        <p className="mt-4 leading-relaxed text-stone-600">{t("missionDesc")}</p>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-stone-900">{t("visionTitle")}</h2>
        <p className="mt-4 leading-relaxed text-stone-600">{t("visionDesc")}</p>
      </section>

      <section className="mt-12 rounded-2xl bg-amber-50 p-8">
        <Badge variant="accent" className="mb-4">
          🇱🇻 Latvia
        </Badge>
        <h2 className="font-serif text-2xl text-stone-900">{t("latviaTitle")}</h2>
        <p className="mt-4 leading-relaxed text-stone-600">{t("latviaDesc")}</p>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-stone-900">{t("roadmapTitle")}</h2>
        <ol className="mt-6 space-y-4">
          {roadmap.map((item, i) => (
            <li key={item} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-medium text-white">
                {i + 1}
              </span>
              <p className="pt-1 text-stone-600">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 border-t border-stone-200 pt-12">
        <h2 className="font-serif text-2xl text-stone-900">{t("contactTitle")}</h2>
        <p className="mt-4 text-stone-600">
          {t("contactDesc").split(":")[0]}:{" "}
          <a
            href="mailto:hello@artlyo.com"
            className="font-medium text-amber-900 hover:underline"
          >
            hello@artlyo.com
          </a>
        </p>
      </section>
    </div>
  );
}
