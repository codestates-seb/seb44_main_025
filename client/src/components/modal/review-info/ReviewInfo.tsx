import S from './ReviewInfo.style';
import { EditorReadOnly } from '../../inputs/editor/Editor';
import { Review } from '../../../model/Member';

interface Props {
  review: Review;
  onClick: React.MouseEventHandler<HTMLElement>;
}

export default function ReviewModal({ review, onClick }: Props) {
  return (
    <S.ModalOverlay onClick={onClick}>
      <S.Modal
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
      >
        <S.Heading3>제목</S.Heading3>
        <p>{review?.reviewTitle || '너무 재미있었어요'}</p>
        <S.Heading3>내용</S.Heading3>
        <EditorReadOnly content={review?.content || '또 보고 싶어요'} />
      </S.Modal>
    </S.ModalOverlay>
  );
}
