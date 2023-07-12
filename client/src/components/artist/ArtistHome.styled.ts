import { styled } from 'styled-components';

export const Styled_ArtistHome = {
  ArtistpreviewMain: styled.div`
    width: 390px;
    height: 160px;
  `,
  Subtitle: styled.header`
    font-size: var(--p-large-medium-font-size);
    font-weight: var(--p-large-medium-font-weight);
    line-height: var(--p-large-medium-line-height);
    color: var(--font-light-white-color);
    margin-left: 15px;
  `,
  veiwAll: styled.p`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
    font-size: var(--p-small-medium-font-size);
    font-weight: var(--p-small-medium-font-weight);
    line-height: var(--p-small-medium-line-height);
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
  `,
  ArtistImg: styled.img`
    width: 75px;
    height: 75px;
  `,
  ArtistDetail: styled.div`
    height: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
    text-align: center;
  `,
  Artistcontent: styled.p`
    font-size: var(--p-small-regular-font-size);
    font-weight: var(--p-small-regular-font-weight);
    line-height: var(--p-small-regular-line-height);
    color: var(--font-light-white-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  `,
};
