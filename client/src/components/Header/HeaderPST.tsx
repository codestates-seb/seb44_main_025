import { useNavigate } from 'react-router-dom';
import PreviousIcon from '../../icons/PreviousIcon';
import SearchIcon from '../../icons/SearchIcon';
import TicketIcon from '../../icons/TicketIcon';
import S from './Header.styled';

const HeaderPST = () => {
  const navigate = useNavigate();
  return (
    <S.Header>
      <S.Nav>
        <S.PreviousS
          onClick={() => {
            navigate(-1);
          }}
        >
          <PreviousIcon />
        </S.PreviousS>
        <S.Div>
          <S.SearchS>
            <SearchIcon />
          </S.SearchS>
          <S.TicketS>
            <TicketIcon />
          </S.TicketS>
        </S.Div>
      </S.Nav>
    </S.Header>
  );
};

export default HeaderPST;
