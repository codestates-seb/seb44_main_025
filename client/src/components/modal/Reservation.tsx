import { styled } from 'styled-components';
import { Button } from '../buttons/Buttons';
import { postReservation } from '../../api/fetchAPI';
import { PerformanceType } from '../../model/Performance';
import { getDateTime } from '../../utils/Format';
import { useState } from 'react';
import { Input } from '../inputs/Inputs';
import { ReactComponent as ArrowIcon } from '../../icons/icon_right.svg';
import { useGetArtist } from '../../api/useFetch';

export default function ReservationModal({
  performance,
  closeModal,
}: {
  performance: PerformanceType;
  closeModal: () => void;
}) {
  const artist = useGetArtist(
    Object.values(performance.performanceArtist.performanceArtistList)[0]
  );
  const [seatValue, setSeatValue] = useState('1');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const handleSubmit = () => {
    const body = {
      performanceId: performance.performanceId,
      seatValue: seatValue,
    };
    postReservation(body).then(data => {
      if (data) {
        alert('예약이 완료되었습니다.');
        closeModal();
      }
    });
  };

  return (
    <S.ModalOverlay onClick={closeModal}>
      <S.TicketModal
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <ArrowIcon
          onClick={() => {
            if (isConfirmed) {
              setIsConfirmed(false);
            } else {
              closeModal();
            }
          }}
        />
        <S.TicketImg src={performance.imageUrl} />
        <S.TicketDetail>
          <S.TicketTitle>{performance.title}</S.TicketTitle>
          {/* TODO: 아티스트명 받아오기 */}
          <S.Ticketcontent>{artist?.artistName}</S.Ticketcontent>
          <S.Ticketcontent>{performance.place}</S.Ticketcontent>
          {/* TODO: 날짜, 숫자 형식 함수 만들기 */}
          <S.Ticketcontent>{getDateTime(performance.date)}</S.Ticketcontent>
          <S.Ticketcontent>
            ₩{performance.price?.toLocaleString()}
          </S.Ticketcontent>
          {isConfirmed && <S.Ticketcontent>{seatValue}석</S.Ticketcontent>}
        </S.TicketDetail>
        {isConfirmed ? (
          <>
            <S.TicketMessage>예약하시겠습니까?</S.TicketMessage>
            <S.TicketButtons>
              <Button theme="highlight" size="small" onClick={closeModal}>
                취소
              </Button>
              <Button theme="white" size="small" onClick={handleSubmit}>
                예약
              </Button>
            </S.TicketButtons>
          </>
        ) : (
          <>
            <S.TicketMessage>예약 인원을 선택해주세요</S.TicketMessage>
            <S.Ticketcontent>
              남은 좌석 수: {performance.leftSeat}
            </S.Ticketcontent>
            <Input
              width={75}
              height={30}
              type="number"
              min="1"
              max={performance.totalSeat}
              value={seatValue}
              setValue={setSeatValue}
            />
            <Button
              size="small"
              theme="white"
              onClick={() => setIsConfirmed(true)}
            >
              확인
            </Button>
          </>
        )}
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
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.5);
  `,
  TicketModal: styled.div`
    border-radius: 15px;
    filter: drop-shadow(0 0 3px var(--button-primary-border-color));
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
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
    justify-content: flex-start;
    flex-direction: column;
    padding-top: 20px;
    gap: 12px;
    & svg {
      cursor: pointer;
      position: absolute;
      top: 10px;
      left: 10px;
      stroke: white;
      transform: rotate(180deg);
    }
  `,
  TicketImg: styled.img`
    width: 150px;
    height: 200px;
    object-fit: cover;
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
