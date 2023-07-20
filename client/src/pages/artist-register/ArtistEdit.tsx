import S from './ArtistRegister.style';
import { styled } from 'styled-components';
import Header from '../../components/header/Header';
import {
  ButtonPrimary75px,
  ButtonMiniToggleSelect,
  ButtonMiniToggleUnselect,
} from '../../components/buttons/Buttons';
import { Input } from '../../components/inputs/Inputs';
import { useState, useRef, useEffect } from 'react';
import LogoImg from '../.././images/우리사랑이대로.jpeg';
// import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { patchArtist, postArtistImg } from '../../api/fetchAPI';
import axios from 'axios';
import { artistnameRegExp } from '../../utils/RegExp';
import { getCookie } from '../../utils/Cookie';
import { FontStyle } from '../../utils/Theme';
import { H1Title } from '../../theme/common/SlideUp';
import { useGetArtist } from '../../api/useFetch';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

interface FormValues {
  artistName: string;
  snsLink: string;
  content: string;
  imageUrl: string;
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
  const { artistId } = useParams();
  const artistData = useGetArtist(artistId);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const handleClickCategory = (id: number) => {
    if (categoryId === id) setCategoryId(null);
    else setCategoryId(id);
  };

  const artistImgInputRef = useRef<HTMLInputElement>(null);
  const [artistImagesrc, setArtistImagesrc] = useState<string | undefined>();
  const [artistImgFile, setArtistImgFile] = useState<Blob>();
  // const [videofilesrc, setVideofilesrc] = useState<string>(Img);
  // const [videoFile, setVideoFile] = useState<Blob>();

  /** 중복확인버튼 클릭 여부 */
  let [artistNameDupl, setArtistNameDupl] = useState(false);
  /** 중복확인 클릭하지 않고 submit 했을 때
   * @ture :중복확인 X
   * @false :중복확인 O
   */
  let [artistNameDuplBtnCnt, setArtistNameDuplBtnCnt] = useState(0);
  let [noArtistNameDuplBtnClickedSubmit, setNoArtistNameDuplBtnClickedSubmit] =
    useState(true);
  let [submitClicked, setSubmitClicked] = useState(false);

  const navigate = useNavigate();
  const userInfo = getCookie('userInfo');

  const [getUrl, setGetUrl] = useState<string | undefined>();

  /** 처음 들어오는 artistData가 렌더링 동안에 undefined다보니 이후에 받아오는 값을 넣어주기 위해 useEffect를 사용했고 artistData가 변경될때마다 control name에 맞게 값을 널어줌 */
  const { handleSubmit, control, setValue } = useForm<FormValues>();
  useEffect(() => {
    if (artistData?.artistName) {
      setValue('artistName', artistData.artistName);
    }
    if (artistData?.snsLink) {
      setValue('snsLink', artistData.snsLink);
    }
    if (artistData?.content) {
      setValue('content', artistData.content);
    }
  }, [artistData, setValue]);

  useEffect(() => {
    if (artistData?.imageUrl) {
      setValue('imageUrl', artistData?.imageUrl);
    }
  }, [artistData, setValue]);

  /** 아티스트 정보를 수정 요청하는 함수 */
  // onSubmit: SubmitHandler<> = data를 하면 useForm에서 값을 가져와서 넣음
  const onSubmit: SubmitHandler<FormValues> = data => {
    let formData = new FormData();
    // formData.append('image-file', videoFile as Blob, 'image');
    Object.assign(data, {
      imageUrl: getUrl,
      categoryId,
    });
    if (!getUrl) {
      return alert('이미지를 등록해야합니다.');
    }
    if (!categoryId) {
      return alert('장르를 선택해야합니다.');
    }
    // 중복확인완료 후 입력 값이 바뀌면 등록되지 않게
    if (noArtistNameDuplBtnClickedSubmit) {
      return alert('중복확인 해야합니다.');
    }
    formData.append(
      'artistpostDto',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      }),
      'artistpostDto'
    );
    // artistId를 값으로 보내줘야해서 쿠키에 저장되어 있는 artistId를 빼서 사용
    patchArtist(getCookie('userInfo').artistId, data);
    navigate(`/artist/${userInfo.artistId}`);
  };

  /** 닉네임 중복검사하는 ajax 함수 */
  const useGetDuplicateArtistname = (artistNameData: string | null) => {
    axios
      .post(`${SERVER_HOST}/artist/duplicate/artistName`, {
        artistName: artistNameData,
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data === false) {
            setArtistNameDupl(false);
            setArtistNameDuplBtnCnt(artistNameDuplBtnCnt + 1);
            setNoArtistNameDuplBtnClickedSubmit(false);
            alert('중복확인 성공');
          } else if (response.data === true) {
            setArtistNameDupl(true);
            setArtistNameDuplBtnCnt(0);
            setNoArtistNameDuplBtnClickedSubmit(false);
          }
        }
      })
      .catch(err => {
        alert(`error: ${err?.response?.data?.fieldErrors[0]?.reason}`);
      });
  };

  const handleSubmitAll = () => {
    handleSubmit(onSubmit)();
  };

  /** 닉네임 중복검사하는 ajax 함수 */
  const handleDuplicat = () => {
    setSubmitClicked(true);
    if (!noArtistNameDuplBtnClickedSubmit) {
      if (!artistNameDupl) {
        setArtistNameDuplBtnCnt(0);
      } else {
        if (artistNameDupl) {
          if (artistNameDuplBtnCnt > 0) {
            return setNoArtistNameDuplBtnClickedSubmit(true);
          }
        }
      }
    }
  };
  /** 이미지를 저장하는 함수 */
  const onSubmitImg = () => {
    // 현재이미지가 없다면 받아온 이미지를 저장
    if (!getUrl) {
      setGetUrl(artistData?.imageUrl);
      alert('이미지가 저장 되었습니다');
    }
    // ImgFile을 전달 받으면 빈객체로 만든 FormData에 append메서드를 사용해 키와 값을 추가
    else if (artistImgFile) {
      // FormData()는 키-값 쌍으로 데이터를 구성하며 빈객체로 만들었음
      let formData = new FormData();
      formData.append('image-file', artistImgFile as Blob);
      // 이미지를 서버에 보내는 함수에 전달 후 서버로 돌려받은 데이터를 setGetUrl에 저장
      postArtistImg(formData).then((data: any) => {
        alert('이미지가 저장 되었습니다');
        setGetUrl(data.data);
      });
    }
  };

  return (
    <>
      <Header precious={true} />
      <S.Main>
        <S.Section>
          <S.Title>
            <H1Title.H1span>아티스트 수정하기</H1Title.H1span>
          </S.Title>
          <S.LogoImg src={LogoImg}></S.LogoImg>
          {/* 파일을 첨부하는 인풋 */}

          <Controller
            control={control}
            name="imageUrl"
            render={({ field }) => (
              <>
                <S.FileInput
                  type="file"
                  accept="image/*"
                  // ref의 값을 부여해서 해당 값이 이곳으로 연결됨
                  ref={artistImgInputRef}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    // files가 undefined이거나 null이면 종료
                    if (files === undefined || files === null) return;
                    const file = files[0];
                    setArtistImgFile(file);
                    if (file) {
                      // filReader() = 파일을 읽음
                      const reader = new FileReader();
                      // .onload는 이벤트 핸들러로 파일을 읽은 후 실행되는 로직 파일의 결과가 없거나 null이면 종료
                      reader.onload = e => {
                        if (!e.target?.result || e.target?.result === null)
                          return;
                        // as string은 타입 단언으로 값을 문자열로 강제변환
                        setArtistImagesrc(e.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <S.ArtistImg
                  // 현재 들어있는 이미지 값이 있고 초기값이 없다면 현재 이미지를 보여주고 이미지 등록이 되어 기본값이 생기면 기본값을 보여주기
                  src={
                    field.value && !artistImagesrc
                      ? field.value
                      : artistImagesrc
                  }
                  onClick={() => artistImgInputRef.current?.click()}
                ></S.ArtistImg>
              </>
            )}
          />
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
            {/* useForm에서 controller를 사용하기 위해선 form버튼으로 감싸줘야하며 새로고침 기능이 추가 되는데 없애기 위해 preventDefault() 사용 */}
            <form onSubmit={e => e.preventDefault()}>
              <S.InputContainer>
                <S.InputLabel>아티스트</S.InputLabel>
                <Controller
                  control={control}
                  name={'artistName'}
                  rules={{
                    required: '반드시 입력해야 합니다',
                    pattern: {
                      value: artistnameRegExp,
                      message:
                        '아티스트명은 한,영,숫자 띄어쓰기 없이 사용해야 합니다',
                    },
                    minLength: {
                      value: 1,
                      message: '닉네임은 1자 이상 16자 이하여야 합니다',
                    },
                    maxLength: {
                      value: 16,
                      message: '닉네임은 1자 이상 16자 이하여야 합니다',
                    },
                    // 중복확인완료 후 입력 값이 바뀌면 message띄우기
                    onChange: () => setNoArtistNameDuplBtnClickedSubmit(true),
                  }}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <Input
                        value={field.value}
                        suffix={true}
                        width={285}
                        height={30}
                        buttonText="중복확인"
                        onChange={field.onChange}
                        // 클릭시 중복확인하는 함수로 이동
                        onClick={() => {
                          handleDuplicat();
                          useGetDuplicateArtistname(field.value);
                        }}
                        errorMessage={error?.message}
                      />
                    );
                  }}
                />
                {noArtistNameDuplBtnClickedSubmit ? (
                  submitClicked === true ? (
                    <O.DuplicateMeg>중복확인을 해주세요</O.DuplicateMeg>
                  ) : null
                ) : artistNameDupl ? (
                  <O.DuplicateMeg>
                    같은 아티스트명 이미 존재합니다
                  </O.DuplicateMeg>
                ) : artistNameDuplBtnCnt > 0 ? (
                  <O.DuplicateMeg
                    style={{ color: 'var(--input-border-color)' }}
                  >
                    사용 가능한 아티스트명입니다
                  </O.DuplicateMeg>
                ) : null}
              </S.InputContainer>
            </form>
            <S.InputContainer>
              <S.InputLabel>SNS Link</S.InputLabel>
              <Controller
                control={control}
                name={'snsLink'}
                // defaultValue={artistData?.snsLink}
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
                  // defaultValue={artistData?.content}
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
