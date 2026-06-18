import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, portfolio, about } = body;

    if (!name || !email || !about) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const supabase = getSupabase();

    if (supabase) {
      const { error } = await supabase.from("seller_applications").insert({
        name,
        email,
        portfolio_url: portfolio || null,
        about,
      });

      if (error) {
        console.error("Supabase application error:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }
    } else {
      console.log("[MVP] Seller application (no Supabase configured):", body);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
