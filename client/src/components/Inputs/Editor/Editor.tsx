import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { useEditorStore } from './EditorStore';
import { EditorGlobalStyle } from './Editor.style';
import { useMemo } from 'react';

// 이미지 크기 조정 플러그인 관련 import
// import {Quill} from 'react-quill'
// import ImageResize from 'quill-image-resize';
// Quill.register('modules/ImageResize', ImageResize);

export const Editor = () => {
  const content = useEditorStore(state => state.content);
  const setContent = useEditorStore(state => state.changeContent);
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      // ImageResize: {},
    }),
    []
  );

  const formats = useMemo(
    () => [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
      'video',
    ],
    []
  );
  return (
    <>
      <EditorGlobalStyle />
      <ReactQuill
        theme="snow"
        modules={modules}
        value={content}
        onChange={setContent}
        formats={formats}
      />
    </>
  );
};

// readOnly, 테마: bubble
export const EditorReadOnly = ({ content }: { content: string }) => {
  return (
    <>
      <EditorGlobalStyle />
      <ReactQuill readOnly={true} theme="bubble" value={content} />
    </>
  );
};
