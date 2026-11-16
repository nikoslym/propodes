import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { Phones } from "@/components/Phones";
import { pageMeta } from "@/lib/page-meta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return pageMeta(locale, "/contact", "contactTitle");
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ product?: string }>;
}) {
  const { locale } = await params;
  const { product } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <article className="page">
      <h1>{t("title")}</h1>
      <div className="prose">
        <p>{t("intro")}</p>
      </div>
      <div className="contact-phones">
        <Phones />
      </div>
      <ContactForm selected={product} />
      <div className="address">
        <p>{t("addressTitle")}</p>
        <p>{t("address")}</p>
        <p>
          <a href="mailto:info@propodes.com">info@propodes.com</a>
        </p>
      </div>
    </article>
  );
}
