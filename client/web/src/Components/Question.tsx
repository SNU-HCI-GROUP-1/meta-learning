import { ReactNode } from 'react'

type Props = {
  question: string | ReactNode,
  questionNumber: number,
}

const Question = ({ question, questionNumber }: Props) => {
  return (
    <div style={{
      marginTop: '1vh',
      border: '1px solid lightgray',
      backgroundColor: 'white',
      height: '50vh',
      maxHeight: 500,
      borderRadius: '10px',
      borderColor: 'midnightblue',
      overflow: 'scroll',
    }}>
      <div style={{
        margin: window.innerWidth < 768 ? window.innerWidth < 425 ? 23 : 25 : 30,
        marginTop: window.innerWidth < 500 ? '2vh' : '5vh',
        fontSize: window.innerWidth < 768 ? window.innerWidth < 425 ? 23 : 25 : 30,
      }}>
        <b>Q{questionNumber + 1}.</b>
      </div>
      <div style={{
        margin: window.innerWidth < 768 ? window.innerWidth < 425 ? 23 : 25 : 30,
        fontSize: window.innerWidth < 768 ? window.innerWidth < 425 ? 18 : 20 : 25,
        whiteSpace: 'pre-wrap',
      }}>
        {question}
      </div>
    </div>
  )
}

export default Question;
