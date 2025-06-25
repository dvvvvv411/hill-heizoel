
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const ReviewsSection = () => {
  const reviews = [
    {
      name: 'Maria Huber',
      location: 'München',
      rating: 5,
      text: 'Bereits zum dritten Mal bestellt und immer top zufrieden! Pünktliche Lieferung, faire Preise und sehr freundlicher Service. Kann HILL-Clear nur weiterempfehlen!',
      date: '2024-01-15'
    },
    {
      name: 'Thomas Wagner',
      location: 'Nürnberg',
      rating: 5,
      text: 'Schnelle und unkomplizierte Bestellung. Der Fahrer war sehr höflich und die Qualität des Heizöls ist ausgezeichnet. Heize seit Jahren günstiger als mit Gas!',
      date: '2024-01-10'
    },
    {
      name: 'Familie Schneider',
      location: 'Augsburg',
      rating: 5,
      text: 'Hervorragender Kundenservice! Hatten eine Frage zur Lieferung und wurden sofort freundlich beraten. Die Lieferung kam pünktlich und alles lief perfekt.',
      date: '2024-01-08'
    },
    {
      name: 'Johann Müller',
      location: 'Regensburg',
      rating: 5,
      text: 'Seit 5 Jahren treuer Kunde. Zuverlässig, günstig und immer gute Qualität. Besonders schätze ich die kostenlose Lieferung und die schnelle Abwicklung.',
      date: '2024-01-05'
    },
    {
      name: 'Sarah Becker',
      location: 'Würzburg',
      rating: 5,
      text: 'Online-Bestellung war super einfach, der Preisrechner sehr hilfreich. Lieferung kam wie versprochen und das Personal war sehr professionell.',
      date: '2024-01-03'
    },
    {
      name: 'Klaus Fischer',
      location: 'Ingolstadt',
      rating: 5,
      text: 'Beste Heizölpreise in der Region! Habe verschiedene Anbieter verglichen und HILL-Clear war nicht nur günstiger, sondern auch noch serviceorientierter.',
      date: '2023-12-28'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Das sagen unsere Kunden
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Über 10.000 zufriedene Kunden vertrauen auf unsere Qualität und unseren Service. 
            Lesen Sie, was sie über uns sagen.
          </p>
          
          {/* Overall Rating */}
          <div className="mt-8 inline-flex items-center space-x-2 glass-effect backdrop-blur-md border-white/20 px-6 py-3 rounded-full shadow-medium">
            <div className="flex space-x-1">
              {renderStars(5)}
            </div>
            <span className="text-primary-600 font-bold text-lg">4.9/5</span>
            <span className="text-gray-600">aus über 1.200 Bewertungen</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="glass-effect backdrop-blur-md border-white/20 shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Quote className="text-primary-600 opacity-50" size={24} />
                  <div className="flex space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 line-clamp-4 leading-relaxed">
                  "{review.text}"
                </p>
                
                <div className="border-t border-white/20 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{review.name}</div>
                      <div className="text-sm text-gray-500">{review.location}</div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(review.date).toLocaleDateString('de-DE')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600/95 to-primary-700/95 backdrop-blur-md rounded-2xl p-8 md:p-12 text-white shadow-strong">
            <h3 className="text-3xl font-bold mb-4">
              Werden auch Sie Teil unserer zufriedenen Kunden!
            </h3>
            <p className="text-xl mb-8 text-primary-100">
              Überzeugen Sie sich selbst von unserem erstklassigen Service und unseren fairen Preisen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="glass-effect backdrop-blur-md border-white/20 bg-white/90 text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-white hover:scale-105 transition-all duration-300">
                Jetzt Preis berechnen
              </button>
              <button className="glass-effect backdrop-blur-md border-white/20 border-2 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300">
                089 123 456 789
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
