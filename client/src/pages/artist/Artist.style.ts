import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';
import { DeviceQuery } from '../../utils/Media';
import { screenScale } from '../../utils/MediaSize';

export default {
  Main: styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #1e1e1e;
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
    ${FontStyle.heading1};
    color: var(--font-white-color);
    width: 390px;
    padding: 20px 15px 10px 15px;
    ${DeviceQuery.tablet`
      width: calc(390px * ${screenScale.tablet});
      padding: calc(20px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet}) calc(10px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet});
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
  ProfileWarppar: styled.div``,
  LogoImg: styled.img`
    width: 360px;
    height: 150px;
    margin: 0px 15px;
    margin-bottom: -50px;
    ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
      height: calc(150px * ${screenScale.tablet});
      margin: calc(0px 15px * ${screenScale.tablet});
      margin-bottom: calc(-50px * ${screenScale.tablet});
   `}
  `,
  ArtistImg: styled.img`
    position: relative;
    z-index: 1;
    width: 100px;
    height: 100px;
    /* margin-top: -50px; */
    /* margin-left: 150px; */
    margin: 0 auto;
    border: 3px solid transparent;
    display: flex;
    align-self: flex-start;
    border-radius: 50px;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(
        to top right,
        var(--image-border-bottom-color),
        var(--image-border-top-color)
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
    ${DeviceQuery.tablet`
      width: calc(100px * ${screenScale.tablet});
      height: calc(100px * ${screenScale.tablet});
   `}
  `,
  ArtistDetail: styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin: 0px 15px 0px 15px;
    ${DeviceQuery.tablet`
      margin: calc(0px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet}) calc(0px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet});
   `}
  `,
  ArtistName: styled.p`
    ${FontStyle.heading6};
    color: var(--font-white-color);
  `,
  ArtistSns: styled.a`
    ${FontStyle.smallMedium};
    color: var(--font-white-color);
  `,
  ArtistContent: styled.p`
    ${FontStyle.smallMedium};
    color: var(--font-white-color);
  `,
  ArtistEdit: styled.div`
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    margin-right: 15px;
    margin-bottom: 20px;
    margin-top: -40px;
    align-items: center;
    ${DeviceQuery.tablet`
      margin-right: calc(15px * ${screenScale.tablet});
      margin-bottom: calc(20px * ${screenScale.tablet});
      margin-top: calc(-40px * ${screenScale.tablet});
   `}
  `,
  ArtistIntrodution: styled.div`
    margin-top: 20px;
    ${DeviceQuery.tablet`
      margin-top: calc(20px * ${screenScale.tablet});
   `}
  `,
  ArtistIntrodutionContainer: styled.div`
    width: 360px;
    height: 50px;
    margin: 0px 15px 0px 15px;
    ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
      height: calc(50px * ${screenScale.tablet});
      margin: calc(0px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet}) calc(0px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet});
   `}
  `,
  SubTitle: styled.header`
    ${FontStyle.heading5};
    color: var(--font-white-color);
    padding: 10px 15px 10px 15px;
    ${DeviceQuery.tablet`
      padding: calc(10px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet}) calc(10px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet});
   `}
  `,
  ArtistHistoryContainerWrappar: styled.div`
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
      margin-bottom: calc(10px * ${screenScale.tablet});
      margin-left: calc(15px * ${screenScale.tablet});
   `}
  `,
  EmptyTitle: styled.header`
    ${FontStyle.smallRegular};
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
    /* height: 100px; */
  `,
};
