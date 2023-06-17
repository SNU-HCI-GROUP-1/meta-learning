import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  useEffect
} from "react";

import '../../App.css';
import LoaderComponent from '../../Components/Loader';
import UploadFileButton from '../../UploadFile/Button';
import { useNavigate } from 'react-router-dom';
import Container from '../../Components/Container';
import { timeout } from '../../lib/time';
import Header from '../../Components/Header';

import "./DragDrop.css";
import icon from '../../drag-and-drop.png';

// const Home = () => {
//   const [isLoading, setIsLoading] = React.useState(false);
//   const navigate = useNavigate();
//   const handleUpload = async (file?: any) => {
//     console.log(file);
//     // TODO: Upload file to server
//     setIsLoading(true);
//     await timeout(3000);
//     setIsLoading(false);
//     navigate('/editor');
//   }
//   return (
//     <Container>
//       <Header innerText='Upload File' page={1} />
//       <DragDrop></DragDrop>
//       {/* <div
//         style={{
//           display: 'flex',
//           justifyContent: 'right',
//           marginLeft: '20%',
//           marginRight: '20%',
//           marginTop: 10,
//           fontSize: window.innerWidth < 500 ? 8 : 16, fontWeight: 'bold'
//         }}>
//         복습하고 싶은 강의의 녹음 파일을 올려주세요
//       </div>
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           height: '20%',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//       </div> */}

//     </Container>
//   );
// }


// Drag and Drop component
interface IFileTypes {
  id: number;
  object: File;
}

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleUpload = async (file?: any) => {
    console.log(file);
    // TODO: Upload file to server
    navigate('/editor');
  }

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<IFileTypes[]>([]);

  const dragRef = useRef<HTMLLabelElement | null>(null);
  const fileId = useRef<number>(0);

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      let tempFiles: IFileTypes[] = files;

      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        tempFiles = [
          {
            id: fileId.current++,
            object: file
          }
        ];
      }

      setFiles(tempFiles);
    },
    [files]
  );

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(false);
      
      const file = e.dataTransfer?.files[0];
      if (file && file.type === 'audio/mpeg') {
          onChangeFiles(e);
      } else {
          alert('Please drop an MP3 file.');
      }
      
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <Container>
      <Header innerText='Upload File' page={1} />
      <div 
        className={`DragDrop ${files.length == 0 ? 'before-upload' : 'after-upload'}`} style={{aspectRatio: 9 / 4}}>
        <input
          type="file"
          id="fileUpload"
          style={{ display: "none" }}
          multiple={false}
          onChange={onChangeFiles}
          accept=".mp3"
        />
        <label
          className={`cursor-pointer vertical-box ${isDragging ? 'DragDrop-File-Dragging' : 'DragDrop-File'}`}
          htmlFor="fileUpload"
          ref={dragRef}
        >
          {
            files.length == 0 ?
            <div className="vertical-item">
                <div className="icon">
                    <img src={icon} alt="icon" style={{width: "12%"}} />
                    </div>
                <div className="noto-sans-kr" style={{fontSize: window.innerWidth < 500 ? 10 : 20, fontWeight: 'bold', marginTop: 10}}>드래그해서 파일 선택(.mp3)</div>
            </div>
            :
            <div className="vertical-item">
              <div className="noto-sans-kr-bold" style={{fontSize: 24, marginBottom: 16, }}>파일 선택 완료!</div>
              <div className="DragDrop-Files">
          {files.length > 0 &&
            files.map((file: IFileTypes) => {
              const {
                id,
                object: { name }
              } = file;

              return (
                <div key={id}>
                  <div>📄 {name}</div>
                </div>
              );
            })}
        </div>
            </div>
          }
        </label>
      </div>
      <div className="next-button-wrapper">
        <button 
        className={`next-button noto-sans-kr ${files.length != 0 ? 'button-activated' : 'button-disabled'}`}
        onClick={handleUpload}
        disabled={files.length == 0}
        >스크립트 생성</button>
      </div>
      <div className="subtext noto-sans-kr">
            다른 파일을 선택하고 싶나요? 새로운 파일을 드래그해주세요
      </div>
    </Container>
  );
};

export default Home;
