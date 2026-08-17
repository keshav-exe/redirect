export const AUTH_ERROR_CODES = {
  SESSION_EXPIRED: "session_expired",
  ACCOUNT_NOT_FOUND: "account_not_found",
} as const;

export type AuthErrorCode =
  (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES];

export function isAuthErrorCode(value: string): value is AuthErrorCode {
  return Object.values(AUTH_ERROR_CODES).includes(value as AuthErrorCode);
}

export function getAuthErrorMessage(code: AuthErrorCode): string {
  switch (code) {
    case AUTH_ERROR_CODES.SESSION_EXPIRED:
      return "Your session expired. Sign in again to continue.";
    case AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND:
      return "We couldn't find your redirect account. It may have been removed. Sign in again to set up a new one.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export function getSignInUrl(error?: AuthErrorCode, username?: string | null) {
  const params = new URLSearchParams();
  if (error) params.set("error", error);
  if (username) params.set("username", username);
  const query = params.toString();
  return query ? `/auth/signin?${query}` : "/auth/signin";
}
