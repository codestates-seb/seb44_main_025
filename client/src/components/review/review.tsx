import { styled } from 'styled-components';

export default function Review() {
  return (
    <S.ReviewWrapper>
      <S.UserImg src="우리사랑이대로.jpeg" />
      <S.ReviewDetail>
        <S.UserNickname>닉네임</S.UserNickname>
        <S.Reviewcontent>content</S.Reviewcontent>
        <S.Reviewcontent>date</S.Reviewcontent>
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
  UserImg: styled.img`
    width: 50px;
    height: 50px;
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
  ReviewDetail: styled.div`
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
  Reviewcontent: styled.p`
    font-size: var(--nav-font-size);
    font-weight: var(--nav-font-weight);
    line-height: var(--nav-line-height);
    color: var(--font-light-white-color);
  `,
};
