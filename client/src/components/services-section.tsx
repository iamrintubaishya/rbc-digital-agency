import { Rocket, MessageSquare, Target, TrendingUp, Settings, Shield } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Rocket,
      title: "Fast Turnaround",
      description: "Done-for-you delivery with quick implementation and immediate results."
    },
    {
      icon: MessageSquare,
      title: "Clear Communication",
      description: "Dedicated strategist with transparent reporting and regular updates."
    },
    {
      icon: Target,
      title: "Industry-Specific",
      description: "Strategies based on what actually works in your specific industry."
    },
    {
      icon: TrendingUp,
      title: "Scalable Systems",
      description: "Built for long-term ROI and sustainable business growth."
    },
    {
      icon: Settings,
      title: "One-Stop Shop",
      description: "Strategy, creative, tech, and execution all under one roof."
    },
    {
      icon: Shield,
      title: "Proven Results",
      description: "Track record of success with 500+ local businesses served."
    }
  ];

  return (
    <section 
      id="services" 
      className="min-w-full h-full bg-slate-800 p-8 flex items-center"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Local Businesses Choose RBC</h2>
          <p className="text-xl text-slate-400">Get a full marketing team for less than the cost of hiring one person</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="bg-slate-700 rounded-xl p-6 hover:bg-slate-600 transition-colors transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-slate-300">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
