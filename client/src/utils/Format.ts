/** 분 단위를 기준으로 반환됩니다. 한국: -540
 * 실제 사용 예시: getTimezoneOffset() * 60(분) * 1000(ms)
 */
export const getTimezoneOffset = () => {
  return new Date().getTimezoneOffset();
};

export const getTimezoneAdjustedISOString = (date?: Date | string) => {
  if (date === undefined) {
    return new Date(Date.now() - getTimezoneOffset() * 60000).toISOString();
  } else if (typeof date === 'string') {
    return new Date(
      new Date(date).getTime() - getTimezoneOffset() * 60000
    ).toISOString();
  } else {
    return new Date(date.getTime() - getTimezoneOffset() * 60000).toISOString();
  }
};

export const getOriginalISOStringFromAdjusted = (date: string | Date) => {
  if (date instanceof Date) {
    return new Date(+date + getTimezoneOffset() * 60000).toISOString();
  } else {
    return new Date(+new Date(date)).toISOString();
  }
};

export const getFormattedNumber = (number: number) => {
  return number.toLocaleString();
};

export const getDateTime = (date: string) => {
  return `${new Date(date).toLocaleDateString()} ${new Date(date)
    .toLocaleTimeString()
    .slice(0, -3)}`;
};
