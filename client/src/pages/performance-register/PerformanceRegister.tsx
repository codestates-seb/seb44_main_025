import S from './PerformanceRegister.style';
import HeaderOnlyP from '../../components/header/HeaderOnlyP';
import {
  ButtonMiniToggleSelect,
  ButtonMiniToggleUnselect,
  ButtonPrimary75px,
  ButtonPrimary335px,
} from '../../components/buttons/Buttons';
import ArtistContainer from '../../components/artist/artistcontainer';
import NavLogin from '../../components/navs/NavLogin';
import NavMypage from '../../components/navs/NavMypage';
import { Input } from '../../components/inputs/StyledInputs';
import { Editor } from '../../components/inputs/editor/Editor';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useEditorStore } from '../../components/inputs/editor/EditorStore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { postPerformance } from '../../api/fetchAPI';
// import { isLoggedIn } from '../../zustand/Token';
interface Inputs {
  title: string;
  date: string;
  price: string;
  totalseat: string;
  artists: string[] | number[];
}

const categoryObj = {
  팝: 1,
  락: 2,
  'R&B': 3,
  재즈: 4,
  밴드: 5,
  댄스: 6,
};
const PerformanceRegister = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    const result = {};
    Object.assign(result, data);
    // TODO: place, artistIds 구현하기
    Object.assign(result, {
      categoryId,
      content,
      place: '홍대',
      artistIds: [1],
    });
    let formData = new FormData();
    formData.append('image-file', file as Blob);
    formData.append('performanceDto', JSON.stringify(result));
    postPerformance(formData);
  };
  const content = useEditorStore(state => state.content);
  const handleSubmitAll = () => {
    if (!imagesrc || !content) return;
    handleSubmit(onSubmit)();
  };

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const handleClickCategory = (id: number) => {
    if (categoryId === id) setCategoryId(null);
    else setCategoryId(id);
  };
  // TODO: 로컬 이미지 업로드할 방법 찾기
  const [imagesrc, setImagesrc] = useState<string>('');
  const [file, setFile] = useState<Blob>();
  // 함께할 아티스트 목록
  const [artists, setArtists] = useState<string[]>([]);
  // const clearContent = useEditorStore(state => state.clearContent);
  // TODO: 로그인 상태관리 로직 추가하기
  const isLoggedIn = true;
  return (
    <>
      <HeaderOnlyP />
      <S.Container>
        <S.Main>
          <S.CategoryContainer>
            {Object.keys(categoryObj).map((key, idx) => {
              return idx === categoryId ? (
                <ButtonMiniToggleSelect
                  key={idx}
                  value={idx}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const value = +(e.target as HTMLInputElement).value;
                    handleClickCategory(value);
                  }}
                >
                  {key}
                </ButtonMiniToggleSelect>
              ) : (
                <ButtonMiniToggleUnselect
                  key={idx}
                  value={idx}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const value = +(e.target as HTMLInputElement).value;
                    handleClickCategory(value);
                  }}
                >
                  {key}
                </ButtonMiniToggleUnselect>
              );
            })}
          </S.CategoryContainer>
          <S.SummaryContainer>
            <S.FileInput
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                if (files === undefined || files === null) return;
                const file = files[0];
                console.log(file);
                setFile(file);
                if (file) {
                  const reader = new FileReader();

                  reader.onload = e => {
                    if (!e.target?.result || e.target?.result === null) return;
                    setImagesrc(e.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <S.Poster
              src={imagesrc}
              onClick={() => fileInputRef.current?.click()}
            ></S.Poster>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="title">공연명</label>
              <Input
                id="title"
                height={30}
                width={170}
                {...register('title', { required: true })}
              />
              <label htmlFor="date">날짜</label>
              <Input
                id="date"
                height={30}
                width={170}
                type="datetime-local"
                {...register('date', { required: true })}
              />
              <label htmlFor="price">금액</label>
              <Input
                id="price"
                height={30}
                width={170}
                type="number"
                step="1000"
                min="0"
                {...register('price', { required: true, min: 0 })}
              />
              <label htmlFor="totalseat">총 좌석</label>
              <Input
                id="totalseat"
                height={30}
                width={170}
                type="number"
                {...register('totalseat', { required: true })}
              />
            </S.Form>
            {/* <S.Form>
              <Input label={'공연명'} width={170} height={30} />
              <Input label={'날짜'} width={170} height={30} type="date" />
              <S.FormFlexContainer>
                <Input label={'금액'} width={75} height={30} type="number" />
                <Input label={'총 좌석'} width={75} height={30} type="number" />
              </S.FormFlexContainer>
            </S.Form> */}
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
                handleSubmitAll();
                // navigate('/performances/1');
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
