import { getTranslations, setRequestLocale } from "next-intl/server";
import { OilBlock } from "@/components/OilBlock";
import { pageMeta } from "@/lib/page-meta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale, "/olive-oil", "oilTitle");
}

export default async function OliveOilPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("oilPage");

  return (
    <>
      <article className="page">
        <h1>{t("title")}</h1>
        <div className="prose">
          <p>{t("intro")}</p>
        </div>
      </article>

      <figure>
        <img src="/photos/harvest.jpg" alt={t("harvestAlt")} />
        <figcaption className="caption">{t("harvestCaption")}</figcaption>
      </figure>
      <figure>
        <img src="/photos/fruit.jpg" alt={t("fruitAlt")} />
        <figcaption className="caption">{t("fruitCaption")}</figcaption>
      </figure>
      <figure>
        <img src="/photos/nets.jpg" alt={t("netsAlt")} />
        <figcaption className="caption">{t("netsCaption")}</figcaption>
      </figure>

      <OilBlock id="athinolia" withNutrition />
      <OilBlock id="blend" flip withNutrition />

      <article className="page">
        <div className="prose">
          <p>{t("legal")}</p>
          <p>{t("storage")}</p>
          <p>{t("packed")}</p>
        </div>
      </article>
    </>
  );
}
