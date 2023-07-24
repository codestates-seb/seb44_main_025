import S from './ReviewRegister.style';
import { Button } from '../../../components/buttons/Buttons';
import { Input } from '../../../components/inputs/Inputs';
import { Editor } from '../../../components/inputs/editor/Editor';
import { useEditorStore } from '../../../components/inputs/editor/EditorStore';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { postReview } from '../../../api/fetchAPI';
import { PerformanceType } from '../../../model/Performance';
import { ReactComponent as ArrowIcon } from '../../../icons/icon_right.svg';

interface FormValues {
  reviewTitle: string;
  date: string;
  price: string;
  totalSeat: string;
  artists: string[] | number[];
}

const ReviewRegister = ({
  performance,
  defaultTitle = '',
  closeModal,
}: {
  performance: PerformanceType;
  defaultTitle?: string;
  closeModal: (value?: any) => void;
}) => {
  const { content } = useEditorStore();
  const { handleSubmit, control } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    if (performance.performanceId) {
      const body = {
        ...data,
        content,
        performanceId: performance.performanceId,
      };
      postReview(performance.performanceId, body).then(data => {
        if (data) {
          alert('후기가 등록되었습니다.');
          closeModal();
        } else {
          alert('후기 등록에 실패하였습니다.');
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
    <S.ModalOverlay onClick={closeModal}>
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
            defaultValue={defaultTitle}
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
        <Editor video={false} />
        {/* TODO: 등록 / 수정 구분하기 - 라우팅 경로로 구분하거나 별도 props 전달 */}
        {/* TODO: 등록 후 정상적으로 응답을 수신했을 때 clearContent 호출하기 */}
        <S.ButtonContainer>
          <Button
            theme="primary"
            size="small"
            onClick={() => {
              handleSubmitAll();
              // navigate('/performances/1');
              // TODO: 등록 완료 후 받은 응답에 따라 내용 렌더링 - 작성 내용은 삭제
              // clearContent();
            }}
            style={{ marginLeft: 'auto' }}
          >
            후기 등록
          </Button>
        </S.ButtonContainer>
      </S.Modal>
    </S.ModalOverlay>
  );
};

export default ReviewRegister;
