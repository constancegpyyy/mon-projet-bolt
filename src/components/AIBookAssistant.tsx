import React, { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

interface AIBookAssistantProps {
  onSuggestion: (suggestion: {
    type: string;
    category: string;
    ageRange: string;
  }) => void;
}

export function AIBookAssistant({ onSuggestion }: AIBookAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const initialQuestions = [
    "Votre enfant aime les histoires de princesses ou de pirates ?",
    "Préférez-vous un livre éducatif ou une aventure immersive ?",
    "Quel âge a votre enfant ?"
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(input),
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);

      // If we have enough information, make a suggestion
      if (messages.length >= 4) {
        onSuggestion({
          type: 'narrative',
          category: 'adventure',
          ageRange: '5-7'
        });
      }
    }, 1000);
  };

  const getAIResponse = (input: string): string => {
    const inputLower = input.toLowerCase();
    
    if (inputLower.includes('princesse')) {
      return "Les histoires de princesses sont parfaites pour stimuler l'imagination ! Préférez-vous une histoire magique ou plus réaliste ?";
    }
    if (inputLower.includes('pirate')) {
      return "Excellent choix ! Les aventures de pirates sont très populaires. Votre enfant aime-t-il aussi les histoires de trésors cachés ?";
    }
    if (inputLower.includes('éducatif')) {
      return "Les livres éducatifs sont un excellent choix ! Quel sujet intéresse particulièrement votre enfant ? (Sciences, Nature, Langues...)";
    }
    
    return "Je comprends ! Laissez-moi vous suggérer quelques livres qui pourraient plaire à votre enfant.";
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
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-dark/60">
                    Bonjour ! Je suis là pour vous aider à choisir le livre parfait pour votre enfant.
                  </p>
                  {initialQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-accent/10 cursor-pointer hover:bg-accent/20 transition-colors"
                      onClick={() => setInput(question)}
                    >
                      {question}
                    </div>
                  ))}
                </div>
              ) : (
                messages.map((message) => (
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
                ))
              )}
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