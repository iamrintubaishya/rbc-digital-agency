import { Rocket, Home, BookOpen, Cog, Building, Quote, Users, Mail, CalendarCheck, Menu, X, PenTool, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onBookingClick: () => void;
}

export default function Navigation({ activeSection, onSectionChange, onBookingClick }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "playbook", label: "Playbook", icon: BookOpen },
    { id: "services", label: "Services", icon: Cog },
    { id: "industries", label: "Industries", icon: Building },
    { id: "testimonials", label: "Testimonials", icon: Quote },
    { id: "blog", label: "Blog", icon: PenTool },
    { id: "about", label: "About", icon: Users },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Rocket className="text-white" size={16} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">RBC Digital</h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          
          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onBookingClick}
              className="hidden sm:flex bg-accent hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors items-center space-x-2"
            >
              <CalendarCheck size={16} />
              <span>Free Call</span>
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-700"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => {
                  onBookingClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-accent hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 mt-4"
              >
                <CalendarCheck size={18} />
                <span>Free Strategy Call</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}