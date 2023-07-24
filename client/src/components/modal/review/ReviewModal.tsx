import { Review } from '../../../model/Member';
import S from './ReviewModal.style';
import ReviewInfo from './review-info/ReviewInfo';
import ReviewEdit from './review-edit/ReviewEdit';
import { useState } from 'react';

const ReviewModal = ({
  review,
  closeModal,
  fromMyPage = false,
}: {
  review: Review;
  defaultTitle?: string;
  closeModal: (value?: any) => void;
  fromMyPage?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <S.ModalOverlay onClick={closeModal}>
      <S.Modal
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
      >
        {isEditing ? (
          <ReviewEdit review={review} setIsEditing={setIsEditing} />
        ) : (
          <ReviewInfo
            fromMyPage={fromMyPage}
            review={review}
            setIsEditing={setIsEditing}
            closeModal={closeModal}
          />
        )}
      </S.Modal>
    </S.ModalOverlay>
  );
};

export default ReviewModal;
