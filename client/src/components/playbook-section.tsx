import { useState } from "react";
import { Share, Volume2, Bot, Monitor, TrendingUp, Check } from "lucide-react";

export default function PlaybookSection() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "Social Media", icon: Share },
    { id: 2, label: "Ad Marketing", icon: Volume2 },
    { id: 3, label: "AI Automation", icon: Bot },
    { id: 4, label: "Landing Pages", icon: Monitor },
    { id: 5, label: "Analytics", icon: TrendingUp },
  ];

  const content = {
    1: {
      title: "Social Media Content Creation",
      description: "Win attention, build trust, and convert followers into fans with content that actually works for local businesses.",
      features: [
        "Daily & weekly posts across all platforms",
        "Branded visuals aligned with your business",
        "Reels, carousels, and video-first strategies",
        "Content calendar & post scheduling"
      ],
      testimonial: "Our content used to be random. Now it's strategic, on-brand, and brings in calls weekly.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    2: {
      title: "Ad Marketing (Meta & Google)",
      description: "Turn targeted traffic into real leads with highly targeted campaigns for people actively looking for your services.",
      features: [
        "Facebook & Instagram Ads",
        "Google Ads (Search, Maps, Display)",
        "Full-funnel strategy from creative to conversion",
        "A/B testing & campaign management"
      ],
      testimonial: "We spent less and got better results. RBC made every ad dollar count.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    3: {
      title: "AI Automation & CRM",
      description: "Never miss a lead again. Let smart systems do the follow-up while your team focuses on serving customers.",
      features: [
        "AI chatbots for instant replies",
        "Automated email sequences",
        "Lead qualification & booking flows",
        "CRM integration"
      ],
      testimonial: "Now leads get followed up with in 30 seconds, even when we're closed.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    4: {
      title: "Landing Pages & Funnel Systems",
      description: "Websites don't convert. Funnels do. We build sleek, mobile-optimized pages that convert clicks into customers.",
      features: [
        "Custom landing pages for each service",
        "Calendar & payment system integration",
        "Lead magnets & contact capture",
        "A/B tested designs for optimization"
      ],
      testimonial: "Our new funnel got 112 leads in the first 14 days.",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    5: {
      title: "Analytics & Optimization",
      description: "What gets measured gets improved. Every campaign comes with data dashboards and monthly reviews.",
      features: [
        "Lead tracking & cost-per-lead reporting",
        "Ad performance dashboards",
        "Monthly strategy calls",
        "Real-time funnel metrics"
      ],
      testimonial: "I know what we spent, what we made, and what's next. That's powerful.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    }
  };

  const currentContent = content[activeTab as keyof typeof content];

  return (
    <section 
      id="playbook" 
      className="min-w-full h-full bg-slate-900 p-8 flex items-center"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">The RBC Growth Playbook</h2>
          <p className="text-xl text-slate-400">5 Core Services That Drive Local Results</p>
        </div>
        
        {/* Tabbed Interface */}
        <div className="bg-slate-800 rounded-2xl p-8">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? "bg-primary text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* Tab Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">{currentContent.title}</h3>
              <p className="text-slate-300 mb-6">{currentContent.description}</p>
              <ul className="space-y-3">
                {currentContent.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="text-accent mr-3" size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-slate-700 rounded-lg p-4 mt-6">
                <p className="italic text-slate-300">"{currentContent.testimonial}"</p>
              </div>
            </div>
            <img 
              src={currentContent.image} 
              alt={currentContent.title}
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
