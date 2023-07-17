import S from './PerformanceRegister.style';
import Header from '../../components/header/Header';
import { Button } from '../../components/buttons/Buttons';
import ArtistContainer from '../../components/artist/artistcontainer';
import Navbar from '../../components/nav/Navbar';
import { Input } from '../../components/inputs/Inputs';
import { Editor } from '../../components/inputs/editor/Editor';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useEditorStore } from '../../components/inputs/editor/EditorStore';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { postPerformance } from '../../api/fetchAPI';
import { categoryObj } from '../../utils/Category';
import { getCookie } from '../../utils/Cookie';

interface FormValues {
  title: string;
  date: string;
  price: string;
  totalSeat: string;
}

const PerformanceRegister = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagesrc, setImagesrc] = useState<string>('');
  const [file, setFile] = useState<Blob>();
  // 함께할 아티스트 목록
  const [artistIds, setArtistIds] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const handleClickCategory = (id: number) => {
    if (categoryId === id) setCategoryId(null);
    else setCategoryId(id);
  };
  const { content, clearContent } = useEditorStore();
  // TODO: 로그인 상태 관리 변경하기
  useEffect(() => {
    if (!getCookie('accessToken')) {
      navigate('/performances');
    }
    return () => {
      clearContent();
    };
  }, []);
  const { handleSubmit, control } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    const result = {};
    Object.assign(result, {
      ...data,
      price: +data.price,
      totalSeat: +data.totalSeat,
      date: new Date(data.date).toISOString().slice(0, 19).replace('T', ' '),
    });
    // TODO: place, artistIds 구현하기
    Object.assign(result, {
      categoryId,
      content,
      place: '홍대',
      artistIds: [getCookie('userInfo').artistId, ...artistIds],
      imageUrl:
        'https://economychosun.com/site/data/img_dir/2022/11/21/2022112100038_0.jpg',
    });
    let formData = new FormData();
    // formData.append('image-file', file as Blob, 'image');
    formData.append(
      'performanceDto',
      new Blob([JSON.stringify(result)], {
        type: 'application/json',
      }),
      'performanceDto'
    );
    postPerformance(formData);
    // postPerformance(formData).then(data => {
    //   if (data && 'performanceId' in data) {
    //     clearContent();
    //     navigate(`performances/${data.performanceId}`);
    //   }
    // });
  };
  const handleSubmitAll = () => {
    if (!imagesrc || !content) return;
    return handleSubmit(onSubmit)();
  };

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
                <Button
                  theme="highlight"
                  size="mini"
                  key={key}
                  value={key}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const value = +(e.target as HTMLInputElement).value;
                    handleClickCategory(value);
                  }}
                >
                  {categoryObj[key]}
                </Button>
              ) : (
                <Button
                  theme="theme"
                  size="mini"
                  key={key}
                  value={key}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const value = +(e.target as HTMLInputElement).value;
                    handleClickCategory(value);
                  }}
                >
                  {categoryObj[key]}
                </Button>
              );
            })}
          </S.CategoryContainer>
          <S.Heading3>공연설명</S.Heading3>
          <Editor />
          <S.TitleButtonFlex>
            <S.Heading3>공연장 위치</S.Heading3>
            <Button theme="primary" size="small" height={30}>
              위치 등록
            </Button>
          </S.TitleButtonFlex>
          <S.Map></S.Map>
          <S.TitleButtonFlex>
            <S.Heading3>아티스트 추가</S.Heading3>
            <Button theme="primary" size="small" height={30}>
              추가
            </Button>
          </S.TitleButtonFlex>
          {/* TODO: 아티스트 제거 기능 구현하려면 개별 영역에 대한 컨트롤 확보하기 */}
          <ArtistContainer />
          <S.BottomStickyContainer>
            {/* TODO: 등록 / 수정 구분하기 - 라우팅 경로로 구분하거나 별도 props 전달 */}
            <Button
              size="large"
              theme="primary"
              onClick={() => {
                handleSubmitAll();
              }}
            >
              공연 정보 등록 / 수정
            </Button>
          </S.BottomStickyContainer>
        </S.Main>
      </S.Container>
      <Navbar />
    </>
  );
};

export default PerformanceRegister;
