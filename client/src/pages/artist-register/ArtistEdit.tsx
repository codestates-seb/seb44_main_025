import S from './ArtistRegister.style';
import { styled } from 'styled-components';
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
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { patchArtist, postArtistImg } from '../../api/fetchAPI';
import axios from 'axios';
import { artistnameRegExp } from '../../utils/RegExp';
import { ErrorMessage } from '@hookform/error-message';
import { getCookie } from '../../utils/Cookie';
import { FontStyle } from '../../utils/Theme';

interface IForm {
  nickname: string;
}

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

export default function Artistedit() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const handleClickCategory = (id: number) => {
    if (categoryId === id) setCategoryId(null);
    else setCategoryId(id);
  };
  const profileImgInputRef = useRef<HTMLInputElement>(null);
  const [artistImagesrc, setArtistImagesrc] = useState<string>(Img);
  // const [videofilesrc, setVideofilesrc] = useState<string>(Img);
  const [artistImgFile, setArtistImgFile] = useState<Blob>();
  // const [videoFile, setVideoFile] = useState<Blob>();

  /** 중복확인버튼 클릭 여부 */
  let [nicknameDupl, setNicknameDupl] = useState(false);
  /** 중복확인 클릭하지 않고 submit 했을 때
   * @ture :중복확인 X
   * @false :중복확인 O
   */
  let [nicknameDuplBtnCnt, setNicknameDuplBtnCnt] = useState(0);
  let [noNicknameDuplBtnClickedSubmit, setNoNicknameDuplBtnClickedSubmit] =
    useState(true);
  let [submitClicked, setSubmitClicked] = useState(false);
  const navigate = useNavigate();
  const userInfo = getCookie('userInfo');

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<IForm>({
    criteriaMode: 'all',
  });
  const input_nickname = useRef<string | null>(null);
  input_nickname.current = watch('nickname');

  const [getUrl, setGetUrl] = useState();
  const [getArtistName, setGetArtistName] = useState();

  const { handleSubmit, control } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    let formData = new FormData();
    // formData.append('image-file', videoFile as Blob, 'image');
    // formData.append('image-file', artistImgFile as Blob, 'image');
    Object.assign(data, {
      imageUrl: getUrl,
      categoryId,
      artistName: getArtistName,
    });
    formData.append(
      'artistpostDto',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      }),
      'artistpostDto'
    );
    patchArtist(data);
  };

  /** 닉네임 중복검사하는 ajax 함수 */
  const useGetDuplicateArtistname = (artistNameData: string | null) => {
    axios
      .post(
        'https://103f-121-187-22-182.ngrok-free.app/artist/duplicate/artistName',
        { artistName: artistNameData }
      )
      .then(response => {
        if (response.status === 200) {
          if (response.data === false) {
            setNicknameDupl(false);
            setNicknameDuplBtnCnt(nicknameDuplBtnCnt + 1);
            setNoNicknameDuplBtnClickedSubmit(false);
          } else if (response.data === true) {
            setNicknameDupl(true);
            setNicknameDuplBtnCnt(0);
            setNoNicknameDuplBtnClickedSubmit(false);
          }
        }
      })
      .catch(err => {
        alert(`error: ${err.response.data.fieldErrors[0].reason}`);
      });
  };
  // false상태일때 중복확인을 해주세요 라고 뜸
  // false일때 등록 돼야함 근데 지금 true 인데 등록이 돼네?
  const handleSubmitAll = () => {
    setSubmitClicked(true);
    // console.log(nicknameDupl);
    if (!noNicknameDuplBtnClickedSubmit) {
      if (!nicknameDupl) {
        handleSubmit(onSubmit)();
      } else {
        if (nicknameDupl) {
          if (nicknameDuplBtnCnt > 0) {
            setNoNicknameDuplBtnClickedSubmit(true);
          }
        }
      }
    } else {
      alert('빈칸없이 입력해야합니다.');
    }
    // navigate(`/mypage/${userInfo.memberId}`);
  };

  const onSubmitImg = () => {
    let formData = new FormData();
    if (artistImgFile) {
      formData.append('image-file', artistImgFile as Blob, 'image');
      postArtistImg(formData).then((data: any) => {
        setGetUrl(data.data);
      });
    } else {
      alert('이미지를 첨부해야합니다.');
    }
  };

  return (
    <>
      <Header precious={true} />
      <S.Main>
        <S.Section>
          <S.Title>아티스트 수정하기</S.Title>
          <S.LogoImg src={Img}></S.LogoImg>
          <S.FileInput
            type="file"
            accept="image/*"
            ref={profileImgInputRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const files = e.target.files;
              if (files === undefined || files === null) return;
              const file = files[0];
              console.log(file);
              setArtistImgFile(file);
              if (file) {
                const reader = new FileReader();
                reader.onload = e => {
                  if (!e.target?.result || e.target?.result === null) return;
                  setArtistImagesrc(e.target?.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <S.ArtistImg
            src={artistImagesrc}
            onClick={() => profileImgInputRef.current?.click()}
          ></S.ArtistImg>
          <ImageButton>
            <ButtonPrimary75px onClick={() => onSubmitImg()}>
              이미지 저장
            </ButtonPrimary75px>
          </ImageButton>
          <S.ArtistDetail>
            <S.SubTitle>아티스트 정보</S.SubTitle>

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
            <form onSubmit={handleSubmit(handleSubmitAll)}>
              <S.InputContainer>
                <S.InputLabel>아티스트</S.InputLabel>
                {/* <Controller
                control={control}
                name={'artistName'}
                defaultValue={''}
                rules={{
                  required: '반드시 입력해야 합니다',
                  pattern: {
                    value: artistnameRegExp,
                    message:
                      '아티스트이름은 한영 또는 숫자를 띄어쓰기 없이 사용해야 합니다',
                  },
                  minLength: {
                    value: 1,
                    message: '닉네임은 1자 이상 16자 이하여야 합니다',
                  },
                  maxLength: {
                    value: 16,
                    message: '닉네임은 1자 이상 16자 이하여야 합니다',
                  },
                }}
                render={({ field }) => {
                  return (
                    <>
                      <Input
                        value={field.value}
                        suffix={true}
                        width={285}
                        height={30}
                        onChange={field.onChange}
                      />
                      <button
                        onClick={() =>
                          useGetDuplicateArtistname(input_nickname.current)
                        }
                        // onChange={() => {
                        //   setNoNicknameDuplBtnClickedSubmit(true),
                        // }}
                      >
                        중복확인
                      </button>
                    </>
                  );
                }}
              />
              <ErrorMessage
                errors={errors}
                name="nickname"
                render={({ messages }) => {
                  console.log('messages', messages);
                  return (
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  );
                }}
              /> */}
                <div>
                  <O.Input
                    width={285}
                    {...register('nickname', {
                      // required:
                      //   '닉네임은 한글 또는 영문을 띄어쓰기 없이 사용해야 합니다',
                      // pattern: {
                      //   value: artistnameRegExp,
                      //   message:
                      //     '닉네임은 한글 또는 영문을 띄어쓰기 없이 사용해야 합니다',
                      // },
                      // minLength: {
                      //   value: 2,
                      //   message: '닉네임은 2자 이상 12자 이하여야 합니다',
                      // },
                      // maxLength: {
                      //   value: 12,
                      //   message: '닉네임은 2자 이상 12자 이하여야 합니다',
                      // },
                      onChange: e => {
                        setNoNicknameDuplBtnClickedSubmit(true),
                          setGetArtistName(e.target.value);
                      },
                    })}
                  />
                  <O.ButtonSpan
                    onClick={() =>
                      useGetDuplicateArtistname(input_nickname.current)
                    }
                  >
                    중복확인
                  </O.ButtonSpan>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="nickname"
                  render={({ messages }) => {
                    return (
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                      ))
                    );
                  }}
                />
                {noNicknameDuplBtnClickedSubmit ? (
                  submitClicked === true ? (
                    <O.DuplicateMeg>중복확인을 해주세요</O.DuplicateMeg>
                  ) : null
                ) : nicknameDupl ? (
                  <O.DuplicateMeg>같은 닉네임이 이미 존재합니다</O.DuplicateMeg>
                ) : nicknameDuplBtnCnt > 0 ? (
                  <O.DuplicateMeg
                    style={{ color: 'var(--input-border-color)' }}
                  >
                    사용 가능한 닉네임입니다
                  </O.DuplicateMeg>
                ) : null}
              </S.InputContainer>
            </form>
            <S.InputContainer>
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
            </S.InputContainer>
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
          <S.ButtonWarppar>
            <ButtonPrimary75px onClick={() => handleSubmitAll()}>
              등록
            </ButtonPrimary75px>
          </S.ButtonWarppar>
        </S.Section>
      </S.Main>
    </>
  );
}

const ImageButton = styled(S.ButtonWarppar)`
  margin-top: -30px;
`;

const O = {
  Input: styled.input`
    border-radius: 100px;
    outline: none;
    width: 285px;
    height: 30px;
    padding-left: 15px;
    &:focus {
      border: 1.5px solid #8520ca;
    }
  `,
  ButtonSpan: styled.span`
    cursor: pointer;
    color: var(--font-primary--color);
    margin-left: 10px;
  `,
  DuplicateMeg: styled.p`
    margin-left: 15px;
    ${FontStyle.nav};
    color: var(--font-highlight-color);
  `,
};
