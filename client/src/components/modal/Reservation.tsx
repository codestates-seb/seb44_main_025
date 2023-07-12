import { styled } from 'styled-components';
import Img from '../.././images/우리사랑이대로.jpeg';
import { ButtonHighlight, ButtonWhite } from '../buttons/Buttons';

interface Props {
  onClick: React.MouseEventHandler<HTMLElement>;
}

export default function ReservationModal() {
  return (
    <S.ModalOverlay>
      <S.TicketModal>
        <S.TicketImg src={Img} />
        <S.TicketDetail>
          <S.TicketTitle>우리 사랑 이대로</S.TicketTitle>
          <S.Ticketcontent>YD choe</S.Ticketcontent>
          <S.Ticketcontent>신촌역 2번 출구</S.Ticketcontent>
          <S.Ticketcontent>2023.08.03</S.Ticketcontent>
          <S.Ticketcontent>₩10,000</S.Ticketcontent>
          <S.TicketMessage>예약하시겠습니까?</S.TicketMessage>
        </S.TicketDetail>
        <S.TicketButtons>
          <ButtonHighlight>취소</ButtonHighlight>
          <ButtonWhite>결제</ButtonWhite>
        </S.TicketButtons>
      </S.TicketModal>
    </S.ModalOverlay>
  );
}

const S = {
  ModalOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.5); */
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  TicketModal: styled.div`
    width: 300px;
    height: 500px;
    background-color: var(--font-mid-color);
    transform: translate(-50%, -50%);
    background-color: var(--theme-background-color);
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  `,
  TicketImg: styled.img`
    width: 150px;
    height: 200px;
  `,
  TicketDetail: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  TicketTitle: styled.header`
    font-size: var(--heading6-font-size);
    line-height: var(--heading6-line-height);
    font-weight: var(--heading6-font-weight);
    color: var(--font-white-color);
  `,
  Ticketcontent: styled.p`
    font-size: var(--p-small-medium-font-size);
    font-weight: var(--p-small-medium-font-weight);
    line-height: var(--p-small-medium-line-height);
    color: var(--font-light-white-color);
  `,
  TicketMessage: styled.p`
    margin-top: 20px;
    font-size: var(--heading6-font-size);
    line-height: var(--heading6-line-height);
    font-weight: var(--heading6-font-weight);
    color: var(--font-white-color);
  `,
  TicketButtons: styled.div`
    width: 250px;
    display: flex;
    justify-content: space-evenly;
  `,
};
