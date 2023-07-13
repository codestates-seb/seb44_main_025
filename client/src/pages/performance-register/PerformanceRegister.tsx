import S from './PerformanceRegister.style';
import Header from '../../components/header/Header';
import {
  ButtonMiniToggleSelect,
  ButtonMiniToggleUnselect,
  ButtonPrimary75px,
  ButtonPrimary335px,
} from '../../components/buttons/Buttons';
import ArtistContainer from '../../components/artist/artistcontainer';
import Navbar from '../../components/nav/Navbar';
import { Input } from '../../components/inputs/Inputs';
import { Editor } from '../../components/inputs/editor/Editor';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useEditorStore } from '../../components/inputs/editor/EditorStore';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { testPostPerformance, postPerformance } from '../../api/fetchAPI';
// import { isLoggedIn } from '../../zustand/Token';
import { categoryObj } from '../../utils/Category';

interface FormValues {
  title: string;
  date: string;
  price: string;
  totalSeat: string;
  artists: string[] | number[];
}

interface BodyType {
  title: string;
  artistIds: number[];
  content: string;
  date: string;
  price: number;
  place: string;
  totalSeat: number;
  categoryId: number;
  imageUrl?: string;
}

const PerformanceRegister = () => {
  const { handleSubmit, control } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    const result = {};
    Object.assign(result, {
      ...data,
      price: +data.price,
      totalSeat: +data.totalSeat,
    });
    // TODO: place, artistIds 구현하기
    Object.assign(result, {
      categoryId,
      content,
      place: '홍대',
      artistIds: [1],
      imageUrl: '',
    });
    let formData = new FormData();
    formData.append('image-file', file as Blob, 'image');
    // formData.append('performanceDto', JSON.stringify(result));
    formData.append(
      'performanceDto',
      new Blob([JSON.stringify(result)], {
        type: 'application/json',
      }),
      'performanceDto'
    );
    testPostPerformance(result);
    // postPerformance(formData);
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
      <Header precious={true} />
      <S.Container>
        <S.Main>
          <S.Heading1>공연등록</S.Heading1>
          <S.SummaryContainer>
            <S.FileInput
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                if (files === undefined || files === null) return;
                const file = files[0];
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
              <Controller
                control={control}
                name={'title'}
                defaultValue={''}
                rules={{
                  required: '반드시 입력해야 합니다',
                }}
                render={({ field }) => {
                  return (
                    <Input
                      label={'공연명'}
                      height={30}
                      width={170}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name={'date'}
                defaultValue={''}
                rules={{
                  required: '반드시 입력해야 합니다',
                }}
                render={({ field }) => {
                  return (
                    <Input
                      label={'날짜'}
                      height={30}
                      width={170}
                      type="datetime-local"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name={'price'}
                defaultValue={'0'}
                rules={{
                  required: '반드시 입력해야 합니다',
                }}
                render={({ field }) => {
                  return (
                    <Input
                      label={'금액'}
                      height={30}
                      width={170}
                      type="number"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name={'totalSeat'}
                defaultValue={'0'}
                rules={{
                  required: '반드시 입력해야 합니다',
                }}
                render={({ field }) => {
                  return (
                    <Input
                      label={'총 좌석'}
                      height={30}
                      width={170}
                      type="number"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  );
                }}
              />
            </S.Form>
          </S.SummaryContainer>
          <S.CategoryContainer>
            {Object.keys(categoryObj).map((key, idx) => {
              return idx + 1 === categoryId ? (
                <ButtonMiniToggleSelect
                  key={key}
                  value={key}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const value = +(e.target as HTMLInputElement).value;
                    handleClickCategory(value);
                  }}
                >
                  {categoryObj[key]}
                </ButtonMiniToggleSelect>
              ) : (
                <ButtonMiniToggleUnselect
                  key={key}
                  value={key}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const value = +(e.target as HTMLInputElement).value;
                    handleClickCategory(value);
                  }}
                >
                  {categoryObj[key]}
                </ButtonMiniToggleUnselect>
              );
            })}
          </S.CategoryContainer>
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
      <Navbar />
    </>
  );
};

export default PerformanceRegister;
