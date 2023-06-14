import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import LoaderComponent from '../../Components/Loader';
import UploadFileButton from '../../UploadFile/Button';
import { useNavigate } from 'react-router-dom';
import Container from '../../Components/Container';
import { timeout } from '../../lib/time';
import Header from '../../Components/Header';

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
      <Header innerText='META LEARNING' />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '80%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={logo} className="App-logo" alt="logo" />
        {
          isLoading ? (
            <LoaderComponent />
          ) : (
            <UploadFileButton
              handleUpload={handleUpload}
            />
          )
        }
      </div>
    </Container>
  );
}

export default Home;
