import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import LoaderComponent from '../../Components/Loader';
import UploadFileButton from '../../UploadFile/Button';
import { useNavigate } from 'react-router-dom';
import Container from '../../Components/Container';
import { timeout } from '../../lib/time';

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
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
      </header>
    </Container>
  );
}

export default Home;
