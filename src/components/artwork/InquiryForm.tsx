"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input, Label, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { CheckCircle } from "lucide-react";

interface InquiryFormProps {
  artworkId: string;
  artworkSlug: string;
  artworkTitle: string;
  artistName: string;
  locale: string;
}

export function InquiryForm({
  artworkId,
  artworkSlug,
  artworkTitle,
  artistName,
  locale,
}: InquiryFormProps) {
  const t = useTranslations("inquiry");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    `I'm interested in "${artworkTitle}" by ${artistName}. `,
  );
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artworkId,
          artworkTitle,
          artistName,
          name,
          email,
          message,
          locale,
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
        <Link
          href={`/artwork/${artworkSlug}`}
          className="mt-6 inline-block text-sm font-medium text-amber-900 hover:underline"
        >
          {t("backToArtwork")}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">{t("name")}</Label>
        <Input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          id="message"
          required
          placeholder={t("messagePlaceholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">{t("error")}</p>
      )}
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
