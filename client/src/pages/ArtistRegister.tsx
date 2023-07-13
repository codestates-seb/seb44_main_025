import { styled } from 'styled-components';
import HeaderOnlyP from '../components/header/HeaderOnlyP';
import {
  ButtonPrimary75px,
  ButtonMiniToggleSelect,
  ButtonMiniToggleUnselect,
} from '../components/buttons/Buttons';
import { Input, InputWithButton } from '../components/inputs/Inputs';
import { useState, useRef } from 'react';
import Img from '.././images/우리사랑이대로.jpeg';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface bodyType {
  [x: string]: any;
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
  const [Artist, setArtist] = useState('');
  const [Snslink, setSnslink] = useState('');
  const [Introduction, setIntroduction] = useState('');
  const [Video, setVideo] = useState('');

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const handleClickCategory = (id: number) => {
    if (categoryId === id) setCategoryId(null);
    else setCategoryId(id);
  };

  const profileImgInputRef = useRef<HTMLInputElement>(null);
  const backImgInputRef = useRef<HTMLInputElement>(null);
  const [backImagesrc, setBeckImagesrc] = useState<string>(Img);
  const [profileImagesrc, setProfileImagesrc] = useState<string>(Img);
  const [backImgFile, setBackImgFile] = useState<Blob>();
  const [profileImgFile, setProfileImgFile] = useState<Blob>();

  const body = {
    artistname: Artist,
    snslink: Snslink,
    content: Introduction,
    categoryId: categoryId,
    backImagesrc: backImgFile,
    profileImagesrc: profileImgFile,
  };
  // json.server사용할때 id값이 꼭 있어야 함
  const handleSubmit = async (body: bodyType) => {
    const data = await axios
      .post('http://localhost:5001/artist', JSON.stringify(body), {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(data => {
        return data;
      })
      .catch(err => console.error(err));

    return data;
  };

  return (
    <>
      <HeaderOnlyP />
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
              console.log(file);
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
              <Link to={'artist'}>
                <ButtonPrimary75px onClick={() => handleSubmit(body)}>
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
              <InputWithButton
                // value={Artist}
                icon={true}
                width={285}
                height={30}
                buttonText={'중복확인'}
                setValue={setArtist}
              ></InputWithButton>
            </S.InputContainer>
            <S.InputContainer>
              <S.InputLabel>SNS Link</S.InputLabel>
              <Input height={30} setValue={setSnslink}></Input>
            </S.InputContainer>
            <S.InputContainer>
              <S.ArtistIntrodution>
                <S.InputLabel>아티스트 소개</S.InputLabel>
                {/* 스타일드 컴포넌트는 value값을 받을 때 onChange로 받기 */}
                <S.ArtistIntrodutionTextarea
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setIntroduction(e.target.value)
                  }
                />
              </S.ArtistIntrodution>
            </S.InputContainer>
            <S.InputContainer>
              <S.InputLabel>동영상 첨부</S.InputLabel>
              <InputWithButton
                value={Video}
                icon={true}
                width={285}
                height={30}
                buttonText={'찾아보기'}
              ></InputWithButton>
            </S.InputContainer>
          </S.ArtistDetail>
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
    min-height: calc(100vh - 50px);
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
  ButtonWarppar: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    margin-bottom: 10px;
    margin-top: -40px;
  `,
  ProfileImg: styled.img`
    position: relative;
    margin-left: 15px;
    width: 360px;
    height: 150px;
    background-image: linear-gradient(#fff, #fff);
    cursor: pointer;
    object-fit: fill;
    &[src] {
      background-color: transparent;
    }
  `,
  FileInput: styled.input`
    display: none;
  `,
  UserImg: styled.img`
    position: relative;
    width: 100px;
    height: 100px;
    margin-top: -60px;
    margin-left: 145px;
    border: 3px solid transparent;
    display: flex;
    justify-content: center;
    border-radius: 50px;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(
        to top right,
        var(--image-border-bottom-color),
        var(--image-border-top-color)
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
    z-index: 1;
    cursor: pointer;
    object-fit: scale-down;
    &[src] {
      background-color: transparent;
    }
  `,
  CategoryContainer: styled.div`
    margin: 20px 0px 20px 0px;
    display: flex;
    min-width: 360px;
    justify-content: center;
    & > button:not(:first-child) {
      margin-left: 15px;
    }
  `,
  ArtistDetail: styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
  `,
  SubTitle: styled.header`
    font-size: var(--heading5-font-size);
    font-weight: var(--heading5-font-weight);
    line-height: var(--heading5-line-height);
    color: var(--font-white-color);
    padding: 10px 15px 10px 15px;
  `,
  InputContainer: styled.div`
    margin-left: 15px;
    margin-bottom: 5px;
  `,
  InputLabel: styled.div`
    font-size: var(--p-large-medium-font-size);
    font-weight: var(--p-large-medium-font-weight);
    line-height: var(--p-large-medium-line-height);
    color: var(--font-white-color);
    margin-bottom: 5px;
    margin-left: 20px;
  `,
  ArtistIntrodution: styled.div`
    margin-top: 20px;
  `,
  ArtistIntrodutionTextarea: styled.textarea`
    width: 360px;
    height: 100px;
    resize: none;
    border-radius: 15px;
    padding: 10px;
  `,
};
