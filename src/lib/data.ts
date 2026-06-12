export type Product = {
  id: string;
  name: string;
  category: "gold" | "diamond" | "jadau" | "kalpavruksha" | "bridal" | "platinum";
  type: string;
  price: number;
  weight?: string;
  purity?: string;
  image: string;
  description: string;
  gallery?: string[];
};

const ALL_IMG = [
  "/tbz-web/img/1599643477877-530eb83abc8e.jpg",
  "/tbz-web/img/1599643478518-a784e5dc4c8f.jpg",
  "/tbz-web/img/1600721391776-b5cd0e0048f9.jpg",
  "/tbz-web/img/1602173574767-37ac01994b2a.jpg",
  "/tbz-web/img/1603561591411-07134e71a2a9.jpg",
  "/tbz-web/img/1605100804763-247f67b3557e.jpg",
  "/tbz-web/img/1606760227091-3dd870d97f1d.jpg",
  "/tbz-web/img/1611591437281-460914d2c14a.jpg",
  "/tbz-web/img/1611652022419-a9419f74343d.jpg",
  "/tbz-web/img/1631542515814-3aab44fcb12c.jpg",
  "/tbz-web/img/1633934542430-9d4a1f8c0c39.jpg",
  "/tbz-web/img/1635767582909-345798f4937a.jpg",
];

export function galleryFor(image: string, count = 4): string[] {
  const idx = ALL_IMG.indexOf(image);
  const base = idx >= 0 ? idx : 0;
  return Array.from({ length: count }, (_, i) => ALL_IMG[(base + i) % ALL_IMG.length]);
}

export type Collection = {
  slug: string;
  title: string;
  tagline: string;
  blurb: string;
  hero: string;
};

export const collections: Collection[] = [
  {
    slug: "gold",
    title: "Gold",
    tagline: "Timeless 22kt heritage",
    blurb:
      "Hand-finished gold jewellery crafted by master karigars in the TBZ tradition · necklaces, earrings, bangles and chains that carry forward 160+ years of legacy.",
    hero: "/tbz-web/img/1599643477877-530eb83abc8e.jpg",
  },
  {
    slug: "diamond",
    title: "Diamond",
    tagline: "Brilliance, certified",
    blurb:
      "Solitaires, everyday-wear danglers and statement diamond sets · every stone IGI/SGL certified, set in 18kt gold.",
    hero: "/tbz-web/img/1605100804763-247f67b3557e.jpg",
  },
  {
    slug: "jadau",
    title: "Jadau",
    tagline: "The art of uncut",
    blurb:
      "Polki and kundan set the traditional way · gold foil, uncut diamonds and enamel meenakari work passed down through generations.",
    hero: "/tbz-web/img/1602173574767-37ac01994b2a.jpg",
  },
  {
    slug: "kalpavruksha",
    title: "Kalpavruksha",
    tagline: "The wish-fulfilling gold tree",
    blurb:
      "TBZ Kalpavruksha · a gold savings plan that lets you choose your dream jewellery the smart way. Pay an instalment monthly, and we add a bonus.",
    hero: "/tbz-web/img/1633934542430-9d4a1f8c0c39.jpg",
  },
  {
    slug: "bridal",
    title: "Bridal",
    tagline: "The wedding atelier",
    blurb:
      "Curated bridal sets · Maharashtrian Nath to South Indian Temple to North Indian Polki · designed at TBZ ateliers across India.",
    hero: "/tbz-web/img/1611591437281-460914d2c14a.jpg",
  },
  {
    slug: "platinum",
    title: "Platinum",
    tagline: "Rare, eternal, you",
    blurb:
      "PT950 platinum bands, couple rings and statement pieces · naturally white, hypoallergenic and made for forever.",
    hero: "/tbz-web/img/1600721391776-b5cd0e0048f9.jpg",
  },
];

export const products: Product[] = [
  // Gold
  { id: "g-01", name: "Lavanya 22kt Gold Necklace", category: "gold", type: "Necklace", price: 184500, weight: "21.4 g", purity: "22kt 916", image: "/tbz-web/img/1611652022419-a9419f74343d.jpg", description: "Floral motif gold necklace finished by hand, hallmark 916." },
  { id: "g-02", name: "Sanjh Jhumki Earrings", category: "gold", type: "Earring", price: 42850, weight: "5.8 g", purity: "22kt 916", image: "/tbz-web/img/1635767582909-345798f4937a.jpg", description: "Bell-shaped jhumki with bead drop · everyday festive." },
  { id: "g-03", name: "Aaradhya Temple Bangle", category: "gold", type: "Bangle", price: 96200, weight: "14.1 g", purity: "22kt 916", image: "/tbz-web/img/1606760227091-3dd870d97f1d.jpg", description: "Temple-art carved bangle inspired by Chola era." },
  { id: "g-04", name: "Rohini Chain 20-inch", category: "gold", type: "Chain", price: 38900, weight: "5.2 g", purity: "22kt 916", image: "/tbz-web/img/1599643478518-a784e5dc4c8f.jpg", description: "Box-link chain · unisex, hallmark." },

  // Diamond
  { id: "d-01", name: "Solene Solitaire Ring", category: "diamond", type: "Ring", price: 142000, weight: "0.50 ct", purity: "18kt", image: "/tbz-web/img/1603561591411-07134e71a2a9.jpg", description: "Classic six-prong solitaire, IGI certified." },
  { id: "d-02", name: "Astra Diamond Pendant", category: "diamond", type: "Pendant", price: 56800, weight: "0.32 ct", purity: "18kt", image: "/tbz-web/img/1633934542430-9d4a1f8c0c39.jpg", description: "Star-shaped pendant · everyday brilliance." },
  { id: "d-03", name: "Mira Diamond Studs", category: "diamond", type: "Earring", price: 36400, weight: "0.20 ct/pair", purity: "18kt", image: "/tbz-web/img/1631542515814-3aab44fcb12c.jpg", description: "Press-set studs in 18kt white gold." },
  { id: "d-04", name: "Eira Tennis Bracelet", category: "diamond", type: "Bracelet", price: 215000, weight: "1.10 ct", purity: "18kt", image: "/tbz-web/img/1605100804763-247f67b3557e.jpg", description: "Continuous line bracelet with round brilliants." },

  // Jadau
  { id: "j-01", name: "Rajwadi Polki Choker", category: "jadau", type: "Choker", price: 425000, weight: "-", purity: "22kt + Polki", image: "/tbz-web/img/1605100804763-247f67b3557e.jpg", description: "Hand-set polki with meenakari reverse." },
  { id: "j-02", name: "Mughal Kundan Maang Tikka", category: "jadau", type: "Maang Tikka", price: 78500, weight: "-", purity: "22kt + Kundan", image: "/tbz-web/img/1611652022419-a9419f74343d.jpg", description: "Forehead piece inspired by Mughal miniature art." },
  { id: "j-03", name: "Heritage Polki Jhumki", category: "jadau", type: "Earring", price: 132000, weight: "-", purity: "22kt + Polki", image: "/tbz-web/img/1635767582909-345798f4937a.jpg", description: "Pearl drop polki jhumkis." },

  // Bridal
  { id: "b-01", name: "Saubhagya Bridal Set", category: "bridal", type: "Set", price: 985000, weight: "-", purity: "22kt", image: "/tbz-web/img/1611591437281-460914d2c14a.jpg", description: "Necklace, earrings & maang tikka · Maharashtrian inspired." },
  { id: "b-02", name: "Vivah South Temple Haar", category: "bridal", type: "Long Necklace", price: 642000, weight: "-", purity: "22kt", image: "/tbz-web/img/1599643478518-a784e5dc4c8f.jpg", description: "Long temple haar with Lakshmi pendants." },
  { id: "b-02b", name: "Pratha Polki Bridal Set", category: "bridal", type: "Set", price: 1245000, weight: "-", purity: "22kt + Polki", image: "/tbz-web/img/1602173574767-37ac01994b2a.jpg", description: "North Indian polki bridal · choker, rani haar & jhumki." },

  // Kalpavruksha (treated as products that link to the plan)
  { id: "k-01", name: "Kalpavruksha 12-Month Plan", category: "kalpavruksha", type: "Gold Plan", price: 5000, image: "/tbz-web/img/1633934542430-9d4a1f8c0c39.jpg", description: "Pay 11 instalments, TBZ pays the 12th. Choose your jewellery." },
  { id: "k-02", name: "Kalpavruksha 18-Month Plan", category: "kalpavruksha", type: "Gold Plan", price: 10000, image: "/tbz-web/img/1611591437281-460914d2c14a.jpg", description: "Higher bonus, longer horizon · pick at any TBZ store." },

  // Platinum
  { id: "p-01", name: "Eterna Platinum Band", category: "platinum", type: "Ring", price: 38200, weight: "4.5 g", purity: "PT950", image: "/tbz-web/img/1600721391776-b5cd0e0048f9.jpg", description: "Brushed-finish platinum band · unisex." },
  { id: "p-02", name: "Yug Couple Bands (Pair)", category: "platinum", type: "Couple Ring", price: 78600, weight: "9.0 g", purity: "PT950", image: "/tbz-web/img/1605100804763-247f67b3557e.jpg", description: "Matching couple bands with diamond accent." },
];

export type Store = {
  id: string;
  city: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
};

export const stores: Store[] = [
  { id: "s-mum-zaveri", city: "Mumbai", area: "Zaveri Bazaar", address: "241/43, Zaveri Bazaar, Kalbadevi Road, Mumbai 400002", phone: "+91 22 4045 1000", hours: "11:00 · 19:30, Mon–Sat" },
  { id: "s-mum-bandra", city: "Mumbai", area: "Bandra West", address: "Linking Road, Near National College, Bandra West, Mumbai 400050", phone: "+91 22 2640 2000", hours: "11:00 · 20:00, Daily" },
  { id: "s-del-cp", city: "New Delhi", area: "Connaught Place", address: "M-Block, Connaught Place, New Delhi 110001", phone: "+91 11 4567 8000", hours: "11:00 · 20:00, Daily" },
  { id: "s-blr", city: "Bengaluru", area: "Jayanagar", address: "11th Main, Jayanagar 4th Block, Bengaluru 560011", phone: "+91 80 2655 9000", hours: "11:00 · 20:00, Daily" },
  { id: "s-pune", city: "Pune", area: "JM Road", address: "Jangli Maharaj Road, Shivajinagar, Pune 411005", phone: "+91 20 2553 4000", hours: "11:00 · 20:00, Daily" },
  { id: "s-hyd", city: "Hyderabad", area: "Banjara Hills", address: "Road No. 3, Banjara Hills, Hyderabad 500034", phone: "+91 40 2354 7000", hours: "11:00 · 20:00, Daily" },
  { id: "s-ahd", city: "Ahmedabad", area: "C G Road", address: "C G Road, Navrangpura, Ahmedabad 380009", phone: "+91 79 2640 7000", hours: "11:00 · 20:00, Daily" },
  { id: "s-kol", city: "Kolkata", area: "Park Street", address: "Park Street, Kolkata 700016", phone: "+91 33 4001 5000", hours: "11:00 · 20:00, Daily" },
];

export function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}
