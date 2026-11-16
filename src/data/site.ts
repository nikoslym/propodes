export const phones = [
  {
    id: "a",
    display: "695 516 1124",
    tel: "tel:+306955161124",
    viber: "viber://chat?number=%2B306955161124",
    whatsapp: "https://wa.me/306955161124",
    viberOn: true,
    whatsappOn: true,
  },
  {
    id: "b",
    display: "699 322 3871",
    tel: "tel:+306993223871",
    viber: "viber://chat?number=%2B306993223871",
    whatsapp: "https://wa.me/306993223871",
    viberOn: true,
    whatsappOn: true,
  },
] as const;

export const oils = [
  {
    id: "athinolia",
    image: "/photos/branch.jpg",
    nutrition: {
      kcal: "824",
      kj: "3389",
      fat: "91.6",
      saturates: "11.5",
      mono: "75.7",
      poly: "4.5",
    },
  },
  {
    id: "blend",
    image: "/photos/tree.jpg",
    nutrition: {
      kcal: "824",
      kj: "3389",
      fat: "91.6",
      saturates: "12.8",
      mono: "73",
      poly: "5.8",
    },
  },
] as const;

export type OilId = (typeof oils)[number]["id"];
