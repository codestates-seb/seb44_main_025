import { styled } from 'styled-components';
import Img from '../.././images/우리사랑이대로.jpeg';
import { useNavigate } from 'react-router-dom';
import { ButtonWithArrow } from '../buttons/Buttons';

interface ArtistPreviewPropTypes {
  imageUrl: string;
  artistName: string;
  snsLink: string;
  artistId: number;
}
export default function ArtistPreview(props: ArtistPreviewPropTypes) {
  const navigate = useNavigate();
  return (
    <S.PreviewWrapper>
      <S.UserImg src={props.imageUrl || Img} />
      <S.PreviewDetail>
        <S.UserNickname>{props.artistName || '닉네임'}</S.UserNickname>
        <S.Previewcontent>{props.snsLink || 'snslink'}</S.Previewcontent>
        <ButtonWithArrow
          theme="theme"
          text="프로필 보기"
          onClick={() => navigate(`/artist/${props.artistId}`)}
        />
      </S.PreviewDetail>
    </S.PreviewWrapper>
  );
}

const S = {
  PreviewWrapper: styled.div`
    width: 360px;
    height: 96px;
    background-color: var(--font-mid-color);
    border-radius: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 15px;
    margin-bottom: 10px;
    cursor: pointer;
  `,
  UserImg: styled.img`
    width: 64px;
    height: 64px;
    margin: 15px;
    border: 3px solid transparent;
    border-radius: 50px;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(
        to top right,
        var(--image-border-bottom-color),
        var(--image-border-top-color)
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
  `,
  PreviewDetail: styled.div`
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  `,
  UserNickname: styled.header`
    font-size: var(--heading6-font-size);
    line-height: var(--heading6-line-height);
    font-weight: var(--heading6-font-weight);
    color: var(--font-white-color);
  `,
  Previewcontent: styled.p`
    font-size: var(--p-small-regular-font-size);
    font-weight: var(--p-small-regular-font-weight);
    line-height: var(--p-small-regular-line-height);
    color: var(--font-light-white-color);
  `,
};
