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
    min-height: calc(100vh - 50px);
    background-color: var(--theme-background-color);
    ${DeviceQuery.tablet`
      width: calc(390px * ${screenScale.tablet});
      min-height: calc(100vh - (50px * ${screenScale.tablet}));
  `}
  `,
  Title: styled.header`
    color: var(--font-white-color);
    ${FontStyle.heading1}
    overflow: hidden;
    margin: 20px 15px 10px 15px;
  `,
  ButtonWarppar: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    margin-bottom: 10px;
<<<<<<< HEAD
    margin-top: -40px;
    ${DeviceQuery.tablet`
      margin-right: calc(15px * ${screenScale.tablet});
      margin-bottom: calc(10px * ${screenScale.tablet});
      margin-top: calc(-40px * ${screenScale.tablet});
   `}
=======
    margin-top: 40px;
>>>>>>> dev
  `,
  ProfileImg: styled.img`
    width: 390px;
    height: 150px;
    padding: 0px 15px;
    ${DeviceQuery.tablet`
      width: calc(390px * ${screenScale.tablet});
      height: calc(150px * ${screenScale.tablet});
      padding: calc(0px 15px * ${screenScale.tablet});
   `}
  `,
  UserImg: styled.img`
    position: relative;
    width: 100px;
    height: 100px;
    margin-top: -60px;
    margin-left: 145px;
    border: 3px solid transparent;
    display: flex;
    justify-content: center;
    border-radius: 50px;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(
        to top right,
        var(--image-border-bottom-color),
        var(--image-border-top-color)
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
    z-index: 1;
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
    font-size: var(--heading5-font-size);
    font-weight: var(--heading5-font-weight);
    line-height: var(--heading5-line-height);
    color: var(--font-white-color);
    padding: 10px 15px 10px 15px;
    ${DeviceQuery.tablet`
      padding: calc(10px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet}) calc(10px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet});
   `}
  `,
  InputContainer: styled.div`
    margin-left: 15px;
    margin-bottom: 5px;
    ${DeviceQuery.tablet`
      margin-left: calc(15px * ${screenScale.tablet});
      margin-bottom: calc(5px * ${screenScale.tablet});
   `}
  `,
  InputLabel: styled.div`
    font-size: var(--p-large-medium-font-size);
    font-weight: var(--p-large-medium-font-weight);
    line-height: var(--p-large-medium-line-height);
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
    margin-top: -40px;
    margin-bottom: 20px;
    ${DeviceQuery.tablet`
      margin-left: calc(15px * ${screenScale.tablet});
      margin-bottom: calc(20px * ${screenScale.tablet});
      margin-top: calc(40px * ${screenScale.tablet});
   `}
  `,
  DuplicateMeg: styled.p`
    margin-left: 15px;
    ${FontStyle.nav};
    color: var(--font-highlight-color);
    ${DeviceQuery.tablet`
      margin-left: calc(15px * ${screenScale.tablet});
   `}
  `,
};
