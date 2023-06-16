import { useState } from 'react';
import '../../App.css';
import "react-quill/dist/quill.snow.css";
import { useNavigate } from 'react-router-dom';
import Container from '../../Components/Container';
import TextEditor from './TextEditor';
import LoaderComponent from '../../Components/Loader';
import { timeout } from '../../lib/time';
import Header from '../../Components/Header';

const Editor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async () => {
    setIsLoading(true);
    await timeout(3000);
    setIsLoading(false);
    navigate('/questions');
  }
  return (
    <>
      <Header innerText='Edit Script' page={2} />
      {
        isLoading ? (
          <Container>
            <div style={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <LoaderComponent />
            </div>
          </Container>
        ) : (
          <TextEditor 
            onSubmit={onSubmit}
          />
        )
      }
    </>
  )
}

export default Editor
