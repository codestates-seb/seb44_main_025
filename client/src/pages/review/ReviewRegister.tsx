import S from './ReviewRegister.style';
import Header from '../../components/header/Header';
import { ButtonPrimary335px } from '../../components/buttons/Buttons';
import Navbar from '../../components/nav/Navbar';
import { Input } from '../../components/inputs/Inputs';
import { Editor } from '../../components/inputs/editor/Editor';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditorStore } from '../../components/inputs/editor/EditorStore';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { postReview } from '../../api/fetchAPI';
import { useEffect } from 'react';
import { getCookie } from '../../utils/Cookie';

interface FormValues {
  title: string;
  date: string;
  price: string;
  totalSeat: string;
  artists: string[] | number[];
}

const ReviewRegister = () => {
  const navigate = useNavigate();
  const { performanceId } = useParams();
  const { handleSubmit, control } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    if (performanceId) {
      const body = { ...data, content, performanceId: +performanceId };
      // testPostReview(body);
      postReview(body);
      clearContent();
      navigate(`/performances/${performanceId}`);
    }
  };
  const content = useEditorStore(state => state.content);
  const clearContent = useEditorStore(state => state.clearContent);
  const handleSubmitAll = () => {
    if (!content) return;
    handleSubmit(onSubmit)();
  };
  useEffect(() => {
    return () => clearContent();
  }, []);
  const isLoggedIn = getCookie('accessToken');
  return (
    <>
      <Header precious={true} />
      <S.Container>
        <S.Main>
          <S.Heading1>후기등록</S.Heading1>
          <S.SummaryContainer>
            <S.Poster src={''} />
            <S.Summary>
              <p>공연명</p>
              <p>공연명</p>
              <p>날짜</p>
              <p>날짜</p>
            </S.Summary>
          </S.SummaryContainer>
          <S.Heading3>제목</S.Heading3>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name={'title'}
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
            <ButtonPrimary335px
              onClick={() => {
                handleSubmitAll();
                // navigate('/performances/1');
                // TODO: 등록 완료 후 받은 응답에 따라 내용 렌더링 - 작성 내용은 삭제
                // clearContent();
              }}
            >
              후기 등록 / 수정
            </ButtonPrimary335px>
          </S.BottomStickyContainer>
        </S.Main>
      </S.Container>
      <Navbar />
    </>
  );
};

export default ReviewRegister;
