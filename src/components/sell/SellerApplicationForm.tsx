"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input, Label, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

export function SellerApplicationForm() {
  const t = useTranslations("sell");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/seller-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          portfolio: form.get("portfolio"),
          about: form.get("about"),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
        <h3 className="mt-4 font-serif text-xl text-stone-900">
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-sm text-stone-600">{t("successDesc")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">{t("name")}</Label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="email">{t("email")}</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="portfolio">{t("portfolio")}</Label>
        <Input id="portfolio" name="portfolio" type="url" />
      </div>
      <div>
        <Label htmlFor="about">{t("about")}</Label>
        <Textarea id="about" name="about" required />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">Error submitting. Please try again.</p>
      )}
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {t("submit")}
      </Button>
    </form>
  );
}
