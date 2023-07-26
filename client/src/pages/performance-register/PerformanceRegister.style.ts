import { styled } from 'styled-components';
import { DeviceQuery } from '../../utils/Media';
import { screenScale } from '../../utils/MediaSize';
import { FontStyle } from '../../utils/Theme';

export default {
  Heading1: styled.h1`
    margin-left: 15px;
    margin-right: auto;
    color: white;
    font-size: var(--heading1-font-size);
    font-weight: var(--heading1-font-weight);
    line-height: var(--heading1-line-height);
    ${DeviceQuery.tablet`
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
      margin-bottom: calc(8px * ${screenScale.tablet});
      margin-left: calc(15px * ${screenScale.tablet});
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
    min-height: calc(100vh - 110px);
    background-color: var(--theme-background-color);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 70px;
    ${DeviceQuery.tablet`
      width: calc(390px * ${screenScale.tablet});
      padding-bottom: calc(70px * ${screenScale.tablet});
      min-height: calc(100vh - (110px * ${screenScale.tablet}));
   `}
  `,
  CategoryContainer: styled.div`
    margin-top: 20px;
    display: flex;
    min-width: 360px;
    justify-content: space-between;
    & > button:not(:first-child) {
      margin-left: 13px;
      ${DeviceQuery.tablet`
        margin-left: calc(13px * ${screenScale.tablet});
      `}
    }
    ${DeviceQuery.tablet`
      margin-top: calc(20px * ${screenScale.tablet});
      min-width: calc(360px * ${screenScale.tablet});
   `}
  `,
  SummaryContainer: styled.div`
    margin-top: 12px;
    margin-bottom: 8px;
    width: 360px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${DeviceQuery.tablet`
      margin-top: calc(12px * ${screenScale.tablet});
      margin-bottom: calc(8px * ${screenScale.tablet});
      width: calc(360px * ${screenScale.tablet});
   `}
  `,
  FileInput: styled.input`
    display: none;
  `,
  PosterDiv: styled.div`
    width: 170px;
    height: 210px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: var(--font-mid-color);
    filter: drop-shadow(0 0 3px var(--button-primary-border-color));
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.7);
    ${FontStyle.smallMedium};
    color: white;
    ${DeviceQuery.tablet`
    width: calc(170px * ${screenScale.tablet});
    height: calc(210px * ${screenScale.tablet});
    ${FontStyle.heading3};
 `}
  `,
  Poster: styled.img`
    width: 170px;
    height: 210px;
    border-radius: 30px;
    cursor: pointer;
    background-color: transparent;
    object-fit: cover;
    &[src=''] {
      background-color: gray;
    }
    ${DeviceQuery.tablet`
      width: calc(170px * ${screenScale.tablet});
      height: calc(210px * ${screenScale.tablet});
   `}
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
    ${DeviceQuery.tablet`
      width: calc(170px * ${screenScale.tablet});
      height: calc(210px * ${screenScale.tablet});
      padding-bottom: calc(8px * ${screenScale.tablet});
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
  TextareaContainer: styled.textarea`
    width: 360px;
    min-height: 150px;
    font-size: var(--p-small-medium-font-size);
    font-weight: var(--p-small-medium-font-weight);
    line-height: var(--p-small-medium-line-height);
    outline: none;
    resize: vertical;
    padding: 1px;
    ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
      min-height: calc(150px * ${screenScale.tablet});
   `}
  `,
  TitleButtonFlex: styled.div`
    margin-top: 20px;
    width: 360px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
      margin-top: calc(20px * ${screenScale.tablet});
   `}
    & > h3 {
      margin-left: 0;
    }
  `,
  Map: styled.div`
    width: 360px;
    height: 200px;
    background-color: gray;
    ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
      height: calc(200px * ${screenScale.tablet});
   `}
  `,
  Image: styled.div`
    width: 360px;
    height: 210px;
    background-color: gray;
    margin-bottom: 20px;
    ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
      height: calc(210px * ${screenScale.tablet});
      margin-bottom: calc(20px * ${screenScale.tablet});
   `}
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
    ${DeviceQuery.tablet`
      width: calc(390px * ${screenScale.tablet});
      bottom: calc(70px * ${screenScale.tablet});
   `}
  `,
};
