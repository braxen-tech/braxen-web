"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");
  console.error(error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("description")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => reset()}
            className="btn btn-sm btn-primary normal-case tracking-normal text-sm font-medium px-4 py-2"
          >
            {t("tryAgain")}
          </button>
          <Link
            href="/"
            className="btn btn-sm btn-outline normal-case tracking-normal text-sm font-medium px-4 py-2"
          >
            {t("goHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
