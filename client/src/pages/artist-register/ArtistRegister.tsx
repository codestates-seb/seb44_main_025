import S from './ArtistRegister.style';
import Header from '../../components/header/Header';
import {
  ButtonPrimary75px,
  ButtonMiniToggleSelect,
  ButtonMiniToggleUnselect,
} from '../../components/buttons/Buttons';
import { Input } from '../../components/inputs/Inputs';
import { useState, useRef } from 'react';
import Img from '../.././images/우리사랑이대로.jpeg';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { postArtist } from '../../api/fetchAPI';

interface FormValues {
  artistName: string;
  snsLink: string;
  content: string;
}

const categoryObj = {
  팝: 1,
  락: 2,
  'R&B': 3,
  재즈: 4,
  밴드: 5,
  댄스: 6,
};

export default function Artistregist() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const handleClickCategory = (id: number) => {
    if (categoryId === id) setCategoryId(null);
    else setCategoryId(id);
  };
  const profileImgInputRef = useRef<HTMLInputElement>(null);
  const backImgInputRef = useRef<HTMLInputElement>(null);
  // const videoInputRef = useRef<HTMLInputElement>(null);
  const [backImagesrc, setBeckImagesrc] = useState<string>(Img);
  const [profileImagesrc, setProfileImagesrc] = useState<string>(Img);
  // const [videofilesrc, setVideofilesrc] = useState<string>(Img);
  const [profileImgFile, setProfileImgFile] = useState<Blob>();
  const [backImgFile, setBackImgFile] = useState<Blob>();
  const [videoFile, setVideoFile] = useState<Blob>();

  // const body = {
  //   artistName: Artist,
  //   // snslink: Snslink,
  //   content: Introduction,
  //   categoryId: categoryId,
  //   backImagesrc: backImgFile,
  //   // profileImagesrc: profileImgFile,
  // };

  const { handleSubmit, control } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    let formData = new FormData();
    // formData.append('image-file', backImgFile as Blob, 'image');
    // formData.append('image-file', videoFile as Blob, 'image');
    // formData.append('image-file', profileImgFile as Blob, 'image');
    Object.assign(data, {
      imageUrl: 'https://i.ytimg.com/vi/lOrU0MH0bMk/maxresdefault.jpg',
      categoryId,
    });
    formData.append(
      'artistpostDto',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      }),
      'performanceDto'
    );
    postArtist(data);
  };
  const handleSubmitAll = () => {
    if (!profileImagesrc) return;
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <Header precious={true} />
      <S.Main>
        <S.Section>
          <S.Title>아티스트 등록하기</S.Title>
          <S.FileInput
            type="file"
            accept="image/*"
            ref={backImgInputRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const files = e.target.files;
              if (files === undefined || files === null) return;
              const file = files[0];
              setBackImgFile(file);
              if (file) {
                const reader = new FileReader();
                reader.onload = e => {
                  if (!e.target?.result || e.target?.result === null) return;
                  setBeckImagesrc(e.target?.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <S.ProfileImg
            src={backImagesrc}
            onClick={() => backImgInputRef.current?.click()}
          ></S.ProfileImg>

          <S.FileInput
            type="file"
            accept="image/*"
            ref={profileImgInputRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const files = e.target.files;
              if (files === undefined || files === null) return;
              const file = files[0];
              console.log(file);
              setProfileImgFile(file);
              if (file) {
                const reader = new FileReader();
                reader.onload = e => {
                  if (!e.target?.result || e.target?.result === null) return;
                  setProfileImagesrc(e.target?.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <S.UserImg
            src={profileImagesrc}
            onClick={() => profileImgInputRef.current?.click()}
          ></S.UserImg>
          <S.ArtistDetail>
            <S.SubTitle>아티스트 정보</S.SubTitle>
            <S.ButtonWarppar>
              <Link to="artists">
                <ButtonPrimary75px onClick={() => handleSubmitAll()}>
                  등록
                </ButtonPrimary75px>
              </Link>
            </S.ButtonWarppar>
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
            <S.InputContainer>
              <S.InputLabel>아티스트</S.InputLabel>
              <Controller
                control={control}
                name={'artistName'}
                defaultValue={''}
                rules={{
                  required: '반드시 입력해야 합니다',
                }}
                render={({ field }) => {
                  return (
                    <Input
                      value={field.value}
                      suffix={true}
                      width={285}
                      height={30}
                      buttonText={'중복확인'}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </S.InputContainer>
            {/* <S.InputContainer>
              <S.InputLabel>SNS Link</S.InputLabel>
              <Controller
                control={control}
                name={'snsLink'}
                defaultValue={''}
                rules={{
                  required: '반드시 입력해야 합니다',
                }}
                render={({ field }) => {
                  return (
                    <Input
                      value={field.value}
                      height={30}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </S.InputContainer> */}
            <S.InputContainer>
              <S.ArtistIntrodution>
                <S.InputLabel>아티스트 소개</S.InputLabel>
                <Controller
                  control={control}
                  name={'content'}
                  defaultValue={''}
                  rules={{
                    required: '반드시 입력해야 합니다',
                  }}
                  render={({ field }) => {
                    return (
                      <S.ArtistIntrodutionTextarea
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
              </S.ArtistIntrodution>
            </S.InputContainer>
            {/* 아티스트 등록시 검증단계가 있을 때 동영상 첨부 추가 */}
            {/* <S.InputContainer>
              <S.InputLabel>동영상 첨부</S.InputLabel>
              <S.FileInput
                type="file"
                accept="video/*"
                ref={videoInputRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const files = e.target.files;
                  if (files === undefined || files === null) return;
                  const file = files[0];
                  console.log(file);
                  setVideoFile(file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = e => {
                      if (!e.target?.result || e.target?.result === null)
                        return;
                      setVideofilesrc(e.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <Input
                // value={}
                suffix={true}
                width={285}
                height={30}
                buttonText={'찾아보기'}
                disabled={true}
              />
            </S.InputContainer> */}
          </S.ArtistDetail>
        </S.Section>
      </S.Main>
    </>
  );
}
