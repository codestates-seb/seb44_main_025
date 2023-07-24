import { styled } from 'styled-components';
import ReservationTicket from '../modal/ReservationTicket';
import { useState } from 'react';
import { getDateTime } from '../../utils/Format';
import { useGetPerformance } from '../../api/useFetch';
import { ButtonWithArrow } from '../buttons/Buttons';
import { useNavigate } from 'react-router-dom';
import { ReservationType } from '../../model/Reservation';

// interface Reservationlist {
//   nickname: string;
//   reviewTitle: string;
//   artistId?: number;
//   content: string;
//   createdAt: string;
//   memberId?: number;
// }

export default function ReservationPreview(data: ReservationType) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const reservation = useGetPerformance(data.performanceId);
  return (
    <>
      <S.ReservationWrapper onClick={() => setIsOpen(true)}>
        <S.ReservationImage src={reservation?.imageUrl} />
        <S.ReservationDetail>
          <S.ReservationTitle>{reservation?.title}</S.ReservationTitle>
          <S.ReservationBottom>
            <S.Content>{reservation?.place}</S.Content>
            <S.DateButtonContainer>
              <S.ReservationCreated>
                {getDateTime(reservation?.date as string).slice(0, 12)}
              </S.ReservationCreated>
              <ButtonWithArrow
                theme="theme"
                text="공연정보"
                onClick={() => navigate(`/performances/${data.performanceId}`)}
              />
            </S.DateButtonContainer>
          </S.ReservationBottom>
        </S.ReservationDetail>
      </S.ReservationWrapper>
      {isOpen && reservation && (
        <ReservationTicket
          reservation={reservation}
          seatValue={data.seatValue}
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
    cursor: pointer;
    &:hover:not(:has(button:hover)) {
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
        0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
        0 16px 16px rgba(0, 0, 0, 0.12);
    }
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
    width: 230px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    & :is(h6, p) {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  `,
  ReservationTitle: styled.h6`
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
    flex-direction: column;
    justify-content: flex-end;
  `,
  DateButtonContainer: styled.div`
    display: flex;
    justify-content: space-between;
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
