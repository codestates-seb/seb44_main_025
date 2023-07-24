export interface ReservationType {
  reservationId: number;
  performanceId: number;
  nickName: string;
  paymentId: number;
  date: string;
  reservationStatus: 'WAITING' | '완료';
  price: number;
  seatValue: number;
}
