import S from './ReviewRegister.style';
import Header from '../../components/header/Header';
import { Button } from '../../components/buttons/Buttons';
import Navbar from '../../components/nav/Navbar';
import { Input } from '../../components/inputs/Inputs';
import { Editor } from '../../components/inputs/editor/Editor';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditorStore } from '../../components/inputs/editor/EditorStore';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { postReview } from '../../api/fetchAPI';
import { getDateTime } from '../../utils/Format';
import { useGetPerformance } from '../../api/useFetch';
import { H1Title } from '../../theme/common/SlideUp';

interface FormValues {
  reviewTitle: string;
  date: string;
  price: string;
  totalSeat: string;
  artists: string[] | number[];
}

const ReviewRegister = () => {
  const { content } = useEditorStore();
  const navigate = useNavigate();
  const { performanceId } = useParams();
  const performance = useGetPerformance(performanceId);
  const { handleSubmit, control } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    if (performanceId) {
      const body = { ...data, content, performanceId: +performanceId };
      postReview(performanceId, body)
        .then(data => {
          if (data) {
            navigate(`/performances/${performanceId}`);
            alert('후기가 등록되었습니다.');
          }
          return;
        })
        .catch(err => console.error(err));
    }
  };
  const handleSubmitAll = () => {
    console.log(content);
    if (!content) return;
    handleSubmit(onSubmit)();
  };
  return (
    <>
      <Header precious={true} />
      <S.Container>
        <S.Main>
          <H1Title.H1>
            <H1Title.H1span>공연등록</H1Title.H1span>
          </H1Title.H1>
          {/* <S.Poster src={performance?.imageUrl} /> */}
          <S.Summary>
            <p>공연명</p>
            <p>{performance?.title || '공연 제목'}</p>
            <p>날짜</p>
            <p>
              {performance?.date
                ? getDateTime(performance.date)
                : '날짜 불러오기 실패'}
            </p>
          </S.Summary>
          <S.Heading3>제목</S.Heading3>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name={'reviewTitle'}
              defaultValue={''}
              rules={{
                required: '반드시 입력해야 합니다',
              }}
              render={({ field }) => {
                return (
                  <Input
                    height={30}
                    width={360}
                    onChange={field.onChange}
                    value={field.value}
                  />
                );
              }}
            />
          </S.Form>
          <S.Heading3>내용</S.Heading3>
          <Editor />
          <S.BottomStickyContainer>
            {/* TODO: 등록 / 수정 구분하기 - 라우팅 경로로 구분하거나 별도 props 전달 */}
            {/* TODO: 등록 후 정상적으로 응답을 수신했을 때 clearContent 호출하기 */}
            <Button
              theme="primary"
              size="large"
              onClick={() => {
                handleSubmitAll();
                // navigate('/performances/1');
                // TODO: 등록 완료 후 받은 응답에 따라 내용 렌더링 - 작성 내용은 삭제
                // clearContent();
              }}
            >
              후기 등록
            </Button>
          </S.BottomStickyContainer>
        </S.Main>
      </S.Container>
      <Navbar />
    </>
  );
};

export default ReviewRegister;
