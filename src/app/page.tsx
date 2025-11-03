"use client";

// import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import RegistrationModal from "@/components/RegistrationModal";
import { ModalProvider, useModal } from "@/contexts/ModalContext";

function AppContent() {
  const { isModalOpen, closeModal } = useModal();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20 md:pt-20">
        <HeroBanner />
        {/* <AboutSection /> */}
        <Footer />
      </div>

      {/* Registration Modal - Now at app level */}
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
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
