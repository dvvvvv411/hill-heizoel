
import { MapPin, CheckCircle } from 'lucide-react';
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
          {/* Bayern Map Illustration */}
          <div className="relative">
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 h-96 flex items-center justify-center relative">
                  {/* Simplified Bayern shape */}
                  <div className="relative">
                    <svg width="300" height="300" viewBox="0 0 300 300" className="text-primary-600">
                      <path
                        fill="currentColor"
                        d="M50 100 L100 50 L200 60 L250 80 L270 120 L260 180 L230 220 L180 250 L120 240 L80 200 L60 150 Z"
                        opacity="0.8"
                      />
                    </svg>
                    
                    {/* Cities as dots */}
                    <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Delivery truck icon */}
                  <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg">
                    <MapPin className="text-primary-600" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="absolute -bottom-4 -right-4 bg-primary-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
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
