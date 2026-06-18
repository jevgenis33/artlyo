import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getArtistBySlug, artists } from "@/lib/data/artists";
import { getArtworksByArtist } from "@/lib/data/artworks";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle, MapPin } from "lucide-react";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export default async function ArtistPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  const works = getArtworksByArtist(artist.id);
  const t = await getTranslations("artist");

  return (
    <div>
      <div className="relative h-48 bg-stone-200 sm:h-64">
        <Image
          src={artist.bannerUrl}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 flex flex-col items-center text-center sm:-mt-20">
          <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-white">
            <Image
              src={artist.avatarUrl}
              alt={artist.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <h1 className="mt-4 font-serif text-3xl text-stone-900 sm:text-4xl">
            {artist.name}
          </h1>
          <p className="mt-2 flex items-center gap-1 text-stone-600">
            <MapPin className="h-4 w-4" />
            {t("location")} {artist.location}, {artist.country}
          </p>
          {artist.verified && (
            <Badge variant="accent" className="mt-3 gap-1">
              <CheckCircle className="h-3 w-3" />
              {t("verified")}
            </Badge>
          )}
          <p className="mt-6 max-w-2xl text-stone-600">{artist.bio}</p>
        </div>

        <section className="mt-16 pb-16">
          <h2 className="font-serif text-2xl text-stone-900">
            {t("works")}{" "}
            <span className="text-lg font-sans text-stone-500">
              ({t("worksCount", { count: works.length })})
            </span>
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
