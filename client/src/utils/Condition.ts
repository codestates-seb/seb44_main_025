export const getButtonText = (
  isStale: boolean,
  isReserved: boolean,
  leftSeat: number
) => {
  if (isStale && isReserved) return '후기 작성';
  if (isStale && !isReserved) return '공연 종료';
  if (!isStale && isReserved) return '예약 확인';
  if (!isStale && leftSeat === 0) return '매진';
  if (!isStale && !isReserved && leftSeat > 0) return '공연 예약';
  return '조건 확인';
};
