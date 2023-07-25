import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';

export default {
  Main: styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #1e1e1e;
  `,
  Section: styled.section`
    width: 390px;
    min-height: calc(100vh - 120px);
    background-color: var(--theme-background-color);
  `,
  Title: styled.header`
    ${FontStyle.heading1};
    color: var(--font-white-color);
    width: 390px;
    padding: 20px 15px 10px 15px;
  `,
  ButtonWarppar: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    margin-bottom: 10px;
  `,
  ProfileWarppar: styled.div``,
  LogoImg: styled.img`
    width: 390px;
    height: 150px;
    padding: 0px 15px;
  `,
  ArtistImg: styled.img`
    position: relative;
    z-index: 1;
    width: 100px;
    height: 100px;
    margin-top: -60px;
    margin-left: 15px;
    border: 3px solid transparent;
    display: flex;
    align-self: flex-start;
    border-radius: 50px;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(
        to top right,
        var(--image-border-bottom-color),
        var(--image-border-top-color)
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
  `,
  ArtistDetail: styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 15px 0px 15px;
  `,
  ArtistName: styled.p`
    ${FontStyle.heading6};
    color: var(--font-white-color);
  `,
  ArtistSns: styled.a`
    ${FontStyle.smallMedium};
    color: var(--font-white-color);
  `,
  ArtistContent: styled.p`
    ${FontStyle.smallMedium};
    color: var(--font-white-color);
  `,
  ArtistEdit: styled.div`
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    margin-right: 15px;
    margin-bottom: 20px;
    margin-top: -40px;
    align-items: center;
  `,
  ArtistIntrodution: styled.div`
    margin-top: 20px;
  `,
  ArtistIntrodutionContainer: styled.div`
    width: 360px;
    height: 50px;
    margin: 0px 15px 0px 15px;
  `,
  SubTitle: styled.header`
    ${FontStyle.heading5};
    color: var(--font-white-color);
    padding: 10px 15px 10px 15px;
  `,
  ArtistHistoryContainerWrappar: styled.div`
    display: flex;
    /* flex-flow: row; */
  `,
  EmptyContainer: styled.div``,
  EmptyWrapper: styled.div`
    width: 360px;
    height: 100px;
    background-color: var(--font-mid-color);
    border-radius: 30px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 15px;
  `,
  EmptyTitle: styled.header`
    ${FontStyle.smallRegular};
    color: var(--font-highlight-color);
    padding: 0px 15px 10px 15px;
  `,
  MyreviewContainer: styled.div``,
  ReviewWrapper: styled.div`
    display: flex;
    flex-direction: column;
    /* height: 100px; */
  `,
};
