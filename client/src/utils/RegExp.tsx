/** 유효성 검사 정규식 */

/** @email :@.필수, TDL 2또는 3글자 */
export const emailRegExp =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

/** @Password :8~16자 영문, 숫자 조합 */
export const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

/** @nickname :한글 또는 영문 가능*/
export const nicknameRegExp = /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣 ]*$/;
