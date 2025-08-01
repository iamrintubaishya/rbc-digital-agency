import { Heart, Wrench, DollarSign, Scale, Home, GraduationCap, Sparkles, Plus } from "lucide-react";

export default function IndustriesSection() {
  const industries = [
    {
      icon: Heart,
      title: "Medical & Wellness",
      description: "Chiropractors, Dentists, MedSpas, Aesthetics",
      color: "bg-blue-500"
    },
    {
      icon: Wrench,
      title: "Home Services",
      description: "Plumbers, HVAC, Electricians, Cleaning",
      color: "bg-orange-500"
    },
    {
      icon: DollarSign,
      title: "Financial Services",
      description: "Advisors, Insurance, Mortgage Specialists",
      color: "bg-green-500"
    },
    {
      icon: Scale,
      title: "Legal Services",
      description: "Law Firms, Injury Lawyers, Attorneys",
      color: "bg-purple-500"
    },
    {
      icon: Home,
      title: "Real Estate",
      description: "Realtors, Property Managers, Loan Officers",
      color: "bg-red-500"
    },
    {
      icon: GraduationCap,
      title: "Education & Coaching",
      description: "Tutors, Coaches, Course Creators",
      color: "bg-indigo-500"
    },
    {
      icon: Sparkles,
      title: "Beauty & Wellness",
      description: "Salons, Spas, Boutique Gyms",
      color: "bg-pink-500"
    },
    {
      icon: Plus,
      title: "And More",
      description: "Custom solutions for your industry",
      color: "bg-yellow-500"
    }
  ];

  return (
    <section 
      id="industries" 
      className="min-h-screen bg-slate-900 py-20 px-8 flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Industries We Serve</h2>
          <p className="text-xl text-slate-400">Specialized strategies for growth-focused local businesses</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-6 text-center hover:scale-105 transition-transform cursor-pointer"
              >
                <div className={`w-16 h-16 ${industry.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{industry.title}</h3>
                <p className="text-slate-400 text-sm">{industry.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
