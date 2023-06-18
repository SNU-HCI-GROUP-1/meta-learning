import { QUESTION_COUNT } from './index';
import StyledButton from '../../Components/Button';

type Props = {
  answers: (string | null)[];
  answerType: string;
  questionNumber: number;
  isChecking: boolean;
  isNextQuestionAnswered: boolean;
  setQuestionNumber: (questionNumber: number) => void;
  setAnswers: (answers: (string | null)[]) => void;
  setIsChecking: (isChecking: boolean) => void;
  openModalOnAnswer: () => Promise<void>;
}

const AnswerButton = ({ 
  answers, answerType, isChecking, isNextQuestionAnswered,
  questionNumber, setQuestionNumber, setAnswers, setIsChecking, openModalOnAnswer,
}: Props) => {
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
      onClick={async () => {
        if (isChecking) return;
        const currentAnswer = answers[questionNumber];
        if (currentAnswer === answerType) {
          answers[questionNumber] = null;
        } else {
          answers[questionNumber] = answerType;
        }
        setIsChecking(true);
        setAnswers([...answers]);
        if (currentAnswer !== answerType && !isNextQuestionAnswered) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          setQuestionNumber(questionNumber > QUESTION_COUNT - 2 ? QUESTION_COUNT - 1 : questionNumber + 1);
        }
        setIsChecking(false);
        await openModalOnAnswer();
      }}
    >
      {answerType}
    </StyledButton>
  )
}

export default AnswerButton;
