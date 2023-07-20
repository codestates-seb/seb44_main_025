import { styled } from 'styled-components';
import { EditorViewer } from '../inputs/editor/EditorViewer';

interface Reviewlist {
  nickname: string;
  reviewTitle: string;
  artistId?: number;
  content: string;
  createdAt: string;
  memberId?: number;
}

const ImageRegExp = new RegExp(/<img[\s\S]*?>/);
export default function Review(props: Reviewlist) {
  console.log(props.content.match(ImageRegExp));
  console.log(props.content.replace(ImageRegExp, ''));
  return (
    <S.ReviewWrapper>
      <S.ReviewDetail>
        <S.ReviewTitle>{props.reviewTitle}</S.ReviewTitle>
        <EditorViewer content={props.content.replace(ImageRegExp, '')} />
        {/* <S.Reviewcontent>{props.content}</S.Reviewcontent>*/}
        <S.ReviewBottom>
          <S.UserNickname>{props.nickname}-</S.UserNickname>
          <S.ReviewCreated>{props.createdAt}</S.ReviewCreated>
        </S.ReviewBottom>
      </S.ReviewDetail>
    </S.ReviewWrapper>
  );
}

const S = {
  ReviewWrapper: styled.div`
    width: 360px;
    height: 90px;
    background-color: var(--font-mid-color);
    border-radius: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 15px;
    margin-bottom: 10px;
  `,
  ReviewDetail: styled.div`
    margin-left: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    & pre {
      max-width: 310px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  `,
  ReviewTitle: styled.header`
    font-size: var(--heading6-font-size);
    font-weight: var(--heading6-font-weight);
    line-height: var(--heading6-line-height);
    color: var(--font-white-color);
    /* color: var(--font-light-white-color); */
    /* color: var(--font-white-color); */
  `,
  Reviewcontent: styled.p`
    width: 310px;
    font-size: var(--p-small-regular-font-size);
    font-weight: var(--p-small-regular-font-weight);
    line-height: var(--p-small-regular-line-height);
    color: var(--font-light-white-color);
    white-space: nowrap; //줄바꿈 방지
    overflow: hidden; //넘치는 텍스트 숨기기
    text-overflow: ellipsis; //말줄임 기호(...)넣기
  `,
  ReviewBottom: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
  UserNickname: styled.p`
    font-size: var(--p-small-regular-font-size);
    font-weight: var(--p-small-regular-font-weight);
    line-height: var(--p-small-regular-line-height);
    color: var(--font-light-white-color);
    /* color: var(--font-white-color); */
  `,
  ReviewCreated: styled.p`
    font-size: var(--p-small-regular-font-size);
    font-weight: var(--p-small-regular-font-weight);
    line-height: var(--p-small-regular-line-height);
    color: var(--font-light-white-color);
    /* color: var(--font-white-color); */
  `,
};
