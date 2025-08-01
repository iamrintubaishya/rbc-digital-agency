import { useState } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help you learn more about RBC Digital Agency. What would you like to know?",
      isBot: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: "Thanks for your message! I'd be happy to help you learn more about our services. Would you like to schedule a free strategy call?",
        isBot: true
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-accent hover:bg-green-600 rounded-full shadow-lg transition-all transform hover:scale-110"
      >
        <MessageSquare className="text-white" size={24} />
      </Button>
      
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 h-96 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700">
          <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Bot className="text-white" size={16} />
              </div>
              <div>
                <h4 className="font-semibold">RBC Assistant</h4>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${message.isBot ? "" : "text-right"}`}
              >
                <div
                  className={`inline-block max-w-xs p-3 rounded-lg text-sm ${
                    message.isBot
                      ? "bg-slate-700 text-slate-100"
                      : "bg-primary text-white"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-slate-700">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-accent focus:outline-none text-sm"
                placeholder="Type your message..."
              />
              <Button
                onClick={sendMessage}
                className="bg-accent hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
