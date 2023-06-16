import { useState } from 'react';
import '../../App.css';
import "react-quill/dist/quill.snow.css";
import { useNavigate } from 'react-router-dom';
import Container from '../../Components/Container';
import TextEditor from './TextEditor';
import LoaderComponent from '../../Components/Loader';
import { Question } from '../../App';
import Header from '../../Components/Header';
import { sendReq } from '../../sendReq';
import testQuestions from '../../testQuestions';

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
  return (
    <>
      <Header innerText='Edit Script' page={2} />
      {
        isLoading ? (
          <Container>
            <div style={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <LoaderComponent />
            </div>
          </Container>
        ) : (
          <TextEditor
            onSubmit={onSubmit}
          />
        )
      }
    </>
  )
}

export default Editor
