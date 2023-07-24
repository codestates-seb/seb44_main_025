import { createGlobalStyle } from 'styled-components';

// TODO: 두 EditorGlobalStyle 통합하기
export const EditorGlobalStyle = createGlobalStyle`
  .quill {
    background-color: white;
    border: none;
    width: 360px;
    min-height: 200px;
    .ql-tooltip {
      position: relative;
      left: 0 !important;
      top: 0 !important;
      margin-right: auto;
      margin-bottom: auto;
      transform: translate(50px, -150px);
      z-index:0;
    }
  }
  .ql-editor {
    min-height: 145px;
    color: black;
  }
  iframe {
    width: 100%;
  }
`;

export const EditorReadonlyGlobalStyle = createGlobalStyle`
  .quill {
    background-color: transparent;
    border: none;
    width: 360px;
    .ql-tooltip {
      position: relative;
      left: 0 !important;
      top: 0 !important;
      margin-right: auto;
      margin-bottom: auto;
      transform: translate(50px, -150px);
      z-index:0;
    }
  & * {
    font-family: 'Inter', Roboto, Arial, sans-serif;
    color: white;
    padding: 0px;
  }
  }
  .ql-editor {
    color: black;
  }
  iframe {
    width: 100%;
  }
`;

export const ViewerGlobalStyle = createGlobalStyle`
  pre {
    width: clamp(310px, 20vw, 360px);
    max-width: 360px;
    color: white;
    font-family: inherit;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 8px;
  & p {
    width: clamp(310px, 80%, 360px);
  }
  & img {
    max-width: 360px;
  }
`;
