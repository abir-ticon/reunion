"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
  isInfoModalOpen: boolean;
  isRegistrationModalOpen: boolean;
  openInfoModal: () => void;
  closeInfoModal: () => void;
  openRegistrationModal: () => void;
  closeRegistrationModal: () => void;
  // Legacy support - maps to registration modal
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const openInfoModal = () => setIsInfoModalOpen(true);
  const closeInfoModal = () => setIsInfoModalOpen(false);
  const openRegistrationModal = () => setIsRegistrationModalOpen(true);
  const closeRegistrationModal = () => setIsRegistrationModalOpen(false);

  // Legacy support
  const openModal = () => setIsRegistrationModalOpen(true);
  const closeModal = () => setIsRegistrationModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isInfoModalOpen,
        isRegistrationModalOpen,
        openInfoModal,
        closeInfoModal,
        openRegistrationModal,
        closeRegistrationModal,
        // Legacy
        isModalOpen: isRegistrationModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
