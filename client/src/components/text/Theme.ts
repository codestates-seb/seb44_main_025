import { css, styled } from 'styled-components';

export const FontStyle = {
  heading1: css`
    font-size: var(--heading1-font-size);
    font-weight: var(--heading1-font-weight);
    line-height: var(--heading1-line-height);
  `,
  heading3: css`
    font-size: var(--heading3-font-size);
    font-weight: var(--heading3-font-weight);
    line-height: var(--heading3-line-height);
  `,
  heading5: css`
    font-size: var(--heading5-font-size);
    font-weight: var(--heading5-font-weight);
    line-height: var(--heading5-line-height);
  `,
  heading6: css`
    font-size: var(--heading6-font-size);
    font-weight: var(--heading6-font-weight);
    line-height: var(--heading6-line-height);
  `,
  largeRegular: css`
    font-size: var(--p-large-regular-font-size);
    font-weight: var(--p-large-regular-font-weight);
    line-height: var(--p-large-regular-line-height);
  `,
  largeMedium: css`
    font-size: var(--p-large-medium-font-size);
    font-weight: var(--p-large-medium-font-weight);
    line-height: var(--p-large-medium-line-height);
  `,
  smallRegular: css`
    font-size: var(--p-small-regular-font-size);
    font-weight: var(--p-small-regular-font-weight);
    line-height: var(--p-small-regular-line-height);
  `,
  smallMedium: css`
    font-size: var(--p-small-medium-font-size);
    font-weight: var(--p-small-medium-font-weight);
    line-height: var(--p-small-medium-line-height);
  `,
  nav: css`
    font-size: var(nav-font-size);
    font-weight: var(nav-font-weight);
    line-height: var(nav-line-height);
  `,
};

styled.div<{ type: 'nav' }>`
  ${({ type }) => FontStyle[type]};
`;
