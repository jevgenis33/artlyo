import type { AuctionDemo } from "@/lib/types";

const daysFromNow = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

export const demoAuctions: AuctionDemo[] = [
  {
    id: "a1",
    slug: "amber-dusk-auction",
    artworkId: "1",
    currentBid: 980,
    bidCount: 7,
    endsAt: daysFromNow(3),
    reserveMet: true,
  },
  {
    id: "a2",
    slug: "root-form-auction",
    artworkId: "3",
    currentBid: 2100,
    bidCount: 4,
    endsAt: daysFromNow(5),
    reserveMet: false,
  },
  {
    id: "a3",
    slug: "laima-dreams-auction",
    artworkId: "5",
    currentBid: 320,
    bidCount: 12,
    endsAt: daysFromNow(1),
    reserveMet: true,
  },
];

export function getDemoAuctionBySlug(slug: string) {
  return demoAuctions.find((a) => a.slug === slug);
}
