import { createHmac } from "node:crypto";
import type { Request, Response, NextFunction } from "express";

const TOKEN_COOKIE = "ocs_admin";

function getAdminToken(): string {
  const secret = process.env.SESSION_SECRET;
  const password = process.env.ADMIN_PASSWORD;
  if (!secret || !password) return "";
  return createHmac("sha256", secret).update(password).digest("hex");
}

export function isAdminAuthenticated(req: Request): boolean {
  const token = (req.cookies as Record<string, string>)?.[TOKEN_COOKIE];
  const expected = getAdminToken();
  return !!expected && token === expected;
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!isAdminAuthenticated(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

export function setAdminCookie(res: Response): void {
  const token = getAdminToken();
  res.cookie(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

export function clearAdminCookie(res: Response): void {
  res.clearCookie(TOKEN_COOKIE);
}
