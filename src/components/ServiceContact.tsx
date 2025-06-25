
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { phone, Bell, Clock, map } from 'lucide-react';

const ServiceContact = () => {
  const contactOptions = [
    {
      icon: phone,
      title: 'Service-Hotline',
      info: '089 123 456 789',
      description: 'Kostenlose Beratung und Bestellannahme',
      availability: 'Mo-Fr 7:00-18:00, Sa 8:00-12:00'
    },
    {
      icon: Clock,
      title: 'Notfall-Hotline',
      info: '089 123 456 790',
      description: 'Für dringende Heizöllieferungen',
      availability: '24/7 erreichbar'
    },
    {
      icon: Bell,
      title: 'Online-Service',
      info: 'service@hill-clear.de',
      description: 'E-Mail-Anfragen und Online-Bestellung',
      availability: 'Antwort innerhalb 2 Stunden'
    },
    {
      icon: map,
      title: 'Vor-Ort-Beratung',
      info: 'Kostenloser Hausbesuch',
      description: 'Persönliche Beratung bei Ihnen zu Hause',
      availability: 'Nach Terminvereinbarung'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Service & Kontakt
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Wir sind für Sie da! Kontaktieren Sie uns für Beratung, Bestellung oder bei Fragen 
            rund um unsere Services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-primary-600 mb-2">{option.info}</p>
                  <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                  <p className="text-xs text-gray-500">{option.availability}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Häufig gestellte Fragen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Wie lange dauert eine Lieferung?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Reguläre Lieferungen erfolgen innerhalb von 1-3 Werktagen. 
                    Express-Lieferungen sind binnen 4 Stunden möglich.
                  </p>
                  
                  <h4 className="font-semibold mb-2">Was ist die Mindestbestellmenge?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Die Mindestbestellmenge beträgt 500 Liter für kostenlose Lieferung. 
                    Kleinere Mengen sind gegen Aufpreis möglich.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Wie erfolgt die Bezahlung?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Sie können bar bei Lieferung, per Überweisung oder Lastschrift bezahlen. 
                    Firmenkunden erhalten auf Wunsch eine Rechnung.
                  </p>
                  
                  <h4 className="font-semibold mb-2">Sind die Preise inkl. MwSt.?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Alle angezeigten Preise sind Endpreise inkl. MwSt. und Lieferung. 
                    Es fallen keine zusätzlichen Kosten an.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3">
              Jetzt bestellen
            </Button>
            <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-3">
              Kostenlose Beratung
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContact;
