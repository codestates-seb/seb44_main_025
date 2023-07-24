import { styled } from 'styled-components';
import { DeviceQuery } from '../../../../utils/Media';
import { screenScale } from '../../../../utils/MediaSize';

export default {
  ModalOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  `,
  Modal: styled.div`
    padding-top: 20px;
    gap: 8px;
    width: 300px;
    height: 500px;
    background-color: var(--body-background-color);
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    padding-left: 7.5px;
    color: white;
    border-radius: 15px;
    filter: drop-shadow(0 0 3px var(--button-primary-border-color));
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    overflow-x: hidden;
    & > svg {
      cursor: pointer;
      position: absolute;
      top: 10px;
      left: 10px;
      stroke: white;
      transform: rotate(180deg);
    }
    & .quill {
      max-width: 285px;
      ${DeviceQuery.tablet`
      max-width: calc(285px * ${screenScale.tablet});
    `}
      & * {
        color: black;
      }
      & .ql-editor {
        padding: 10px;
      }
    }
  `,
  Heading1: styled.h1`
    margin-top: 20px;
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
    min-height: calc(100vh - 50px);
    background-color: var(--theme-background-color);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 70px;
    & h1 {
      margin-right: auto;
      margin-left: 15px;
      margin-top: 20px;
    }
  `,
  Poster: styled.img`
    margin-top: 8px;
    width: 170px;
    height: 210px;
    background-color: gray;
    cursor: pointer;
    object-fit: scale-down;
    &[src] {
      background-color: transparent;
    }
  `,
  // align-items: flex-start 왼쪽 정렬, flex-end 오른쪽 정렬
  Form: styled.form`
    width: 360px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
  ButtonContainer: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 7.5px;
    margin-top: 20px;
  `,
};
