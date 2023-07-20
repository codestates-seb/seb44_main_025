import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';
import { DeviceQuery } from '../../utils/Media';
import { screenScale } from '../../utils/MediaSize';

export const Styled_ArtistHome = {
  ArtistpreviewMain: styled.div`
    width: 390px;
    height: 160px;
    ${DeviceQuery.tablet`
      width: calc(390px * ${screenScale.tablet}); 
      height: calc(160px * ${screenScale.tablet}); 
    `}
  `,
  Subtitle: styled.header`
    ${FontStyle.largeMedium}
    color: var(--font-light-white-color);
    margin-left: 15px;
  `,
  veiwAll: styled.p`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
    ${FontStyle.smallMedium}
    color: var(--button-primary-background-color);
    margin-right: 15px;
    ${DeviceQuery.tablet`
      margin-bottom: calc(10px * ${screenScale.tablet}); 
    `}
  `,
  ArtistpreviewContainer: styled.div`
    width: 360px;
    height: 115px;
    display: flex;
    justify-content: space-between;
    margin-left: 15px;
    ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet}); 
      height: calc(115px * ${screenScale.tablet}); 
    `}
  `,
  ArtistpreviewWrapper: styled.div`
    width: 75px;
    height: 115px;
    transition: all 0.1s linear;
    ${DeviceQuery.tablet`
      width: calc(75px * ${screenScale.tablet}); 
      height: calc(115px * ${screenScale.tablet}); 
    `}
  `,
  ArtistImg: styled.img`
    width: 75px;
    height: 75px;
    transition: 0.3s;
    border-radius: 15px;
    &:hover {
      border-radius: 50%;
    }
    ${DeviceQuery.tablet`
      width: calc(75px * ${screenScale.tablet}); 
      height: calc(75px * ${screenScale.tablet}); 
    `}
  `,
  ArtistDetail: styled.div`
    height: 30px;
    margin-top: 5px;
    text-align: center;
    ${DeviceQuery.tablet`
      height: calc(30px * ${screenScale.tablet}); 
    `}
  `,
  Artistcontent: styled.p`
    ${FontStyle.smallRegular}
    color: var(--font-light-white-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};
