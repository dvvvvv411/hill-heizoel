
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PriceCalculator from './PriceCalculator';
import MobilePriceCalculator from './MobilePriceCalculator';
import ClickToCall from './ClickToCall';

const HeroSection = () => {
  const scrollToCalculator = () => {
    const calculatorElement = document.getElementById('price-calculator');
    calculatorElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23006b51' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-200/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-primary-300/5 rounded-full blur-3xl animate-pulse-subtle"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-primary-400/8 rounded-full blur-2xl animate-bounce-subtle"></div>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-24 lg:pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left Content - Enhanced with better animations */}
          <div className="space-y-6 lg:space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-2 lg:px-4 bg-primary-100/80 backdrop-blur-sm text-primary-700 rounded-full text-sm font-medium border border-primary-200/50 hover:bg-primary-200/60 transition-all duration-300 animate-scale-in">
                🔥 Heizöl-Experte seit über 20 Jahren
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance animate-slide-up">
                Heizöl günstig
                <br />
                <span className="text-primary-600 gradient-text">bestellen</span>
                <br />
                in Bayern
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 max-w-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Kostenlose Lieferung • Ab 70 Cent pro Liter • Schnell & zuverlässig
              </p>
            </div>

            {/* USPs - Enhanced with staggered animations */}
            <div className="space-y-3">
              {[
                'Kostenlose Lieferung ab 1000 Liter',
                'Lieferung innerhalb 4-7 Werktagen',
                'Geprüfte Premium-Qualität',
                'Über 100.000 zufriedene Kunden'
              ].map((usp, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 animate-fade-in hover:bg-primary-50/30 p-2 rounded-lg transition-colors duration-200"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <CheckCircle className="text-primary-600 flex-shrink-0" size={18} />
                  <span className="text-gray-700 font-medium text-sm lg:text-base">{usp}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons - Desktop - Enhanced styling */}
            <div className="hidden lg:flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <Button 
                onClick={scrollToCalculator}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center">
                  Preis berechnen
                  <ArrowRight className="ml-2" size={20} />
                </span>
              </Button>
              <Button 
                variant="outline" 
                className="border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-4 text-lg font-semibold bg-white/60 backdrop-blur-sm hover:bg-primary-50/80 transition-all duration-300 hover:scale-105"
              >
                089 123 456 789
              </Button>
            </div>

            {/* CTA Buttons - Mobile - Enhanced styling */}
            <div className="lg:hidden space-y-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <Button 
                onClick={scrollToCalculator}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-4 text-lg font-semibold min-h-[48px] transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                Preis berechnen
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <ClickToCall />
            </div>

            {/* Trust Indicators - Enhanced with glassmorphism */}
            <div className="pt-6 lg:pt-8 border-t border-gray-200/50 animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <p className="text-sm text-gray-500 mb-4">Vertrauen Sie auf über 20 Jahre Erfahrung</p>
              <div className="grid grid-cols-3 gap-4 lg:flex lg:items-center lg:space-x-8">
                <div className="text-center p-3 rounded-lg bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/50 transition-all duration-300">
                  <div className="text-xl lg:text-2xl font-bold text-primary-600 animate-scale-in">100.000+</div>
                  <div className="text-xs lg:text-sm text-gray-500">Zufriedene Kunden</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/50 transition-all duration-300">
                  <div className="text-xl lg:text-2xl font-bold text-primary-600 animate-scale-in">20+</div>
                  <div className="text-xs lg:text-sm text-gray-500">Jahre Erfahrung</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/50 transition-all duration-300">
                  <div className="text-xl lg:text-2xl font-bold text-primary-600 animate-scale-in">24h</div>
                  <div className="text-xs lg:text-sm text-gray-500">Service</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Price Calculators - Enhanced positioning */}
          <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div id="price-calculator" className="relative">
              {/* Desktop Calculator */}
              <div className="hidden lg:block">
                <PriceCalculator />
              </div>
              {/* Mobile Calculator */}
              <div className="lg:hidden">
                <MobilePriceCalculator />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
        <div className="w-6 h-10 border-2 border-primary-600/70 rounded-full flex justify-center bg-white/20 backdrop-blur-sm">
          <div className="w-1 h-3 bg-primary-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
