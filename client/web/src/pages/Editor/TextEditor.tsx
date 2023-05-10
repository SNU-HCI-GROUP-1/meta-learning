import React, { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import StyledButton from '../../Components/Button';
import defaultContents from './testDefault';
import Container from '../../Components/Container';

type Props = {
  onSubmit: () => void;
}

const TextEditor = ({ onSubmit }: Props) => {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState(defaultContents);
  const modules = useMemo(
    () => ({
      toolbar: false,
    }),
    []
  );
  return (
    <Container>
      <div style={{
        width: '80%',
        minWidth: '300px',
        margin: 'auto',
        alignItems: 'center',
      }}>
        <br/>
        <h1 style={{
          color: 'white',
        }}>
          스크립트를 입력하거나 수정하세요.
        </h1>
        <div style={{
          width: '100%',
        }}>        
          <ReactQuill
            ref={(element) => {
              if (element !== null) {
                QuillRef.current = element;
              }
            }}
            value={contents}
            onChange={setContents}
            modules={modules}
            theme="snow"
            style={{
              height: '60vh',
              marginBottom: '5vh',
              backgroundColor: 'white',
            }}
            placeholder="내용을 입력해주세요."
          />
        </div>
        <div style={{
          float: 'right',
        }}>
          <StyledButton
            onClick={onSubmit}
          >
            문제 생성
          </StyledButton>
        </div>
      </div>
	</Container>
  )
}

export default TextEditor;
