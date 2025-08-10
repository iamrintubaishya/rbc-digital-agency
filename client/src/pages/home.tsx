import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import PlaybookSection from "@/components/playbook-section";
import ServicesSection from "@/components/services-section";
import IndustriesSection from "@/components/industries-section";
import TestimonialsSection from "@/components/testimonials-section";
// Removed blog component imports - using inline blog section for reliability
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
        <section id="blog" className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-6 lg:px-16 xl:px-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Latest Insights
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Expert insights and proven strategies to grow your business
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1553729784-e91953dec042?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Local SEO Guide"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    The Complete Guide to Local SEO for Service Businesses
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Master local SEO strategies that help service businesses dominate their geographic markets.
                  </p>
                  <div className="flex items-center text-sm text-slate-500">
                    <span>Michael Rodriguez</span>
                    <span className="mx-2">•</span>
                    <span>8 min read</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Analytics Guide"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Analytics and Data-Driven Marketing: Making Smarter Decisions
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Learn how to leverage analytics and data science to make smarter marketing decisions.
                  </p>
                  <div className="flex items-center text-sm text-slate-500">
                    <span>Dr. Sarah Kim</span>
                    <span className="mx-2">•</span>
                    <span>6 min read</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Social Media Automation"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Social Media Automation: Scale Your Content Without Losing Authenticity
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Discover how to automate your social media presence while maintaining genuine connections.
                  </p>
                  <div className="flex items-center text-sm text-slate-500">
                    <span>Jessica Martinez</span>
                    <span className="mx-2">•</span>
                    <span>7 min read</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Email Marketing"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Email Marketing That Converts: Advanced Segmentation Strategies
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Transform your email campaigns with sophisticated segmentation and personalization techniques.
                  </p>
                  <div className="flex items-center text-sm text-slate-500">
                    <span>David Chen</span>
                    <span className="mx-2">•</span>
                    <span>9 min read</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Landing Page Psychology"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    The Psychology of High-Converting Landing Pages
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Understanding the psychological triggers that turn visitors into customers.
                  </p>
                  <div className="flex items-center text-sm text-slate-500">
                    <span>Dr. Emily Watson</span>
                    <span className="mx-2">•</span>
                    <span>5 min read</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Video Marketing Trends"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Video Marketing Trends That Will Dominate 2024
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Stay ahead of the curve with the latest video marketing strategies and platforms.
                  </p>
                  <div className="flex items-center text-sm text-slate-500">
                    <span>Marcus Thompson</span>
                    <span className="mx-2">•</span>
                    <span>6 min read</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="AI Customer Service"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    AI-Powered Customer Service: Implementation Guide
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Learn how to integrate AI tools to enhance your customer service operations.
                  </p>
                  <div className="flex items-center text-sm text-slate-500">
                    <span>Rachel Park</span>
                    <span className="mx-2">•</span>
                    <span>7 min read</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1542744094-24638eff58bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Content Marketing ROI"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Content Marketing ROI: Measuring What Matters
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Essential metrics and strategies for tracking your content marketing success.
                  </p>
                  <div className="flex items-center text-sm text-slate-500">
                    <span>Alex Foster</span>
                    <span className="mx-2">•</span>
                    <span>8 min read</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Mobile-First Design"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Mobile-First Design: Optimizing for the Smartphone Era
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Best practices for creating mobile experiences that convert and engage.
                  </p>
                  <div className="flex items-center text-sm text-slate-500">
                    <span>Sofia Rodriguez</span>
                    <span className="mx-2">•</span>
                    <span>6 min read</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                View All Articles
              </button>
            </div>
          </div>
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
