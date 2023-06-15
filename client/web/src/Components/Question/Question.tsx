import React, { ReactNode } from 'react'
import ReportModal from './ReportModal';

type Props = {
  question: string | ReactNode,
  questionNumber: number,
}

const Question = ({ question, questionNumber }: Props) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);


  return (
    <div style={{
      marginTop: '1vh',
      border: '1px solid lightgray',
      backgroundColor: 'white',
      height: window.innerWidth < 768 ? 400 : 600,
      maxHeight: 500,
      borderRadius: '10px',
      borderColor: 'midnightblue',
      overflow: 'scroll',
      position: 'relative',
    }}>
      <ReportModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
      <div 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          margin: 10,
          width: window.innerWidth < 768 ? window.innerWidth < 425 ? 40 : 50 : 60,
          height: window.innerWidth < 768 ? window.innerWidth < 425 ? 40 : 50 : 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onClick={() => setModalIsOpen(true)}
      >
        <img src="/siren.png" alt="siren"/>
      </div>
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
