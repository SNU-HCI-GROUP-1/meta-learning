import React from 'react';
import StyledButton from '../../Components/Button';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import testQuestions from '../../testQuestions';
import { hover } from '@testing-library/user-event/dist/hover';
import icon from '../../alert.png';
import "./Questions.css"
import Modal from '../../Components/Modal';
import AnswerButton from './AnswerButton';
import ConfirmModal from './ConfirmModal';
import Question from '../../Components/Question/Question';
import { Question as QuestionType } from '../../App';
import { useNavigate } from 'react-router-dom';


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

const Questions = ({ answers, setAnswers }: Props) => {
  // 현재 보고 있는 문항 번호
  const [questionNumber, setQuestionNumber] = React.useState(0);
  // 풀은 문제들 나타내는 array
  const [questionAnswered, setQuestionAnswered] = React.useState(Array(QUESTION_COUNT).fill(0));
  // 모달창 관리
  const [isNotDoneModalOpen, setIsNotDoneModalOpen] = React.useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);

  const closeReportModal = () => {
    setIsReportModalOpen(false);
  }

  const questions = testQuestions;
  const navigate = useNavigate();
  const AnswerButton = ({
    answerType, questionNumber
  }: { answerType: string, questionNumber: number }) => {
    return (
      <button
        className={`
          ox-button 
          ${answerType == 'O' ? 'o-button' : 'x-button'} 
          ${questionAnswered[questionNumber] ? questionAnswered[questionNumber] == answerType ? 'selected' : 'not-selected' : ''}
          ${window.innerWidth < 500 ? 'small' : 'large' }
          `}
        onClick={() => {
          if (answers[questionNumber] === answerType) {
            answers[questionNumber] = null;
          } else {
            answers[questionNumber] = answerType;
          }
          setAnswers([...answers]);

          let arr = [...questionAnswered];
          arr[questionNumber] = answerType;
          setQuestionAnswered(arr);

          setTimeout(()=>setQuestionNumber(!questionAnswered[questionNumber] && questionNumber < 9 ? questionNumber + 1 : questionNumber), 100);
          ;
        }}
      >
        {answerType}
      </button>
    )
  }

  const onSubmit = () => {
    if (questionAnswered.filter((a) => a === 'O' || a === 'X').length < 10) {
      setIsNotDoneModalOpen(true);
      return;
    }
      navigate('/checks');
  }
  const forceSubmit = () => {
    navigate('/checks');
  }

  return (
    <Container>
       {isNotDoneModalOpen && 
       <Modal 
       setModalOpen={setIsNotDoneModalOpen} 
       submitButtonHandler={forceSubmit} 
       title="답안 제출" 
       subtitle="아직 풀지 않은 문제가 있습니다. 그래도 제출하시겠습니까?" 
       cancel="취소" 
       submit="제출"
       theme={true}
       />}
       {isReportModalOpen && 
       <Modal 
       setModalOpen={setIsReportModalOpen} 
       submitButtonHandler={closeReportModal} 
       title="문제 신고" 
       subtitle="이 문항을 신고하시겠습니까?" 
       cancel="취소" 
       submit="신고" 
       theme={false}
       />}

      <Header innerText='Questions' page={3} />
      <div className={`text-body-questions ${window.innerWidth < 500 ? 'small' : 'large' }`}>
        <div style={ window.innerWidth < 500 ?
          { position: 'absolute', top: 4, right: 8, cursor: 'pointer' }
          : { position: 'absolute', top: 40, right: 40, cursor: 'pointer' }
        } 
        onClick={() => setIsReportModalOpen(true)}>
          <img src={icon} alt="icon" style={ window.innerWidth < 500 ? 
          { width: 32, height: 32, margin: 'auto' }
          : { width: 44, height: 44, margin: 'auto' }
        }></img>
          <div className='noto-sans-kr' style={window.innerWidth < 500 ?
          { fontSize: 12, color: '#A8A8A8' } : { fontSize: 18, color: '#A8A8A8' }}>문제 신고</div>
        </div>
        <div
          className='question-number'
          style={{
            fontFamily: "Noto Sans KR SemiBold",
            fontSize: window.innerWidth < 500 ? 32 : 44,

          }}>
          Q{questionNumber+1}
        </div>
        <div className={`question-text noto-sans ${window.innerWidth < 500 ? 'small' : 'large' }`} style={{padding: window.innerWidth < 500 ? '' : '40px 40px'}}>
          {questions[questionNumber].question}
        </div>
        <div className={`ox-wrapper ${window.innerWidth < 500 ? 'small' : 'large' }`}>
          <AnswerButton answerType='O' questionNumber={questionNumber}></AnswerButton>
          <AnswerButton answerType='X' questionNumber={questionNumber}></AnswerButton>
        </div>
      </div>
      <div className={`next-button-wrapper-qeustions ${window.innerWidth < 500 ? 'small' : 'large' }`}>
        <div className="next-button-questions" style={window.innerWidth < 500 ? {marginBottom: 10} : {}}>
          <div className="question-item-wrapper" style={window.innerWidth < 500 ? {height: 40 } : {}}>
            {Array(10).fill(0).map((_, i) => (
              <div
                className={`question-item ${questionAnswered[i] ? 'question-answered' : ''} ${window.innerWidth < 500 ? 'small' : 'large' }`}
                onClick={() => setQuestionNumber(i)}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className={`subtext noto-sans-kr ${window.innerWidth < 500 ? 'small' : 'large' }`} style={{fontWeight: 'normal'}}>
            문제 번호를 누르면 해당 문제로 이동할 수 있습니다
          </div>
        </div>
        <button
          className={`next-button-questions noto-sans-kr button-activated ${window.innerWidth < 500 ? 'small' : 'large' }`}
          onClick={onSubmit}
          style={window.innerWidth < 500 ? {marginTop: 0} : { width: "66.66%", marginLeft: 24 }}>
          답안 제출
        </button>
      </div>



      {/* <div style={{
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
      </div> */}
    </Container>
  );
}

export default Questions;
