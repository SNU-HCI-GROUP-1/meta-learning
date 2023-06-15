import React from 'react';
import StyledButton from '../../Components/Button';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import AnswerButton from './AnswerButton';
import testQuestions from './testQuestions';
import ConfirmModal from './ConfirmModal';

type Props = {
  answers: any[];
  setAnswers: (answers: any[]) => void;
}

export const QUESTION_COUNT = 10;
const ANSWER_TYPE = {
  O: 'O',
  X: 'X',
  EMPTY: null,
}
const ANSWER_TYPE_LIST = [ANSWER_TYPE.O, ANSWER_TYPE.X];

const Questions = ({ answers, setAnswers }: Props) => {
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const questions = testQuestions;
  const onSubmit = () => {
    setModalIsOpen(true);
  }
  const getCircleColor = (idx: number) => (
    ANSWER_TYPE_LIST.includes(answers[idx]) ? 'lightblue' : 'lightgray'
  );
  return (
    <Container>
      <ConfirmModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        answers={answers}
      />
      <Header innerText='Questions' />
      <div style={{
        width: '80%',
        alignContent: 'center',
        margin: 'auto',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
        }}>
          <StyledButton
            style={{
              borderColor: 'midnightblue',
              fontSize: 'min(3vw, 20px)',
            }}
            onClick={onSubmit}
          >
            Confirm
          </StyledButton>
        </div>
        <div style={{
          marginTop: '1vh',
          border: '1px solid lightgray',
          backgroundColor: 'white',
          height: window.innerWidth < 500 ? '35vh' : '50vh',
          borderRadius: '10px',
          borderColor: 'midnightblue',
          overflow: 'scroll',
        }}>
          <div style={{
            margin: '3vh',
            marginTop: '5vh',
            fontSize: 'min(5vw, 50px, 8vh)',
          }}>
            <b>Q{questionNumber + 1}.</b>
          </div>
          <div style={{
            margin: '3vh',
            fontSize: 'min(4vw, 30px, 5vh)',
          }}>
            {questions[questionNumber].question}
          </div>
        </div>
        <div style={{
          marginTop: '4vh',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '5vw',
        }}>
          {
            ANSWER_TYPE_LIST.map((answerType) => (
              <AnswerButton
                answers={answers}
                answerType={answerType}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
                setAnswers={setAnswers}
              />))
          }
        </div>
        <div style={{
          minWidth: '240px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: window.innerWidth < 500 ? 5 : 15,
          marginTop: '5vh',
        }}>
          {Array(10).fill(0).map((_, i) => (
            <div
              style={{
                marginTop: '0.5vh',
                borderRadius: '50%',
                borderColor: 'midnightblue',
                backgroundColor: i === questionNumber ? 'midnightblue' : getCircleColor(i),
                width: 'min(3vw, 20px)',
                height: 'min(3vw, 20px)',
                cursor: 'pointer',
              }}
              onClick={() => setQuestionNumber(i)}
            >
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Questions;
