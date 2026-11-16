import { useTranslations } from "next-intl";
import { phones } from "@/data/site";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="footer">
      <img src="/brand/logo-white-2.svg" alt="" />
      <p>{t("contact.address")}</p>
      <p>
        {phones.map((phone) => (
          <a key={phone.id} href={phone.tel}>
            {phone.display}
          </a>
        ))}
        <a href="mailto:info@propodes.com">info@propodes.com</a>
      </p>
      <p>
        <Link href="/privacy">{t("nav.privacy")}</Link>
      </p>
      <p>{t("footer.rights")}</p>
    </footer>
  );
}
