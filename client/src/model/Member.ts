export interface Member {
  userId?: number;
  artistId?: number;
  nickname?: string;
  hasArtist?: boolean;
  email?: string;
  memberId?: number;
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
  memberId?: number;
}
