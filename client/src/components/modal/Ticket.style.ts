import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';
import { DeviceQuery } from '../../utils/Media';
import { screenScale } from '../../utils/MediaSize';

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
  TicketModal: styled.div`
    width: 300px;
    height: 500px;
    background-color: rgb(15, 15, 15);
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    ${DeviceQuery.tablet`
      width: calc(300px * ${screenScale.tablet});
      height: calc(500px * ${screenScale.tablet});
    `}
  `,
  TicketImg: styled.img`
    width: 300px;
    height: 400px;
    ${DeviceQuery.tablet`
      width: calc(300px * ${screenScale.tablet});
      height: calc(400px * ${screenScale.tablet});
    `}
  `,
  TicketDetail: styled.div`
    width: 300px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--background-highlight-color);
    ${DeviceQuery.tablet`
      width: calc(300px * ${screenScale.tablet});
      height: calc(100px * ${screenScale.tablet});
    `}
  `,
  TicketTitle: styled.header`
    ${FontStyle.heading6}
    color: var(--font-white-color);
  `,
  Ticketcontent: styled.p`
    ${FontStyle.smallMedium}
    color: var(--font-light-white-color);
  `,
  NoTicketcontainer: styled.div``,
  NoTicketcontent: styled.p`
    ${FontStyle.smallMedium}
    color: var(--font-light-white-color);
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
  `,
};
