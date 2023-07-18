import { createGlobalStyle } from 'styled-components';

export const EditorGlobalStyle = createGlobalStyle`
  .quill {
    background-color: white;
    border: none;
    width: 360px;
    min-height: 200px;
  }
  .ql-editor {
    min-height: 145px;
    color: black;
  }
  iframe {
    width: 100%;
  }
`;

export const ViewerGlobalStyle = createGlobalStyle`
  pre {
    min-width: 360px;
    max-width: 360px;
    color: white;
    font-family: inherit;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 8px;
  }

  pre img {
    max-width: 360px;
  }
`;
