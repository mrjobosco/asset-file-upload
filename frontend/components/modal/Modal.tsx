import React, { ReactNode, MouseEvent } from "react";
import { Button } from "../button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export function Modal(props: ModalProps): React.ReactElement | null {
  const { isOpen, onClose, children, title } = props;
  if (!isOpen) return null;


  const handleModalClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg min-w-[300px] max-w-[500px] p-6 shadow-lg relative"
        onClick={handleModalClick}
      >
        <div className="flex items-center justify-between">
          {title && <h3 className="mt-0 text-lg font-md">{title}</h3>}
          <Button
            onClick={onClose}
            className="absolute top-3 right-3 bg-transparent !text-black hover:!bg-gray-100"
            aria-label="Close modal"
          >
            Close &times;
          </Button>
        </div>
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
}
