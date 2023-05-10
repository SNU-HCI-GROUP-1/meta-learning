import React from 'react';
import StyledButton from '../Components/Button';

type Props = {
  handleUpload: (file?: any) => void;
}

const UploadFileButton = ({ handleUpload }: Props) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <div className="App">
      <StyledButton
        onClick={handleClick}
      >
        파일 업로드
      </StyledButton>
      <input type="file"
        ref={hiddenFileInput}
        onChange={(event) => handleUpload((event.target.files || [])[0])}
        style={{ display: "none" }} 
      />
    </div>
  );
}

export default UploadFileButton;
