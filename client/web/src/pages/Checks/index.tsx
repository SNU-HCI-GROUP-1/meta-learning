import React from 'react';
import StyledButton from '../../Components/Button';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import testQuestions from '../../testQuestions';
import { hover } from '@testing-library/user-event/dist/hover';
import icon from '../../alert.png';
import icon2 from '../../document.png';
import "./Checks.css"
import Modal from '../../Components/Modal';
import Question from '../../Components/Question/Question';
import { Question as QuestionType } from '../../App';
import { useNavigate } from 'react-router-dom';
import ScriptModal from '../../Components/ScriptModal';


type Props = {
    answers: any[];
    questions: QuestionType[];
    text: string;
}

export const QUESTION_COUNT = 10;

const Checks = ({ answers, questions, text }: Props) => {
    // 현재 보고 있는 문항 번호
    const [questionNumber, setQuestionNumber] = React.useState(0);
    // 모달창 관리
    const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);
    const [isScriptModalOpen, setIsScriptModalOpen] = React.useState(false);

    const isCorrect = (idx: number) => answers[idx] === questions[idx].answer;

    var fileName = "questions.txt";
      var fileContent = '';
      questions.map((q)=>{
        fileContent = fileContent + 'Question: ' + q.question + '\nAnswer: ' + q.answer + '\n\n';
      })
      var myFile = new Blob([fileContent], {type: 'text/plain'});
    const link = window.URL.createObjectURL(myFile)

    // answers = ['O', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];

    const closeReportModal = () => {
        setIsReportModalOpen(false);
    }

    const navigate = useNavigate();

    return (
        <Container>
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
            {isScriptModalOpen &&
                <ScriptModal
                    setModalOpen={setIsScriptModalOpen}
                    contents={text}
                    setContents={ ()=>(null) }
                ></ScriptModal>
            }

            <Header innerText='Checks' page={4} />
            <div className={`checks-body ${window.innerWidth < 500 ? 'small' : 'large' }`} style={{ border: isCorrect(questionNumber) ? '1px solid #63B899' : '1px solid #E38181'}}>
                <div style={window.innerWidth < 500 ?
          { position: 'absolute', top: 4, right: 8, cursor: 'pointer' }
          : { position: 'absolute', top: 40, right: 40, cursor: 'pointer' }} onClick={() => setIsReportModalOpen(true)}>
                    <img src={icon} alt="icon" style={window.innerWidth < 500 ? 
          { width: 32, height: 32, margin: 'auto' }
          : { width: 44, height: 44, margin: 'auto' }}></img>
                    <div className='noto-sans-kr' style={window.innerWidth < 500 ?
          { fontSize: 12, color: '#A8A8A8' } : { fontSize: 18, color: '#A8A8A8' }}>문제 신고</div>
                </div>
                <div style={window.innerWidth < 500 ?
          { position: 'absolute', top: 4, right: 64, cursor: 'pointer' }
          : { position: 'absolute', top: 40, right: 40, cursor: 'pointer' }} onClick={() => setIsScriptModalOpen(true)}>
                    <img src={icon2} alt="icon2" style={window.innerWidth < 500 ? 
          { width: 24, height: 24, margin: 'auto', marginTop: 8, }
          : { width: 36, height: 36, margin: 'auto', marginTop: 8, }}></img>
                    <div className='noto-sans-kr' style={window.innerWidth < 500 ?
          { fontSize: 12, color: '#A8A8A8' } : { fontSize: 18, color: '#A8A8A8' }}>스크립트 확인</div>
                </div>
                <div
                    className='question-number'
                    style={{
                        fontFamily: "Noto Sans KR SemiBold",
                        fontSize: window.innerWidth < 500 ? 32 : 44,

                    }}>
                    Q{questionNumber + 1}
                </div>
                <div className='question-text noto-sans' style={{ padding: window.innerWidth < 500 ? '' : '40px 40px' }}>
                    {questions[questionNumber].question}
                </div>
                <div className='answer-wrapper'>
                    { !isCorrect(questionNumber) &&
                    <div className='noto-sans' style={{fontSize: 24, textAlign: 'center', marginBottom: 16 }}>
                      Answer: {questions[questionNumber].answer}
                    </div>
                    }
                    
                    <div className={`
                        answer-button
                        ${isCorrect(questionNumber) ? 'o-button' : 'x-button'} 
                        `}>{answers[questionNumber]}</div>
                </div>
            </div>
            <div className={`next-button-wrapper-checks ${window.innerWidth < 500 ? 'small' : 'large' }`}>
                <div className={`next-button-checks ${window.innerWidth < 500 ? 'small' : 'large' }`}>
                    <div className="checks-item-wrapper" style={window.innerWidth < 500 ? {height: 40 } : {}}>
                        {Array(10).fill(0).map((_, i) => (
                            <div
                                className={`checks-item ${isCorrect(i) ? 'correct-answer' : 'wrong-answer'} ${i == questionNumber ? 'current-answer' : ''}`}
                                onClick={() => setQuestionNumber(i)}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                    <div className={`subtext noto-sans-kr ${window.innerWidth < 500 ? 'small' : 'large' }`} style={{ fontWeight: 'normal' }}>
                        문제 번호를 누르면 해당 문제로 이동할 수 있습니다
                    </div>
                </div>
                <button
                    className={`next-button-checks noto-sans-kr button-activated ${window.innerWidth < 500 ? 'small' : 'large' }`}
                    style={{ width: "66.66%", marginLeft: 24 }}
                    onClick={()=>document.getElementById('download')?.click()}>
                    문제 전체 다운로드
                </button>
                <a id='download' href={link} download={fileName}></a>
            </div>
        </Container>
    );
}

export default Checks;
