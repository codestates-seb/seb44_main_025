import S from './ReviewInfo.style';
import { EditorReadOnly } from '../../inputs/editor/Editor';
import { Review } from '../../../model/Member';
import { Button } from '../../buttons/Buttons';
import { patchReview } from '../../../api/fetchAPI';
import { getDateTime } from '../../../utils/Format';
import { ReactComponent as ArrowIcon } from '../../../icons/icon_right.svg';

interface Props {
  review: Review;
  closeModal: (value?: any) => void;
}

export default function ReviewModal({ review, closeModal }: Props) {
  return (
    <S.ModalOverlay onClick={() => closeModal()}>
      <S.Modal
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
      >
        <ArrowIcon
          onClick={() => {
            closeModal();
          }}
        />
        {/* <Button
          theme='theme'
          onClick={() =>
            patchReview(1, review?.reviewId, {
              reviewTitle: '제목수정ㅁㅁㅁㅁㅁ',
              content: '바뀌었나?',
            })
          }
        >
          후기 수정
        </Button> */}
        <S.Heading3>{review.reviewTitle}</S.Heading3>
        <S.Date>{getDateTime(review.date)}</S.Date>
        <S.Heading3>내용</S.Heading3>
        <EditorReadOnly content={review?.content || '또 보고 싶어요'} />
      </S.Modal>
    </S.ModalOverlay>
  );
}
