import React, { useMemo, useRef, useState } from 'react';
import '../../App.css';

import "react-quill/dist/quill.snow.css";
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import Container from '../../Components/Container';
import { Question } from '../../App';
import Header from '../../Components/Header';
import { sendReq } from '../../sendReq';
import testQuestions from '../../testQuestions';
import defaultContents from './testDefault';
import "./Editor.css"

type Props = {
  setQuestions: (questions: Question[]) => void;
}

const Editor = ({ setQuestions }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (text: string) => {
    setIsLoading(true);
    let questions = [];
    try {
      questions = (await sendReq('POST', '/generate_questions', {
        prompt: text
      })).questions;
    } catch (error) {
      console.log(error);
      questions = testQuestions;
    }
    setQuestions(questions);
    setIsLoading(false);
    navigate('/questions');
  }

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
      <Header innerText='Edit Script' page={2} />
      {/* {
        isLoading ? (
          <></>
        ) : (
          <TextEditor
            onSubmit={onSubmit}
          />
        )
      } */}
      <div className='text-body'>
        <div style={{
          height: '100%',
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
              height: '100%',
              backgroundColor: 'white',
            }}
            placeholder="내용을 입력해주세요."
          />
        </div>
      </div>


      <div className="next-button-wrapper">
        <button
          className="next-button noto-sans-kr button-disabled" style={{width: "66.66%", marginRight: 24 }}
          >이전</button>
        <button
          className={`next-button noto-sans-kr button-activated`}
          onClick={() => onSubmit(QuillRef.current?.getEditor().getText()!)}
        >문제 생성</button>
      </div>
    </Container>
  )
}

export default Editor
