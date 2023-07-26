import SearchIcon from '../../icons/SearchIcon';
import TicketIcon from '../../icons/TicketIcon';
import { Link, useNavigate } from 'react-router-dom';
import PreviousIcon from '../../icons/PreviousIcon';
import { Styled_Header } from './Header.styled';
// import NoTicketModal from '../modal/NoTicket';
import TicketModal from '../modal/Ticket';
import { isStyledComponent } from 'styled-components';
import { useState } from 'react';
import { ReactComponent as MainIcon } from '../../icons/EZ to play_5.svg';

interface OwnProps {
  precious?: boolean;
}

const Header = ({ precious }: OwnProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };
  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

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
              <Styled_Header.LogoDiv>
                <Link to="/">
                  <MainIcon height={60} />
                </Link>
              </Styled_Header.LogoDiv>

              <Styled_Header.Div>
                <Styled_Header.SearchS
                  onClick={() => {
                    alert('앗! 준비중인 기능입니다!');
                  }}
                >
                  <SearchIcon />
                </Styled_Header.SearchS>
                <Styled_Header.TicketS onClick={handleModalOpen}>
                  <TicketIcon />
                </Styled_Header.TicketS>
              </Styled_Header.Div>
            </>
          )}
        </Styled_Header.Nav>
      </Styled_Header.Header>
      {/* 멤버가 예약한 공연이 있으면 */}
      {isOpen && <TicketModal onClick={handleModalClick} />}
    </>
  );
};

export default Header;
