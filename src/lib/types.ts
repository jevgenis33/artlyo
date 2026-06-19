export type ArtCategory =
  | "painting"
  | "sculpture"
  | "digital"
  | "photography"
  | "mixed-media";

export interface Artist {
  id: string;
  slug: string;
  name: string;
  location: string;
  country: string;
  avatarUrl: string;
  bannerUrl: string;
  website?: string;
  instagram?: string;
  verified: boolean;
  featured: boolean;
}

export interface Artwork {
  id: string;
  slug: string;
  artistId: string;
  title: string;
  description: string;
  price: number;
  category: ArtCategory;
  medium: string;
  dimensions: string;
  year: number;
  imageUrl: string;
  featured: boolean;
  status: "available" | "sold" | "reserved";
}

export interface AuctionDemo {
  id: string;
  slug: string;
  artworkId: string;
  currentBid: number;
  bidCount: number;
  endsAt: string;
  reserveMet: boolean;
}

export interface InquiryPayload {
  artworkId: string;
  artworkTitle: string;
  artistName: string;
  name: string;
  email: string;
  message: string;
  locale: string;
}
