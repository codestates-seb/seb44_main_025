import SearchIcon from '../../icons/SearchIcon';
import TicketIcon from '../../icons/TicketIcon';
import { useNavigate } from 'react-router-dom';
import PreviousIcon from '../../icons/PreviousIcon';
import { Styled_Header } from './Header.styled';

interface OwnProps {
  precious?: boolean;
}

const Header = ({ precious }: OwnProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Styled_Header.Header>
        <Styled_Header.Nav>
          {precious ? (
            <Styled_Header.PreviousS
              onClick={() => {
                navigate(-1);
              }}
            >
              <PreviousIcon />
            </Styled_Header.PreviousS>
          ) : (
            <>
              <span style={{ color: 'white' }}>로고들어갈자리</span>
              <Styled_Header.Div>
                <Styled_Header.SearchS>
                  <SearchIcon />
                </Styled_Header.SearchS>
                <Styled_Header.TicketS>
                  <TicketIcon />
                </Styled_Header.TicketS>
              </Styled_Header.Div>
            </>
          )}
        </Styled_Header.Nav>
      </Styled_Header.Header>
    </>
  );
};

export default Header;
