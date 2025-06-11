import { useCallback, useState } from "react";

type UseModalStateReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export function useModalState(): UseModalStateReturn {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
};
