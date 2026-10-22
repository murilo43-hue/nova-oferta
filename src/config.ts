export type Img = { src: string; alt: string; width: number; height: number };

export type Item = {
  title: string;
  description?: string;
  quantity?: number;
  theme?: "natal" | "cristao";
};

export const OFFER = {
  entryName: "Ponto Guiado · Edição de Natal",
  premiumName: "Ponto Guiado · Plano Completo",
  entryPrice: 15.9,
  popupPrice: 19.9,
  premiumPrice: 27.0,
  currency: "BRL",
  oneTimePayment: null as boolean | null,
  paymentMethods: [] as string[],
};

export const CHECKOUT = {
  entry: "",
  popup: "",
  premium: "",
};

export const CONTENT = {
  format: "",
  entryItems: [] as Item[],
  premiumIncludesEntry: null as boolean | null,
  lesson: { title: "", format: "", duration: "" },
  premiumExtraItems: [] as Item[],
  hasChristianThemes: null as boolean | null,
};

export const MATERIALS = {
  confirmed: false,
  items: [
    "Papel mais firme, como papel cartão",
    "Agulha",
    "Linha de bordado",
    "Alfinete ou agulha grossa para furar",
    "Base macia para furar (EVA, isopor ou feltro)",
    "Fita adesiva para prender as pontas da linha atrás",
  ],
};

export const GUARANTEE = {
  days: 7,
  howTo:
    "Na sua conta Kirvano, abra o menu Compras, selecione o produto, clique em “Relatar problema” e escolha “Quero cancelar a compra”.",
  confirmed: false,
};

export const DELIVERY = {
  text: "Depois que o pagamento é aprovado, a Kirvano envia um e-mail para o endereço usado na compra com o link de acesso.",
  confirmed: false,
};

export const LICENSE = {
  sellFinishedPieces: null as boolean | null,
};

export const LINKS = { terms: "", privacy: "", contact: "" };

export const IMAGES = {
  hero: null as Img | null,
  mold: null as Img | null,
  finished: null as Img | null,
  gallery: [] as Img[],
};
