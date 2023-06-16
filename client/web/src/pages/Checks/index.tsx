import { useState } from 'react';
import StyledButton from '../../Components/Button';
import Container from '../../Components/Container';
import testQuestions from '../Questions/testQuestions';
import Header from '../../Components/Header';

type Props = {
  answers: any[];
}

const Checks = ({ answers }: Props) => {
  answers = !answers?.length 
    || answers.filter(a => a === 'O' || a === 'X').length !== 10
      ? ['O','X','O','X','O','O','O','O','O','O'] : answers;
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const questions = testQuestions;
  const onQuestionClick = (questionNumber: number) => {
    setSelectedQuestion(questionNumber);
  }

  return (
    <Container>
      <Header innerText='Edit Script' page={4} />
      <h1 style={{
        color: 'white',
        paddingTop: '3vh',
        marginBottom: '2vh',
        textAlign: 'center',
      }}>
        Results
      </h1>
      <table style={{
        width: '80%',
        minWidth: '300px',
        margin: 'auto',
        backgroundColor: 'white',
        border: '1px solid lightgray',
        marginBottom: '5vh',
      }}>
        <thead style={{
          border: '1px solid lightgray',
        }}>
          <tr>
            <th style={{width: '25%'}}>Question</th>
            {
              Array(5).fill(0).map((q, idx) => {
                return (
                  <th
                    onClick={() => onQuestionClick(idx)}
                  >{idx + 1}</th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{textAlign: 'center'}}>Your Answer</td>
            {
              answers.map((a, idx) => {
                return (
                  <td 
                    style={{
                      textAlign: 'center',
                    }}
                    onClick={() => onQuestionClick(idx)}
                  >{a}</td>
                )
              })
            }
          </tr>
        </tbody>
      </table>
      <div style={{
        margin: 'auto',
        width: '80%',
        minWidth: '300px',
        backgroundColor: 'white',
        height: '30vh',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginRight: '2vh',
          marginLeft: '2vh',
          gap: '1vh',
          height: '30vh',
          textOverflow: 'scroll',
        }}>
          <h1 style={{
            textAlign: 'center',
            marginBottom: '1vh',
          }}>
            <b>Question {selectedQuestion + 1}</b>
          </h1>
          <h1 style={{
            overflow: 'scroll',
          }}>
            {questions[selectedQuestion].question}
            <br />
            <br />
            Answer: {questions[selectedQuestion].answer}
            <br />
            Yours: {answers[selectedQuestion]}
          </h1>
        </div>
      </div>
      <div
        style={{
          margin: 'auto',
          width: '80%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: '2vh',
        }}
      >
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
