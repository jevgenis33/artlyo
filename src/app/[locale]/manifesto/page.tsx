import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function ManifestoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("manifesto");

  const paragraphs = [t("p1"), t("p2"), t("p3"), t("p4"), t("p5"), t("p6")];

  return (
    <div>
      <section className="bg-stone-900 px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-200/80">
            Artlyo
          </p>
          <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg leading-relaxed text-stone-600"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <blockquote className="mt-16 border-l-4 border-amber-800 pl-6">
          <p className="font-serif text-2xl leading-snug text-stone-900 sm:text-3xl">
            {t("tagline")}
          </p>
        </blockquote>

        <div className="mt-16 flex flex-wrap gap-4 border-t border-stone-200 pt-10">
          <Link
            href="/explore"
            className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800"
          >
            {t("exploreCta")}
          </Link>
          <Link
            href="/sell"
            className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
          >
            {t("sellCta")}
          </Link>
        </div>
      </article>
    </div>
  );
}
