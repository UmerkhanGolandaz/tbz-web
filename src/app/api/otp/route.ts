import { NextResponse } from "next/server";

// Fixed demo credentials · always work without any backend state.
const DEMO_PHONE = "9999999999";
const DEMO_EMAIL = "demo@tbz.in";
const DEMO_OTP = "123456";

const store = new Map<string, { code: string; expires: number }>();

const norm = (s: string) => s.replace(/[^\d@.a-zA-Z]/g, "").toLowerCase();
const isDemoIdentifier = (id: string) => {
  const n = norm(id);
  return n.endsWith(DEMO_PHONE) || n === DEMO_EMAIL;
};

export async function POST(req: Request) {
  const { identifier, type } = await req.json().catch(() => ({}));
  if (!identifier || typeof identifier !== "string") {
    return NextResponse.json({ error: "identifier required" }, { status: 400 });
  }
  const isPhone = type === "phone" || /^\+?\d[\d\s-]{6,}$/.test(identifier);
  const isEmail = type === "email" || /.+@.+\..+/.test(identifier);
  if (!isPhone && !isEmail) {
    return NextResponse.json({ error: "invalid identifier" }, { status: 400 });
  }

  // For the demo identifier we always issue the same OTP so the user can
  // sign in with a known dummy phone + OTP combination.
  const code = isDemoIdentifier(identifier)
    ? DEMO_OTP
    : String(Math.floor(100000 + Math.random() * 900000));

  store.set(identifier, { code, expires: Date.now() + 5 * 60 * 1000 });

  return NextResponse.json({
    sent: true,
    devOtp: code,
    via: isPhone ? "sms" : "email",
  });
}

export async function PUT(req: Request) {
  const { identifier, code } = await req.json().catch(() => ({}));
  if (!identifier) return NextResponse.json({ error: "no identifier" }, { status: 400 });

  // Demo bypass: any user can sign in by entering OTP 123456 with the demo phone/email.
  if (isDemoIdentifier(identifier) && String(code) === DEMO_OTP) {
    return NextResponse.json({
      verified: true,
      user: { id: "u_demo", identifier },
    });
  }

  const rec = store.get(identifier);
  if (!rec) return NextResponse.json({ error: "no otp" }, { status: 400 });
  if (rec.expires < Date.now()) {
    store.delete(identifier);
    return NextResponse.json({ error: "expired" }, { status: 400 });
  }
  if (rec.code !== String(code)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  store.delete(identifier);
  return NextResponse.json({
    verified: true,
    user: { id: "u_" + identifier.replace(/\W/g, ""), identifier },
  });
}
