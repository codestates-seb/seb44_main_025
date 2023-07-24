export interface Member {
  userId?: number;
  artistId?: number;
  nickname?: string;
  hasArtist?: boolean;
  email?: string;
  memberId?: number;
}

export interface Performance {
  // map(arg0: () => import('react/jsx-runtime').JSX.Element): unknown;
  performanceId: number;
  title: string;
  category: string;
  date: string;
  price: number;
  artistName: string;
  imageUrl: string;
  place?: string;
}

export interface Review {
  nickName: string;
  reviewTitle: string;
  artistId?: number;
  content: string;
  createdAt: string;
  memberId?: number;
  reviewId: number;
  date: string;
}

export interface SignUp {
  email: string;
  password: string;
  password_confirm?: string;
  nickname: string;
}

export interface SignIn {
  email: string;
  password: string;
  nickname?: string;
}
