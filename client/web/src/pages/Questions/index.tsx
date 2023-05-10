import React from 'react';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../../Components/Button';
import Container from '../../Components/Container';
import testQuestions from './testQuestions';

type Props = {
  answers: any[];
  setAnswers: (answers: any[]) => void;
}

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
          width: '10vw',
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
    if (questionNumber === 4) {
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
    setQuestionNumber(questionNumber + 1 > 4 ? 4 : questionNumber + 1)
  }
  return (
    <Container>
      <div
        // header
        style={{
          height: '5vh',
        }}
      >
      </div>
      <div style={{
        width: '80%',
        alignContent: 'center',
        margin: 'auto',
      }}>
        <div style={{
          minWidth: '300px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          // marginTop: '5vh',
        }}>
          <StyledButton
            onClick={() => setQuestionNumber(questionNumber - 1 < 0 ? 0 : questionNumber - 1)}
          >
            Prev
          </StyledButton>
          <h1
            style={{
              color: 'white',
            }}
          >
            <b>Question Number: {questionNumber + 1}</b>
          </h1>
          <StyledButton onClick={onSubmit}>
            {questionNumber === 4 ? 'Submit' : 'Next'}
          </StyledButton>
        </div>
        <div style={{
          marginTop: '5vh',
          border: '1px solid lightgray',
          backgroundColor: 'white',
          height: '30vh',
        }}>
          <h1 style={{
            margin: '3vh',
          }}>
            {questions[questionNumber].question}
          </h1>
        </div>
        <div style={{
          marginTop: '5vh',
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
      </div>
    </Container>
  );
}

export default Questions;
