import { Link } from 'react-router-dom';
import { Styled_PageMovement } from './PageMovement.styled';

interface OwnProps {
  infoText: string;
  pagelink: string;
  linkedText: string;
  marginTop?: number;
}

/** 로그인, 로그아웃 페이지 서로를 연결하는 하단 링크 */
const PageMovement = ({
  infoText,
  pagelink,
  linkedText,
  marginTop,
}: OwnProps) => {
  return (
    <Styled_PageMovement.Div margintop={marginTop}>
      <Styled_PageMovement.Span>{infoText}</Styled_PageMovement.Span>
      <Link to={pagelink} style={{ textDecorationLine: 'none' }}>
        <Styled_PageMovement.ButtonSpan>
          {linkedText}
        </Styled_PageMovement.ButtonSpan>
      </Link>
    </Styled_PageMovement.Div>
  );
};

export default PageMovement;
