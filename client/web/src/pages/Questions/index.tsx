import React from 'react';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../../Components/Button';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import testQuestions from './testQuestions';

type Props = {
  answers: any[];
  setAnswers: (answers: any[]) => void;
}

const QUESTION_COUNT = 10;

const Questions = ({ answers, setAnswers }: Props) => {
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const questions = testQuestions;
  const navigate = useNavigate();
  const AnswerButton = ({ 
    answerType, questionNumber 
  }: { answerType: string, questionNumber: number }) => {
    return (
      <StyledButton
        style={{
          borderColor: 'midnightblue',
          width: 'min(30vw, 300px)',
          backgroundColor: answers[questionNumber] === answerType 
            ? 'midnightblue' : 'white',
          color: answers[questionNumber] === answerType
            ? 'white' : 'black',
        }}
        onClick={() => {
          if (answers[questionNumber] === answerType) {
            answers[questionNumber] = null;
          } else {
            answers[questionNumber] = answerType;
          }
          setAnswers([...answers]);
        }}
      >
        {answerType}
      </StyledButton>
    )
  }
  const onSubmit = () => {
    if (answers.filter((a) => a === 'O' || a === 'X').length !== 5) {
      alert('Please answer all questions.');
      return;
    }
    if (window.confirm('Submit?') === true) {
      navigate('/checks');
    } else {
      return;
    }
  }
  return (
    <Container>
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
          <AnswerButton
            answerType='O'
            questionNumber={questionNumber}
          />
          <AnswerButton
            answerType='X'
            questionNumber={questionNumber}
          />
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
          <div
            style={{
              cursor: questionNumber === 0 ? '' : 'pointer',
              userSelect: 'none',
              marginRight: '2vw',
              minWidth: '60px',
            }}
            onClick={() => setQuestionNumber(questionNumber - 1 < 0 ? 0 : questionNumber - 1)}
          >
            {questionNumber === 0 ? '' : '<< Prev'}
          </div>
          {Array(10).fill(0).map((_, i) => (
            <div
              style={{
                marginTop: '0.5vh',
                borderRadius: '50%',
                borderColor: 'midnightblue',
                backgroundColor: i === questionNumber ? 'midnightblue' : 'lightgray',
                width: 'min(3vw, 20px)',
                height: 'min(3vw, 20px)',
                cursor: 'pointer',
              }}
              onClick={() => setQuestionNumber(i)}
            >
            </div>
          ))}
          <div
            style={{
              cursor: questionNumber === QUESTION_COUNT - 1 ? '' : 'pointer',
              userSelect: 'none',
              marginLeft: '2vw',
              minWidth: '60px',
              textAlign: 'right',
            }}
            onClick={() => setQuestionNumber(
              questionNumber + 1 > QUESTION_COUNT - 1 ? QUESTION_COUNT - 1 : questionNumber + 1,
            )}
          >
            {questionNumber === QUESTION_COUNT - 1 ? '' : 'Next >>'}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Questions;
