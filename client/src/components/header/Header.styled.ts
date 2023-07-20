import { styled } from 'styled-components';
import { DeviceQuery } from '../../utils/Media';
import { sizeChange } from '../../utils/MediaSize';

export const Styled_Header = {
  Header: styled.header`
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0px;
    z-index: 3;
  `,
  Nav: styled.nav`
    width: 390px;
    height: 60px;
    background-color: var(--theme-background-color);
    border-bottom: 3px solid var(--nav-color);
    padding: 0px 12px 0px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${DeviceQuery.tablet`
      width: calc(390px * ${sizeChange.tablet}); 
      height: calc(60px * ${sizeChange.tablet}); 
    `}
  `,
  LogoDiv: styled.div`
    display: flex;
    align-items: center;
  `,
  Div: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60px;
  `,
  PreviousS: styled.div`
    cursor: pointer;
  `,
  SearchS: styled.div`
    cursor: pointer;
  `,
  TicketS: styled.div`
    cursor: pointer;
  `,
};
