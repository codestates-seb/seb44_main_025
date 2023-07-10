import SearchIcon from '../../icons/SearchIcon';
import TicketIcon from '../../icons/TicketIcon';
import S from './Header.styled';
import { useState } from 'react';
import TicketModal from '../ticket/ticket';
import NoTicketModal from '../ticket/noticket';

const HeaderLogoST = () => {
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
      <S.Header>
        <S.Nav>
          <span style={{ color: 'white' }}>로고들어갈자리</span>
          <S.Div>
            <S.SearchS>
              <SearchIcon />
            </S.SearchS>
            <S.TicketS onClick={handleModalOpen}>
              <TicketIcon />
            </S.TicketS>
          </S.Div>
        </S.Nav>
      </S.Header>
      {/* user가 예약한 공연이 있으면 TicketModal 없으면  NoTicketModal*/}
      {isOpen && <NoTicketModal onClick={handleModalClick} />}
    </>
  );
};

export default HeaderLogoST;
