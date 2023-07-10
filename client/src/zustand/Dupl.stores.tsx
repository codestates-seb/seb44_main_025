type Store = {
  emailDupl: boolean;
  setEmailDupl: (state: boolean) => void;
};
type Store2 = {
  nicknameDupl: boolean;
  setNicknameDupl: (state: boolean) => void;
};
type Store3 = {
  emailDuplBtnCnt: number;
  setEmailDuplBtnCnt: () => void;
};
type Store4 = {
  nicknameDuplBtnCnt: number;
  setNicknameDuplBtnCnt: () => void;
};
type Store5 = {
  noEmailDuplBtnClickedSubmit: boolean;
  setNoEmailDuplBtnClickedSubmit: (state: boolean) => void;
};
type Store6 = {
  noNicknameDuplBtnClickedSubmit: boolean;
  setNoNicknameDuplBtnClickedSubmit: (state: boolean) => void;
};
type Store7 = {
  submitClicked: boolean;
  setSubmitClicked: (state: boolean) => void;
};

export { Store, Store2, Store3, Store4, Store5, Store6, Store7 };
