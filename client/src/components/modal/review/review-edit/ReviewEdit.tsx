import S from './ReviewEdit.style';
import { Button } from '../../../buttons/Buttons';
import { Input } from '../../../inputs/Inputs';
import { Editor } from '../../../inputs/editor/Editor';
import { useEditorStore } from '../../../inputs/editor/EditorStore';
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
        } else {
          alert('후기 수정에 실패하였습니다.');
        }
        return;
      });
    }
  };
  const handleSubmitAll = () => {
    if (!content) return;
    handleSubmit(onSubmit)();
  };
  return (
    <>
      <ArrowIcon
        onClick={() => {
          setIsEditing(false);
        }}
      />
      {/* <H1Title.H1>
          <H1Title.H1span>후기</H1Title.H1span>
        </H1Title.H1> */}
      {/* <S.Poster src={performance?.imageUrl} /> 
        <S.Summary>
          <p>공연명</p>
          <p>{performance?.title || '공연 제목'}</p>
          <p>날짜</p>
          <p>
            {performance?.date
              ? getDateTime(performance.date)
              : '날짜 불러오기 실패'}
          </p>
            </S.Summary> */}
      <S.Heading3>제목</S.Heading3>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={'reviewTitle'}
          defaultValue={defaultTitle || review.reviewTitle}
          rules={{
            required: '반드시 입력해야 합니다',
          }}
          render={({ field }) => {
            return (
              <Input
                height={30}
                width={285}
                onChange={field.onChange}
                value={field.value}
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
