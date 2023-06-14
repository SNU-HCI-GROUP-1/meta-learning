import { QUESTION_COUNT } from './index';
import StyledButton from '../../Components/Button';

type Props = {
  answers: (string | null)[];
  answerType: string;
  questionNumber: number;
  setQuestionNumber: (questionNumber: number) => void;
  setAnswers: (answers: (string | null)[]) => void;
}

const AnswerButton = ({ 
  answers, answerType, questionNumber, setQuestionNumber, setAnswers,
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
        const currentAnswer = answers[questionNumber];
        if (currentAnswer === answerType) {
          answers[questionNumber] = null;
        } else {
          answers[questionNumber] = answerType;
        }
        setAnswers([...answers]);
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (currentAnswer !== answerType) {
          setQuestionNumber(questionNumber > QUESTION_COUNT - 2 ? QUESTION_COUNT - 1 : questionNumber + 1);
        }
      }}
    >
      {answerType}
    </StyledButton>
  )
}

export default AnswerButton;
