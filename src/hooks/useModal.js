import { useRef } from "react";

export function useModal() {
  const modalRef = useRef();

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return { modalRef, openModal, closeModal };
}
