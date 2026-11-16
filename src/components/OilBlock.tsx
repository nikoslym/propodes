import { getTranslations } from "next-intl/server";
import { oils, type OilId } from "@/data/site";
import { Link } from "@/i18n/navigation";

export async function OilBlock({
  id,
  flip = false,
  withNutrition = false,
}: {
  id: OilId;
  flip?: boolean;
  withNutrition?: boolean;
}) {
  const oil = oils.find((item) => item.id === id);
  if (!oil) return null;

  const t = await getTranslations("oils");
  const rows = [
    [t("energy"), `${oil.nutrition.kcal} kcal / ${oil.nutrition.kj} kJ`],
    [t("fat"), `${oil.nutrition.fat} g`],
    [t("saturates"), `${oil.nutrition.saturates} g`],
    [t("mono"), `${oil.nutrition.mono} g`],
    [t("poly"), `${oil.nutrition.poly} g`],
    [t("carbs"), t("zero")],
    [t("sugars"), t("zero")],
    [t("protein"), t("zero")],
    [t("salt"), t("zero")],
  ];

  return (
    <article className={flip ? "oil oil-flip" : "oil"} id={id}>
      <img src={oil.image} alt={t(`${id}.alt`)} />
      <div className="oil-copy">
        <h2>{t(`${id}.name`)}</h2>
        <p>{t("line")}</p>
        <p>{t(`${id}.note`)}</p>
        <p>
          <Link href={{ pathname: "/contact", query: { product: id } }}>{t("order")}</Link>
        </p>
        {withNutrition ? (
          <details className="nutrition">
            <summary>{t("nutrition")}</summary>
            <table>
              <caption className="note">
                {t("nutrition")}, {t("per")}
              </caption>
              <tbody>
                {rows.map(([label, value]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="note">{t("reference")}</p>
          </details>
        ) : null}
      </div>
    </article>
  );
}
