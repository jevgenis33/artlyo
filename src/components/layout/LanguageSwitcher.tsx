"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { useState } from "react";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-stone-600 hover:bg-stone-100"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-xl border border-stone-200 bg-white py-1 shadow-lg">
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  router.replace(pathname, { locale: l });
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-4 py-2 text-left text-sm hover:bg-stone-50",
                  l === locale && "font-medium text-amber-900",
                )}
              >
                {localeNames[l]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
