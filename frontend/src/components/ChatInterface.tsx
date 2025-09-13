import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hello! I'm your AI knowledge assistant. I can help you find information about anything - from science and history to current events and technology. What would you like to know?",
      type: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput('');
    setIsLoading(true);

    // Call backend API
    try {
      // Prepare chat history for backend
      const chatHistory = messages.map(m => ({
        role: m.type === 'user' ? 'user' : 'assistant',
        content: m.text
      }));
      chatHistory.push({ role: 'user', content: currentInput });
      const response = await fetch('http://localhost:8001/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: currentInput, history: chatHistory }),
      });
      const data = await response.json();
      let answer = '';
      if (data.answer) {
        // Remove markdown headers and horizontal rules
        answer = data.answer
          .replace(/^#+\s.*$/gm, '') // Remove markdown headers like ###, ##, #
          .replace(/^---+$/gm, '')    // Remove horizontal rules
          .replace(/^\|.*\|$/gm, '') // Remove markdown table rows
          .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
          .replace(/\*([^*]+)\*/g, '$1') // Remove italics
          .replace(/\|/g, '') // Remove remaining pipes
          .replace(/\n{2,}/g, '\n') // Collapse multiple newlines
          .trim();
      } else if (data.story) {
        answer = data.story;
        if (data.verdict) answer += `\n\nVerdict: ${data.verdict}`;
        if (data.confidence !== undefined) answer += `\nConfidence: ${data.confidence}`;
        if (data.sources && data.sources.length > 0) answer += `\nSource: ${data.sources[0]}`;
      } else if (data.error) {
        answer = `Error: ${data.error}`;
      } else {
        answer = 'Sorry, I could not find an answer.';
      }
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: answer,
        type: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: 'Error: Unable to reach backend.',
        type: 'assistant',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "How does artificial intelligence work?",
    "What are the latest discoveries in space?",
    "Explain quantum computing",
    "What is climate change?",
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Chat Container */}
      <div className="glass-card rounded-3xl p-8 mb-8 min-h-[500px] flex flex-col">
        {/* Messages */}
        <div className="flex-1 space-y-6 overflow-y-auto max-h-[400px] pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-4 message-slide-in",
                message.type === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.type === 'assistant' && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent-pink flex items-center justify-center shadow-glow">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
              
              <div className={cn(
                "max-w-[80%] p-6 rounded-2xl",
                message.type === 'user' 
                  ? "bg-gradient-to-r from-primary to-primary-hover text-white shadow-glow ml-auto" 
                  : "glass-card border-white/10"
              )}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <div className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {message.type === 'user' && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-cyan to-accent-orange flex items-center justify-center shadow-glow">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4 justify-start message-slide-in">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent-pink flex items-center justify-center shadow-glow animate-glow-pulse">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="glass-card border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full typing-indicator"></div>
                    <div className="w-2 h-2 bg-primary rounded-full typing-indicator" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full typing-indicator" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">AI is thinking...</span>
                  <Sparkles className="w-4 h-4 text-primary animate-spin" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Try asking:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="glass"
                className="justify-start h-auto p-4 text-left"
                onClick={() => setInput(question)}
              >
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm">{question}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="h-14 px-6 text-base glass-card border-white/20 focus:border-primary/50 focus:shadow-glow"
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            variant="gradient"
            size="icon-lg"
            disabled={!input.trim() || isLoading}
            className="group"
          >
            <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;