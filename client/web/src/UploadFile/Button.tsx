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
      <button
        onClick={handleClick}
      >
        스크립트 생성
      </button>
      <input type="file"
        ref={hiddenFileInput}
        onChange={(event) => handleUpload((event.target.files || [])[0])}
        style={{ display: "none" }} 
      />
    </div>
  );
}

export default UploadFileButton;
