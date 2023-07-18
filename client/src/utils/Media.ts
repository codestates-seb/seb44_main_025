import { css } from 'styled-components';

export interface DeviceProps {
  [key: string]: number;
}

/** 반응형 분기점
 * 모바일 ~480px
 * 테블릿 ~820px
 * 노트북 ~1023px
 * 데스크탑 1024px~
 */
export const DeviceSize: DeviceProps = {
  tablet: 820,
  laptop: 1023,
  desktop: 1024,
};

export const DeviceQuery = Object.keys(DeviceSize).reduce((acc, label) => {
  acc[label] = (literals: TemplateStringsArray, ...placeholders: any[]) =>
    css`
      @media only screen and (min-width: ${DeviceSize[label]}px) {
        ${css(literals, ...placeholders)};
      }
    `;
  return acc;
}, {} as Record<keyof typeof DeviceSize, any>);
