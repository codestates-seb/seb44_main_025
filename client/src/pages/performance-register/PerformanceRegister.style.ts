import { styled } from 'styled-components';

export default {
  Heading1: styled.h1`
    margin-left: 15px;
    margin-right: auto;
    color: white;
    font-size: var(--heading1-font-size);
    font-weight: var(--heading1-font-weight);
    line-height: var(--heading1-line-height);
  `,
  Heading3: styled.h3`
    margin-top: 20px;
    margin-bottom: 8px;
    margin-right: auto;
    margin-left: 15px;
    color: white;
    font-size: var(--heading3-font-size);
    font-weight: var(--heading3-font-weight);
    line-height: var(--heading3-line-height);
  `,
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
  `,
  Main: styled.main`
    width: 390px;
    min-height: calc(100vh - 110px);
    background-color: var(--theme-background-color);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 70px;
  `,
  CategoryContainer: styled.div`
    margin-top: 20px;
    display: flex;
    min-width: 360px;
    justify-content: flex-start;
    & > button:not(:first-child) {
      margin-left: 13px;
    }
  `,
  SummaryContainer: styled.div`
    margin-top: 12px;
    margin-bottom: 8px;
    width: 360px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  FileInput: styled.input`
    display: none;
  `,
  Poster: styled.img`
    width: 170px;
    height: 210px;
    cursor: pointer;
    background-color: transparent;
    object-fit: cover;
    &[src=''] {
      background-color: gray;
    }
  `,
  // align-items: flex-start 왼쪽 정렬, flex-end 오른쪽 정렬
  Form: styled.form`
    padding-bottom: 8px;
    width: 170px;
    height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    & label {
      color: white;
      font-size: var(--p-small-medium-font-size);
      font-weight: var(--p-small-medium-font-weight);
      line-height: var(--p-small-medium-line-height);
    }
    & span {
      color: var(--font-highlight-color);
      font-size: var(--p-small-medium-font-size);
      font-weight: var(--p-small-medium-font-weight);
      line-height: var(--p-small-medium-line-height);
    }
  `,
  TextareaContainer: styled.textarea`
    width: 360px;
    min-height: 150px;
    font-size: var(--p-small-medium-font-size);
    font-weight: var(--p-small-medium-font-weight);
    line-height: var(--p-small-medium-line-height);
    outline: none;
    resize: vertical;
    padding: 1px;
  `,
  TitleButtonFlex: styled.div`
    margin-top: 20px;
    width: 360px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > h3 {
      margin-left: 0;
    }
  `,
  Map: styled.div`
    width: 360px;
    height: 200px;
    background-color: gray;
  `,
  Image: styled.div`
    width: 360px;
    height: 210px;
    background-color: gray;
    margin-bottom: 20px;
  `,
  BottomStickyContainer: styled.div`
    width: 390px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: auto;
    bottom: 70px;
    & button {
      z-index: 1;
    }
  `,
};
