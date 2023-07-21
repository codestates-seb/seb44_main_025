import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { useEditorStore } from './EditorStore';
import { EditorGlobalStyle, EditorReadonlyGlobalStyle } from './Editor.style';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { usePostArtistImg as postImg } from '../../../api/fetchAPI';

// 이미지 크기 조정 플러그인 관련 import
// import {Quill} from 'react-quill'
// import ImageResize from 'quill-image-resize';
// Quill.register('modules/ImageResize', ImageResize);

export const Editor = ({ defaultValue }: { defaultValue?: string }) => {
  const { content, changeContent, clearContent } = useEditorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onSubmitImg = (file: Blob) => {
    let formData = new FormData();
    formData.append('image-file', file);
    postImg(formData).then((data: any) => {
      if (data) {
        changeContent(content + `<img src=${data.data}>`);
      } else {
        alert('이미지를 불러오는 데에 실패하였습니다.');
      }
    });
  };

  const imageHandler = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);
  useEffect(() => {
    if (defaultValue) {
      changeContent(defaultValue);
    }
    return () => clearContent();
  }, []);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
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
        handlers: {
          image: imageHandler,
        },
      },
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
      <input
        style={{ display: 'none' }}
        ref={fileInputRef}
        type="file"
        name="image"
        accept="image/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          if (files === undefined || files === null) return;
          const file = files[0];
          onSubmitImg(file);
        }}
      />
      <ReactQuill
        theme="snow"
        modules={modules}
        value={content}
        onChange={changeContent}
        formats={formats}
      />
    </>
  );
};

// readOnly, 테마: bubble
export const EditorReadOnly = ({ content }: { content?: string }) => {
  return (
    <>
      <EditorReadonlyGlobalStyle />
      <ReactQuill readOnly={true} theme="bubble" value={content} />
    </>
  );
};
