import { ViewerGlobalStyle } from './Editor.style';

export const EditorViewer = ({ content }: { content: string }) => {
  return (
    <>
      <ViewerGlobalStyle />
      <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
    </>
  );
};
