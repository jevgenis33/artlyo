"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Artist } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle } from "lucide-react";

export function ArtistCard({ artist }: { artist: Artist }) {
  const t = useTranslations("artist");

  return (
    <Link
      href={`/artist/${artist.slug}`}
      className="group flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-stone-200/60 transition-shadow hover:shadow-md"
    >
      <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-stone-100">
        <Image
          src={artist.avatarUrl}
          alt={artist.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
      <h3 className="mt-4 font-serif text-lg text-stone-900 group-hover:text-amber-900">
        {artist.name}
      </h3>
      <p className="mt-1 text-sm text-stone-500">
        {artist.location}, {artist.country}
      </p>
      {artist.verified && (
        <Badge variant="accent" className="mt-3 gap-1">
          <CheckCircle className="h-3 w-3" />
          {t("verified")}
        </Badge>
      )}
    </Link>
  );
}
