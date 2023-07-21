import S from './Ticket.style';
import { Link } from 'react-router-dom';
import { useGetMemberPerformance } from '../../api/useFetch';
import { ButtonWithArrow } from '../buttons/Buttons';
import Img from '../.././images/예약한 공연이 없을때.jpeg';

interface Props {
  onClick: React.MouseEventHandler<HTMLElement>;
}

export default function TicketModal({ onClick }: Props) {
  const reservationData = useGetMemberPerformance();
  return (
    <>
      {reservationData?.length ? (
        reservationData.map(reservationData => (
          <S.ModalOverlay key={reservationData.performanceId} onClick={onClick}>
            <S.TicketModal>
              <S.TicketImg src={reservationData.imageUrl} />
              <S.TicketDetail>
                <S.TicketTitle>{reservationData.title}</S.TicketTitle>
                <S.Ticketcontent>{reservationData.artistName}</S.Ticketcontent>
                <S.Ticketcontent>{reservationData.place}</S.Ticketcontent>
                <S.Ticketcontent>{reservationData.date}</S.Ticketcontent>
                <S.Ticketcontent>{reservationData.price}</S.Ticketcontent>
              </S.TicketDetail>
            </S.TicketModal>
          </S.ModalOverlay>
        ))
      ) : (
        <S.ModalOverlay onClick={onClick}>
          <S.TicketModal>
            {/* <S.NoTicketcontainer> */}
            <S.TicketImg src={Img} />
            <S.NoTicketcontent>예약한 공연이 없어요...</S.NoTicketcontent>
            {/* </S.NoTicketcontainer> */}
            <S.TicketDetail>
              <Link to="/performances">
                <ButtonWithArrow
                  theme="white"
                  text={'공연예약'}
                  onClick={onClick}
                ></ButtonWithArrow>
              </Link>
            </S.TicketDetail>
          </S.TicketModal>
        </S.ModalOverlay>
      )}
    </>
  );
}
