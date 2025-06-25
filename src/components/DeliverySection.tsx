
import { MapPin, CheckCircle, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DeliverySection = () => {
  const cities = [
    'München', 'Nürnberg', 'Augsburg', 'Würzburg', 'Regensburg',
    'Ingolstadt', 'Fürth', 'Erlangen', 'Bayreuth', 'Bamberg',
    'Aschaffenburg', 'Landshut', 'Kempten', 'Rosenheim', 'Neu-Ulm',
    'Schweinfurt', 'Passau', 'Freising', 'Straubing', 'Dachau'
  ];

  return (
    <section id="liefergebiet" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unser Liefergebiet in Bayern
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wir liefern zuverlässig und kostenfrei in ganz Bayern. 
            Ihr Ort ist nicht dabei? Kontaktieren Sie uns - wir finden eine Lösung!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Improved Bayern Map */}
          <div className="relative">
            <Card className="overflow-hidden shadow-xl bg-gradient-to-br from-primary-50 to-primary-100">
              <CardContent className="p-8">
                <div className="relative bg-white rounded-2xl p-8 shadow-inner">
                  {/* Detailed Bayern SVG Map */}
                  <div className="relative flex items-center justify-center">
                    <svg width="350" height="300" viewBox="0 0 350 300" className="drop-shadow-lg">
                      {/* Bayern Outline - More detailed shape */}
                      <path
                        d="M50 120 L70 80 L120 60 L180 50 L220 55 L260 70 L300 90 L320 110 L315 140 L305 170 L290 200 L270 230 L240 250 L200 265 L160 270 L120 265 L90 250 L70 220 L55 190 L45 160 Z"
                        fill="url(#bavariaGradient)"
                        stroke="#006b51"
                        strokeWidth="3"
                        className="animate-pulse-subtle"
                      />
                      
                      {/* Gradient Definition */}
                      <defs>
                        <linearGradient id="bavariaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#006b51" stopOpacity="0.8"/>
                          <stop offset="50%" stopColor="#007d5e" stopOpacity="0.6"/>
                          <stop offset="100%" stopColor="#005a44" stopOpacity="0.9"/>
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Major Cities as Pulsing Dots */}
                      <circle cx="140" cy="200" r="6" fill="#ef4444" className="animate-pulse" opacity="0.9">
                        <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/>
                      </circle>
                      <text x="140" y="218" textAnchor="middle" className="text-xs font-medium fill-gray-700">München</text>
                      
                      <circle cx="200" cy="140" r="5" fill="#ef4444" className="animate-pulse" opacity="0.8">
                        <animate attributeName="r" values="3;7;3" dur="2.5s" repeatCount="indefinite"/>
                      </circle>
                      <text x="200" y="155" textAnchor="middle" className="text-xs font-medium fill-gray-700">Nürnberg</text>
                      
                      <circle cx="110" cy="170" r="4" fill="#ef4444" className="animate-pulse" opacity="0.7">
                        <animate attributeName="r" values="3;6;3" dur="3s" repeatCount="indefinite"/>
                      </circle>
                      <text x="110" y="185" textAnchor="middle" className="text-xs font-medium fill-gray-700">Augsburg</text>
                      
                      <circle cx="180" cy="110" r="4" fill="#ef4444" className="animate-pulse" opacity="0.7">
                        <animate attributeName="r" values="3;6;3" dur="2.2s" repeatCount="indefinite"/>
                      </circle>
                      <text x="180" y="125" textAnchor="middle" className="text-xs font-medium fill-gray-700">Würzburg</text>
                      
                      <circle cx="230" cy="160" r="4" fill="#ef4444" className="animate-pulse" opacity="0.7">
                        <animate attributeName="r" values="3;6;3" dur="2.8s" repeatCount="indefinite"/>
                      </circle>
                      <text x="230" y="175" textAnchor="middle" className="text-xs font-medium fill-gray-700">Regensburg</text>
                      
                      {/* Delivery Routes - Animated Lines */}
                      <g stroke="#006b51" strokeWidth="2" fill="none" opacity="0.6">
                        <path d="M140 200 Q200 140 200 140" strokeDasharray="5,5">
                          <animate attributeName="stroke-dashoffset" values="0;-10" dur="1s" repeatCount="indefinite"/>
                        </path>
                        <path d="M140 200 Q110 170 110 170" strokeDasharray="5,5">
                          <animate attributeName="stroke-dashoffset" values="0;-10" dur="1.2s" repeatCount="indefinite"/>
                        </path>
                        <path d="M200 140 Q180 110 180 110" strokeDasharray="5,5">
                          <animate attributeName="stroke-dashoffset" values="0;-10" dur="1.5s" repeatCount="indefinite"/>
                        </path>
                      </g>
                    </svg>
                  </div>
                  
                  {/* Floating Delivery Truck */}
                  <div className="absolute top-4 right-4 bg-primary-600 text-white rounded-full p-3 shadow-lg animate-float">
                    <Truck size={24} />
                  </div>
                  
                  {/* Location Pin */}
                  <div className="absolute top-6 left-6 bg-red-500 text-white rounded-full p-2 shadow-lg animate-bounce-subtle">
                    <MapPin size={20} />
                  </div>
                </div>
                
                {/* Bottom Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center bg-white/80 rounded-lg p-3">
                    <div className="text-2xl font-bold text-primary-600">100%</div>
                    <div className="text-sm text-gray-600">Bayern Abdeckung</div>
                  </div>
                  <div className="text-center bg-white/80 rounded-lg p-3">
                    <div className="text-2xl font-bold text-primary-600">20+</div>
                    <div className="text-sm text-gray-600">Hauptstädte</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="absolute -bottom-4 -right-4 bg-primary-600 text-white px-6 py-3 rounded-full font-bold shadow-lg animate-pulse">
              Ganz Bayern!
            </div>
          </div>

          {/* Cities List */}
          <div>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-600 flex items-center">
                  <CheckCircle className="mr-3 text-green-500" size={28} />
                  Lieferstädte in Bayern
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {cities.map((city, index) => (
                    <div 
                      key={index} 
                      className="flex items-center space-x-2 p-2 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{city}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                  <p className="text-primary-700 font-medium mb-2">
                    Ihr Ort ist nicht dabei?
                  </p>
                  <p className="text-gray-600 text-sm">
                    Kein Problem! Wir beliefern auch weitere Orte in Bayern. 
                    Kontaktieren Sie uns unter <span className="font-medium">089 123 456 789</span> 
                    und wir prüfen die Liefermöglichkeit.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary-600 mb-2">Kostenlos</div>
              <div className="text-gray-600">Lieferung ab 1000L</div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary-600 mb-2">4-7 Tage</div>
              <div className="text-gray-600">Lieferzeit</div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary-600 mb-2">8-18 Uhr</div>
              <div className="text-gray-600">Lieferfenster</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
