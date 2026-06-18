import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { ArtistCard } from "@/components/artist/ArtistCard";
import { getFeaturedArtworks } from "@/lib/data/artworks";
import { getFeaturedArtists } from "@/lib/data/artists";
import { Badge } from "@/components/ui/Badge";
import { Compass, MessageCircle, Package } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");
  const th = await getTranslations("home");

  const featured = getFeaturedArtworks().slice(0, 8);
  const artists = getFeaturedArtists();

  return (
    <>
      <section className="relative overflow-hidden bg-stone-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/40 via-stone-900 to-stone-900" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <Badge variant="accent" className="mb-6 bg-amber-900/50 text-amber-100">
            {t("badge")}
          </Badge>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-stone-300">{t("subtitle")}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/explore"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-100"
            >
              {t("exploreCta")}
            </Link>
            <Link
              href="/sell"
              className="rounded-full border border-white/30 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {t("sellCta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl text-stone-900">{th("featuredTitle")}</h2>
            <p className="mt-2 text-stone-600">{th("featuredSubtitle")}</p>
          </div>
          <Link
            href="/explore"
            className="hidden text-sm font-medium text-amber-900 hover:underline sm:block"
          >
            {th("viewAll")} →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
        <Link
          href="/explore"
          className="mt-8 block text-center text-sm font-medium text-amber-900 hover:underline sm:hidden"
        >
          {th("viewAll")} →
        </Link>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-3xl text-stone-900">
            {th("howTitle")}
          </h2>
          <p className="mt-2 text-center text-stone-600">{th("howSubtitle")}</p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { icon: Compass, title: th("step1Title"), desc: th("step1Desc") },
              { icon: MessageCircle, title: th("step2Title"), desc: th("step2Desc") },
              { icon: Package, title: th("step3Title"), desc: th("step3Desc") },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-stone-100 bg-stone-50 p-8 text-center"
              >
                <step.icon className="mx-auto h-8 w-8 text-amber-800" />
                <h3 className="mt-4 font-serif text-xl text-stone-900">{step.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-stone-900">{th("artistsTitle")}</h2>
        <p className="mt-2 text-stone-600">{th("artistsSubtitle")}</p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      <section className="bg-amber-900 py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl">{th("ctaTitle")}</h2>
          <p className="mt-4 text-amber-100">{th("ctaSubtitle")}</p>
          <Link
            href="/sell"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-medium text-amber-900 transition-colors hover:bg-amber-50"
          >
            {th("ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
