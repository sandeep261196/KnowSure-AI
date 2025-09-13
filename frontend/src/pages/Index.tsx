import React from 'react';
import HeroSection from '@/components/HeroSection';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Chat Section */}
      <section id="chat-section" className="py-20 px-6 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Start Your{' '}
              <span className="gradient-text bg-gradient-to-r from-primary via-accent-pink to-accent-cyan">
                Conversation
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ask any question and let our advanced AI search through millions of articles, research papers, and knowledge sources to give you comprehensive, accurate answers.
            </p>
          </div>
          
          <ChatInterface />
        </div>
      </section>
    </div>
  );
};

export default Index;
