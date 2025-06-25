
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Award, FileText, CheckCircle } from 'lucide-react';

const QualityCertificates = () => {
  const certificates = [
    {
      title: 'DIN EN 590',
      description: 'Europäische Norm für Dieselkraftstoff und Heizöl',
      icon: Shield,
      status: 'Zertifiziert'
    },
    {
      title: 'ISO 9001:2015',
      description: 'Qualitätsmanagementsystem',
      icon: Award,
      status: 'Zertifiziert'
    },
    {
      title: 'ISO 14001',
      description: 'Umweltmanagementsystem',
      icon: Leaf,
      status: 'Zertifiziert'
    },
    {
      title: 'RAL Gütezeichen',
      description: 'Gütegemeinschaft Energiehandel',
      icon: CheckCircle,
      status: 'Zertifiziert'
    }
  ];

  return (
    <section className="py-16 bg-primary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Qualitätszertifikate
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Unsere Produkte erfüllen höchste Qualitätsstandards und sind nach 
            anerkannten nationalen und internationalen Normen zertifiziert.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {certificates.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{cert.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{cert.description}</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {cert.status}
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <FileText className="w-6 h-6" />
                Zertifikate und Prüfberichte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Laden Sie unsere aktuellen Qualitätszertifikate und Laborprüfberichte herunter 
                oder fordern Sie diese direkt bei uns an.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary-600 hover:bg-primary-700">
                  Zertifikate herunterladen
                </Button>
                <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
                  Prüfberichte anfordern
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QualityCertificates;
