import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

interface ChatAssistantProps {
  onSuggestion: (suggestion: any) => void;
}

export function ChatAssistant({ onSuggestion }: ChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessage: Message = {
    id: '1',
    text: "Bonjour ! Je suis là pour vous aider à créer une histoire unique. Que souhaitez-vous pour votre livre personnalisé ?",
    sender: 'bot'
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const suggestions = generateSuggestion(input.toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: suggestions.message,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
      if (suggestions.data) {
        onSuggestion(suggestions.data);
      }
    }, 1000);
  };

  const generateSuggestion = (input: string) => {
    if (input.includes('histoire') || input.includes('aventure')) {
      return {
        message: "Je vous suggère une histoire d'aventure ! J'ai présélectionné quelques options qui pourraient vous plaire.",
        data: {
          storyType: 'adventure',
          tone: 'exciting',
          setting: 'magical_forest'
        }
      };
    }
    if (input.includes('personnage') || input.includes('héros')) {
      return {
        message: "Voici quelques suggestions pour personnaliser le héros de l'histoire !",
        data: {
          character: {
            hairStyle: 'curly',
            clothing: 'magical',
            accessories: ['crown']
          }
        }
      };
    }
    return {
      message: "Je peux vous aider à personnaliser l'histoire ou le personnage. Que souhaitez-vous explorer ?",
      data: null
    };
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-4 bg-accent rounded-full shadow-lg hover:bg-highlight transition-colors z-40"
        aria-label="Ouvrir l'assistant"
      >
        <MessageSquare className="w-6 h-6 text-primary" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:w-[400px] sm:h-[600px] h-[80vh] rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-dark/10 flex items-center justify-between">
              <h3 className="text-xl font-lobster text-primary">Assistant IA</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-accent/20 transition-colors"
              >
                <X className="w-6 h-6 text-primary" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'bot'
                        ? 'bg-white/50 text-primary'
                        : 'bg-accent text-primary'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-dark/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-2 rounded-full bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent text-primary"
                />
                <button
                  onClick={handleSend}
                  className="p-2 rounded-full bg-accent text-primary hover:bg-highlight transition-colors"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}