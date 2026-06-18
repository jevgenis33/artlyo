"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Artwork } from "@/lib/types";
import { getArtistById } from "@/lib/data/artists";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const t = useTranslations("artwork");
  const tCat = useTranslations("categories");
  const locale = useLocale();
  const artist = getArtistById(artwork.artistId);

  return (
    <Link
      href={`/artwork/${artwork.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/60 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <Image
          src={artwork.imageUrl}
          alt={artwork.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {artwork.status !== "available" && (
          <div className="absolute left-3 top-3">
            <Badge variant="outline" className="bg-white/90 backdrop-blur">
              {artwork.status === "sold" ? t("sold") : t("reserved")}
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-stone-500">{tCat(artwork.category)}</p>
        <h3 className="mt-1 font-serif text-lg text-stone-900 group-hover:text-amber-900">
          {artwork.title}
        </h3>
        {artist && (
          <p className="mt-1 text-sm text-stone-500">{artist.name}</p>
        )}
        <p className="mt-2 font-medium text-stone-900">
          {formatPrice(artwork.price, locale)}
        </p>
      </div>
    </Link>
  );
}
