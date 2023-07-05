import SearchIcon from '../../icons/SearchIcon';
import TicketIcon from '../../icons/TicketIcon';
import S from './Header.styled';

const HeaderLogoST = () => {
  return (
    <S.Body>
      <S.Nav>
        <span style={{ color: 'white' }}>로고들어갈자리</span>
        <S.Div>
          <S.SearchS>
            <SearchIcon />
          </S.SearchS>
          <S.TicketS>
            <TicketIcon />
          </S.TicketS>
        </S.Div>
      </S.Nav>
    </S.Body>
  );
};

export default HeaderLogoST;
