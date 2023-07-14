export interface PerformanceType {
  performanceId: number;
  title: string;
  date: string;
  price: number;
  content: {
    contentId: number;
    body: string;
  };
  category: string;
  imageUrl: string;
  performanceArtist: {
    performanceId: number;
    performanceArtistList: {
      [x: string | number]: number;
    };
  };
  place: string;
  categoryId: number;
  totalSeat: number;
  leftSeat: number;
}

export interface PerformanceListType {
  data: PerformanceType[];
  pageInfo: {
    page: number;
    size: number;
    total_elements: number;
    total_pages: number;
  };
}
