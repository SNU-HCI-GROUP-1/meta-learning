import React from 'react';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import icon from '../../alert.png';
import icon2 from '../../document.png';
import "./Checks.css"
import Modal from '../../Components/Modal';
import { Question as QuestionType } from '../../App';
import ScriptModal from '../../Components/ScriptModal';
import { sendReq } from '../../sendReq';


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
      questions.forEach((q) => {
        fileContent = fileContent + 'Question: ' + q.question + '\nAnswer: ' + q.answer + '\n\n';
      })
      var myFile = new Blob([fileContent], {type: 'text/plain'});
    const link = window.URL.createObjectURL(myFile)

    const closeReportModal = async () => {
      await sendReq('POST', '/send_report', {
        question: questions[questionNumber].question,
        answer: questions[questionNumber].answer,
        reason: 'User Report',
      });
      setIsReportModalOpen(false);
    }

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
            <div className='checks-body' style={{ border: isCorrect(questionNumber) ? '1px solid #63B899' : '1px solid #E38181'}}>
                <div style={{ position: 'absolute', top: 40, right: 40, cursor: 'pointer' }} onClick={() => setIsReportModalOpen(true)}>
                    <img src={icon} alt="icon" style={{ width: 44, height: 44, margin: 'auto' }}></img>
                    <div className='noto-sans-kr' style={{ fontSize: 18, color: '#A8A8A8' }}>문제 신고</div>
                </div>
                <div style={{ position: 'absolute', top: 40, right: 120, cursor: 'pointer' }} onClick={() => setIsScriptModalOpen(true)}>
                    <img src={icon2} alt="icon2" style={{ width: 36, height: 36, margin: 'auto', marginTop: 8, }}></img>
                    <div className='noto-sans-kr' style={{ fontSize: 18, color: '#A8A8A8' }}>스크립트 확인</div>
                </div>
                <div
                    className='question-number'
                    style={{
                        fontFamily: "Noto Sans KR SemiBold",
                        fontSize: 44,

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
            <div className="next-button-wrapper">
                <div className="next-button">
                    <div className="checks-item-wrapper">
                        {Array(10).fill(0).map((_, i) => (
                            <div
                                className={`checks-item ${isCorrect(i) ? 'correct-answer' : 'wrong-answer'} ${i === questionNumber ? 'current-answer' : ''}`}
                                onClick={() => setQuestionNumber(i)}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                    <div className="subtext noto-sans-kr" style={{ fontWeight: 'normal' }}>
                        문제 번호를 누르면 해당 문제로 이동할 수 있습니다
                    </div>
                </div>
                <button
                    className={`next-button noto-sans-kr button-activated`}
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
