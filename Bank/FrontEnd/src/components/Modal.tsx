import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaTriangleExclamation } from "react-icons/fa6";
import { FaExclamation } from "react-icons/fa";
import Wrapper from "../assets/stylingWrappers/Modal";

interface IModalProps {
  isOpened: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

function Modal({ isOpened, onCancel, onConfirm }: IModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    isOpened ? dialog.current?.showModal() : dialog.current?.close();
  }, [isOpened]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onCancel}>
      <Wrapper>
        <h3 className="title">close account</h3>
        <FaTriangleExclamation />
        <div className="message">
          <p>
            To close an account it must maintain a balance of ₪{" "}
            <strong>0</strong> .
          </p>
          <p>
            <FaExclamation /> This action is not revertable <FaExclamation />
          </p>
        </div>
        <div className="btns">
          <button className="cancel-btn" onClick={onCancel}>
            cancel
          </button>
          <button className="ok-btn" onClick={onConfirm}>
            confirm
          </button>
        </div>
      </Wrapper>
    </dialog>,
    document.getElementById("modal")!
  );
}

export default Modal;
