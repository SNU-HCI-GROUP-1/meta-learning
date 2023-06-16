import { useState } from 'react';
import StyledButton from '../../Components/Button';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import Question from '../../Components/Question/Question';
import testQuestions from '../Questions/testQuestions';
import './index.css';

type Props = {
  answers: any[];
}

const Checks = ({ answers }: Props) => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const questions = testQuestions;
  const onQuestionClick = (questionNumber: number) => {
    setSelectedQuestion(questionNumber);
  }
  const isCorrect = (idx: number) => answers[idx] === questions[idx].answer;

  const TableData = ({ idx }: { idx: number }) => (
    <div 
      style={{
        textAlign: 'center',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        border: selectedQuestion === idx ? '2px dashed midnightblue' : '2px solid white',
        borderRadius: '10px',
        minWidth: '40px',
        width: window.innerWidth < 768 ? 60 : 100,
        height: window.innerWidth < 768 ? 60 : 100,
        position: 'relative',
      }}
      onClick={() => onQuestionClick(idx)}
    >
      {
        <div style={{ 
          textAlign: 'center',
        }}>
          <div style={{
            position: 'absolute',
            width: '100%',
            color: selectedQuestion === idx ? 'black' : 'gray',
          }}>
            {idx + 1}
          </div>
          <div style={{
            position: 'absolute',
            width: '100%',
            color: 'red',
            opacity: '70%',
          }}>
            {isCorrect(idx) ? 'O' : 'X'}
          </div>
        </div>
      }
    </div>
  )

  return (
    <Container>
      <Header
        innerText='Result'
      />
      <div style={{
        width: '60%',
        minWidth: '300px',
        maxWidth: '700px',
        margin: 'auto',
        marginTop: window.innerWidth < 500 ? '2vh' : '5vh',
        backgroundColor: 'white',
        marginBottom: window.innerWidth < 500 ? '2vh' : '5vh',
        fontSize: window.innerWidth < 768 ? 40 : 60,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: window.innerWidth > 768 ? '2vw' : 0,
        }}>
          {
            answers.slice(0, 5).map((a, idx) => (
              <TableData idx={idx} />
            ))
          }
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: window.innerWidth > 768 ? '2vw' : 0,
        }}>
          {
            answers.slice(5).map((a, idx) => (
              <TableData idx={idx + 5} />
            ))
          }
        </div>
      </div>
      <div style={{
        margin: 'auto',
        width: '80%',
        minWidth: '300px',
        backgroundColor: 'white',
      }}>
        <Question
          question={
            <div>
              {questions[selectedQuestion].question}
              <br /><br />
              <div>
                <b>Your Answer: </b> {answers[selectedQuestion] || 'Not Answered'}
              </div>
              <div
                style={{
                  color: isCorrect(selectedQuestion) ? 'green' : 'red',
                }}
              >
                <b>Correct Answer: </b> {questions[selectedQuestion].answer}
              </div>
            </div>
          }
          questionNumber={selectedQuestion}
        />
      </div>
      <div
        style={{
          margin: 'auto',
          width: '80%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
          gap: 10,
        }}
      >
        <StyledButton
          onClick={() => window.location.href = '/editor'}
        >
          Download Questions
        </StyledButton>
        <StyledButton
          onClick={() => window.location.href = '/editor'}
        >
          Return to Script
        </StyledButton>
      </div>
    </Container>
  )

}

export default Checks;
