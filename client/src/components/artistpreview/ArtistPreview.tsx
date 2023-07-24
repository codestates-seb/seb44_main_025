import { styled } from 'styled-components';
import Img from '../../images/기본이미지.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../icons/icon_right.svg';

interface ArtistPreviewPropTypes {
  imageUrl: string;
  artistName: string;
  snsLink: string;
  artistId: number;
  content: string;
}
export default function ArtistPreview(artist: ArtistPreviewPropTypes) {
  const navigate = useNavigate();
  return (
    <S.PreviewWrapper onClick={() => navigate(`/artist/${artist.artistId}`)}>
      <S.UserImg src={artist.imageUrl || Img} />
      <S.PreviewDetail>
        <S.UserNickname>
          {artist.artistName || '익명의 아티스트'}
        </S.UserNickname>
        <Link
          to={artist.snsLink}
          target="_blank"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          SNS링크
        </Link>
        <div>
          <S.PreviewContent>
            {artist.content || '등록된 소개가 없습니다...'}
          </S.PreviewContent>
        </div>
      </S.PreviewDetail>
      <ArrowIcon />
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
    &:hover {
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
        0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
        0 16px 16px rgba(0, 0, 0, 0.12);
    }
    &:hover:not(:has(a:hover)) {
      & svg {
        opacity: 0;
        margin-left: 40px;
        transition: 0.4s;
      }
    }
    & svg {
      stroke: white;
      transform: scale(1.5);
      transition: 0.4s;
      margin-left: 10px;
    }
    & a {
      text-decoration: none;
      align-self: start;
      color: var(--button-primary-background-color);
      text-shadow: 0 0 1em blue, 0 0 0.2em blue;
      transition: 0.3s;
      &:hover {
        text-shadow: 0 0 2em blue, 0 0 0.4em blue;
        filter: drop-shadow(0 0 2px blue);
        transition: 0.3s;
      }
    }
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
    width: clamp(200px, 55.55%, 415px);
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
  `,
  UserNickname: styled.h6`
    font-size: var(--heading6-font-size);
    line-height: var(--heading6-line-height);
    font-weight: var(--heading6-font-weight);
    color: var(--font-white-color);
  `,
  PreviewContent: styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    font-size: var(--p-small-regular-font-size);
    font-weight: var(--p-small-regular-font-weight);
    line-height: var(--p-small-regular-line-height);
    color: var(--font-light-white-color);
  `,
};
