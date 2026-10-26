export const site = {
  name: "PCPA",
  fullName: "Pakistan Crop Protection Association",
  description: "Pakistan Crop Protection Association",
  copyright: "@2026 - PCPA. All Right Reserved.",
  city: "Multan",
  socials: ["Facebook", "Twitter", "Instagram", "Pinterest", "Youtube", "Email", "Bloglovin"],
};

export const introduction = {
  title: "Introduction",
  body: "The Ministry of National Food Security & Research is mainly responsible for policy formulation, economic coordination and planning in respect of food grain and agriculture. It also includes procurement of food grains, fertilizer, import price stabilization of agriculture produce, international liaison, economic studies for framing agricultural policies.",
};

export const slides = Array.from({ length: 17 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  const ext = i < 5 ? "jpeg" : "jpg";
  return `/images/slider/slide-${n}.${ext}`;
});

export const leaders = [
  { name: "Muhammad Mushtaq Ahmed", title: "Chairman", image: "/images/leaders/mushtaq-ahmed.jpeg" },
  { name: "Muhammad Altaf Shahid", title: "Sr. Vice Chairman", image: "/images/leaders/altaf-shahid.webp" },
  { name: "Iftikhar Ahmad", title: "Vice Chairman", image: "/images/leaders/iftikhar-ahmad.webp" },
  { name: "M. Farooq Hasnain", title: "Finance Secretary PCPA", image: "/images/leaders/farooq-hasnain.jpeg" },
  { name: "Asfand Riaz Goraya", title: "Legal Secretary PCPA", image: "/images/leaders/asfand-goraya.jpeg" },
  { name: "Muhammad Sarwar Rahi", title: "Executive Director PCPA", image: "/images/leaders/sarwar-rahi.webp" },
  { name: "Mr. Muhammad Ali Raza", title: "Secretary General PCPA", image: "/images/leaders/ali-raza.webp" },
];

export type NewsPost = {
  slug: string;
  path: string;
  title: string;
  shortTitle: string;
  author: string;
  published: string;
  updated: string;
  image: string;
  paragraphs: string[];
};

export const news: NewsPost[] = [
  {
    slug: "rationalization-of-power-tariff-for-agri-sector",
    path: "/2020/01/19/rationalization-of-power-tariff-for-agri-sector",
    title: "RATIONALIZATION OF POWER TARIFF FOR AGRI-SECTOR",
    shortTitle: "RATIONALIZATION OF POWER TARIFF FOR AGRI-SECTOR",
    author: "waqas",
    published: "January 19, 2020",
    updated: "March 26, 2025",
    image: "/images/news/spraying.jpg",
    paragraphs: [
      "Prime Minister Imran Khan announced Agriculture Emergency Program to provide relief to the farmers . So far various steps have been taken to translate the relief in various forms and manner.",
      "To that effect a meeting was organized on December 24 , Advisor to Prime Minister on Finance, Dr. Hafeez Sheikh chaired a meeting regarding Power Tariff in agriculture sector. Federal Minister for National Food Security & Research Makhdoom Khusro Bakhtiar, Mr. Omar Ayub Federal Minister for Energy, Federal Secretaries of Ministry Power, Finance and National Food Security attended the meeting.",
      "The meeting discussed about Fuel Price Adjustment (FPA) on Tube well tariff which are received to farmers from November to January 2020 this year. In the meeting Khusro Bakhtiar suggested that in order to provide relief to the farmers across the country, the subject FPA shall be paid over the period of six months from January 2020 to June 2020. The decision was made to provide relief to the farmers considering the high power tariff. It is pertinent to mention that the first meeting regarding FPA tariff was held last week.",
      "Khusro Bakhtiar said that, it would be a great impetus for farmers and one of the major trust building measures for farmers.",
      "Today a meeting was held at the Federal Ministry for Energy and the decision was finalised and communicated to the Ministry of National Food Security. The FPA to be billed in the months of November December 2019 and January 2020 will be spread over to next six months from January to June 2020. The approval was given by minister for power. Power division will notify for its implementation. This will provide major relief to the farmers to pay their rationalised electricity bills.",
      "The rationalization of power tariff for agriculture tube wells has been under consideration for quite some time. Federal Minister for NFS&R Khusro Bakhtiar said that the  government is working hard to bring domestic agricultural cost of production at par with neighboring countries. Hence the major focus is on provision of fertilizers on reasonable rates and also rationalization of power tariff for agriculture sector.",
    ],
  },
  {
    slug: "meeting-to-be-held-to-review-the-fertilizer-prices-and-availability",
    path: "/2020/01/19/meeting-to-be-held-to-review-the-fertilizer-prices-and-availability",
    title: "Meeting to be held to review the fertilizer prices and availability",
    shortTitle: "Meeting to be held to review the…",
    author: "waqas",
    published: "January 19, 2020",
    updated: "January 19, 2020",
    image: "/images/news/agriculture-economy.png",
    paragraphs: [
      "To discuss the matters regarding availability of urea & DAP for Rabi season, Federal Minister Khusro Bakhtiar has called a meeting on Monday.",
      "There have been concerns regarding high prices of urea and DAP, hence the meeting is convened to discuss the subject matter. Meeting notices to that effect are issued to urea manufacturers and DAP importers. The subject meeting will be chaired by the Federal Minister for Planning & Development.",
      "It is pertinent to mention that on the recommendation of Federal Minister Khusro Bakhtiar the Prime Minister has already established a Cabinet Committee comprising Advisor to PM on Commerce, Textile, Industry & Production, Federal Minister for NFS&R, Federal Minister for Planning & Development and Special Assistant to the P.M on Petroleum Division to negotiate and review fertilizer prices and availability.",
    ],
  },
];

export const contact = {
  heading: "Contact Information",
  lead: "Easily accessible place to approach. You can find us on map also or visit Industrial Estate phase",
  offices: [
    {
      city: "MULTAN OFFICE",
      people: [
        {
          name: "Muhammad Ali Raza",
          role: "Secretary General",
          org: "Pakistan Crop Protection Association",
          address: "PCPA SECTRIATE PLOT 7 & 8 Commercial Area Phase-I Industrial Estate Multan",
          email: "multanpcpa@gmail.com",
          contact: "0347-1415161",
          phone: "061-6514174",
        },
        {
          name: "Muhammad Awais Sarwar",
          role: "Office Secretary PCPA Multan",
          contact: "0301-0690606",
          email: "multanpcpa@gmail.com",
        },
      ],
    },
    {
      city: "LAHORE OFFICE",
      people: [
        {
          name: "Rana Mughees Iqbal",
          role: "Office Secretary PCPA Lahore",
          contact: "0306-0525229",
          address:
            "Plot No. 34, 4th Floor, Block E, Commercial Building, Etihad Town, Main Rawind Road, Lahore.",
        },
      ],
    },
  ],
};
