import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  getArtworkBySlug,
  getArtworksByArtist,
  artworks,
} from "@/lib/data/artworks";
import { getArtistById } from "@/lib/data/artists";
import { InquiryForm } from "@/components/artwork/InquiryForm";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export default async function ArtworkPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const artwork = getArtworkBySlug(slug);
  if (!artwork) notFound();

  const artist = getArtistById(artwork.artistId);
  if (!artist) notFound();

  const t = await getTranslations("artwork");
  const tCat = await getTranslations("categories");
  const tInq = await getTranslations("inquiry");
  const related = getArtworksByArtist(artwork.artistId).filter(
    (a) => a.slug !== slug,
  );

  const statusLabel =
    artwork.status === "sold"
      ? t("sold")
      : artwork.status === "reserved"
        ? t("reserved")
        : t("available");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <Badge variant="outline">{tCat(artwork.category)}</Badge>
          <h1 className="mt-4 font-serif text-4xl text-stone-900">
            {artwork.title}
          </h1>
          <p className="mt-2 text-stone-600">
            {t("by")}{" "}
            <Link
              href={`/artist/${artist.slug}`}
              className="font-medium text-amber-900 hover:underline"
            >
              {artist.name}
            </Link>
          </p>
          <p className="mt-6 text-3xl font-medium text-stone-900">
            {formatPrice(artwork.price, locale)}
          </p>
          <Badge
            variant={artwork.status === "available" ? "accent" : "default"}
            className="mt-4"
          >
            {statusLabel}
          </Badge>
          <p className="mt-6 leading-relaxed text-stone-600">
            {artwork.description}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-stone-500">{t("medium")}</dt>
              <dd className="font-medium text-stone-900">{artwork.medium}</dd>
            </div>
            <div>
              <dt className="text-stone-500">{t("dimensions")}</dt>
              <dd className="font-medium text-stone-900">{artwork.dimensions}</dd>
            </div>
            <div>
              <dt className="text-stone-500">{t("year")}</dt>
              <dd className="font-medium text-stone-900">{artwork.year}</dd>
            </div>
            <div>
              <dt className="text-stone-500">{t("category")}</dt>
              <dd className="font-medium text-stone-900">
                {tCat(artwork.category)}
              </dd>
            </div>
          </dl>

          {artwork.status === "available" && (
            <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-xl text-stone-900">
                {tInq("title")}
              </h2>
              <p className="mt-2 text-sm text-stone-600">{tInq("subtitle")}</p>
              <div className="mt-6">
                <InquiryForm
                  artworkId={artwork.id}
                  artworkSlug={artwork.slug}
                  artworkTitle={artwork.title}
                  artistName={artist.name}
                  locale={locale}
                />
              </div>
            </div>
          )}

          <Link
            href={`/artist/${artist.slug}`}
            className="mt-6 inline-block text-sm font-medium text-amber-900 hover:underline"
          >
            {t("viewArtist")} →
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-2xl text-stone-900">
            {t("relatedTitle")}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((a) => (
              <ArtworkCard key={a.id} artwork={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
