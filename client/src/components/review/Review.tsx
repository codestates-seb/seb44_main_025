import { styled } from 'styled-components';
import { EditorViewer } from '../inputs/editor/EditorViewer';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReviewInfo from '../modal/review-info/ReviewInfo';
import { getDateTime } from '../../utils/Format';

interface Reviewlist {
  nickname: string;
  reviewTitle: string;
  artistId?: number;
  content: string;
  createdAt: string;
  memberId?: number;
  performanceId?: number;
}

export default function Review(props: any) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <S.ReviewWrapper
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <S.ReviewDetail>
          <S.ReviewTitle>{props.reviewTitle}</S.ReviewTitle>
          <EditorViewer content={props.content.replace(/<img[\s\S]*?>/g, '')} />
          {/* <S.Reviewcontent>{props.content}</S.Reviewcontent>*/}
          <S.ReviewBottom>
            <S.UserNickname>{props.nickname}-</S.UserNickname>
            <S.ReviewCreated>
              {getDateTime(props.date).slice(0, 12)}
            </S.ReviewCreated>
          </S.ReviewBottom>
        </S.ReviewDetail>
      </S.ReviewWrapper>
      {isOpen && (
        <ReviewInfo review={props} closeModal={() => setIsOpen(false)} />
      )}
    </>
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
    cursor: pointer;
    &:hover {
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
        0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
        0 16px 16px rgba(0, 0, 0, 0.12);
    }
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
