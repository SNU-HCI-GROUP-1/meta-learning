import { useEffect, useRef } from 'react';
import styles from './ModalBasic.module.css';
import "./Modal.css";

type Props = {
    setModalOpen: (isopen: boolean) => void;
    title: String;
    subtitle: String;
    cancel: String;
    submit: String;
    submitButtonHandler: (prop: any) => void;
    theme: Boolean;
}

const Modal = ({ setModalOpen, submitButtonHandler, title, subtitle, cancel, submit, theme }: Props) => {
    const closeModal = () => {
        setModalOpen(false);
    };

    const modalRef = useRef<HTMLDivElement>(null);


    return (
        <div style={{ position: 'absolute', zIndex: 998, backgroundColor: 'rgba(0,0,0,0.5)', width: '100%', height: '100%' }}>
            <div ref={modalRef} className='modal-container noto-sans-kr'>
                <div style={{ position: 'relative', height: '100%' }}>
                    <div className='modal-title noto-sans-kr-bold'>{title}</div>
                    <div className='modal-subtitle'>{subtitle}</div>
                    <div className='modal-item-wrapper noto-sans-kr-bold' style={{ display: 'flex' }}>
                        <div className='modal-item cancel' onClick={closeModal}>{cancel}</div>
                        <div className={`modal-item ${theme ? 'submit' : 'report'}`} onClick={submitButtonHandler}>{submit}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Modal;