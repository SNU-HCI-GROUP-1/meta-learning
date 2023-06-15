import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../../Components/Button';
import './index.css';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  answers: (string | null)[];
}

const ConfirmModal = ({ isOpen, setIsOpen, answers }: Props) => {
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  const isAllAnswered = answers.filter((a) => a !== null).length === answers.length;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      className="modal-content"
      style={{
        content: {
          width: 'max(40vw, 240px)',
          height: 200,
          margin: 'auto',
          marginTop: '20vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '10px',
          borderColor: 'midnightblue',
          borderWidth: '2px',
        }
      }}
    >
      <div
        style={{
          marginTop: 10,
          height: 30,
        }}
      >
        {isAllAnswered ? '' : <b>Warning</b>}
      </div>
      <div
        style={{
          marginTop: 10,
          marginBottom: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {
          isAllAnswered
            ? 
            <div
              style={{
                marginTop: 10,
              }}
            >
              <b>Do you want to Submit?</b>
            </div>
            :
              <>
                <div>
                  Please answer all questions.
                </div>
                <div>
                  Answers left:
                </div>
                <div>
                  {
                    answers.reduce((acc, cur, idx) => {
                      if (cur === null) {
                        acc.push(idx + 1);
                      }
                      return acc;
                    }, [] as number[]).join(', ')
                  }
                </div>
              </>
        }
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '5vw',
          marginTop: 'auto',
          marginBottom: 20,
        }}
      >
        <StyledButton 
          style={{
            borderColor: 'midnightblue',
            fontSize: 'min(3vw, 18px)',
            width: 90,
          }}
          onClick={() => navigate('/checks')}
        >
          Submit
        </StyledButton>
        <StyledButton 
          style={{
            borderColor: 'midnightblue',
            fontSize: 'min(3vw, 18px)',
            width: 90,
          }}
          onClick={closeModal}
        >
          Close
        </StyledButton>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
