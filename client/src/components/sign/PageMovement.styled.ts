import { styled } from 'styled-components';

interface PageMovementProps {
  margintop?: number;
}

export const Styled_PageMovement = {
  Div: styled.div<PageMovementProps>`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: ${props => props.margintop}px;
  `,
  Span: styled.span`
    color: var(--font-white-color);
  `,
  ButtonSpan: styled.span`
    cursor: pointer;
    color: var(--font-primary--color);
  `,
};
