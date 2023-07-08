import { styled } from 'styled-components';
import HeaderOnlyP from '../components/Header/HeaderOnlyP';
import { ButtonHighlightBorder } from '../components/Buttons/Buttons';
import { Input, InputSuccess, InputWarning } from '../components/Inputs/Inputs';

export default function Cancelpage() {
  return (
    <>
      <HeaderOnlyP />
      <S.Main>
        <S.Section>
          <S.Title>회원탈퇴</S.Title>
          <S.UserDetail>
            <S.SubTitle>정말 탈퇴하시겠습니까?</S.SubTitle>
            <S.InputContainer>
              <S.InputLabel>비밀번호 확인</S.InputLabel>
              <Input></Input>
            </S.InputContainer>
            <S.InputContainer>
              <S.InputLabel>비밀번호 확인</S.InputLabel>
              <InputSuccess message={'비밀번호가 일치합니다.'}></InputSuccess>
            </S.InputContainer>
            <S.InputContainer>
              <S.InputLabel>비밀번호 확인</S.InputLabel>
              <InputWarning
                message={'비밀번호가 일치하지 않습니다.'}
              ></InputWarning>
            </S.InputContainer>
            <S.HighlightButtonWarppar>
              <ButtonHighlightBorder>회원탈퇴</ButtonHighlightBorder>
            </S.HighlightButtonWarppar>
          </S.UserDetail>
        </S.Section>
      </S.Main>
    </>
  );
}

const S = {
  Main: styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Section: styled.section`
    width: 390px;
    height: calc(100vh - 50px);
    background-color: var(--theme-background-color);
  `,
  Title: styled.header`
    font-size: var(--heading1-font-size);
    font-weight: var(--heading1-font-weight);
    line-height: var(--heading1-line-height);
    color: var(--font-white-color);
    width: 390px;
    padding: 20px 15px 10px 15px;
  `,

  UserDetail: styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
  `,
  SubTitle: styled.header`
    font-size: var(--heading5-font-size);
    font-weight: var(--heading5-font-weight);
    line-height: var(--heading5-line-height);
    color: var(--font-white-color);
    display: flex;
    justify-content: center;
    margin-top: 100px;
    margin-bottom: 50px;
  `,
  InputContainer: styled.div`
    margin-left: 15px;
    margin-bottom: 10px;
  `,
  InputLabel: styled.div`
    font-size: var(--p-large-medium-font-size);
    font-weight: var(--p-large-medium-font-weight);
    line-height: var(--p-large-medium-line-height);
    color: var(--font-white-color);
    margin-bottom: 5px;
    margin-left: 20px;
  `,
  HighlightButtonWarppar: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    margin-top: 100px;
    margin-bottom: 20px;
  `,
};
