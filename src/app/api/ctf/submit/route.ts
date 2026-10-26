import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// SHA-256 hashes of authorized challenge flags
// Real flags are NEVER returned to the client browser
const CHALLENGE_FLAGS_HASH: Record<string, { hash: string; points: number; title: string }> = {
  "ch-1": {
    // Flag: NTU_CSS{jwt_n0n3_alg_byP4ss_2026}
    hash: crypto.createHash("sha256").update("NTU_CSS{jwt_n0n3_alg_byP4ss_2026}").digest("hex"),
    points: 150,
    title: "Broken Token Signature",
  },
  "ch-2": {
    // Flag: NTU_CSS{eip_0verwr1te_c0ntr0l_hijack}
    hash: crypto.createHash("sha256").update("NTU_CSS{eip_0verwr1te_c0ntr0l_hijack}").digest("hex"),
    points: 250,
    title: "Buffer Overflow Alpha",
  },
  "ch-3": {
    // Flag: NTU_CSS{h4st4d_br04dc4st_crt_cr4ck}
    hash: crypto.createHash("sha256").update("NTU_CSS{h4st4d_br04dc4st_crt_cr4ck}").digest("hex"),
    points: 200,
    title: "Weak RSA Public Exponent",
  },
  "ch-4": {
    // Flag: NTU_CSS{v0l4t1l1ty_m3m0ry_b34c0n_f0und}
    hash: crypto.createHash("sha256").update("NTU_CSS{v0l4t1l1ty_m3m0ry_b34c0n_f0und}").digest("hex"),
    points: 300,
    title: "Volatile RAM Artifact",
  },
  "ch-5": {
    // Flag: NTU_CSS{gh1dr4_d3c0mp1l3_str1ngs_rev}
    hash: crypto.createHash("sha256").update("NTU_CSS{gh1dr4_d3c0mp1l3_str1ngs_rev}").digest("hex"),
    points: 175,
    title: "Stripped x86_64 Binary",
  },
};

// In-memory rate limiting and leaderboard tracker
const submissionHistory = new Map<string, number>();
const firstBloodSolvers = new Map<string, string>(); // challengeId -> handle

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local";
    const body = await req.json();
    const { challengeId, flag, handle = "Anonymous Hacker" } = body;

    if (!challengeId || !flag) {
      return NextResponse.json(
        { success: false, message: "Challenge ID and flag are required." },
        { status: 400 }
      );
    }

    // Rate limiting: prevent brute-forcing (1 request every 2.5 seconds per IP)
    const now = Date.now();
    const lastAttempt = submissionHistory.get(`${ip}-${challengeId}`);
    if (lastAttempt && now - lastAttempt < 2500) {
      return NextResponse.json(
        {
          success: false,
          message: "Rate limit: please wait 2 seconds between flag submissions.",
        },
        { status: 429 }
      );
    }
    submissionHistory.set(`${ip}-${challengeId}`, now);

    const challenge = CHALLENGE_FLAGS_HASH[challengeId];
    if (!challenge) {
      return NextResponse.json(
        { success: false, message: "Challenge not found in active arena." },
        { status: 404 }
      );
    }

    // Hash submitted flag and compare
    const submittedHash = crypto.createHash("sha256").update(flag.trim()).digest("hex");

    if (submittedHash !== challenge.hash) {
      return NextResponse.json({
        success: false,
        message: "Incorrect flag. Check the mission briefing and try again.",
      });
    }

    // First blood check
    let isFirstBlood = false;
    if (!firstBloodSolvers.has(challengeId)) {
      firstBloodSolvers.set(challengeId, handle);
      isFirstBlood = true;
    }

    return NextResponse.json({
      success: true,
      message: isFirstBlood
        ? `[FIRST BLOOD!] Congratulations ${handle}, you scored first blood on ${challenge.title}!`
        : `[SOLVED!] Correct flag captured! +${challenge.points} Points awarded.`,
      points: challenge.points,
      firstBlood: isFirstBlood,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Internal server validation error." },
      { status: 500 }
    );
  }
}
