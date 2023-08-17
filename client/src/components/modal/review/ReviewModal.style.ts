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
    width: calc(300px * ${screenScale.tablet});
    height: calc(500px * ${screenScale.tablet});
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
    }
    & .quill {
      max-width: 285px;
      ${DeviceQuery.tablet`
        max-width: calc(285px * ${screenScale.tablet});
    `};
      & * {
        color: white;
      }
      & .ql-editor {
        padding: 10px;
      }
    }
  `,
};
