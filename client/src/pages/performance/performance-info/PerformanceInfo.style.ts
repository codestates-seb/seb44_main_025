import { styled } from 'styled-components';
import { DeviceQuery } from '../../../utils/Media';
import { screenScale } from '../../../utils/MediaSize';

export const ButtonHeadingContainer = styled.div`
  width: 360px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  & button {
    margin-top: 0px;
    &:first-of-type {
      margin-left: auto;
      margin-right: 8px;
    }
  }
  ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
      margin-top: calc(20px * ${screenScale.tablet});
  `}
`;
export const Heading1 = styled.h1`
  margin-right: auto;
  color: white;
  font-size: var(--heading1-font-size);
  font-weight: var(--heading1-font-weight);
  line-height: var(--heading1-line-height);
`;
export const Heading3 = styled.h3`
  margin-top: 20px;
  margin-bottom: 8px;
  margin-right: auto;
  margin-left: 15px;
  color: white;
  font-size: var(--heading3-font-size);
  font-weight: var(--heading3-font-weight);
  line-height: var(--heading3-line-height);
  ${DeviceQuery.tablet`
      margin-bottom: calc(8px * ${screenScale.tablet});
      margin-top: calc(20px * ${screenScale.tablet});
      margin-left: calc(15px * ${screenScale.tablet});
  `}
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e1e1e;
`;
export const CategoryContainer = styled.div`
  margin-top: 20px;
  display: flex;
  min-width: 360px;
  justify-content: space-between;
  ${DeviceQuery.tablet`
      margin-top: calc(20px * ${screenScale.tablet});
      min-width: calc(360px * ${screenScale.tablet});
  `}
`;
export const SummaryContainer = styled.div`
  margin-top: 12px;
  width: 360px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${DeviceQuery.tablet`
       width: calc(360px * ${screenScale.tablet});
       margin-top: calc(12px * ${screenScale.tablet});
    `}
`;
export const Poster = styled.img`
  width: 170px;
  height: 210px;
  background-color: transparent;
  object-fit: cover;
  &[src=''] {
    background-color: gray;
  }
  ${DeviceQuery.tablet`
       width: calc(170px * ${screenScale.tablet});
       height: calc(210px * ${screenScale.tablet});
    `}
`;
// align-items: flex-start 왼쪽 정렬, flex-end 오른쪽 정렬
export const Summary = styled.div`
  width: 170px;
  height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  & p {
    color: white;
    font-size: var(--p-small-medium-font-size);
    font-weight: var(--p-small-medium-font-weight);
    line-height: var(--p-small-medium-line-height);
  }
  ${DeviceQuery.tablet`
      width: calc(170px * ${screenScale.tablet});
      height: calc(210px * ${screenScale.tablet});
  `}
`;
export const TextContainer = styled.div`
  width: 360px;
  color: white;
  font-size: var(--p-small-medium-font-size);
  font-weight: var(--p-small-medium-font-weight);
  line-height: var(--p-small-medium-line-height);
  ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
  `}
`;
export const Map = styled.div`
  width: 360px;
  height: 200px;
  background-color: gray;
  ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
      height: calc(200px * ${screenScale.tablet});
  `}
`;
export const ReviewContainer = styled.div`
  width: 360px;
  & div {
    margin: 0px 0px 8px 0px;
  }
  margin-bottom: 12px;
  ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
      margin-bottom: calc(12px * ${screenScale.tablet});
  `}
`;
export const BottomStickyContainer = styled.div`
  width: 390px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: auto;
  bottom: 70px;
  & button {
    z-index: 1;
  }
  ${DeviceQuery.tablet`
      width: calc(390px * ${screenScale.tablet});
  `}
`;
