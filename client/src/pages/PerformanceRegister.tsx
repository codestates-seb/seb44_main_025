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
import { Editor } from '../components/Inputs/Editor/Editor';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
// import { useEditorStore } from '../components/Inputs/Editor/EditorStore';

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
  FileInput: styled.input`
    display: none;
  `,
  Poster: styled.div<{ imageurl: string }>`
    width: 170px;
    height: 210px;
    background-color: gray;
    cursor: pointer;
    background-image: ${props =>
      props.imageurl ? `url(${props.imageurl})` : 'none'};
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
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  // TODO: 로컬 이미지 업로드할 방법 찾기
  const [imageurl, setimageurl] = useState('');
  // const clearContent = useEditorStore(state => state.clearContent);
  // TODO: 로그인 상태관리 로직 추가하기
  const isLoggedIn = true;
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
            <S.FileInput
              type="file"
              ref={fileInputRef}
              value={imageurl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setimageurl(e.target.value);
                console.log(imageurl);
              }}
            />
            <S.Poster
              imageurl={imageurl}
              onClick={() => fileInputRef.current?.click()}
            ></S.Poster>
            <S.Form>
              <Input label={'공연명'} width={170} height={30} />
              <Input label={'날짜'} width={170} height={30} type="date" />
              <S.FormFlexContainer>
                <Input label={'금액'} width={75} height={30} type="number" />
                <Input label={'총 좌석'} width={75} height={30} type="number" />
              </S.FormFlexContainer>
            </S.Form>
          </S.SummaryContainer>
          <S.Heading3>공연설명</S.Heading3>
          <Editor />
          {/* 버그 심각하면 textarea 사용하기 <S.TextareaContainer /> */}
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
            {/* TODO: 등록 후 정상적으로 응답을 수신했을 때 clearContent 호출하기 */}
            <ButtonPrimary335px
              onClick={() => {
                console.log(
                  'input + 추가 정보 담아서 등록/수정 요청 보내는 로직 추가'
                );
                navigate('/performances/1');
                // TODO: 등록 완료 후 받은 응답에 따라 내용 렌더링 - 작성 내용은 삭제
                // clearContent();
              }}
            >
              공연 정보 등록 / 수정
            </ButtonPrimary335px>
          </S.BottomStickyContainer>
          {/* Note: 웹 에디터 폐기할 경우 이미지 등록 버튼 되살리기
          <S.TitleButtonFlex>
            <S.Heading3>이미지 추가</S.Heading3>
            <ButtonPrimary75px>업로드</ButtonPrimary75px>
          </S.TitleButtonFlex>
            <S.Image /> */}
        </S.Main>
      </S.Container>
      {isLoggedIn ? <NavMypage /> : <NavLogin />}
    </>
  );
};

export default PerformanceRegister;
