import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <article className="page">
      <h1>{t("title")}</h1>
      <p>
        <Link href="/">{t("back")}</Link>
      </p>
    </article>
  );
}
