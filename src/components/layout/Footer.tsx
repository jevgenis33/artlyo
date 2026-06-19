"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-2xl text-stone-900">
              Artlyo
            </Link>
            <p className="mt-3 max-w-sm text-sm text-stone-600">{t("tagline")}</p>
            <p className="mt-4 text-xs text-stone-400">{t("mvpNote")}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-stone-900">Artlyo</h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-600">
              <li>
                <Link href="/explore" className="hover:text-stone-900">
                  {t("explore")}
                </Link>
              </li>
              <li>
                <Link href="/auctions" className="hover:text-stone-900">
                  Auctions
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-stone-900">
                  {t("sell")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-stone-900">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/manifesto" className="hover:text-stone-900">
                  {t("manifesto")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-stone-900">Contact</h3>
            <p className="mt-3 text-sm text-stone-600">
              <a href="mailto:hello@artlyo.com" className="hover:text-stone-900">
                hello@artlyo.com
              </a>
            </p>
            <p className="mt-2 text-sm text-stone-500">Riga, Latvia</p>
          </div>
        </div>
        <div className="mt-10 border-t border-stone-200 pt-6 text-center text-xs text-stone-400">
          © {new Date().getFullYear()} Artlyo. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
