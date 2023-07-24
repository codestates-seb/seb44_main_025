import { styled } from 'styled-components';
import { DeviceQuery } from '../../utils/Media';
import { screenScale } from '../../utils/MediaSize';
import { FontStyle } from '../../utils/Theme';

export const S = {
  Heading1: styled.h1`
    margin-top: 20px;
    margin-left: 15px;
    color: white;
    ${FontStyle.heading1};
  `,
  TitleButtonFlex: styled.div`
    margin-top: 20px;
    width: 360px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > h1 {
      margin-left: 0;
    }
    & > svg {
      stroke: white;
      cursor: pointer;
    }
    ${DeviceQuery.tablet`
    width: calc(360px * ${screenScale.tablet});
    margin-top: calc(20px * ${screenScale.tablet});
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
    min-height: calc(100vh - 120px);
    background-color: var(--theme-background-color);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    ${DeviceQuery.tablet`
    width: calc(390px * ${screenScale.tablet});
    min-height: calc(100vh - calc(120px * ${screenScale.tablet}));
 `}
  `,
  CategoryContainer: styled.div`
    margin-top: 8px;
    display: flex;
    min-width: 360px;
    justify-content: space-between;
    align-items: center;
    & > button {
      min-width: 40px;
      padding: 0px 5px;
      width: fit-content;
    }
    ${DeviceQuery.tablet`
    margin-top: calc(8px * ${screenScale.tablet});
    min-width: calc(360px * ${screenScale.tablet});
    & > button {
      min-width: calc(40px * ${screenScale.tablet});
      padding: 0px calc(5px * ${screenScale.tablet});
    }
 `}
  `,
  ButtonContainer: styled.div`
    margin-left: 4px;
  `,
  PerformanceContainer: styled.div`
    width: 360px;
    & div {
      margin: 8px 0px;
    }
    ${DeviceQuery.tablet`
    width: calc(360px * ${screenScale.tablet});
    & div {
      margin: calc(8px * ${screenScale.tablet}) 0px;
    }
 `}
  `,
  Heading3: styled.h3`
    ${FontStyle.heading3};
    color: white;
    cursor: pointer;
    transition: 0.3s;
    &:not(:first-child, :last-child):nth-child(2n) {
      padding-bottom: 5px;
      cursor: auto;
    }
  `,
  Tab: styled.div`
    height: 24px;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: 0.3s;
    & h3:nth-of-type(2n + 1) {
      &:hover {
        text-shadow: 1px 1px 2px var(--button-primary-border-color),
          0 0 0.5em var(--button-primary-border-color), 0 0 0.2em white;
        transition: 0.3s;
      }
    }
  `,
};
