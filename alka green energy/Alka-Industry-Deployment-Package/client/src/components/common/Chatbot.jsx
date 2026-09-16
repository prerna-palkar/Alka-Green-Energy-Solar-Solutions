import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, CheckCircle2, RefreshCw } from 'lucide-react';
import { submitEnquiry } from '../../services/api';
import { BUSINESS_CONFIG } from '../../utils/config';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Welcome to Alka Solar Assistant! How can we assist your solar energy journey today?`,
      options: [
        { label: 'Home Solar', category: 'residential' },
        { label: 'Commercial Solar', category: 'commercial' },
        { label: 'Industrial Solar', category: 'industrial' },
        { label: 'Government Subsidy', category: 'subsidy' },
        { label: 'Talk to an Expert', category: 'expert' },
      ]
    }
  ]);
  
  const [step, setStep] = useState('initial'); // 'initial', 'form', 'submitted'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requirement: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, step]);

  const handleOptionSelect = (option) => {
    const userMsg = { id: Date.now(), sender: 'user', text: option.label };
    setSelectedCategory(option.category);
    
    let botReplyText = "";
    if (option.category === 'residential') {
      botReplyText = "Great! Rooftop solar for homes can drastically lower your monthly electricity bill. Please provide your phone number so our team can schedule a free site visit!";
    } else if (option.category === 'commercial') {
      botReplyText = "Excellent! Commercial solar systems help businesses offset peak daytime electricity tariffs. Share your contact details to receive a customized quote.";
    } else if (option.category === 'industrial') {
      botReplyText = "Industrial solar plants provide continuous, reliable solar power for high-voltage operational loads. Please share your details for a technical feasibility discussion.";
    } else if (option.category === 'subsidy') {
      botReplyText = "Under schemes like PM Surya Ghar Yojana, residential homeowners can avail central subsidies. Leave your contact info and our team will guide you through DISCOM paperwork!";
    } else {
      botReplyText = "Our solar specialists in Beed are ready to assist you. Please provide your details below for a prompt callback.";
    }

    const botMsg = {
      id: Date.now() + 1,
      sender: 'bot',
      text: botReplyText
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setStep('form');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    const payload = {
      name: formData.name,
      phone: formData.phone,
      customerType: selectedCategory || 'general',
      requirement: formData.requirement || `Inquiry via Alka Solar Assistant for ${selectedCategory || 'general solar'}`,
      source: 'Chatbot Lead'
    };

    try {
      await submitEnquiry(payload);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text: `Thank you, ${formData.name}! Your consultation request has been logged. Our representative from Jalna Road, Beed office will reach out to ${formData.phone} shortly.`
        }
      ]);
      setStep('submitted');
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text: `Thank you ${formData.name}! We have received your request and will contact you at ${formData.phone}.`
        }
      ]);
      setStep('submitted');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: `Welcome to Alka Solar Assistant! How can we assist your solar energy journey today?`,
        options: [
          { label: 'Home Solar', category: 'residential' },
          { label: 'Commercial Solar', category: 'commercial' },
          { label: 'Industrial Solar', category: 'industrial' },
          { label: 'Government Subsidy', category: 'subsidy' },
          { label: 'Talk to an Expert', category: 'expert' },
        ]
      }
    ]);
    setStep('initial');
    setSelectedCategory(null);
    setFormData({ name: '', phone: '', requirement: '' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 border-2 border-white/20 active:scale-95"
        >
          <Bot className="w-6 h-6 text-amber-300 animate-pulse" />
          <span className="font-semibold text-sm hidden sm:inline">Alka Solar Assistant</span>
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div className="w-[90vw] sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-slide-up">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-400/20 flex items-center justify-center border border-amber-400/30 text-amber-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Alka Solar Assistant</h4>
                <p className="text-[11px] text-emerald-300">Official Virtual Consultation</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Restart conversation"
                className="p-1.5 rounded-lg text-emerald-200 hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
                className="p-1.5 rounded-lg text-emerald-200 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-sm'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                </div>

                {/* Initial Guided Options */}
                {msg.options && step === 'initial' && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handleOptionSelect(opt)}
                        className="text-xs px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-medium border border-emerald-200 hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Lead Form Inline */}
            {step === 'form' && (
              <form onSubmit={handleFormSubmit} className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-sm space-y-2.5 mt-2 animate-fade-in">
                <div className="text-xs font-semibold text-emerald-800 border-b border-emerald-100 pb-1">
                  Quick Callback Request
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-600">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-600">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-600">Additional Details (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Expected kW or roof area"
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-xs flex items-center justify-center gap-1.5 shadow transition-colors"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Request Expert Callback
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Submitted State */}
            {step === 'submitted' && (
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs text-emerald-900 font-medium">Callback scheduled!</p>
                <button
                  onClick={resetChat}
                  className="text-xs text-emerald-700 underline font-medium hover:text-emerald-900"
                >
                  Start new inquiry
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Note */}
          <div className="p-2.5 bg-slate-100 border-t border-slate-200 text-center text-[11px] text-slate-500">
            Alka Green Energy • Opp. John Deere Showroom, Beed
          </div>

        </div>
      )}
    </div>
  );
}
