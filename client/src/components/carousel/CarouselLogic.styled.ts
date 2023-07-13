import styled from 'styled-components';

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
  `,
  Container: styled.div<ContainerProps>`
    width: 390px;
    display: flex;
    flex-flow: row;
    transition: ${props => props.transform};
    transform: ${props => props.translate};
  `,
};
