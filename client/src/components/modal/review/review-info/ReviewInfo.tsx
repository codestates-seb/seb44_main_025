import S from './ReviewInfo.style';
import { EditorReadOnly } from '../../../editor/Editor';
import { Review } from '../../../../model/Member';
import { Button } from '../../../buttons/Buttons';
import { deleteReview } from '../../../../api/fetchAPI';
import { getDateTime } from '../../../../utils/Format';
import { ReactComponent as ArrowIcon } from '../../../../icons/icon_right.svg';
import React from 'react';

interface Props {
  review: Review;
  closeModal: (value?: any) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  fromMyPage?: boolean;
}

export default function ReviewInfo({
  review,
  closeModal,
  setIsEditing,
  fromMyPage,
}: Props) {
  const handleDelete = () => {
    const isConfirmed = confirm('후기를 삭제하시겠습니까?');
    if (isConfirmed) {
      deleteReview(review?.reviewId).then(res => {
        if (res.status === 204) {
          alert('후기가 삭제되었습니다.');
          closeModal();
          location.reload();
        }
      });
    }
  };
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
        {fromMyPage && (
          <>
            <S.ButtonContainer>
              <Button
                theme="primary"
                size="small"
                onClick={() => setIsEditing(true)}
                // patchReview(4, review?.reviewId, {
                //   reviewTitle: '제목수정ㅁㅁㅁㅁㅁ',
                //   content: '바뀌었나?',
              >
                후기 수정
              </Button>
              <Button
                theme="highlightBorder"
                size="small"
                onClick={() => handleDelete()}
              >
                후기 삭제
              </Button>
            </S.ButtonContainer>
          </>
        )}
        <S.Heading3>{review.reviewTitle}</S.Heading3>
        <S.Date>{getDateTime(review.date)}</S.Date>
        <S.Heading3>내용</S.Heading3>
        <EditorReadOnly content={review?.content || '또 보고 싶어요'} />
      </S.Modal>
    </S.ModalOverlay>
  );
}
