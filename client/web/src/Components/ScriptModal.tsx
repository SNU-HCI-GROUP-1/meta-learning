import { useEffect, useRef } from 'react';
import "./ScriptModal.css";
import defaultContents from '../pages/Editor/testDefault';



type Props = {
    setModalOpen: (isopen: boolean) => void;
    contents: string;
    setContents: (contents: string) => void;
}



const ScriptModal = ({ setModalOpen, contents, setContents }: Props) => {
    const closeModal = () => {
        setModalOpen(false);
    };

    const modalRef = useRef<HTMLDivElement>(null);

    return (
        <div style={{ position: 'absolute', zIndex: 998, backgroundColor: 'rgba(0,0,0,0.5)', width: '100%', height: '100%' }}>
            <div ref={modalRef} className='script-modal-container noto-sans-kr'>
                <div style={{ position: 'relative', height: '100%', paddingBottom: 72, paddingTop: 20 }}>
                    <div className='script-text'>
                        {contents == '' ? defaultContents : contents }
                    </div>
                    <div className='modal-item-wrapper noto-sans-kr-bold' style={{ display: 'flex' }}>
                        <div className='modal-item submit' onClick={closeModal}>돌아가기</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ScriptModal;