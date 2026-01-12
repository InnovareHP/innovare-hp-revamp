export type LinkedInPost = {
  id: string;
  authorUrn: string;
  text: string;
  publishedAt: Date;
  timeAgo: string;
  images: {
    id: string;
    imageUrn: string;
    imageUrl: string;
    altText: string;
    position: number;
  }[];
};

export type EventCreateInput = {
  title: string;
  description: string;
  date: Date;
  location: string;
  status: string;
  qrCode: string;
};
