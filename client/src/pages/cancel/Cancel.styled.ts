import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';
import { DeviceQuery } from '../../utils/Media';
import { screenScale } from '../../utils/MediaSize';

export const Styled_Cancel = {
  Main: styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Section: styled.section`
    width: 390px;
    height: calc(100vh - 50px);
    background-color: var(--theme-background-color);
    ${DeviceQuery.tablet`
      width: calc(390px * ${screenScale.tablet});
      height: calc(100vh - (50px * ${screenScale.tablet}));
   `}
  `,
  Title: styled.header`
    ${FontStyle.heading1}
    color: var(--font-white-color);
    width: 390px;
    padding: 20px 15px 10px 15px;
    ${DeviceQuery.tablet`
      padding: calc(20px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet}) calc(10px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet});
   `}
  `,
  Content: styled.div`
    height: calc(100vh - 112px);
    display: flex;
    justify-content: center;
    align-items: center;
    ${DeviceQuery.tablet`
      height: calc(100vh - (112px * ${screenScale.tablet}));
   `}
  `,
  UserDetail: styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    ${DeviceQuery.tablet`
      margin-top: calc(20px * ${screenScale.tablet});
      margin-bottom: calc(20px * ${screenScale.tablet});
   `}
  `,
  SubTitle: styled.header`
    ${FontStyle.heading5}
    color: var(--font-white-color);
    display: flex;
    justify-content: center;
    /* margin-top: 100px; */
    margin-bottom: 50px;
    ${DeviceQuery.tablet`
      margin-bottom: calc(50px * ${screenScale.tablet});
   `}
  `,
  InputContainer: styled.div`
    margin-left: 15px;
    margin-bottom: 10px;
    ${DeviceQuery.tablet`
      margin-left: calc(15px * ${screenScale.tablet});
      margin-bottom: calc(10px * ${screenScale.tablet});
   `}
  `,
  InputLabel: styled.div`
    ${FontStyle.largeMedium}
    color: var(--font-white-color);
    margin-bottom: 5px;
    margin-left: 20px;
    ${DeviceQuery.tablet`
      margin-left: calc(20px * ${screenScale.tablet});
      margin-bottom: calc(5px * ${screenScale.tablet});
   `}
  `,
  HighlightButtonWarppar: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    margin-top: 100px;
    ${DeviceQuery.tablet`
      margin-right: calc(15px * ${screenScale.tablet});
      margin-top: calc(100px * ${screenScale.tablet});
   `}
  `,
  ErrorMessage: styled.p`
    margin-left: 20px;
    color: var(--font-highlight-color);
    font-size: var(--nav-font-size);
    ${DeviceQuery.tablet`
      margin-left: calc(20px * ${screenScale.tablet});
   `}
  `,
};
