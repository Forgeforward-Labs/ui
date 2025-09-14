import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt="Web3 Protocol Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The Future of{" "}
            <span className="text-gradient">Token Management</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Complete web3 protocol suite for token creation, launches, liquidity
            locks, and airdrops. Built for the next generation of DeFi projects.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/token-factory">
              <Button variant="protocol" size="lg" className="group">
                Start Building
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="glass" size="lg">
              View Documentation
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-slide-up">
            <div className="glass-card p-6 hover-glow group">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:animate-glow">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Token Factory</h3>
              <p className="text-muted-foreground">
                Create custom tokens with advanced features and security
                controls
              </p>
            </div>

            <div className="glass-card p-6 hover-glow group">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:animate-glow">
                <Rocket className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Launchpad</h3>
              <p className="text-muted-foreground">
                Launch your project with fair distribution and community
                engagement
              </p>
            </div>

            <div className="glass-card p-6 hover-glow group">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:animate-glow">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Locks</h3>
              <p className="text-muted-foreground">
                Lock tokens and liquidity with time-based and milestone releases
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-1 h-1 bg-primary rounded-full animate-pulse delay-300"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-700"></div>
    </section>
  );
};

export default HeroSection;
