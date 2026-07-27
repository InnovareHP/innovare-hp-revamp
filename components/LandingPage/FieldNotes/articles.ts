export interface Article {
  id: number;
  slug: string;
  title: string;
  source: string;
  url: string;
  description: string;
  category: string;
  publishedDate: string;
  image?: string;
}

export const articles: Article[] = [
  {
    id: 4,
    slug: "building-a-healthcare-brand-people-remember",
    title: "Building a Healthcare Brand People Remember",
    source: "Brainz Magazine",
    url: "https://www.brainzmagazine.com/post/building-a-healthcare-brand-people-remember",
    description:
      "Discover how to build a healthcare brand people remember. Learn why trust, consistency, and reputation drive growth long before occupancy, admissions, or referrals are ever discussed.",
    category: "Healthcare Marketing",
    publishedDate: "2026-07-16",
    image:
      "https://static.wixstatic.com/media/194202_289cd8f139c44e80b63e282bdc9bd042~mv2.jpg/v1/fill/w_768,h_512,al_c,lg_1,q_85/194202_289cd8f139c44e80b63e282bdc9bd042~mv2.jpg",
  },
  {
    id: 1,
    slug: "why-healthcare-referrals-break-before-they-begin",
    title: "Why Healthcare Referrals Break Before They Begin",
    source: "Brainz Magazine",
    url: "https://www.brainzmagazine.com/post/why-healthcare-referrals-break-before-they-begin",
    description:
      "Explore why healthcare referrals break down before they even begin—and how stronger communication, trust, and follow-through can keep patients moving through the care continuum.",
    category: "Healthcare Strategy",
    publishedDate: "2025-04-19",
    image:
      "https://static.wixstatic.com/media/769e42_9cfedbfedbb24a4dae287b40207dd759~mv2.jpg/v1/fill/w_740,h_491,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/769e42_9cfedbfedbb24a4dae287b40207dd759~mv2.jpg",
  },
  {
    id: 2,
    slug: "the-healthcare-referral-economy",
    title: "The Healthcare Referral Economy",
    source: "Brainz Magazine",
    url: "https://www.brainzmagazine.com/post/the-healthcare-referral-economy",
    description:
      "Understand how the healthcare referral economy drives patient flow, growth, and trust—and why strong relationships, digital presence, and accessibility matter more than traditional advertising.",
    category: "Healthcare Strategy",
    publishedDate: "2025-03-21",
    image:
      "https://static.wixstatic.com/media/194202_b89d5aef4dd84b7cb79522e57112bf84~mv2.jpg/v1/fill/w_1024,h_604,al_c/194202_b89d5aef4dd84b7cb79522e57112bf84~mv2.jpg",
  },
  {
    id: 3,
    slug: "confessions-of-a-nurse-marketer",
    title:
      "Confessions of a Nurse-Marketer – Interview with Rich Nollen, BSN, RN, Founder & CEO of Innovare HP",
    source: "Brainz Magazine",
    url: "https://www.brainzmagazine.com/post/confessions-of-a-nurse-marketer-interview-with-rich-nollen-bsn-rn-founder-ceo-of-innovare-hp",
    description:
      "Discover the powerful story behind Innovare HP and how nurse-turned-marketer Rich Nollen is redefining healthcare marketing as care delivery. Explore how strategy, storytelling, and human-centered connection transformed his near-failure into a mission-driven agency.",
    category: "Healthcare Marketing",
    publishedDate: "2025-03-14",
    image:
      "https://static.wixstatic.com/media/194202_c5303260c26447b08b417e3b132cbd26~mv2.jpg/v1/fill/w_1061,h_675,al_c/194202_c5303260c26447b08b417e3b132cbd26~mv2.jpg",
  },
];
