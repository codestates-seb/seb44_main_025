import { styled } from 'styled-components';

export default {
  Main: styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Section: styled.section`
    width: 390px;
    min-height: calc(100vh - 60px);
    background-color: var(--theme-background-color);
  `,
  Title: styled.header`
    font-size: var(--heading1-font-size);
    font-weight: var(--heading1-font-weight);
    line-height: var(--heading1-line-height);
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
  LogoImg: styled.img`
    position: relative;
    margin-left: 15px;
    width: 360px;
    height: 150px;
    background-image: linear-gradient(#fff, #fff);
    object-fit: fill;
    &[src] {
      background-color: transparent;
    }
  `,
  FileInput: styled.input`
    display: none;
  `,
  ArtistImg: styled.img`
    position: relative;
    width: 100px;
    height: 100px;
    margin-top: -60px;
    margin-left: 145px;
    border: 3px solid transparent;
    display: flex;
    justify-content: center;
    border-radius: 50px;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(
        to top right,
        var(--image-border-bottom-color),
        var(--image-border-top-color)
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
    z-index: 1;
    cursor: pointer;
    object-fit: scale-down;
    &[src] {
      background-color: transparent;
    }
  `,
  CategoryContainer: styled.div`
    margin: 20px 0px 20px 0px;
    display: flex;
    min-width: 360px;
    justify-content: center;
    & > button:not(:first-child) {
      margin-left: 15px;
    }
  `,
  ArtistDetail: styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
  `,
  SubTitle: styled.header`
    font-size: var(--heading5-font-size);
    font-weight: var(--heading5-font-weight);
    line-height: var(--heading5-line-height);
    color: var(--font-white-color);
    padding: 10px 15px 10px 15px;
  `,
  InputContainer: styled.div`
    margin-left: 15px;
    margin-bottom: 5px;
  `,
  InputLabel: styled.div`
    font-size: var(--p-large-medium-font-size);
    font-weight: var(--p-large-medium-font-weight);
    line-height: var(--p-large-medium-line-height);
    color: var(--font-white-color);
    margin-bottom: 5px;
    margin-left: 20px;
  `,
  ArtistIntrodution: styled.div`
    margin-top: 20px;
  `,
  ArtistIntrodutionTextarea: styled.textarea`
    width: 360px;
    height: 100px;
    resize: none;
    border-radius: 15px;
    padding: 10px;
    outline: none;
    &:focus {
      border: 1.5px solid #8520ca;
    }
  `,
};
