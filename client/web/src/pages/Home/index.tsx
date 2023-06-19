import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  useEffect
} from "react";

import '../../App.css';
import { useNavigate } from 'react-router-dom';
import Container from '../../Components/Container';
import { timeout } from '../../lib/time';
import Header from '../../Components/Header';

import "./DragDrop.css";
import icon from '../../drag-and-drop.png';
import { uploadFile } from './sendUploadFile';
import { sendReq } from '../../sendReq';


// Drag and Drop component
interface IFileTypes {
  id: number;
  object: File;
};

type Props = {
  setScripts: (scripts: string) => void;
};

const Home = ({ setScripts }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFileUploading, setIsFileUploading] = React.useState(false);
  const [isSTTLoading, setIsSTTLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const navigate = useNavigate();
  const handleUpload = async () => {
    setIsLoading(true);
    setIsSTTLoading(true);
    setIsFileUploading(true);
    setProgress(5);
    let key = '';
    try {
      key = (await uploadFile(files[0].object)).key;
    } catch (err) {
      console.log(err);
    }
    await timeout(3000);
    setProgress(20);
    setIsFileUploading(false);
    if (key && key !== '') {
      try {
        const script = (await sendReq('GET', `/generate_stt?key=${key}`)).script;
        setScripts(script);
      } catch (err) {
        console.log(err);
        await timeout(10000);
      }
    }
    setIsSTTLoading(false);
  }

  React.useEffect(() => {
    if (isLoading && isSTTLoading && progress < 90) {
      const timer = setTimeout(() => setProgress(progress + 1), 1000);
      return () => clearTimeout(timer);
    }
    if (isLoading && !isSTTLoading && progress < 100) {
      const timer = setTimeout(() => setProgress(progress + 2), 30);
      return () => clearTimeout(timer);
    }
    if (progress >= 100) {
      setIsLoading(false);
      navigate('/editor');
      setProgress(0);
    }
  }, [progress, isSTTLoading]);

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
        className={`DragDrop ${files.length === 0 ? 'before-upload' : 'after-upload'} ${window.innerWidth < 500 ? 'small' : 'large' }`}>
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
            files.length === 0 ?
              <div className="vertical-item">
                <div className="icon">
                  <img src={icon} alt="icon" style={{ width: "12%" }} />
                </div>
                <div className="noto-sans-kr" style={{ fontSize: window.innerWidth < 500 ? 10 : 20, fontWeight: 'bold', marginTop: 10 }}>드래그해서 파일 선택(.mp3)</div>
              </div>
              :
              <div className="vertical-item">
                {
                  !isLoading ?
                  <div className="noto-sans-kr-bold" style={{ fontSize: 24, marginBottom: 16, }}>파일 선택 완료!</div>
                  :
                  <div>
                    <div className="noto-sans-kr">
                      {
                        isFileUploading ? '파일을 업로드 중입니다...' : '스크립트를 생성중입니다...'
                      }
                    </div>
                    <div className="loading-bar">
                      <div className="current-bar" style={{width: progress + '%'}}></div>
                    </div>
                  </div>
                }
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
      <div className={`next-button-wrapper ${window.innerWidth < 500 ? 'small' : 'large' }`}>
        <button
          className={`next-button noto-sans-kr ${files.length !== 0 && !isLoading ? 'button-activated' : 'button-disabled'}  ${window.innerWidth < 500 ? 'small' : 'large' }`}
          onClick={handleUpload}
          disabled={files.length === 0 || isLoading}
        >스크립트 생성</button>
      </div>
      <div className={`subtext noto-sans-kr ${window.innerWidth < 500 ? 'small' : 'large' }`}>
        다른 파일을 선택하고 싶나요? 새로운 파일을 드래그해주세요
      </div>
    </Container>
  );
};

export default Home;
