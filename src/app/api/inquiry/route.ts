import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/server";
import type { InquiryPayload } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryPayload;

    if (!body.name || !body.email || !body.message || !body.artworkId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const supabase = getSupabase();

    if (supabase) {
      const { error } = await supabase.from("inquiries").insert({
        artwork_id: body.artworkId,
        artwork_title: body.artworkTitle,
        artist_name: body.artistName,
        buyer_name: body.name,
        buyer_email: body.email,
        message: body.message,
        locale: body.locale,
      });

      if (error) {
        console.error("Supabase inquiry error:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }
    } else {
      console.log("[MVP] Inquiry received (no Supabase configured):", body);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
