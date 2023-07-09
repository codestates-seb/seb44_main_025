import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

interface OwnProps {
  infoText: string;
  pagelink: string;
  linkedText: string;
}

const S = {
  Div: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
  `,
  Span: styled.span`
    color: var(--font-white-color);
  `,
  ButtonSpan: styled.span`
    cursor: pointer;
    color: var(--font-primary--color);
  `,
};

const PageMovement = ({ infoText, pagelink, linkedText }: OwnProps) => {
  return (
    <S.Div>
      <S.Span>{infoText}</S.Span>
      <Link to={pagelink} style={{ textDecorationLine: 'none' }}>
        <S.ButtonSpan>{linkedText}</S.ButtonSpan>
      </Link>
    </S.Div>
  );
};

export default PageMovement;
