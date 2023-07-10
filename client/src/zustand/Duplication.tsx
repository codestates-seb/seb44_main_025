import { create } from 'zustand';
import * as stores from './Dupl.stores';
/** 중복여부
 * @true :중복되지 않음
 * @false :중복됨
 */
export const emailDuplication = create<stores.Store>(set => ({
  emailDupl: false,
  setEmailDupl: state => set({ emailDupl: state }),
}));
export const nicknameDuplication = create<stores.Store2>(set => ({
  nicknameDupl: false,
  setNicknameDupl: state => set({ nicknameDupl: state }),
}));

/** 중복확인버튼 클릭 여부 */
export const emailDuplBtnCounter = create<stores.Store3>(set => ({
  emailDuplBtnCnt: 0,
  setEmailDuplBtnCnt: () =>
    set(state => ({ emailDuplBtnCnt: state.emailDuplBtnCnt + 1 })),
}));
export const nicknameDuplBtnCounter = create<stores.Store4>(set => ({
  nicknameDuplBtnCnt: 0,
  setNicknameDuplBtnCnt: () =>
    set(state => ({ nicknameDuplBtnCnt: state.nicknameDuplBtnCnt + 1 })),
}));

/** 중복확인 클릭하지 않고 submit 했을 때
 * @ture :중복확인 X
 * @false :중복확인 O
 */
export const noEmailDuplSubmit = create<stores.Store5>(set => ({
  noEmailDuplBtnClickedSubmit: true,
  setNoEmailDuplBtnClickedSubmit: state =>
    set({ noEmailDuplBtnClickedSubmit: state }),
}));
export const noNicknameDuplSubmit = create<stores.Store6>(set => ({
  noNicknameDuplBtnClickedSubmit: true,
  setNoNicknameDuplBtnClickedSubmit: state =>
    set({ noNicknameDuplBtnClickedSubmit: state }),
}));

/** 한 번이라도 submit 눌렀는지 여부 */
export const IsSubmitClicked = create<stores.Store7>(set => ({
  submitClicked: false,
  setSubmitClicked: state => set({ submitClicked: state }),
}));

// /** 중복여부
//  * @true :중복되지 않음
//  * @false :중복됨
//  */
// export let [emailDuplication, setEmailDuplication] = useState(false);
// export let [nicknameDuplication, setNicknameDuplication] = useState(false);

// /** 중복확인버튼 클릭 여부 */
// export let [emailDuplBtnCnt, setEmailDuplBtnCnt] = useState(0);
// export let [nicknameDuplBtnCnt, setNicknameDuplBtnCnt] = useState(0);

// /** 중복확인 클릭하지 않고 submit 했을 때
//  * @ture :중복확인 X
//  * @false :중복확인 O
//  */
// export let [noEmailDuplBtnClickedSubmit, setNoEmailDuplBtnClickedSubmit] =
//   useState(true);
// export let [noNicknameDuplBtnClickedSubmit, setNoNicknameDuplBtnClickedSubmit] =
//   useState(true);

// export let [submitClicked, setSubmitClicked] = useState(false);
