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
import "./Editor.css"

type Props = {
  scripts: string;
  setScripts: (scripts: string) => void;
  setQuestions: (questions: Question[]) => void;
}

const Editor = ({ scripts, setScripts, setQuestions }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = React.useState(0);

  const navigate = useNavigate();
  const onSubmit = async (text: string) => {
    setProgress(10);
    setIsLoading(true);
    
    let questions = [];

    try {
      questions = (await sendReq('POST', '/generate_questions', {
        prompt: text
      })).questions;
      setQuestions(questions);
      setScripts(text);
      // setIsLoading(false);
      setProgress(100);
      setTimeout(()=> navigate('/questions'), 100);

    } catch (error) {
      console.log(error);
      setIsError(true);
      setProgress(20);
      questions = testQuestions;
      setQuestions(questions);
      setScripts(text);
    }
  }

  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState(scripts);
  const modules = useMemo(
    () => ({
      toolbar: false,
    }),
    []
  );

  var fileName = "script.txt";
  var fileContent = QuillRef.current?.getEditor().getText()!;
  var myFile = new Blob([fileContent], {type: 'text/plain'});
  const link = window.URL.createObjectURL(myFile)

  React.useEffect(() => {
    if (isLoading && isError && progress < 100) {
      const timer = setTimeout(() => setProgress(progress + 1), 30);
      return () => clearTimeout(timer);
    }
    if (progress >= 100) {
      navigate('/questions');
    }
  }, [progress])


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
        {
          isLoading &&
          <div style={{ position: 'absolute', zIndex: 998, backgroundColor: 'rgba(255,255,255,0.8)',  width: '100%', height: '100%'}}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: "100%" }}>
              <div className="noto-sans-kr">문제를 생성중입니다...</div>
              <div className="loading-bar">
                <div className="current-bar" style={{width: progress + '%'}}></div>
              </div>
            </div>
          </div>
        }
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
          className="next-button noto-sans-kr button-disabled" 
          style={{width: "50%", marginRight: 24 }}
          onClick={()=>navigate('/')}
          >이전</button>
        <button
          className="next-button noto-sans-kr button-disabled"
          style={{width: "50%", marginRight: 24 }}
          onClick={()=>document.getElementById('download')?.click()}
          >스크립트 다운로드</button>
        <a id='download' href={link} download={fileName}></a>
        <button
          className={`next-button noto-sans-kr button-activated`}
          onClick={() => onSubmit(QuillRef.current?.getEditor().getText()!)}
        >문제 생성</button>
      </div>
    </Container>
  )
}

export default Editor
