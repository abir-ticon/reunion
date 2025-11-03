"use client";

// import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import RegistrationInfoModal from "@/components/RegistrationInfoModal";
import RegistrationModal from "@/components/RegistrationModal";
import { ModalProvider, useModal } from "@/contexts/ModalContext";

function AppContent() {
  const {
    isInfoModalOpen,
    isRegistrationModalOpen,
    closeInfoModal,
    openRegistrationModal,
    closeRegistrationModal,
  } = useModal();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20 md:pt-20">
        <HeroBanner />
        {/* <AboutSection /> */}
        <Footer />
      </div>

      {/* Registration Info Modal */}
      <RegistrationInfoModal
        isOpen={isInfoModalOpen}
        onClose={closeInfoModal}
        onConfirm={openRegistrationModal}
      />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={closeRegistrationModal}
      />
    </div>
  );
}

export default function Home() {
  return (
    <ModalProvider>
      <AppContent />
    </ModalProvider>
  );
}
