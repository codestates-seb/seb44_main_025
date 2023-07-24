import { styled } from 'styled-components';
import { DeviceQuery } from '../../../utils/Media';
import { screenScale } from '../../../utils/MediaSize';

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
    ${DeviceQuery.tablet`
      padding-top: calc(20px * ${screenScale.tablet});
      gap: calc(8px * ${screenScale.tablet});
      width: calc(300px * ${screenScale.tablet});
      height: calc(500px * ${screenScale.tablet});
      padding-left: calc(7.5px * ${screenScale.tablet});
   `}
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
      ${DeviceQuery.tablet`
       top: calc(10px * ${screenScale.tablet});
       left: calc(10px * ${screenScale.tablet});
      `}
    }
    & .quill {
      max-width: 285px;
      & * {
        color: black;
      }
      & .ql-editor {
        padding: 10px;
        ${DeviceQuery.tablet`
          padding: calc(10px * ${screenScale.tablet});
        `}
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
    ${DeviceQuery.tablet`
        margin-top: calc(20px * ${screenScale.tablet});
        margin-left: calc(15px * ${screenScale.tablet});
      `}
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
    ${DeviceQuery.tablet`
        margin-top: calc(20px * ${screenScale.tablet});
        margin-left: calc(15px * ${screenScale.tablet});
        margin-bottom: calc(8px * ${screenScale.tablet});
      `}
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
    ${DeviceQuery.tablet`
      width: calc(390px * ${screenScale.tablet});
      margin-bottom: calc(70px * ${screenScale.tablet});
      min-height: calc(100vh - (50px * ${screenScale.tablet}));
    `}
    & h1 {
      margin-right: auto;
      margin-left: 15px;
      margin-top: 20px;
      ${DeviceQuery.tablet`
        margin-left: calc(15px * ${screenScale.tablet});
        margin-top: calc(20px * ${screenScale.tablet});
      `}
    }
  `,
  Poster: styled.img`
    margin-top: 8px;
    width: 170px;
    height: 210px;
    background-color: gray;
    cursor: pointer;
    object-fit: scale-down;
    ${DeviceQuery.tablet`
      width: calc(170px * ${screenScale.tablet});
      margin-top: calc(8px * ${screenScale.tablet});
      height: calc(210px * ${screenScale.tablet});
    `}
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
    ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
    `}
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
    ${DeviceQuery.tablet`
      margin-right: calc(7.5px * ${screenScale.tablet});
      margin-top: calc(20px * ${screenScale.tablet});
    `}
  `,
};
