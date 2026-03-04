const AUTH_KEY = "auth";

export function setAccessToken(token: string) {
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({ token })
  );
}

export function getAccessToken(): string | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return parsed?.token ?? null;
  } catch {
    return null;
  }
}

export function clearAccessToken() {
  localStorage.removeItem(AUTH_KEY);
}