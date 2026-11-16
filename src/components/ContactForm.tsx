"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitOrder, type OrderState } from "@/app/actions/order";
import { oils } from "@/data/site";
import { Link } from "@/i18n/navigation";

export function ContactForm({ selected }: { selected?: string }) {
  const t = useTranslations("contact");
  const oilNames = useTranslations("oils");
  const locale = useLocale();
  const [state, action, pending] = useActionState<OrderState, FormData>(submitOrder, null);

  return (
    <form className="form" action={action}>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" hidden />
      <input type="hidden" name="locale" value={locale} />

      <label htmlFor="name">{t("name")}</label>
      <input id="name" name="name" type="text" autoComplete="name" required />

      <label htmlFor="phone">{t("phone")}</label>
      <input id="phone" name="phone" type="tel" autoComplete="tel" />

      <label htmlFor="email">{t("email")}</label>
      <input id="email" name="email" type="email" autoComplete="email" />

      <p>{t("products")}</p>
      <div className="checks">
        {oils.map((oil) => (
          <label key={oil.id}>
            <input
              type="checkbox"
              name="product"
              value={oil.id}
              defaultChecked={selected === oil.id}
            />
            <span>{oilNames(`${oil.id}.name`)}</span>
          </label>
        ))}
        <label>
          <input type="checkbox" name="product" value="question" defaultChecked={selected === "question"} />
          <span>{t("questionOnly")}</span>
        </label>
      </div>

      <label htmlFor="quantity">{t("quantity")}</label>
      <input id="quantity" name="quantity" type="number" min={1} inputMode="numeric" />

      <label htmlFor="area">{t("area")}</label>
      <input id="area" name="area" type="text" placeholder={t("areaHint")} />

      <label htmlFor="message">{t("message")}</label>
      <textarea id="message" name="message" />

      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>
          {t("consent")} <Link href="/privacy">{t("privacy")}</Link>
        </span>
      </label>

      <button type="submit" disabled={pending}>
        {t("send")}
      </button>

      {state ? <p className="status">{t(state.status === "success" ? "thanks" : state.status)}</p> : null}
    </form>
  );
}
