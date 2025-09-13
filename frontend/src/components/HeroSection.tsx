import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Sparkles, Zap, Brain, Rocket, Globe } from 'lucide-react';
import heroImage from '@/assets/hero-modern.jpg';

const HeroSection = () => {
  const scrollToChat = () => {
    const chatSection = document.getElementById('chat-section');
    chatSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-transparent" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-primary/20 to-accent-pink/20 blur-3xl float" />
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-gradient-to-r from-accent-cyan/20 to-primary/20 blur-2xl float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-40 w-40 h-40 rounded-full bg-gradient-to-r from-accent-orange/20 to-accent-pink/20 blur-3xl float" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Powered by Advanced AI</span>
          </div>
          
          <h1 className="font-heading text-6xl md:text-8xl font-bold mb-8 leading-tight">
            Ask{' '}
            <span className="gradient-text bg-gradient-to-r from-primary via-accent-pink to-accent-cyan bg-[length:200%_auto] animate-shimmer">
              Everything
            </span>
            <br />
            <span className="text-5xl md:text-7xl">Know Anything</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Your AI-powered knowledge companion that searches the entire internet and provides instant, accurate answers to any question you can think of.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              variant="gradient" 
              size="xl"
              onClick={scrollToChat}
              className="group"
            >
              <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Start Asking Questions
            </Button>
            <Button 
              variant="glass" 
              size="xl"
              onClick={scrollToChat}
            >
              <Brain className="w-6 h-6" />
              Explore Knowledge
            </Button>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="group">
            <div className="glass-card p-8 rounded-2xl hover:shadow-glow transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent-pink rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">AI-Powered Intelligence</h3>
              <p className="text-muted-foreground leading-relaxed">Advanced machine learning algorithms analyze and synthesize information from multiple sources.</p>
            </div>
          </div>
          
          <div className="group">
            <div className="glass-card p-8 rounded-2xl hover:shadow-glow transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-cyan to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground leading-relaxed">Get comprehensive answers in milliseconds, not minutes. Instant knowledge at your fingertips.</p>
            </div>
          </div>
          
          <div className="group">
            <div className="glass-card p-8 rounded-2xl hover:shadow-glow transition-all duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-orange to-accent-pink rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">Global Knowledge</h3>
              <p className="text-muted-foreground leading-relaxed">Access information from Wikipedia, research papers, and countless reliable sources worldwide.</p>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">10M+</div>
            <div className="text-muted-foreground text-sm">Questions Answered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-muted-foreground text-sm">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">&lt;1s</div>
            <div className="text-muted-foreground text-sm">Response Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;