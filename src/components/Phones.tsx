import { useTranslations } from "next-intl";
import { phones } from "@/data/site";

export function Phones({ large = false }: { large?: boolean }) {
  const t = useTranslations("contact");

  return (
    <div>
      {phones.map((phone) => (
        <p className={large ? "phone-line" : "phone-line phone-line-quiet"} key={phone.id}>
          <a href={phone.tel}>{phone.display}</a>
          {phone.viberOn ? <a href={phone.viber}>{t("viber")}</a> : null}
          {phone.whatsappOn ? (
            <a href={phone.whatsapp} target="_blank" rel="noreferrer">
              {t("whatsapp")}
            </a>
          ) : null}
        </p>
      ))}
    </div>
  );
}
