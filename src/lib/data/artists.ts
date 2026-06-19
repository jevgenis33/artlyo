import type { Artist } from "@/lib/types";

export const artists: Artist[] = [
  {
    id: "1",
    slug: "mara-kalnina",
    name: "Māra Kalniņa",
    location: "Riga",
    country: "Latvia",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200&h=400&fit=crop",
    instagram: "@marakalnina",
    verified: true,
    featured: true,
  },
  {
    id: "2",
    slug: "sergejs-karpenko",
    name: "Sergejs Karpenko",
    location: "Daugavpils",
    country: "Latvia",
    avatarUrl: "/artists/sergejs-karpenko.png",
    bannerUrl:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=400&fit=crop",
    verified: true,
    featured: true,
  },
  {
    id: "3",
    slug: "inese-berzina",
    name: "Inese Bērziņa",
    location: "Riga",
    country: "Latvia",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop",
    instagram: "@ineseberzina",
    verified: true,
    featured: true,
  },
  {
    id: "4",
    slug: "lars-eriksen",
    name: "Lars Eriksen",
    location: "Oslo",
    country: "Norway",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop",
    verified: false,
    featured: false,
  },
  {
    id: "5",
    slug: "anna-muller",
    name: "Anna Müller",
    location: "Berlin",
    country: "Germany",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=400&fit=crop",
    instagram: "@annamueller.art",
    verified: true,
    featured: false,
  },
  {
    id: "6",
    slug: "sofia-volkova",
    name: "Sofia Volkova",
    location: "Riga",
    country: "Latvia",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&h=400&fit=crop",
    verified: false,
    featured: false,
  },
];

export function getArtistBySlug(slug: string) {
  return artists.find((a) => a.slug === slug);
}

export function getArtistById(id: string) {
  return artists.find((a) => a.id === id);
}

export function getFeaturedArtists() {
  return artists.filter((a) => a.featured);
}
