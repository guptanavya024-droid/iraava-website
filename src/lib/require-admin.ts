import { NextResponse } from "next/server";
import { getSession } from "@/lib/get-session";

// Every /api/admin/* route calls this first — the (protected) layout only
// gates page navigation, not API requests hit directly.
export async function requireAdminSession() {
  const session = await getSession();
  if (!session?.user) {
    return { session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { session, response: null as NextResponse | null };
}
