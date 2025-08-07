import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CalendarCheck, Phone, Mail, MapPin, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessType: "",
    challenge: ""
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your message has been sent. We'll be in touch soon!",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        businessType: "",
        challenge: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section 
      id="contact" 
      className="min-h-screen bg-slate-800 py-20 px-8 flex items-center"
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Build Your Local Growth Engine?</h2>
        <p className="text-xl text-slate-300 mb-8">
          Let's talk. No fluff. No pressure. Just a strategy call to see where your business is now—and how far we can take it with the RBC Playbook.
        </p>
        
        <div className="bg-slate-700 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6">Book Your Free Strategy Call</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:border-accent focus:outline-none"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:border-accent focus:outline-none"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:border-accent focus:outline-none"
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:border-accent focus:outline-none"
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div>
              <Label htmlFor="businessType" className="block text-sm font-medium text-slate-300 mb-2">
                Business Type
              </Label>
              <Select onValueChange={(value) => handleInputChange("businessType", value)}>
                <SelectTrigger className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-white focus:border-accent focus:outline-none">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">Medical & Wellness</SelectItem>
                  <SelectItem value="home-services">Home Services</SelectItem>
                  <SelectItem value="financial">Financial Services</SelectItem>
                  <SelectItem value="legal">Legal Services</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="education">Education & Coaching</SelectItem>
                  <SelectItem value="beauty">Beauty & Wellness</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="challenge" className="block text-sm font-medium text-slate-300 mb-2">
                Current Marketing Challenge
              </Label>
              <Textarea
                id="challenge"
                value={formData.challenge}
                onChange={(e) => handleInputChange("challenge", e.target.value)}
                className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:border-accent focus:outline-none h-24 resize-none"
                placeholder="Tell us about your biggest marketing challenge..."
              />
            </div>
            
            <Button
              type="submit"
              disabled={contactMutation.isPending}
              className="w-full bg-accent hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors transform hover:scale-105"
            >
              <CalendarCheck className="mr-2" size={18} />
              {contactMutation.isPending ? "Sending..." : "Book My Free Strategy Call"}
            </Button>
          </form>
          
          <div className="mt-6 text-sm text-slate-400 flex items-center justify-center">
            <Lock className="mr-2" size={16} />
            Your information is secure and will never be shared.
          </div>
        </div>
        
        {/* Alternative Contact Methods */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-white" size={20} />
            </div>
            <h4 className="font-semibold mb-2">Call Us</h4>
            <p className="text-slate-400">+91 60017 94978</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-white" size={20} />
            </div>
            <h4 className="font-semibold mb-2">Email Us</h4>
            <p className="text-slate-400">hello@rbcdigitalagency.com</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-white" size={20} />
            </div>
            <h4 className="font-semibold mb-2">Visit Us</h4>
            <p className="text-slate-400">Pathsala-781325, Bajali (Assam)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
