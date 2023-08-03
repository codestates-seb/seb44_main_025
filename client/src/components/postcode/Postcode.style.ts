import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';
import { DeviceQuery } from '../../utils/Media';
import { screenScale } from '../../utils/MediaSize';

export const MapContainer = styled.div`
  width: 360px;
  margin-top: 20px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${DeviceQuery.tablet`
  width: calc(360px * ${screenScale.tablet});
  margin-top: calc(20px * ${screenScale.tablet});
  margin-bottom: calc(8px * ${screenScale.tablet});
`}
`;

export const TitleButtonFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > button {
    padding: 0px;
  }
`;
export const Heading3 = styled.h3`
  margin-right: auto;
  color: white;
  ${FontStyle.heading3};
`;
export const Paragraph = styled.p`
  margin-right: auto;
  ${FontStyle.largeMedium}
`;
export const MapDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 360px;
  height: 200px;
  z-index: 0;
  background-color: var(--font-mid-color);
  filter: drop-shadow(0 0 0px var(--button-primary-border-color));
  color: white;
  ${FontStyle.smallMedium};
  ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
      height: calc(200px * ${screenScale.tablet});
  `}
  ${FontStyle.heading3};
`;
