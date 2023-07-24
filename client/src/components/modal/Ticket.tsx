import S from './Ticket.style';
import { Link } from 'react-router-dom';
import { useGetPerformance, useGetMemberPerformance } from '../../api/useFetch';
import { ButtonWithArrow } from '../buttons/Buttons';
import Img from '../.././images/예약한 공연이 없을때.jpeg';
import { getDateTime } from '../../utils/Format';

interface Props {
  onClick: React.MouseEventHandler<HTMLElement>;
}

export default function TicketModal({ onClick }: Props) {
  const reservation = useGetMemberPerformance();
  const performance = useGetPerformance(
    reservation?.[reservation.length - 1].performanceId
  );
  return (
    <>
      {performance ? (
        <S.ModalOverlay key={performance.performanceId} onClick={onClick}>
          <S.TicketModal>
            <S.TicketImg src={performance.imageUrl} />
            <S.TicketDetail>
              <S.TicketTitle>{performance.title}</S.TicketTitle>
              <S.Ticketcontent>{performance.artistName}</S.Ticketcontent>
              <S.Ticketcontent>{performance.place}</S.Ticketcontent>
              <S.Ticketcontent>
                {getDateTime(performance.date as string)}
              </S.Ticketcontent>
              <S.Ticketcontent>₩{performance.price}</S.Ticketcontent>
            </S.TicketDetail>
          </S.TicketModal>
        </S.ModalOverlay>
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
