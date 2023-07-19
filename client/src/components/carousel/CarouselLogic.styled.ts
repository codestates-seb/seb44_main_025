import styled from 'styled-components';
import { DeviceQuery } from '../../utils/Media';
import { sizeChange } from '../../utils/MediaSize';

interface ContainerProps {
  translate: string;
  transform: string;
}

export const Styled_CarouselLogic = {
  Div: styled.div`
    width: 390px;
    height: 200px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    ${DeviceQuery.tablet`
      width: calc(390px * ${sizeChange.tablet});
      height: calc(200px * ${sizeChange.tablet});
    `}
  `,
  Container: styled.div<ContainerProps>`
    width: 390px;
    display: flex;
    flex-flow: row;
    transition: ${props => props.transform};
    transform: ${props => props.translate};
    ${DeviceQuery.tablet`
      width: calc(390px * ${sizeChange.tablet});
    `}
  `,
};
