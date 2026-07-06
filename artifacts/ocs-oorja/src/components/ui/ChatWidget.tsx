

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "@/data/brand";

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  showWhatsApp?: boolean;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const COMPANY_PHONE = "917521803995"; // WhatsApp format (no + or spaces)
  const COMPANY_PHONE_DISPLAY = "7521803995";
  const COMPANY_EMAIL = CONTACT.email;
  const COMPANY_ADDRESS = "Commercial Unit No. 304, Royal Plaza, Block-3, IT Park-2, Sushant Golf City, Lucknow";

  // Intelligence functions for message analysis
  const detectIntent = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    // Greeting detection
    if (/^(hi|hello|hey|hii|namaste|greetings?)\b/i.test(lowerMsg)) {
      return "greeting";
    }
    
    // Pricing queries
    if (/\b(price|cost|how much|rate|pricing|quote|quotation)\b/i.test(lowerMsg)) {
      return "pricing";
    }
    
    // Location/Address queries
    if (/\b(address|location|where|visit|office|showroom|directions?)\b/i.test(lowerMsg)) {
      return "location";
    }
    
    // Availability queries
    if (/\b(available|availability|in stock|stock|buy|purchase|order)\b/i.test(lowerMsg)) {
      return "availability";
    }
    
    // Warranty queries
    if (/\b(warranty|guarantee|support|service)\b/i.test(lowerMsg)) {
      return "warranty";
    }
    
    return "product";
  };

  const detectProducts = (message: string): string[] => {
    const lowerMsg = message.toLowerCase();
    const products: string[] = [];
    
    if (/\b(inverter|hybrid inverter|solar inverter|mppt)\b/i.test(lowerMsg)) {
      products.push("Solar Inverters");
    }
    if (/\b(battery|batteries|lifepo4|lfp|lithium)\b/i.test(lowerMsg)) {
      products.push("LiFePO₄ Batteries");
    }
    if (/\b(charger|charging|ev charger|smart charger)\b/i.test(lowerMsg)) {
      products.push("EV Chargers");
    }
    if (/\b(e-rickshaw|erickshaw|e rickshaw|auto)\b/i.test(lowerMsg)) {
      products.push("E-Rickshaw Solutions");
    }
    if (/\b(e-bike|ebike|electric bike|two wheeler)\b/i.test(lowerMsg)) {
      products.push("E-Bike Batteries");
    }
    if (/\b(solar|solar panel|renewable|green energy)\b/i.test(lowerMsg)) {
      products.push("Solar Energy Storage");
    }
    if (/\b(home|home storage|residential|backup)\b/i.test(lowerMsg)) {
      products.push("Home Energy Storage");
    }
    
    return products;
  };


  const generateIntelligentResponse = (message: string): string => {
    const intent = detectIntent(message);
    const products = detectProducts(message);
    
    switch (intent) {
      case "greeting":
        return `Hello! 👋 Welcome to OCS OORJA. We're India's trusted manufacturer of LiFePO₄ batteries, hybrid inverters, and EV charging solutions.\n\nHow can I assist you today? Feel free to ask about our products, pricing, or availability!`;
      
      case "pricing":
        const pricingProducts = products.length > 0 
          ? products.join(", ") 
          : "our products";
        return `Thank you for your interest in ${pricingProducts}! 💰\n\nOur pricing varies based on specifications and requirements. For accurate pricing and custom quotes:\n\n📞 Call: ${COMPANY_PHONE_DISPLAY}\n📧 Email: ${COMPANY_EMAIL}\n\nOr connect with us on WhatsApp for instant pricing details!`;
      
      case "location":
        return `📍 You can visit us at:\n\n${COMPANY_ADDRESS}\n\nWould you like directions or want to schedule a visit? Connect with us on WhatsApp!`;
      
      case "availability":
        const availProducts = products.length > 0 
          ? products.join(", ") 
          : "our products";
        return `Great choice! We have ${availProducts} available. ✅\n\nFor current stock status and delivery timelines:\n\n📞 ${COMPANY_PHONE_DISPLAY}\n📧 ${COMPANY_EMAIL}\n\nConnect with us on WhatsApp for immediate assistance!`;
      
      case "warranty":
        return `All OCS OORJA products come with comprehensive warranty coverage! 🛡️\n\n• LiFePO₄ Batteries: Up to 5 years\n• Inverters: 2-3 years\n• EV Chargers: 3-5 years\n\nFor specific warranty details:\n📞 ${COMPANY_PHONE_DISPLAY}\n\nConnect on WhatsApp for more information!`;
      
      default:
        if (products.length > 0) {
          return `Excellent! You're interested in ${products.join(", ")}. 🔋⚡\n\nWe offer premium quality products designed for Indian conditions. Our ${products.join(" and ")} are trusted by customers across India.\n\n📞 Call: ${COMPANY_PHONE_DISPLAY}\n📧 Email: ${COMPANY_EMAIL}\n\nConnect with us on WhatsApp for detailed specifications and pricing!`;
        }
        return `Thank you for reaching out to OCS OORJA! 🙏\n\nWe specialize in:\n✓ LiFePO₄ Batteries\n✓ Solar Hybrid Inverters\n✓ EV Charging Solutions\n\n📞 ${COMPANY_PHONE_DISPLAY}\n📧 ${COMPANY_EMAIL}\n\nHow can we help you today? Connect on WhatsApp for instant assistance!`;
    }
  };

  // Show widget after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show message 500ms after icon appears for smooth effect
      setTimeout(() => {
        setShowMessage(true);
      }, 500);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  // Hide the message when chat is opened or after 8 seconds
  useEffect(() => {
    if (isOpen) {
      setShowMessage(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (showMessage) {
      const hideTimer = setTimeout(() => {
        setShowMessage(false);
      }, 8000);
      return () => clearTimeout(hideTimer);
    }
    return undefined;
  }, [showMessage]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Welcome message when chat is opened for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        text: "👋 Welcome to OCS OORJA! How can we help you today? Feel free to ask about our inverters, chargers, batteries, or any other products.",
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");

    // Intelligent bot response based on message analysis
    setTimeout(() => {
      const intelligentResponse = generateIntelligentResponse(currentInput);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: intelligentResponse,
        showWhatsApp: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const handleWhatsAppClick = (productQuery: string) => {
    const products = detectProducts(productQuery);
    const productText = products.length > 0 
      ? products.join(", ") 
      : productQuery;
    
    const message = `Hi OCS OORJA! 👋\n\nI'm interested in ${productText}.\n\nI found you on ocsoorja.com and would like to know more about your products.\n\nLooking forward to hearing from you!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${COMPANY_PHONE}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Chat Button with Message */}
      {!isOpen && (
        <div
          className="fixed z-50 flex items-center gap-3 right-4 bottom-4 sm:right-6 sm:bottom-6"
          style={{ right: 'max(1rem, env(safe-area-inset-right))', bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          {/* Expandable Message */}
          <div
            className={`transform transition-all duration-500 ease-out ${
              showMessage
                ? "translate-x-0 opacity-100 scale-100"
                : "translate-x-4 opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="relative">
              <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl px-3 py-2.5 max-w-[70vw] sm:max-w-[220px]">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    How can I help you?
                  </p>
                </div>
              </div>
              {/* Arrow pointing to button */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%-1px)]">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-gray-200 dark:border-l-gray-700"></div>
                <div className="absolute top-1/2 -translate-y-1/2 right-[1px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[7px] border-l-white dark:border-l-gray-900"></div>
              </div>
            </div>
          </div>

          {/* Chat Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/50 hover:rotate-12"
            aria-label="Open chat"
          >
            {/* Animated gradient ring */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
            
            {/* Icon */}
            <MessageCircle className="relative h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
            
            {/* Pulse indicator */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full bg-green-400 shadow-lg"></span>
            </span>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed z-50 flex flex-col rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl animate-in slide-in-from-bottom-4 duration-300 right-4 bottom-4 sm:right-6 sm:bottom-6 w-[calc(100vw-2rem)] max-w-[400px] h-[calc(100vh-6rem)] max-h-[560px]"
          style={{ right: 'max(1rem, env(safe-area-inset-right))', bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          {/* Header */}
          <div className="relative flex items-center justify-between rounded-t-3xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 p-5 text-white overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-300 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">OCS OORJA</h3>
                <div className="flex items-center gap-1.5 text-xs text-white/90">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-200"></span>
                  </span>
                  <span>Online now</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="relative rounded-full p-2 transition-all hover:bg-white/20 hover:rotate-90 duration-300"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-800/30">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                      message.type === "user"
                        ? "bg-gradient-to-br from-green-500 to-green-600 text-white rounded-br-sm"
                        : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
                {message.showWhatsApp && (
                  <div className="mt-3 flex justify-start">
                    <button
                      onClick={() => handleWhatsAppClick(messages.find(m => m.type === "user")?.text || "your products")}
                      className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-green-500/50 hover:scale-105 active:scale-95"
                    >
                      <FaWhatsapp className="h-5 w-5 transition-transform group-hover:rotate-12" />
                      Connect on WhatsApp
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-900 rounded-b-3xl">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-5 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none transition-all focus:border-green-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500/20"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg transition-all hover:shadow-green-500/50 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
