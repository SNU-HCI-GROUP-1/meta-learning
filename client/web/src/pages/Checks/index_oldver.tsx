import { useState } from 'react';
import { saveAs } from 'file-saver';
import StyledButton from '../../Components/Button';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import Question from '../../Components/Question/Question';
import { Question as QuestionType } from '../../App';
import './index.css';

type Props = {
  answers: any[];
  questions: QuestionType[];
}

const Checks_oldver = ({ answers, questions }: Props) => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const onQuestionClick = (questionNumber: number) => {
    setSelectedQuestion(questionNumber);
  }
  const handleDownload = () => {
    const text = questions.map((q, idx) => (
      `Q${idx + 1}. ${q.question}\nA: ${q.answer}\n\n`
    )).join('');
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(file, 'questions.txt');
  };
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
        page={4}
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
          question={questions[selectedQuestion]}
          questionInner={
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
          onClick={() => handleDownload()}
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

export default Checks_oldver;
