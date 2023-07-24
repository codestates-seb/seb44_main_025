import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';
import { DeviceQuery } from '../../utils/Media';
import { screenScale } from '../../utils/MediaSize';

export default {
  Main: styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Section: styled.section`
    width: 390px;
    min-height: calc(100vh - 120px);
    background-color: var(--theme-background-color);
    ${DeviceQuery.tablet`
      width: calc(390px * ${screenScale.tablet});
      min-height: calc(100vh - (120px * ${screenScale.tablet}));
   `}
  `,
  Title: styled.header`
    color: var(--font-white-color);
    ${FontStyle.heading1}
    overflow: hidden;
    margin: 20px 15px 10px 15px;
    ${DeviceQuery.tablet`
      margin: calc(20px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet}) calc(10px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet});
   `}
  `,
  ButtonWarppar: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    margin-bottom: 10px;
    ${DeviceQuery.tablet`
       margin-right: calc(15px * ${screenScale.tablet});
       margin-bottom: calc(10px * ${screenScale.tablet});
   `}
  `,
  ProfileWarppar: styled.div`
    width: 360px;
    /* height: 50px; */
    display: flex;
    ${DeviceQuery.tablet`
       width: calc(360px * ${screenScale.tablet});
   `}
  `,
  UserDetail: styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 15px 10px 15px;
    ${DeviceQuery.tablet`
      margin: calc(0px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet}) calc(10px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet});
   `}
  `,
  UserNickname: styled.p`
    font-size: var(--p-large-medium-font-size);
    font-weight: var(--p-large-medium-font-weight);
    line-height: var(--p-large-medium-line-height);
    color: var(--font-white-color);
    width: 320px;
    ${DeviceQuery.tablet`
       width: calc(320px * ${screenScale.tablet});
   `}
  `,
  UserEditButtonWrappar: styled.div`
    cursor: pointer;
    margin-right: 15px;
    margin-top: 15px;
    ${DeviceQuery.tablet`
       margin-right: calc(15px * ${screenScale.tablet});
       margin-top: calc(15px * ${screenScale.tablet});
   `}
  `,
  SubTitleWrappar: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  SubTitle: styled.header`
    font-size: var(--heading5-font-size);
    font-weight: var(--heading5-font-weight);
    line-height: var(--heading5-line-height);
    color: var(--font-white-color);
    padding: 10px 15px 10px 15px;
    ${DeviceQuery.tablet`
      padding: calc(10px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet}) calc(10px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet});
   `}
  `,
  ArtistreviewContainerWrappar: styled.div`
    display: flex;
    /* flex-flow: row; */
  `,
  EmptyContainer: styled.div``,
  EmptyWrapper: styled.div`
    width: 360px;
    height: 100px;
    background-color: var(--font-mid-color);
    border-radius: 30px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 15px;
    ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
      height: calc(100px * ${screenScale.tablet});
      margin-left: calc(15px * ${screenScale.tablet});
      margin-bottom: calc(10px * ${screenScale.tablet});
   `}
  `,
  EmptyTitle: styled.header`
    font-size: var(--p-small-regular-font-size);
    line-height: var(--p-small-regular-font-weight);
    font-weight: var(--p-small-regular-line-height);
    color: var(--font-highlight-color);
    padding: 0px 15px 10px 15px;
    ${DeviceQuery.tablet`
      padding: calc(0px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet}) calc(10px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet});
   `}
  `,
  MyreviewContainer: styled.div``,
  ReviewWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
};
