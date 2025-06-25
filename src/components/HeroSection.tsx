
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PriceCalculator from './PriceCalculator';

const HeroSection = () => {
  const scrollToCalculator = () => {
    const calculatorElement = document.getElementById('price-calculator');
    calculatorElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23006b51' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                🔥 Heizöl-Experte seit über 20 Jahren
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Heizöl günstig
                <br />
                <span className="text-primary-600">bestellen</span>
                <br />
                in Bayern
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg">
                Kostenlose Lieferung • Ab 70 Cent pro Liter • Schnell & zuverlässig
              </p>
            </div>

            {/* USPs */}
            <div className="space-y-3">
              {[
                'Kostenlose Lieferung ab 500 Liter',
                'Lieferung innerhalb 2-3 Werktagen',
                'Geprüfte Premium-Qualität',
                'Über 10.000 zufriedene Kunden'
              ].map((usp, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="text-primary-600 flex-shrink-0" size={20} />
                  <span className="text-gray-700 font-medium">{usp}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToCalculator}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                Preis berechnen
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                variant="outline" 
                className="border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-4 text-lg font-semibold"
              >
                089 123 456 789
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Vertrauen Sie auf über 20 Jahre Erfahrung</p>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">10.000+</div>
                  <div className="text-sm text-gray-500">Zufriedene Kunden</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">20+</div>
                  <div className="text-sm text-gray-500">Jahre Erfahrung</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">24h</div>
                  <div className="text-sm text-gray-500">Service</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Price Calculator */}
          <div className="animate-slide-up">
            <div id="price-calculator">
              <PriceCalculator />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
