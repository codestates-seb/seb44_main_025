import { styled } from 'styled-components';
import { DeviceQuery } from '../../utils/Media';
import { sizeChange } from '../../utils/MediaSize';

export const Styled_Home = {
  Main: styled.main`
    display: flex;
    justify-content: center;
  `,
  Container: styled.div`
    min-height: calc(100vh - 120px);
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    gap: 30px;
    align-items: center;
    width: 390px;
    background-color: var(--theme-background-color);

    ${DeviceQuery.tablet`
      min-height: calc(100vh - (120px * ${sizeChange.tablet}));
      width: calc(390px * ${sizeChange.tablet});
      gap: calc(30px * ${sizeChange.tablet});
      padding-top: calc(20px * ${sizeChange.tablet});
      padding-bottom: calc(20px * ${sizeChange.tablet});
    `}
  `,
  MiddlePart: styled.div`
    width: 390px;
    height: 200px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;

    ${DeviceQuery.tablet`
       width: calc(390px * ${sizeChange.tablet});
       height: calc(200px * ${sizeChange.tablet});
    `}
  `,
  AllBtnsDiv: styled.div`
    display: flex;
    flex-flow: row;
    width: 359px;
    justify-content: space-between;
    & > div {
      display: flex;
      flex-flow: column;
      gap: 20px;
    }
    ${DeviceQuery.tablet`
      width: calc(359px * ${sizeChange.tablet});
    `}
  `,
};
