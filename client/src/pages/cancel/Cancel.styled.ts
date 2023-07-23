import { styled } from 'styled-components';
import { FontStyle } from '../../utils/Theme';

export const Styled_Cancel = {
  Main: styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Section: styled.section`
    width: 390px;
    height: calc(100vh - 50px);
    background-color: var(--theme-background-color);
  `,
  Title: styled.header`
    ${FontStyle.heading1}
    color: var(--font-white-color);
    width: 390px;
    padding: 20px 15px 10px 15px;
  `,
  Content: styled.div`
    height: calc(100vh - 112px);
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  UserDetail: styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
  `,
  SubTitle: styled.header`
    ${FontStyle.heading5}
    color: var(--font-white-color);
    display: flex;
    justify-content: center;
    /* margin-top: 100px; */
    margin-bottom: 50px;
  `,
  InputContainer: styled.div`
    margin-left: 15px;
    margin-bottom: 10px;
  `,
  InputLabel: styled.div`
    ${FontStyle.largeMedium}
    color: var(--font-white-color);
    margin-bottom: 5px;
    margin-left: 20px;
  `,
  HighlightButtonWarppar: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    margin-top: 100px;
  `,
  ErrorMessage: styled.p`
    margin-left: 20px;
    color: var(--font-highlight-color);
    font-size: var(--nav-font-size);
  `,
};
