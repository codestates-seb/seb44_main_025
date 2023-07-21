import { styled } from 'styled-components';
import { DeviceQuery } from '../../utils/Media';
import { screenScale } from '../../utils/MediaSize';

interface ContainerProps {
  translate: string;
  transform: string;
}

export const Styled_Slogan = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    width: 390px;
    height: 60px;
    background-size: cover;
    border: 0.5px solid grey;
    border-radius: 30px;

    overflow: hidden;

    ${DeviceQuery.tablet`
      width: calc(390px * ${screenScale.tablet});
      height: calc(60px * ${screenScale.tablet});
    `}
  `,
  ImgGroup: styled.div<ContainerProps>`
    display: flex;
    flex-flow: column;
    width: 390px;
    transform: ${props => props.translate};
    transition: ${props => props.transform};

    ${DeviceQuery.tablet`
      width: calc(390px * ${screenScale.tablet});
    `}
  `,
  Img: styled.img`
    width: 390px;
    height: 60px;
    background-color: var(--font-white-color);
    vertical-align: bottom;

    ${DeviceQuery.tablet`
      width: calc(390px * ${screenScale.tablet});
      height: calc(60px * ${screenScale.tablet});
    `}
  `,
};
