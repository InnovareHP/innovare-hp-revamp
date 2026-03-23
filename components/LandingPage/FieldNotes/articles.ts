export interface Article {
  id: number;
  title: string;
  source: string;
  url: string;
  description: string;
  category: string;
  image?: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title:
      "Confessions of a Nurse-Marketer – Interview with Rich Nollen, BSN, RN, Founder & CEO of Innovare HP",
    source: "Brainz Magazine",
    url: "https://www.brainzmagazine.com/post/confessions-of-a-nurse-marketer-interview-with-rich-nollen-bsn-rn-founder-ceo-of-innovare-hp",
    description:
      "Discover the powerful story behind Innovare HP and how nurse-turned-marketer Rich Nollen is redefining healthcare marketing as care delivery. Explore how strategy, storytelling, and human-centered connection transformed his near-failure into a mission-driven agency.",
    category: "Healthcare Marketing",
    image:
      "https://static.wixstatic.com/media/194202_c5303260c26447b08b417e3b132cbd26~mv2.jpg/v1/fill/w_1061,h_675,al_c/194202_c5303260c26447b08b417e3b132cbd26~mv2.jpg",
  },
  {
    id: 2,
    title: "The Healthcare Referral Economy",
    source: "Brainz Magazine",
    url: "https://www.brainzmagazine.com/post/the-healthcare-referral-economy",
    description:
      "Discover how the healthcare referral economy truly drives patient flow, growth, and trust. Learn why relationships, digital presence, and accessibility matter more than advertising.",
    category: "Healthcare Strategy",
    image:
      "https://static.wixstatic.com/media/194202_b89d5aef4dd84b7cb79522e57112bf84~mv2.jpg/v1/fill/w_1024,h_604,al_c/194202_b89d5aef4dd84b7cb79522e57112bf84~mv2.jpg",
  },
];
