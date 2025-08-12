import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import PlaybookSection from "@/components/playbook-section";
import ServicesSection from "@/components/services-section";
import IndustriesSection from "@/components/industries-section";
import TestimonialsSection from "@/components/testimonials-section";
import { BlogSection } from "@/components/blog-section";
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

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'playbook', 'services', 'industries', 'testimonials', 'blog', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={scrollToSection}
        onBookingClick={() => setIsBookingModalOpen(true)}
      />
      
      <main className="relative">
        <HeroSection onBookingClick={() => setIsBookingModalOpen(true)} onPlaybookClick={() => scrollToSection("playbook")} />
        <PlaybookSection />
        <ServicesSection />
        <IndustriesSection />
        <TestimonialsSection />
        <section id="blog">
          <BlogSection />
        </section>
        <AboutSection />
        <ContactSection />
      </main>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
      
      <ChatBot />
    </div>
  );
}
