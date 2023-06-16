import Modal from 'react-modal';
import StyledButton from '../../Components/Button';
import './index.css';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ReportModal = ({ isOpen, setIsOpen }: Props) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      className="modal-content"
      style={{
        content: {
          width: 'max(50vw, 240px)',
          maxWidth: 400,
          height: window.innerWidth < 768 ? 250 : 300,
          margin: 'auto',
          marginTop: '20vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '10px',
          borderColor: 'midnightblue',
          borderWidth: '2px',
          fontSize: window.innerWidth < 768 ? 15 : 20
        }
      }}
    >
      <div
        style={{
          marginTop: 10,
          height: 30,
        }}
      >
        <b>Report Question</b>
      </div>
      <div
        style={{
          marginTop: 5,
          marginBottom: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          Do you want to report question?
        </div>
        <textarea
          rows={4}
          placeholder={'Enter Reason'}
          style={{
            border: '1px solid lightgray',
            width: '100%',
            margin: 'auto',
            marginTop: 5,
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '5vw',
          marginTop: 5,
          marginBottom: 20,
        }}
      >
        <StyledButton 
          style={{
            borderColor: 'midnightblue',
            fontSize: 'min(3vw, 18px)',
            width: 90,
          }}
          onClick={() => {}}
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

export default ReportModal;
