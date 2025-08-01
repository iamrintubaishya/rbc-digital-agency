import { useState } from "react";
import Sidebar from "@/components/sidebar";
import HeroSection from "@/components/hero-section";
import PlaybookSection from "@/components/playbook-section";
import ServicesSection from "@/components/services-section";
import IndustriesSection from "@/components/industries-section";
import TestimonialsSection from "@/components/testimonials-section";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import BookingModal from "@/components/booking-modal";
import ChatBot from "@/components/chat-bot";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={scrollToSection}
        onBookingClick={() => setIsBookingModalOpen(true)}
      />
      
      <main className="ml-80 h-screen overflow-x-auto scroll-smooth" style={{ scrollSnapType: "x mandatory" }}>
        <div className="flex h-full">
          <HeroSection onBookingClick={() => setIsBookingModalOpen(true)} onPlaybookClick={() => scrollToSection("playbook")} />
          <PlaybookSection />
          <ServicesSection />
          <IndustriesSection />
          <TestimonialsSection />
          <AboutSection />
          <ContactSection />
        </div>
      </main>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
      
      <ChatBot />
    </div>
  );
}
