import { styled } from 'styled-components';

interface Reviewlist {
  nickname: string;
  title: string;
  artistId?: number;
  content: string;
}

export default function Review(props: Reviewlist) {
  return (
    <S.ReviewWrapper>
      <S.ReviewDetail>
        <S.UserNickname>{props.nickname}</S.UserNickname>
        <S.Reviewcontent>{props.title}</S.Reviewcontent>
        <S.Reviewcontent>{props.content}</S.Reviewcontent>
      </S.ReviewDetail>
    </S.ReviewWrapper>
  );
}

const S = {
  ReviewWrapper: styled.div`
    width: 360px;
    height: 60px;
    background-color: var(--font-mid-color);
    border-radius: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 15px;
    margin-bottom: 10px;
  `,
  ReviewDetail: styled.div`
    margin-left: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  `,
  UserNickname: styled.header`
    font-size: var(--nav-font-size);
    font-weight: var(--nav-font-weight);
    line-height: var(--nav-line-height);
    color: var(--font-white-color);
  `,
  Reviewcontent: styled.p`
    font-size: var(--nav-font-size);
    font-weight: var(--nav-font-weight);
    line-height: var(--nav-line-height);
    color: var(--font-light-white-color);
  `,
};
