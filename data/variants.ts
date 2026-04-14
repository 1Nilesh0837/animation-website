export type Variant = {
  id: string;
  name: string;
  subName: string;
  price: number;
  unit: string;
  themeColor: string;
  gradient: string;
  soapImage: string;
  folderPath?: string;
  frameCount?: number;
  features: string[];
  stats: Record<string, string>;
  sections: { title: string; subtitle: string }[];
  details: {
    title: string;
    description: string;
    imageAlt: string;
  };
  freshness: {
    title: string;
    description: string;
  };
  buyNow: {
    params: string[];
    delivery: string;
    returnInfo: string;
  };
};

export const variants: Variant[] = [
  {
    id: "rose-aloe",
    name: "Rose & Aloe Vera",
    subName: "Silky skin, every morning.",
    price: 45,
    unit: "per 100g bar",
    themeColor: "#E91E8C",
    gradient: "linear-gradient(135deg, #F48FB1, #E91E8C)",
    soapImage: "/soapimage-product/Rose-soap/Whisk_3b03608c607db7e980a4e86b28538009dr.png",
    folderPath: "/images/Rose",
    frameCount: 194,
    features: ["Moisturising Aloe Vera", "Rose petal extracts", "pH balanced", "Dermatologist tested"],
    stats: { "Parabens": "0%", "Natural": "100%", "Skin types": "All" },
    sections: [
      { title: "Rose & Aloe Vera.", subtitle: "Silky skin, every morning." },
      { title: "Blooming with real rose.", subtitle: "Rose petal extracts sourced from the valleys of Kannauj, India's fragrance capital." },
      { title: "Aloe's healing touch.", subtitle: "Cold-processed Aloe Vera locks moisture deep into the skin throughout the day." },
      { title: "Pure beauty. No compromises.", subtitle: "" },
    ],
    details: {
      title: "A Garden in Every Bar",
      description: "Godrej No.1 Rose & Aloe Vera is crafted with 100% natural fragrance and real botanical extracts. Aloe Vera has been used in Indian beauty rituals for centuries — our formula captures that tradition in a daily-use soap that leaves skin visibly softer after just one wash.",
      imageAlt: "Rose & Aloe Vera soap bar close-up"
    },
    freshness: {
      title: "Freshness That Stays",
      description: "Our triple-milled process ensures the botanical extracts are evenly distributed throughout every bar, so you get the same luxurious lather and moisture on the very last sliver as on the first use."
    },
    buyNow: {
      params: ["Triple Milled", "No Parabens", "pH Balanced"],
      delivery: "Available at 5,00,000+ stores across India. Same-day dispatch on godrej.com orders.",
      returnInfo: "Not satisfied with your first bar? Full refund, no questions asked."
    }
  },
  {
    id: "tulsi-neem",
    name: "Tulsi & Neem",
    subName: "Ancient wisdom, modern glow.",
    price: 45,
    unit: "per 100g bar",
    themeColor: "#388E3C",
    gradient: "linear-gradient(135deg, #A5D6A7, #388E3C)",
    soapImage: "/soapimage-product/Tusli-alover-soap/Whisk_b726ef905f289a9b1014b4fe6e0467fddr.png",
    features: ["Anti-bacterial Neem", "Sacred Tulsi extracts", "Oil-control formula", "Ayurvedic heritage"],
    stats: { "Bacteria": "–99%", "Herbs": "2", "Additives": "0" },
    sections: [
      { title: "Tulsi & Neem.", subtitle: "Ancient wisdom, modern glow." },
      { title: "Nature's antibiotic, bottled.", subtitle: "Neem leaf extract has protected Indian skin from bacteria and pollution for over 4,000 years." },
      { title: "Tulsi — the sacred purifier.", subtitle: "Holy Basil's natural oils regulate sebum and leave skin fresh, balanced, and radiant." },
      { title: "Rooted in Ayurveda.", subtitle: "" },
    ],
    details: {
      title: "2 Herbs. Thousands of Years.",
      description: "Our Tulsi & Neem bar draws directly from Ayurvedic science, combining two of India's most powerful botanicals. Neem's antibacterial properties fight acne-causing bacteria while Tulsi's adaptogenic compounds calm inflammation, making this the ideal daily bar for India's humid climate.",
      imageAlt: "Tulsi and Neem soap bar with green leaves"
    },
    freshness: {
      title: "Cold-Processed Purity",
      description: "Heat degrades herbal compounds. We use a low-temperature saponification process to preserve the full spectrum of neem's limonoids and tulsi's eugenol, ensuring every bar delivers maximum antibacterial efficacy from first wash to last."
    },
    buyNow: {
      params: ["Ayurvedic Formula", "Anti-Bacterial", "Oil Control"],
      delivery: "Pan-India delivery in 2–4 days. Cold-chain packaging preserves herbal potency.",
      returnInfo: "100% satisfaction or full replacement."
    }
  },
  {
    id: "saffron-milk",
    name: "Saffron & Milk",
    subName: "Royal radiance, redefined.",
    price: 55,
    unit: "per 100g bar",
    themeColor: "#F9A825",
    gradient: "linear-gradient(135deg, #FFE082, #F9A825)",
    soapImage: "/soapimage-product/saffron-soap/Whisk_27bd5b985f889fc8d1a4bd6205618a93dr.png",
    folderPath: "/images/safforan",
    frameCount: 194,
    features: ["Kashmiri Saffron", "Natural Milk proteins", "Skin-brightening", "Rich lather"],
    stats: { "Artificial color": "0", "Milk protein": "8%", "Glow": "Visible in 7 days" },
    sections: [
      { title: "Saffron & Milk.", subtitle: "Royal radiance, redefined." },
      { title: "Gold worth bathing in.", subtitle: "Hand-harvested Kashmiri saffron — the world's most prized spice — meets creamy whole milk proteins." },
      { title: "Brighter skin, naturally.", subtitle: "Saffron's crocin compounds gently even out skin tone without harsh chemicals or bleaching agents." },
      { title: "The luxury you deserve daily.", subtitle: "" },
    ],
    details: {
      title: "The Kesar Ritual",
      description: "For centuries, saffron-infused milk was the beauty secret of Indian royalty. Our Saffron & Milk bar revives that ritual for the modern Indian woman. Each bar contains 0.2g of authentic Kashmiri Kesar, blended with full-cream milk proteins that form a protective moisture barrier on the skin.",
      imageAlt: "Saffron and milk soap bar with saffron strands"
    },
    freshness: {
      title: "Locked in at the Source",
      description: "Saffron's active compounds are volatile — exposure to air and light degrades them within hours of processing. Our bars are flash-sealed immediately after moulding in UV-protective foil packaging, ensuring the crocin and safranal that reach your skin are at peak potency."
    },
    buyNow: {
      params: ["Kashmiri Saffron", "Milk Proteins", "No Bleach"],
      delivery: "Premium gift packaging available. Delivered within 48 hours in metro cities.",
      returnInfo: "See visible radiance in 7 days or we'll replace it."
    }
  }
];
