import S from './ReviewEdit.style';
import { Button } from '../../../buttons/Buttons';
import { Input } from '../../../inputs/Inputs';
import { Editor } from '../../../editor/Editor';
import { useEditorStore } from '../../../editor/EditorStore';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { patchReview } from '../../../../api/fetchAPI';
import { ReactComponent as ArrowIcon } from '../../../../icons/icon_right.svg';
import { Review } from '../../../../model/Member';
import React from 'react';

interface FormValues {
  reviewTitle: string;
  content: string;
}

const ReviewEdit = ({
  setIsEditing,
  review,
  defaultTitle = '',
}: {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  review: Review;
  defaultTitle?: string;
}) => {
  const { content } = useEditorStore();
  const { handleSubmit, control } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    if (review?.performanceId) {
      const body = {
        ...data,
        content,
      };
      patchReview(review.performanceId, review?.reviewId, body).then(data => {
        if (data) {
          alert('후기가 수정되었습니다.');
          setIsEditing(false);
          location.reload();
        } else {
          alert('후기 수정에 실패하였습니다.');
        }
        return;
      });
    }
  };
  const handleSubmitAll = () => {
    if (!content.replace(/<p><br><\/p>/g, '')) {
      alert('내용을 입력해 주세요.');
      return;
    }
    handleSubmit(onSubmit)();
  };
  return (
    <>
      <ArrowIcon
        onClick={() => {
          setIsEditing(false);
        }}
      />
      <S.Heading3>제목</S.Heading3>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={'reviewTitle'}
          defaultValue={defaultTitle || review.reviewTitle}
          rules={{
            required: '반드시 입력해야 합니다',
            minLength: {
              value: 5,
              message: '다섯 글자 이상 입력해 주세요.',
            },
          }}
          render={({ field, fieldState: { error } }) => {
            return (
              <Input
                height={30}
                width={285}
                onChange={field.onChange}
                value={field.value}
                errorMessage={error?.message}
              />
            );
          }}
        />
      </S.Form>
      <S.Heading3>내용</S.Heading3>
      <Editor video={false} defaultValue={review.content} />
      {/* TODO: 등록 / 수정 구분하기 - 라우팅 경로로 구분하거나 별도 props 전달 */}
      {/* TODO: 등록 후 정상적으로 응답을 수신했을 때 clearContent 호출하기 */}
      <S.ButtonContainer>
        <Button
          theme="primary"
          size="small"
          onClick={() => {
            handleSubmitAll();
          }}
          style={{ marginLeft: 'auto' }}
        >
          후기 수정
        </Button>
      </S.ButtonContainer>
    </>
  );
};

export default ReviewEdit;
