import { Rocket, Play } from "lucide-react";

interface HeroSectionProps {
  onBookingClick: () => void;
  onPlaybookClick: () => void;
}

export default function HeroSection({ onBookingClick, onPlaybookClick }: HeroSectionProps) {
  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative pt-16"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 0%), 
                         radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2%, transparent 0%)`,
        backgroundSize: "100px 100px"
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 text-center max-w-4xl px-8">
        <div className="animate-fade-in">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Grow Local.<br />
            <span className="text-accent">Scale Smart.</span><br />
            Dominate Digital.
          </h1>
          <p className="text-xl text-slate-200 mb-8 leading-relaxed">
            At RBC Digital Agency, we help local service businesses turn online attention into booked appointments, qualified leads, and long-term growth through our proven 5-part Digital Growth Playbook.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBookingClick}
              className="bg-accent hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Rocket size={20} />
              <span>Start Your Growth Journey</span>
            </button>
            <button
              onClick={onPlaybookClick}
              className="glassmorphism text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all flex items-center justify-center space-x-2"
            >
              <Play size={20} />
              <span>View Our Playbook</span>
            </button>
          </div>
        </div>
        
        {/* Floating Stats Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glassmorphism rounded-lg p-6 animate-float">
            <div className="text-3xl font-bold text-accent mb-2">500+</div>
            <div className="text-slate-300">Local Businesses Served</div>
          </div>
          <div className="glassmorphism rounded-lg p-6 animate-float" style={{ animationDelay: "0.2s" }}>
            <div className="text-3xl font-bold text-accent mb-2">$2.5M+</div>
            <div className="text-slate-300">Revenue Generated</div>
          </div>
          <div className="glassmorphism rounded-lg p-6 animate-float" style={{ animationDelay: "0.4s" }}>
            <div className="text-3xl font-bold text-accent mb-2">95%</div>
            <div className="text-slate-300">Client Retention Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
