import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { queryOne } from "./db";

const COOKIE_NAME = "tr_admin";
const MAX_AGE = 60 * 60 * 24 * 7;

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET is not set");
  return s;
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function signCookie(adminId: number): string {
  const payload = `${adminId}.${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

function verifyCookie(raw: string | undefined): number | null {
  if (!raw) return null;
  const parts = raw.split(".");
  if (parts.length !== 3) return null;
  const [idStr, ts, sig] = parts;
  const expected = sign(`${idStr}.${ts}`);
  if (
    sig.length !== expected.length ||
    !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  )
    return null;
  const id = Number(idStr);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export type AdminUser = { id: number; email: string };

export async function verifyLogin(
  email: string,
  password: string
): Promise<AdminUser | null> {
  const row = await queryOne<{ id: number; email: string; password_hash: string }>(
    `SELECT id, email, password_hash FROM admin_users WHERE email = $1`,
    [email.toLowerCase().trim()]
  );
  if (!row?.password_hash) return null;
  const ok = await bcrypt.compare(password, row.password_hash);
  return ok ? { id: row.id, email: row.email } : null;
}

export async function createSession(adminId: number) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, signCookie(adminId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const jar = await cookies();
  const raw = jar.get(COOKIE_NAME)?.value;
  const id = verifyCookie(raw);
  if (!id) return null;
  return queryOne<AdminUser>(
    `SELECT id, email FROM admin_users WHERE id = $1`,
    [id]
  );
}

export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
