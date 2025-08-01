import { Check } from "lucide-react";

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="min-h-screen bg-slate-900 py-20 px-8 flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">About RBC Digital Agency</h2>
          <p className="text-xl text-slate-400">Empowering local businesses with agency-level digital marketing</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              To empower small and medium local businesses with agency-level digital marketing—without the bloated retainers, missed deadlines, or confusing tech. Whether you're a chiropractor, plumber, attorney, real estate broker, financial planner, coach, or beauty spa, we give you the same edge big brands enjoy—with a system tailored for your neighborhood and your audience.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mr-4 mt-1">
                  <Check className="text-white" size={14} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Local Focus</h4>
                  <p className="text-slate-400">We understand the unique challenges of local businesses and create strategies that work in your community.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mr-4 mt-1">
                  <Check className="text-white" size={14} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Proven Systems</h4>
                  <p className="text-slate-400">Our 5-part Digital Growth Playbook has been tested and refined across hundreds of businesses.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mr-4 mt-1">
                  <Check className="text-white" size={14} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Transparent Results</h4>
                  <p className="text-slate-400">Clear reporting and measurable outcomes so you always know your ROI.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <img 
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
              alt="Executive team meeting" 
              className="rounded-xl shadow-lg w-full"
            />
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-accent mb-1">5+</div>
                <div className="text-sm text-slate-400">Years Experience</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-accent mb-1">50+</div>
                <div className="text-sm text-slate-400">Team Members</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-accent mb-1">24/7</div>
                <div className="text-sm text-slate-400">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
