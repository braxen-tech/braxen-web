import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">{t("title")}</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          {t("subtitle")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("description")}</p>
        <div className="mt-6">
          <Link
            href="/"
            className="btn btn-sm btn-primary normal-case tracking-normal text-sm font-medium px-4 py-2"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </div>
  );
}
