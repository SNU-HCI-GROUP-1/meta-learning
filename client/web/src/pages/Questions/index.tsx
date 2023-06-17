import React from 'react';
import StyledButton from '../../Components/Button';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import AnswerButton from './AnswerButton';
import ConfirmModal from './ConfirmModal';
import Question from '../../Components/Question/Question';
import { Question as QuestionType } from '../../App';

type Props = {
  answers: any[];
  questions: QuestionType[]
  setAnswers: (answers: any[]) => void;
}

export const QUESTION_COUNT = 10;
const ANSWER_TYPE = {
  O: 'O',
  X: 'X',
  EMPTY: null,
}
const ANSWER_TYPE_LIST = [ANSWER_TYPE.O, ANSWER_TYPE.X];

const Questions = ({ answers, questions, setAnswers }: Props) => {
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [isChecking, setIsChecking] = React.useState(false);
  
  const onSubmit = () => {
    setModalIsOpen(true);
  }
  const isNextQuestionAnswered = (idx: number) => {
    if (idx === QUESTION_COUNT - 1) return true;
    return answers.slice(idx + 1).filter((a) => a === null).length === 0;
  }
  const openModalOnAnswer = async () => {
    if (answers.filter((a) => a !== null).length === answers.length) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setModalIsOpen(true);
    }
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
      <Header innerText='Questions' page={3}/>
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
        <Question
          question={questions[questionNumber]}
          questionInner={questions[questionNumber].question}
          questionNumber={questionNumber}
        />
        <div style={{
          marginTop: window.innerWidth < 500 ? 20 : 40,
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
                isChecking={isChecking}
                isNextQuestionAnswered={isNextQuestionAnswered(questionNumber)}
                setQuestionNumber={setQuestionNumber}
                setAnswers={setAnswers}
                setIsChecking={setIsChecking}
                openModalOnAnswer={openModalOnAnswer}
              />))
          }
        </div>
        <div style={{
          minWidth: '240px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: window.innerWidth < 500 ? 10 : 15,
          marginTop: window.innerWidth < 500 ? 20 : 40,
        }}>
          {Array(10).fill(0).map((_, i) => (
            <div
              style={{
                marginTop: '0.5vh',
                borderRadius: '50%',
                borderColor: 'midnightblue',
                backgroundColor: i === questionNumber ? 'midnightblue' : getCircleColor(i),
                width: 'min(4vw, 20px)',
                height: 'min(4vw, 20px)',
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
