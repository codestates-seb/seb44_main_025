import S from './ArtistRegister.style';
import LogoImg from '../.././images/이투플아티스트슬로건.png';
import { styled } from 'styled-components';
import Header from '../../components/header/Header';
import { ButtonPrimary75px, Button } from '../../components/buttons/Buttons';
import { Input } from '../../components/inputs/Inputs';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { usePatchArtist, usePostArtistImg } from '../../api/fetchAPI';
import axios from 'axios';
import { artistnameRegExp } from '../../utils/RegExp';
import { getCookie } from '../../utils/Cookie';
import { FontStyle } from '../../utils/Theme';
import { H1Title } from '../../theme/common/SlideUp';
import { useGetArtist } from '../../api/useFetch';
import { categoryObj } from '../../utils/Category';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

interface FormValues {
  artistName: string;
  snsLink: string;
  content: string;
  imageUrl: string;
}

export default function Artistedit() {
  const navigate = useNavigate();
  const userInfo = getCookie('userInfo');
  const { artistId } = useParams();
  const artistData = useGetArtist(artistId);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const handleClickCategory = (id: number) => {
    if (categoryId === id) setCategoryId(null);
    else setCategoryId(id);
  };

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
    if (artistData?.imageUrl) {
      setValue('imageUrl', artistData?.imageUrl);
      setGetUrl(artistData.imageUrl);
    }
  }, [artistData, setValue]);

  /** 아티스트 정보가 없을때 */
  useEffect(() => {
    if (artistId && getCookie('userInfo')?.artistId !== +artistId) {
      navigate('/');
      alert('접근 권한이 없습니다.');
      return;
    }
  }, []);

  /** 이미지의 상태 관리 */
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
    usePatchArtist(getCookie('userInfo')?.artistId, data);
    navigate(`/artist/${userInfo.artistId}`);
    location.reload();
  };

  const handleSubmitAll = () => {
    handleSubmit(onSubmit)();
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

  const onSubmitImg = (file: Blob) => {
    let formData = new FormData();
    formData.append('image-file', file);
    usePostArtistImg(formData).then((data: any) => {
      if (data) {
        setGetUrl(data.data);
      } else {
        alert('이미지 등록에 실패하였습니다.');
      }
    });
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
          <Controller
            control={control}
            name="imageUrl"
            render={({ field }) => (
              <>
                {/* 파일을 첨부하는 인풋 */}
                <S.FileInput
                  type="file"
                  name="image"
                  accept="image/*"
                  ref={artistImgInputRef}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (files === undefined || files === null) return;
                    const file = files[0];
                    if (file) onSubmitImg(file);
                  }}
                />
                <S.ArtistImg
                  // 현재 들어있는 이미지 값이 있고 초기값이 없다면 현재 이미지를 보여주고 이미지 등록이 되어 기본값이 생기면 기본값을 보여주기
                  src={getUrl || field.value || artistImagesrc}
                  onClick={() => artistImgInputRef.current?.click()}
                ></S.ArtistImg>
              </>
            )}
          />
          <S.ArtistDetail>
            <S.SubTitle>아티스트 정보</S.SubTitle>
            <S.CategoryContainer>
              {Object.keys(categoryObj).map((key, idx) => {
                return (
                  <Button
                    key={idx}
                    theme={idx + 1 === categoryId ? 'highlight' : 'theme'}
                    value={idx + 1}
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
                rules={{
                  required: '반드시 입력해야 합니다',
                }}
                render={({ field }) => {
                  return (
                    <Input
                      type="url"
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
