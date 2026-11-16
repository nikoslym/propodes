import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMeta } from "@/lib/page-meta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale, "/about", "aboutTitle");
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <article className="page">
        <h1>{t("title")}</h1>
        <div className="prose">
          <p>{t("intro")}</p>
          <p>{t("groves")}</p>
          <p>{t("why")}</p>
        </div>
        <div className="names">
          <div>
            <p>{t("giorgos")}</p>
            <p>{t("giorgosPlace")}</p>
          </div>
          <div>
            <p>{t("filippos")}</p>
            <p>{t("filipposPlace")}</p>
          </div>
        </div>
      </article>
      <figure className="photo">
        <img src="/photos/house.jpg" alt={t("houseAlt")} />
      </figure>
      <figure className="photo">
        <img src="/photos/ancient.jpg" alt={t("trunkAlt")} />
      </figure>
    </>
  );
}
