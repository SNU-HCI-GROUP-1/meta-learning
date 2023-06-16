import React, {
    ChangeEvent,
    useCallback,
    useRef,
    useState,
    useEffect
  } from "react";
  import "./DragDrop.css";
  import icon from '../../drag-and-drop.png';
  
  interface IFileTypes {
    id: number;
    object: File;
  }
  
  const DragDrop = () => {
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
            ...tempFiles,
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
        if (file && file.type === 'audio/mp3') {
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
      <div 
        className="DragDrop" style={{height: (window.innerHeight -80) * 6 / 10}}>
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
            <div className="vertical-item">
                <div className="icon">
                    <img src={icon} alt="icon" style={{width: 160}} />
                    </div>
                <div style={{fontSize: window.innerWidth < 500 ? 10 : 20, fontWeight: 'bold'}}>드래그해서 파일 첨부</div>
            </div>
        </label>
  
        <div className="DragDrop-Files">
          {files.length > 0 &&
            files.map((file: IFileTypes) => {
              const {
                id,
                object: { name }
              } = file;
  
              return (
                <div key={id}>
                  <div>{name}</div>
                  {/* <div
                    className="DragDrop-Files-Filter"
                    onClick={() => handleFilterFile(id)}
                  >
                    X
                  </div> */}
                </div>
              );
            })}
        </div>
      </div>
    );
  };
  
  export default DragDrop;