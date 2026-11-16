"use server";

export type OrderState = {
  status: "success" | "invalid" | "unconfigured" | "failed";
} | null;

export async function submitOrder(_prev: OrderState, formData: FormData): Promise<OrderState> {
  if (String(formData.get("company") || "").trim()) {
    return { status: "success" };
  }

  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const consent = formData.get("consent");
  const products = formData.getAll("product").map(String).filter(Boolean);
  const quantity = String(formData.get("quantity") || "").trim();
  const area = String(formData.get("area") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const locale = String(formData.get("locale") || "el");

  if (!name || (!phone && !email) || !consent) {
    return { status: "invalid" };
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_FROM_EMAIL;
  const to = process.env.ORDER_TO_EMAIL || "info@propodes.com";

  if (!key || !from) {
    return { status: "unconfigured" };
  }

  const text = [
    `Όνομα: ${name}`,
    `Τηλέφωνο: ${phone || "—"}`,
    `Email: ${email || "—"}`,
    `Προϊόν: ${products.join(", ") || "—"}`,
    `Ποσότητα: ${quantity || "—"}`,
    `Περιοχή: ${area || "—"}`,
    `Γλώσσα: ${locale}`,
    "",
    message || "—",
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email || undefined,
      subject: `Πρόποδες — ${name}`,
      text,
    }),
  });

  if (!response.ok) {
    return { status: "failed" };
  }

  return { status: "success" };
}
