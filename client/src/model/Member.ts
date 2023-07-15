export interface Member {
  userId?: number;
  nickname?: string;
  hasArtist?: boolean;
  email?: string;
}

export interface Performance {
  performanceId: number;
  title: string;
  category: string;
  date: string;
  price: number;
  artistName: string;
  imageUrl: string;
}

export interface Review {
  nickName: string;
  reviewTitle: string;
  artistId?: number;
  content: string;
  createdAt: string;
}
