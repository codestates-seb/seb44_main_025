import { styled } from "styled-components";

interface StyleDivProps {
  btnh: 140 | 60;
  backimgurl: string;
}
interface OwnProps {
  btnH: 140 | 60;
  btnImgUrl: string;
  btnText: string;
}

const MainPageButton = ({ btnH, btnImgUrl, btnText }: OwnProps) => {
  return (
    <>
      <S.Container btnh={btnH} backimgurl={btnImgUrl}>
        <S.Span>{btnText}</S.Span>
      </S.Container>
    </>
  );
};

const S = {
  Container: styled.div<StyleDivProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: ${(props) => props.btnh}px;
    border-radius: 15px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url(${(props) => props.backimgurl});
    background-size: cover;
    background-position: center;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  `,
  Span: styled.span`
    color: var(--font-white-color);
  `,
};

export default MainPageButton;
