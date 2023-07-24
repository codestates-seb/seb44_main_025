import { PerformanceType } from '../../model/Performance';
import S from './Ticket.style';
import { getDateTime } from '../../utils/Format';
import { Button } from '../buttons/Buttons';
import { deleteReservation } from '../../api/fetchAPI';

interface Props {
  reservationId: number;
  reservation: PerformanceType;
  seatValue: number;
  onClick: React.MouseEventHandler<HTMLElement>;
}

export default function ReservationTicket({
  reservationId,
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
            {/* <Button
              theme="theme"
              size="small"
              onClick={() => {
                deleteReservation(reservationId).then(data =>
                  console.log(data)
                );
              }}
            >
              삭제
            </Button> */}
          </S.TicketDetail>
        </S.TicketModal>
      </S.ModalOverlay>
    </>
  );
}
