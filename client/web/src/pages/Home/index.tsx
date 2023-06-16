import React from 'react';

import '../../App.css';
import LoaderComponent from '../../Components/Loader';
import UploadFileButton from '../../UploadFile/Button';
import { useNavigate } from 'react-router-dom';
import Container from '../../Components/Container';
import { timeout } from '../../lib/time';
import Header from '../../Components/Header';
import DragDrop from '../DragAndDrop';

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleUpload = async (file?: any) => {
    console.log(file);
    // TODO: Upload file to server
    setIsLoading(true);
    await timeout(3000);
    setIsLoading(false);
    navigate('/editor');
  }
  return (
    <Container>
      <Header innerText='META LEARNING' page={1} />
      <DragDrop></DragDrop>
      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          marginLeft: '20%',
          marginRight: '20%',
          marginTop: 10,
          fontSize: window.innerWidth < 500 ? 8 : 16, fontWeight: 'bold'
        }}>
        복습하고 싶은 강의의 녹음 파일을 올려주세요
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '20%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
      </div>
    </Container>
  );
}

export default Home;
