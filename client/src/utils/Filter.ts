import { ReservationType } from '../model/Reservation';

export const checkIsReserved = (
  reservation: ReservationType[],
  performanceId: number
) => {
  for (let i = 0; i < reservation.length; i++) {
    if (reservation[i].performanceId === performanceId) return true;
  }
  return false;
};

export const filterReservationByPerformanceId = (
  reservation: ReservationType[],
  performanceId: number
) => {
  let result;
  for (let i = 0; i < reservation.length; i++) {
    if (reservation[i].performanceId === performanceId) {
      result = reservation[i];
    }
  }
  if (result) {
    const { reservationId, seatValue } = result;
    return { reservationId, seatValue };
  }
  return { reservationId: 0, seatValue: 0 };
};
