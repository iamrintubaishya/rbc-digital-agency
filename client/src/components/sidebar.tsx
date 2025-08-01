import { Rocket, Home, BookOpen, Cog, Building, Quote, Users, Mail, CalendarCheck } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onBookingClick: () => void;
}

export default function Sidebar({ activeSection, onSectionChange, onBookingClick }: SidebarProps) {
  const navigationItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "playbook", label: "Growth Playbook", icon: BookOpen },
    { id: "services", label: "Services", icon: Cog },
    { id: "industries", label: "Industries", icon: Building },
    { id: "testimonials", label: "Testimonials", icon: Quote },
    { id: "about", label: "About Us", icon: Users },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 z-50 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Rocket className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">RBC Digital</h1>
            <p className="text-sm text-slate-400">Growth Agency</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 p-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* CTA Button */}
      <div className="p-6 border-t border-slate-700">
        <button
          onClick={onBookingClick}
          className="w-full bg-accent hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <CalendarCheck size={18} />
          <span>Free Strategy Call</span>
        </button>
      </div>
    </aside>
  );
}
