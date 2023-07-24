import { PerformanceType } from '../../model/Performance';
import S from './Ticket.style';
import { getDateTime } from '../../utils/Format';

interface Props {
  reservation: PerformanceType;
  seatValue: number;
  onClick: React.MouseEventHandler<HTMLElement>;
}

export default function ReservationTicket({
  reservation,
  seatValue,
  onClick,
}: Props) {
  return (
    <>
      <S.ModalOverlay onClick={onClick}>
        <S.TicketModal>
          <S.TicketImg src={reservation.imageUrl} />
          <S.TicketDetail>
            <S.TicketTitle>{reservation.title}</S.TicketTitle>
            <S.Ticketcontent>{reservation.artistName}</S.Ticketcontent>
            <S.Ticketcontent>{reservation.place}</S.Ticketcontent>
            <S.Ticketcontent>{getDateTime(reservation.date)}</S.Ticketcontent>
            <S.Ticketcontent>{seatValue}석</S.Ticketcontent>
          </S.TicketDetail>
        </S.TicketModal>
      </S.ModalOverlay>
    </>
  );
}
