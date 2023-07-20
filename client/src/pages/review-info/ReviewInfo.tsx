import S from './ReviewInfo.style';
import Header from '../../components/header/Header';
import Navbar from '../../components/nav/Navbar';
import { EditorReadOnly } from '../../components/inputs/editor/Editor';
import { useParams } from 'react-router-dom';
import { useGetReview } from '../../api/useFetch';

const ReviewInfo = () => {
  const { reviewId } = useParams();
  const review = useGetReview(reviewId);
  return (
    <>
      <Header precious={true} />
      <S.Container>
        <S.Main>
          <S.Heading1>후기</S.Heading1>
          <S.Heading3>제목</S.Heading3>
          <p>{review?.reviewTitle || '너무 재미있었어요'}</p>
          <S.Heading3>내용</S.Heading3>
          <EditorReadOnly content={review?.content || '또 보고 싶어요'} />
        </S.Main>
      </S.Container>
      <Navbar />
    </>
  );
};

export default ReviewInfo;
