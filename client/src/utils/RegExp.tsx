/** 유효성 검사 정규식 */

/** @email :@.필수, TDL 2또는 3자*/
export const emailRegExp =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

/** @Password :8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합 */
export const passwordRegExp =
  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

/** @nickname :한글, 영문 가능, 띄어쓰기 불가*/
export const nicknameRegExp = /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣]*$/;
