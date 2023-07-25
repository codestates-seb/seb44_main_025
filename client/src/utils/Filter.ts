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
