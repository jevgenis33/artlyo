"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { demoAuctions } from "@/lib/data/auctions";
import { getArtistById } from "@/lib/data/artists";
import { artworks } from "@/lib/data/artworks";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { Gavel, Clock } from "lucide-react";

function Countdown({ endsAt }: { endsAt: string }) {
  const t = useTranslations("auctions");
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    function update() {
      const diff = new Date(endsAt).getTime() - Date.now();
      if (diff <= 0) {
        setRemaining("0m");
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      setRemaining(`${d}${t("days")} ${h}${t("hours")} ${m}${t("minutes")}`);
    }
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [endsAt, t]);

  return (
    <span className="flex items-center gap-1 text-sm text-stone-600">
      <Clock className="h-4 w-4" />
      {t("endsIn")} {remaining}
    </span>
  );
}

export function AuctionsContent() {
  const t = useTranslations("auctions");
  const locale = useLocale();

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <p className="text-sm text-amber-900">{t("comingSoon")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demoAuctions.map((auction) => {
          const artwork = artworks.find((a) => a.id === auction.artworkId);
          if (!artwork) return null;
          const artist = getArtistById(artwork.artistId);

          return (
            <div
              key={auction.id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/60"
            >
              <div className="relative aspect-[4/3] bg-stone-100">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
                <div className="absolute left-3 top-3">
                  <Badge variant="accent">{t("demoBadge")}</Badge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg text-stone-900">
                  {artwork.title}
                </h3>
                {artist && (
                  <p className="text-sm text-stone-500">{artist.name}</p>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-stone-500">{t("currentBid")}</p>
                    <p className="text-lg font-medium text-stone-900">
                      {formatPrice(auction.currentBid, locale)}
                    </p>
                  </div>
                  <p className="text-sm text-stone-500">
                    {t("bids", { count: auction.bidCount })}
                  </p>
                </div>
                <div className="mt-3">
                  <Countdown endsAt={auction.endsAt} />
                </div>
                <Badge
                  variant={auction.reserveMet ? "accent" : "outline"}
                  className="mt-3"
                >
                  {auction.reserveMet ? t("reserveMet") : t("reserveNotMet")}
                </Badge>
                <Link
                  href={`/artwork/${artwork.slug}`}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
                >
                  <Gavel className="h-4 w-4" />
                  {t("placeBid")}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
