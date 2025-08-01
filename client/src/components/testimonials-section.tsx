import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Sarah K.",
      role: "Wellness Clinic Owner",
      quote: "I went from barely getting any leads to having to hire more help in 6 weeks. The RBC team understood my business immediately and created content that resonates with my ideal clients."
    },
    {
      name: "Jason M.",
      role: "Mortgage Advisor", 
      quote: "RBC didn't just build us a funnel—they built us a growth engine. Our lead quality improved dramatically, and we're closing more deals than ever before."
    },
    {
      name: "Maria R.",
      role: "Legal Practice Owner",
      quote: "The automation system they set up means we never miss a potential client. Every lead gets immediate attention, even outside business hours."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="testimonials" 
      className="min-w-full h-full bg-slate-800 p-8 flex items-center"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Real Results from Local Clients</h2>
          <p className="text-xl text-slate-400">See how we've helped businesses like yours grow</p>
        </div>
        
        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full">
                  <div className="bg-slate-700 rounded-2xl p-8 mx-4">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mr-4">
                        <User className="text-white" size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                        <p className="text-slate-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <blockquote className="text-lg text-slate-300 mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-600 hover:bg-slate-500 rounded-full p-3 transition-colors"
          >
            <ChevronLeft className="text-white" size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-slate-600 hover:bg-slate-500 rounded-full p-3 transition-colors"
          >
            <ChevronRight className="text-white" size={20} />
          </button>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? "bg-accent" : "bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
