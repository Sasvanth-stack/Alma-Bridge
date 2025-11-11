
import React, { useState, useRef, useEffect } from 'react';
import { getAlmaAIResponse } from '../services/geminiService.ts';
import { useAuth } from '../contexts/AuthContext.tsx';
import Icon from './Icon.tsx';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const AlmaAIChatbox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hi there! I'm Alma AI. How can I help you today? You can ask me about events, donations, or finding alumni." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (messageText?: string) => {
    const text = (messageText || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: Message = { sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await getAlmaAIResponse(text);
      const botMessage: Message = { sender: 'bot', text: response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { sender: 'bot', text: "Oops! Something went wrong. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const quickActions = [
    "Upcoming events?",
    "How to donate?",
    "Find jobs",
    "What is the mentorship program?"
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform duration-300 z-50 animate-pulse"
        aria-label="Open Alma AI Chat"
      >
        <Icon name="bot" className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 w-[calc(100%-3rem)] sm:w-96 h-[70vh] sm:h-[600px] z-50 flex flex-col">
      <div className="bg-white dark:bg-gray-800 rounded-t-2xl p-4 flex justify-between items-center shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-orange-100 dark:bg-brand-orange-900/50 rounded-full">
                <Icon name="bot" className="w-6 h-6 text-brand-orange-600 dark:text-brand-orange-400" />
            </div>
            <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">Alma AI</h3>
                <p className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Online
                </p>
            </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <Icon name="close" className="w-6 h-6" />
        </button>
      </div>
      <div ref={chatHistoryRef} className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && <img src={`https://api.dicebear.com/8.x/bottts/svg?seed=AlmaAI`} alt="Bot Avatar" className="w-8 h-8 rounded-full bg-gray-200" />}
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              msg.sender === 'user' 
              ? 'bg-brand-orange-500 text-white rounded-br-none' 
              : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'
            }`}>
              <p className="text-sm">{msg.text}</p>
            </div>
            {msg.sender === 'user' && <img src={user?.avatar || `https://api.dicebear.com/8.x/initials/svg?seed=Guest`} alt="User Avatar" className="w-8 h-8 rounded-full" />}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-end gap-2 justify-start">
              <img src={`https://api.dicebear.com/8.x/bottts/svg?seed=AlmaAI`} alt="Bot Avatar" className="w-8 h-8 rounded-full bg-gray-200" />
              <div className="max-w-[80%] p-3 rounded-2xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm">
                 <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-0"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-150"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-300"></span>
                 </div>
              </div>
            </div>
        )}
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 mb-3">
            {quickActions.map(action => (
                <button 
                    key={action}
                    onClick={() => handleSendMessage(action)}
                    className="px-3 py-1 text-xs bg-brand-orange-100 text-brand-orange-800 rounded-full hover:bg-brand-orange-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    {action}
                </button>
            ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
            <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 w-full px-4 py-2 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:border-brand-orange-500 transition"
            />
            <button type="submit" disabled={isLoading} className="bg-brand-orange-500 text-white rounded-full p-3 hover:bg-brand-orange-600 transition disabled:bg-brand-orange-300">
             <Icon name="send" className="w-5 h-5" />
            </button>
        </form>
      </div>
       <div className="bg-white dark:bg-gray-800 rounded-b-2xl p-2 text-center text-xs text-gray-400">
        Powered by Gemini
       </div>
    </div>
  );
};

export default AlmaAIChatbox;