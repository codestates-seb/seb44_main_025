import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';

export const Styled_ArtistHome = {
  ArtistpreviewMain: styled.div`
    width: 390px;
    height: 160px;
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
  `,
  ArtistpreviewContainer: styled.div`
    width: 360px;
    height: 115px;
    display: flex;
    justify-content: space-between;
    margin-left: 15px;
  `,
  ArtistpreviewWrapper: styled.div`
    width: 75px;
    height: 115px;
    transition: all 0.1s linear;
    &:hover {
      transform: scale(1.13);
    }
  `,
  ArtistImg: styled.img`
    width: 75px;
    height: 75px;
    transition: 0.3s;
    &:hover {
      border-radius: 50%;
    }
  `,
  ArtistDetail: styled.div`
    height: 30px;
    margin-top: 5px;
    text-align: center;
  `,
  Artistcontent: styled.p`
    ${FontStyle.smallRegular}
    color: var(--font-light-white-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};
