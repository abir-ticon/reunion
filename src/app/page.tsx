import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroBanner />
      <AboutSection />
      <Footer />
    </div>
  );
}
