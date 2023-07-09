import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

interface OwnProps {
  infoText: string;
  pagelink: string;
  linkedText: string;
  mt?: number;
}
interface PageMovementProps {
  mt?: number;
}

const S = {
  Div: styled.div<PageMovementProps>`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: ${props => props.mt}px;
  `,
  Span: styled.span`
    color: var(--font-white-color);
  `,
  ButtonSpan: styled.span`
    cursor: pointer;
    color: var(--font-primary--color);
  `,
};

const PageMovement = ({ infoText, pagelink, linkedText, mt }: OwnProps) => {
  return (
    <S.Div mt={mt}>
      <S.Span>{infoText}</S.Span>
      <Link to={pagelink} style={{ textDecorationLine: 'none' }}>
        <S.ButtonSpan>{linkedText}</S.ButtonSpan>
      </Link>
    </S.Div>
  );
};

export default PageMovement;
