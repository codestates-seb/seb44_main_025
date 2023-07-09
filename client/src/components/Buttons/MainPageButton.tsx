import { styled } from 'styled-components';

interface OwnProps {
  h: 140 | 60;
  backImgUrl: string;
}

const MainPageButton = () => {
  return (
    <>
      <S.Container h={140} backImgUrl="/여성사진.jpg">
        <S.Span>진행중인 공연</S.Span>
      </S.Container>
    </>
  );
};

const S = {
  Div: styled.div`
    display: flex;
    justify-content: center;
  `,
  Container: styled.div<OwnProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: ${props => props.h}px;
    border-radius: 15px;
    background-image: url(${props => props.backImgUrl});
    background-size: cover;
    background-position: center;
  `,
  Span: styled.span`
    color: white;
  `,
};

export default MainPageButton;
