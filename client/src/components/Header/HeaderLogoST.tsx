import SearchIcon from "../../icons/SearchIcon";
import TicketIcon from "../../icons/TicketIcon";
import S from "./Header.styled";
import { useState } from "react";
import TicketModal from "../modal/ticket";
import NoTicketModal from "../modal/noticket";

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
          <span style={{ color: "white" }}>로고들어갈자리</span>
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
      {isOpen && (
        <TicketModal onModalClose={handleModalClick} visible={isOpen}>
          <S.Ticketcontent>YD choe</S.Ticketcontent>
          <S.Ticketcontent>신촌역 2번 출구</S.Ticketcontent>
          <S.Ticketcontent>2023.08.03</S.Ticketcontent>
          <S.Ticketcontent>₩10,000</S.Ticketcontent>
        </TicketModal>
      )}
    </>
  );
};

export default HeaderLogoST;
