import { ModalStyle, Overlay } from './Modal.styled';
import { useEffect } from 'react';

export const Modal = ({ selectedPhoto: { largeImageURL, tags }, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscapeCloseModal);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onEscapeCloseModal);
      document.body.style.overflow = 'auto';
    };
  }, [onEscapeCloseModal]);

  function onEscapeCloseModal(event) {
    if (event.code === 'Escape') {
      onClose();
    }
  }

  const onClickOverlay = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={onClickOverlay}>
      <ModalStyle>
        <img src={largeImageURL} alt={tags} />
      </ModalStyle>
    </Overlay>
  );
};
