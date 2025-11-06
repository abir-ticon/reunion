"use client";

// import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import RegistrationInfoModal from "@/components/RegistrationInfoModal";
import RegistrationModal from "@/components/RegistrationModal";
import VerifyRegistration from "@/components/VerifyRegistration";
import { ModalProvider, useModal } from "@/contexts/ModalContext";
import { useEffect, useRef, useState } from "react";

function AppContent() {
  const {
    isInfoModalOpen,
    isRegistrationModalOpen,
    closeInfoModal,
    openRegistrationModal,
    closeRegistrationModal,
  } = useModal();
  const [showVerificationCard, setShowVerificationCard] = useState(false);
  const verificationRef = useRef<HTMLDivElement>(null);

  const handleVerifyClick = () => {
    setShowVerificationCard(true);
  };

  useEffect(() => {
    if (showVerificationCard && verificationRef.current) {
      setTimeout(() => {
        verificationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [showVerificationCard]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20 md:pt-20">
        <HeroBanner onVerifyClick={handleVerifyClick} />
        {/* Verification Card */}
        {showVerificationCard && (
          <div ref={verificationRef}>
            <VerifyRegistration
              onClose={() => setShowVerificationCard(false)}
            />
          </div>
        )}
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
