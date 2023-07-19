import * as S from './Performance.styled';
import { useGetPerformance } from '../../api/useFetch';
import { useParams } from 'react-router-dom';
import PerformanceInfo from './performance-info/PerformanceInfo';
import Header from '../../components/header/Header';
import Navbar from '../../components/nav/Navbar';
import { useState } from 'react';
import PerformanceEdit from './performance-edit/PerformanceEdit';
import ReservationModal from '../../components/modal/Reservation';

export const Performance = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { performanceId } = useParams();
  const data = useGetPerformance(performanceId);

  return (
    <>
      <Header precious={true} />
      <S.Container>
        <S.Main>
          {data ? (
            isEditing ? (
              <PerformanceEdit performance={data} />
            ) : (
              <PerformanceInfo performance={data} setIsEditing={setIsEditing} />
            )
          ) : (
            <ReservationModal />
          )}
        </S.Main>
      </S.Container>
      <Navbar />
    </>
  );
};
