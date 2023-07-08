import S from './Sign.styled';
import HeaderOnlyP from '../../components/Header/HeaderOnlyP';
import { ButtonPrimary160px } from '../../components/Buttons/Buttons';
import { useRef, useState } from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IForm {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
}

const SignUpPage = () => {
  /** 중복여부
   * @true :중복되지 않음
   * @false :중복됨
   */
  let [emailDuplication, setEmailDuplication] = useState(false);
  let [nicknameDuplication, setNicknameDuplication] = useState(false);
  /** 중복확인버튼 클릭 여부 */
  let [emailDuplBtnCnt, setEmailDuplBtnCnt] = useState(0);
  let [nicknameDuplBtnCnt, setNicknameDuplBtnCnt] = useState(0);
  /** 중복확인 클릭하지 않고 submit 했을 때
   * @ture :중복확인 X
   * @false :중복확인 O
   */
  let [noEmailDuplBtnClickedSubmit, setNoEmailDuplBtnClickedSubmit] =
    useState(true);
  let [noNicknameDuplBtnClickedSubmit, setNoNicknameDuplBtnClickedSubmit] =
    useState(true);
  let [submitClicked, setSubmitClicked] = useState(false);
  useState(true);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>();

  /** email 현재값 (중복확인시 사용)*/
  const input_email = useRef<string | null>(null);
  input_email.current = watch('email');
  /** 비밀번호 현재값 (비밀번호 확인란에서 사용)*/
  const input_password = useRef<string | null>(null);
  input_password.current = watch('password');
  /** 닉네임 현재값 (중복확인시 사용)*/
  const input_nickname = useRef<string | null>(null);
  input_nickname.current = watch('nickname');

  /** 유효성 검사 정규식
   * @email :@.필수, TDL 2또는 3글자
   * @Password :8~16자 영문, 숫자 조합
   * @nickname :한글 또는 영문 가능
   */
  const emailRegExp =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  const nicknameRegExp = /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣 ]*$/;

  /** 입력한 값들을 react-hook-form의 SubmitHandler를 통해 객체(data)로 받는 함수 */
  const onSubmit: SubmitHandler<IForm> = data => {
    setSubmitClicked(true);
    if (!noEmailDuplBtnClickedSubmit && !noNicknameDuplBtnClickedSubmit) {
      if (!emailDuplication && !nicknameDuplication) {
        함수(data);
        console.log(noNicknameDuplBtnClickedSubmit);
      } else {
        if (emailDuplication) {
          if (emailDuplBtnCnt > 0) {
            setNoEmailDuplBtnClickedSubmit(true);
          }
        }
        if (nicknameDuplication) {
          if (nicknameDuplBtnCnt > 0) {
            setNoNicknameDuplBtnClickedSubmit(true);
          }
        }
      }
    }
  };
  /** 회원정보를 서버로 전송하는 ajax 함수 */
  const 함수 = (data: IForm) => {
    console.log(data);
    console.log(emailDuplBtnCnt);
    console.log(nicknameDuplBtnCnt);
    axios
      .post('/signup', data)
      .then(response => {
        const { accessToken } = response.data;
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
      })
      .catch(error => {
        alert(`error: ${error}`);
      });
  };
  /** 중복 확인하는 함수
   * @todo 중복확인 로직 구현
   */
  const duplicateCheck = (
    email: string | null,
    nickname: string | null
  ): void => {
    if (typeof email === 'string' && nickname === '') {
      if (email === 'hello@naver.com') {
        setEmailDuplication(false);
        setEmailDuplBtnCnt(emailDuplBtnCnt + 1);
        setNoEmailDuplBtnClickedSubmit(false);
      } else {
        setEmailDuplication(true);
        setEmailDuplBtnCnt(emailDuplBtnCnt + 1);
        setNoEmailDuplBtnClickedSubmit(false);
      }
    }
    if (email === '' && typeof nickname === 'string') {
      // 중복검사를 통과한 경우
      if (nickname === 'hello') {
        setNicknameDuplication(false);
        setNicknameDuplBtnCnt(nicknameDuplBtnCnt + 1);
        setNoNicknameDuplBtnClickedSubmit(false);
      }
      // 통과하지 못 한 경우
      else {
        setNicknameDuplication(true);
        setNicknameDuplBtnCnt(nicknameDuplBtnCnt + 1);
        setNoNicknameDuplBtnClickedSubmit(false);
      }
    }
  };

  return (
    <>
      <HeaderOnlyP />
      <S.Main>
        <S.Container>
          <S.H1>Ez to 회원가입</S.H1>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <label htmlFor="email">이메일</label>
                <div>
                  <S.Input
                    width={285}
                    {...register('email', {
                      required: true,
                      pattern: emailRegExp,
                      onChange: e => setNoEmailDuplBtnClickedSubmit(true),
                    })}
                  />
                  <S.ButtonSpan
                    onClick={() => {
                      duplicateCheck(input_email.current, '');
                    }}
                  >
                    중복확인
                  </S.ButtonSpan>
                </div>
                <div>{errors.email && <p>이메일 형식으로 입력해라</p>}</div>
                {noEmailDuplBtnClickedSubmit ? (
                  submitClicked === true ? (
                    <p>중복확인을 해주세요</p>
                  ) : null
                ) : emailDuplication ? (
                  <p>같은 이메일 이미 있음</p>
                ) : emailDuplBtnCnt > 0 ? (
                  <p style={{ color: 'var(--input-border-color)' }}>
                    {' '}
                    사용 가능한 이메일입니다
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="password">비밀번호</label>
                <S.Input
                  type="password"
                  {...register('password', {
                    required: true,
                    pattern: passwordRegExp,
                  })}
                />
                {errors.password && <p>비밀번호 형식으로 입력해라</p>}
              </div>
              <div>
                <label htmlFor="password_fonfirm">비밀번호 확인</label>
                <S.Input
                  type="password"
                  {...register('password_confirm', {
                    required: true,
                    validate: value => value === input_password.current,
                  })}
                />
                {errors.password_confirm && <p>똑같은 비밀번호 입력해라</p>}
              </div>
              <div>
                <label htmlFor="nickname">닉네임</label>
                <div>
                  <S.Input
                    width={285}
                    {...register('nickname', {
                      required: true,
                      pattern: nicknameRegExp,
                      onChange: e => setNoNicknameDuplBtnClickedSubmit(true),
                    })}
                  />
                  <S.ButtonSpan
                    onClick={() => {
                      duplicateCheck('', input_nickname.current);
                    }}
                  >
                    중복확인
                  </S.ButtonSpan>
                </div>
                {errors.nickname && <p>닉네임 규칙에 맞게 입력해라</p>}
                {noNicknameDuplBtnClickedSubmit ? (
                  submitClicked === true ? (
                    <p>중복확인을 해주세요</p>
                  ) : null
                ) : nicknameDuplication ? (
                  <p>같은 닉네임 이미 있음</p>
                ) : nicknameDuplBtnCnt > 0 ? (
                  <p style={{ color: 'var(--input-border-color)' }}>
                    사용 가능한 닉네임입니다
                  </p>
                ) : null}
              </div>
            </div>
            <ButtonPrimary160px>회원가입하기</ButtonPrimary160px>
          </S.Form>
          <div>
            <S.Span>이미 계정이 있으신가요?</S.Span>
            <S.ButtonSpan>로그인</S.ButtonSpan>
          </div>
        </S.Container>
      </S.Main>
    </>
  );
};

export default SignUpPage;
