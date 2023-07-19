import S from './PerformanceRegister.style';
import Header from '../../components/header/Header';
import { Button } from '../../components/buttons/Buttons';
// import ArtistContainer from '../../components/artist/artistcontainer';
import Navbar from '../../components/nav/Navbar';
import { Input } from '../../components/inputs/Inputs';
import { Editor } from '../../components/inputs/editor/Editor';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useEditorStore } from '../../components/inputs/editor/EditorStore';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { postPerformance, postArtistImg as postImg } from '../../api/fetchAPI';
import { categoryObj } from '../../utils/Category';
import { getCookie } from '../../utils/Cookie';
import { PostcodeMap } from '../../components/postcode/Postcode';
import { getTimezoneAdjustedISOString } from '../../utils/Format';
import { H1Title } from '../../utils/SlideUp';

interface FormValues {
  title: string;
  date: string;
  price: number;
  totalSeat: number;
}

const NOW = getTimezoneAdjustedISOString().slice(0, 16);

const PerformanceRegister = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagesrc, setImagesrc] = useState<string>('');
  const [imgFile, setImgFile] = useState<Blob>();
  const [imgUrl, setImgUrl] = useState('');
  const [address, setAddress] = useState('');
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
    if (!getCookie('userInfo')) {
      navigate('/performances');
    }
    return () => {
      clearContent();
    };
  }, []);
  const { handleSubmit, control } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    if (!imgUrl) {
      alert('이미지를 등록해주세요.');
      return;
    }
    if (!content.replace(/<p><br><\/p>/g, '')) {
      alert('공연 설명을 입력해주세요.');
      return;
    }
    // TODO: artistIds 구현하기
    const result = {
      ...data,
      price: +data.price,
      totalSeat: +data.totalSeat,
      date: getTimezoneAdjustedISOString(data.date)
        .slice(0, 19)
        .replace('T', ' '),
      categoryId,
      content,
      place: address,
      artistIds: [getCookie('userInfo').artistId, ...artistIds],
      imageUrl: imgUrl,
    };
    let formData = new FormData();
    formData.append(
      'performanceDto',
      new Blob([JSON.stringify(result)], {
        type: 'application/json',
      }),
      'performanceDto'
    );
    postPerformance(formData)
      .then(data => {
        if (data && 'performanceId' in data) {
          clearContent();
          navigate(`performances/${data.performanceId}`);
        }
      })
      .catch(err => alert(err));
  };
  const onSubmitImg = () => {
    let formData = new FormData();
    if (imgFile) {
      formData.append('image-file', imgFile as Blob);
      postImg(formData).then((data: any) => {
        setImgUrl(data.data);
      });
    } else {
      alert('이미지를 첨부해야합니다.');
    }
  };
  return (
    <>
      <Header precious={true} />
      <S.Container>
        <S.Main>
          <S.TitleButtonFlex>
            <H1Title.H1>
              <H1Title.H1span>공연등록</H1Title.H1span>
            </H1Title.H1>
            <Button
              theme="primary"
              size="small"
              width={80}
              onClick={() => onSubmitImg()}
            >
              이미지 저장
            </Button>
          </S.TitleButtonFlex>
          <S.SummaryContainer>
            <S.FileInput
              type="file"
              name="image"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                if (files === undefined || files === null) return;
                const file = files[0];
                setImgFile(file);
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
              src={
                imagesrc ||
                'https://cdn.pixabay.com/photo/2016/11/29/06/17/audience-1867754_640.jpg'
              }
              alt="공연 이미지"
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
                render={({ field, fieldState: { error } }) => {
                  return (
                    <Input
                      label={'공연명'}
                      name="title"
                      height={30}
                      width={170}
                      onChange={field.onChange}
                      value={field.value}
                      errorMessage={error?.message}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name={'price'}
                defaultValue={0}
                rules={{
                  required: '반드시 입력해야 합니다',
                  min: {
                    value: 0,
                    message: '0 이상의 숫자를 입력해주세요',
                  },
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <Input
                      label={'금액'}
                      name="price"
                      height={30}
                      width={170}
                      step={1000}
                      type="number"
                      onChange={field.onChange}
                      value={field.value}
                      errorMessage={error?.message}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name={'totalSeat'}
                defaultValue={1}
                rules={{
                  required: '반드시 입력해야 합니다',
                  min: {
                    value: 1,
                    message: '1 이상의 숫자를 입력해주세요',
                  },
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <Input
                      name="totalSeat"
                      min={1}
                      label={'총 좌석'}
                      height={30}
                      width={170}
                      type="number"
                      onChange={field.onChange}
                      value={field.value}
                      errorMessage={error?.message}
                    />
                  );
                }}
              />
            </S.Form>
          </S.SummaryContainer>
          <Controller
            control={control}
            name={'date'}
            defaultValue={NOW}
            rules={{
              required: '반드시 입력해야 합니다',
              min: {
                value: NOW,
                message: '미래의 시점을 입력해야 합니다',
              },
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <Input
                  name="date"
                  label={'날짜'}
                  height={30}
                  width={360}
                  type="datetime-local"
                  min={NOW}
                  onChange={field.onChange}
                  value={field.value}
                  step={600}
                  errorMessage={error?.message}
                />
              );
            }}
          />
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

          <PostcodeMap onChangeAddress={setAddress} />
          <S.Heading3>공연설명</S.Heading3>
          <Editor />
          {/*
          <S.TitleButtonFlex>
            <S.Heading3>아티스트 추가</S.Heading3>
            <Button theme="primary" size="small" height={30}>
              추가
            </Button>
          </S.TitleButtonFlex>
          <ArtistContainer />*/}
          <S.BottomStickyContainer>
            {/* TODO: 등록 / 수정 구분하기 - 라우팅 경로로 구분하거나 별도 props 전달 */}
            <Button
              size="large"
              theme="primary"
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            >
              공연 정보 등록
            </Button>
          </S.BottomStickyContainer>
        </S.Main>
      </S.Container>
      <Navbar />
    </>
  );
};

export default PerformanceRegister;
