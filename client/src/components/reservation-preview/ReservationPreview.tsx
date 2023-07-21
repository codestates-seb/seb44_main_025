import { styled } from 'styled-components';
import ReservationTicket from '../modal/ReservationTicket';
import { useState } from 'react';
import { PerformanceType } from '../../model/Performance';

// interface Reservationlist {
//   nickname: string;
//   reviewTitle: string;
//   artistId?: number;
//   content: string;
//   createdAt: string;
//   memberId?: number;
// }

export default function ReservationPreview(reservation: PerformanceType) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <S.ReservationWrapper onClick={() => setIsOpen(true)}>
        <S.ReservationImage src={reservation.imageUrl} />
        <S.ReservationDetail>
          <S.ReservationTitle>{reservation.title}</S.ReservationTitle>
          <S.ReservationBottom>
            <S.Content>{reservation.place}-</S.Content>
            <S.ReservationCreated>{reservation.date}</S.ReservationCreated>
          </S.ReservationBottom>
        </S.ReservationDetail>
      </S.ReservationWrapper>
      {isOpen && (
        <ReservationTicket
          reservation={reservation}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

const S = {
  ReservationWrapper: styled.div`
    width: 360px;
    height: 90px;
    background-color: var(--font-mid-color);
    border-radius: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 15px;
    margin-bottom: 10px;
  `,
  ReservationImage: styled.img`
    width: 64px;
    height: 64px;
    object-fit: cover;
    margin-left: 15px;
    border-radius: 100px;
  `,
  ReservationDetail: styled.div`
    margin-left: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    & pre {
      max-width: 310px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  `,
  ReservationTitle: styled.header`
    font-size: var(--heading6-font-size);
    font-weight: var(--heading6-font-weight);
    line-height: var(--heading6-line-height);
    color: var(--font-white-color);
    /* color: var(--font-light-white-color); */
    /* color: var(--font-white-color); */
  `,
  Reservationcontent: styled.p`
    width: 310px;
    font-size: var(--p-small-regular-font-size);
    font-weight: var(--p-small-regular-font-weight);
    line-height: var(--p-small-regular-line-height);
    color: var(--font-light-white-color);
    white-space: nowrap; //줄바꿈 방지
    overflow: hidden; //넘치는 텍스트 숨기기
    text-overflow: ellipsis; //말줄임 기호(...)넣기
  `,
  ReservationBottom: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
  Content: styled.p`
    font-size: var(--p-small-regular-font-size);
    font-weight: var(--p-small-regular-font-weight);
    line-height: var(--p-small-regular-line-height);
    color: var(--font-light-white-color);
    /* color: var(--font-white-color); */
  `,
  ReservationCreated: styled.p`
    font-size: var(--p-small-regular-font-size);
    font-weight: var(--p-small-regular-font-weight);
    line-height: var(--p-small-regular-line-height);
    color: var(--font-light-white-color);
    /* color: var(--font-white-color); */
  `,
};
