import { cn } from "@/lib/utils";
import {
  AUTH_ERROR_CODES,
  getAuthErrorMessage,
  isAuthErrorCode,
} from "@/lib/errors";

interface AuthNoticeProps {
  error?: string | null;
  className?: string;
}

export function AuthNotice({ error, className }: AuthNoticeProps) {
  if (!error || !isAuthErrorCode(error)) return null;

  const isAccountMissing = error === AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND;

  return (
    <div
      role="alert"
      className={cn(
        "rounded-sm border px-4 py-3 text-sm leading-relaxed",
        isAccountMissing
          ? "border-border bg-card text-muted-foreground"
          : "border-destructive/20 bg-destructive/10 text-destructive",
        className
      )}
    >
      {getAuthErrorMessage(error)}
    </div>
  );
}
