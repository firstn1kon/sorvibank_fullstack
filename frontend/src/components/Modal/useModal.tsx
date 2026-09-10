import { useState } from 'react';

import Modal from './Modal';
interface IUseModal {
    Component: React.ReactNode;
}

const useModal = ({ Component }: IUseModal) => {
    const [isOpen, setOpen] = useState(false);

    const closeModal = () => {
        setOpen(false);
    };

    const openModal = () => {
        setOpen(true);
    };

    const renderModal = isOpen ? <Modal close={closeModal}>{Component}</Modal> : null;

    return { renderModal, openModal };
};

export default useModal;
