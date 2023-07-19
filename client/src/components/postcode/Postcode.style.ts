import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';

export const TitleButtonFlex = styled.div`
  width: 360px;
  margin-top: 20px;
  margin-bottom: 8px;
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
  margin-left: 15px;
  ${FontStyle.largeMedium}
`;
export const MapDiv = styled.div`
  width: 360px;
  height: 200px;
  z-index: 0;
  margin-top: 8px;
`;
