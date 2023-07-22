import { PerformanceType } from '../../model/Performance';
import S from './Ticket.style';

interface Props {
  reservation: PerformanceType;
  onClick: React.MouseEventHandler<HTMLElement>;
}

export default function ReservationTicket({ reservation, onClick }: Props) {
  return (
    <>
      <S.ModalOverlay onClick={onClick}>
        <S.TicketModal>
          <S.TicketImg src={reservation.imageUrl} />
          <S.TicketDetail>
            <S.TicketTitle>{reservation.title}</S.TicketTitle>
            <S.Ticketcontent>{reservation.artistName}</S.Ticketcontent>
            <S.Ticketcontent>{reservation.place}</S.Ticketcontent>
            <S.Ticketcontent>{reservation.date}</S.Ticketcontent>
            <S.Ticketcontent>{reservation.leftSeat}</S.Ticketcontent>
          </S.TicketDetail>
        </S.TicketModal>
      </S.ModalOverlay>
    </>
  );
}
