"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { artworks } from "@/lib/data/artworks";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import type { ArtCategory } from "@/lib/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

const categories: (ArtCategory | "all")[] = [
  "all",
  "painting",
  "sculpture",
  "digital",
  "photography",
  "mixed-media",
];

export function ExploreGrid() {
  const t = useTranslations("explore");
  const tCat = useTranslations("categories");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ArtCategory | "all">("all");

  const filtered = useMemo(() => {
    return artworks.filter((a) => {
      if (category !== "all" && a.category !== category) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!a.title.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [search, category]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <Input
            placeholder={t("searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                category === cat
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {cat === "all" ? t("allCategories") : tCat(cat)}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-6 text-sm text-stone-500">
        {t("subtitle", { count: filtered.length })}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-200 py-16 text-center">
          <p className="text-stone-500">{t("noResults")}</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("all");
            }}
            className="mt-4 text-sm font-medium text-amber-900 hover:underline"
          >
            {t("clearFilters")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </div>
  );
}
