import { styled } from 'styled-components';
import HeaderOnlyP from '../components/Header/HeaderOnlyP';
import {
  ButtonToggle,
  ButtonPrimary75px,
  ButtonPrimary335px,
} from '../components/Buttons/Buttons';
import ArtistContainer from '../components/artist/artistcontainer';
import NavLogin from '../components/Navs/NavLogin';
import NavMypage from '../components/Navs/NavMypage';
import { Input } from '../components/Inputs/Inputs';

const S = {
  Heading3: styled.h3`
    margin-top: 20px;
    margin-bottom: 8px;
    margin-right: auto;
    margin-left: 15px;
    color: white;
    font-size: var(--heading3-font-size);
    font-weight: var(--heading3-font-weight);
    line-height: var(--heading3-line-height);
  `,
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
  `,
  Main: styled.main`
    width: 390px;
    min-height: calc(100vh - 50px);
    background-color: var(--theme-background-color);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 70px;
  `,
  CategoryContainer: styled.div`
    margin-top: 20px;
    display: flex;
    min-width: 360px;
    justify-content: flex-start;
    & > button:not(:first-child) {
      margin-left: 13px;
    }
  `,
  SummaryContainer: styled.div`
    margin-top: 12px;
    width: 360px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Poster: styled.div`
    width: 170px;
    height: 210px;
    background-color: gray;
  `,
  // align-items: flex-start 왼쪽 정렬, flex-end 오른쪽 정렬
  Form: styled.div`
    width: 170px;
    height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    & p {
      color: white;
      font-size: var(--p-small-medium-font-size);
      font-weight: var(--p-small-medium-font-weight);
      line-height: var(--p-small-medium-line-height);
    }
  `,
  FormFlexContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  TextareaContainer: styled.textarea`
    width: 360px;
    min-height: 150px;
    font-size: var(--p-small-medium-font-size);
    font-weight: var(--p-small-medium-font-weight);
    line-height: var(--p-small-medium-line-height);
    outline: none;
    resize: vertical;
    padding: 1px;
  `,
  TitleButtonFlex: styled.div`
    width: 360px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > h3 {
      margin-left: 0;
    }
  `,
  Map: styled.div`
    width: 360px;
    height: 200px;
    background-color: gray;
  `,
  Image: styled.div`
    width: 360px;
    height: 210px;
    background-color: gray;
    margin-bottom: 20px;
  `,
  BottomStickyContainer: styled.div`
    width: 390px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: auto;
    bottom: 70px;
    & button {
      z-index: 1;
    }
  `,
};

const PerformanceRegister = () => {
  // TODO: 로그인 상태관리 로직 추가하기
  const isLoggedIn = true;
  // TODO: 공연 일자 경과 여부 로직 추가하기
  return (
    <>
      <HeaderOnlyP />
      <S.Container>
        <S.Main>
          <S.CategoryContainer>
            {/* TODO: 선택된 카테고리 상태관리 추가하기*/}
            <ButtonToggle text={'팝'} />
            <ButtonToggle text={'락'} />
            <ButtonToggle text={'R&B'} />
            <ButtonToggle text={'힙합'} />
            <ButtonToggle text={'재즈'} />
            <ButtonToggle text={'밴드'} />
            <ButtonToggle text={'댄스'} />
          </S.CategoryContainer>
          <S.SummaryContainer>
            <S.Poster></S.Poster>
            <S.Form>
              <Input label={'공연명'} width={170} height={30} />
              {/* TODO: type 부여 가능해지면 date로 설정 */}
              <Input label={'날짜'} width={170} height={30} />
              <S.FormFlexContainer>
                <Input label={'금액'} width={75} height={30} />
                <Input label={'총 좌석'} width={75} height={30} />
              </S.FormFlexContainer>
            </S.Form>
          </S.SummaryContainer>
          <S.Heading3>공연설명</S.Heading3>
          <S.TextareaContainer />
          <S.TitleButtonFlex>
            <S.Heading3>공연장 위치</S.Heading3>
            <ButtonPrimary75px>위치 등록</ButtonPrimary75px>
          </S.TitleButtonFlex>
          <S.Map></S.Map>
          <S.TitleButtonFlex>
            <S.Heading3>아티스트 추가</S.Heading3>
            <ButtonPrimary75px>추가</ButtonPrimary75px>
          </S.TitleButtonFlex>
          {/* TODO: 아티스트 제거 기능 구현하려면 개별 영역에 대한 컨트롤 확보하기 */}
          <ArtistContainer />
          <S.BottomStickyContainer>
            {/* TODO: 등록 / 수정 구분하기 - 라우팅 경로로 구분하거나 별도 props 전달 */}
            <ButtonPrimary335px onClick={() => console.log('등록/수정')}>
              공연 정보 등록 / 수정
            </ButtonPrimary335px>
          </S.BottomStickyContainer>
          {/* TODO: 웹 에디터 구현 시 이미지 등록 버튼 제거 */}
          <S.TitleButtonFlex>
            <S.Heading3>이미지 추가</S.Heading3>
            <ButtonPrimary75px>업로드</ButtonPrimary75px>
          </S.TitleButtonFlex>
          <S.Image />
        </S.Main>
      </S.Container>
      {isLoggedIn ? <NavMypage /> : <NavLogin />}
    </>
  );
};

export default PerformanceRegister;
