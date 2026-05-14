import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const COOKIE_NAME = 'pelie_admin';
const ALG = 'HS256';
const SESSION_DAYS = 7;

function secret(): Uint8Array {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error('SESSION_SECRET must be set and at least 32 chars');
  }
  return new TextEncoder().encode(s);
}

export async function verifyPassword(username: string, password: string): Promise<boolean> {
  const expectedUser = process.env.ADMIN_USERNAME;
  // Suporta hash em base64 (ADMIN_PASSWORD_HASH_B64) para evitar problemas
  // com o dotenv-expand expandindo os '$' do bcrypt hash.
  // Também suporta o hash raw (ADMIN_PASSWORD_HASH) como fallback.
  const hashB64 = process.env.ADMIN_PASSWORD_HASH_B64 ?? '';
  const hashRaw = process.env.ADMIN_PASSWORD_HASH ?? '';
  const expectedHash = hashB64
    ? Buffer.from(hashB64, 'base64').toString('utf8')
    : hashRaw;

  if (!expectedUser || !expectedHash) return false;
  if (username !== expectedUser) {
    await bcrypt.compare(password, '$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinva');
    return false;
  }
  return bcrypt.compare(password, expectedHash);
}

export async function createSessionCookie(username: string) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * 24 * 60 * 60;
  const token = await new SignJWT({ sub: username })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secret());

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export function clearSessionCookie() {
  cookies().delete(COOKIE_NAME);
}

export async function getSession(): Promise<{ username: string } | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: [ALG] });
    if (typeof payload.sub !== 'string') return null;
    return { username: payload.sub };
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<{ username: string }> {
  const s = await getSession();
  if (!s) throw new Error('UNAUTHORIZED');
  return s;
}

export async function verifyTokenString(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secret(), { algorithms: [ALG] });
    return true;
  } catch {
    return false;
  }
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
