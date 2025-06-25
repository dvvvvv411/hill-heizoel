
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-primary-400">
              HILL-Clear
            </div>
            <p className="text-gray-300 leading-relaxed">
              Ihr zuverlässiger Partner für Heizöl in Bayern seit über 20 Jahren. 
              Qualität, Service und faire Preise.
            </p>
            <div className="flex space-x-4">
              <div className="bg-primary-600 w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">H</span>
              </div>
              <div>
                <div className="font-semibold">HILL-Clear Projects GmbH</div>
                <div className="text-sm text-gray-400">Bayern's Heizöl-Experte</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#home" className="hover:text-primary-400 transition-colors">Home</a></li>
              <li><a href="#preise" className="hover:text-primary-400 transition-colors">Preisrechner</a></li>
              <li><a href="#liefergebiet" className="hover:text-primary-400 transition-colors">Liefergebiet</a></li>
              <li><a href="#ueber-uns" className="hover:text-primary-400 transition-colors">Über uns</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">AGB</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Datenschutz</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontakt</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary-400" />
                <span>089 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary-400" />
                <span>info@hill-clear.de</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-primary-400 mt-1" />
                <div>
                  <div>Musterstraße 123</div>
                  <div>80333 München</div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Öffnungszeiten</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <Clock size={16} className="text-primary-400" />
                <span>Service-Hotline</span>
              </div>
              <div className="space-y-1 text-sm">
                <div>Mo - Fr: 08:00 - 18:00</div>
                <div>Sa: 09:00 - 14:00</div>
                <div>So: Notfall-Hotline</div>
              </div>
              <div className="mt-4 p-3 bg-primary-900 rounded-lg">
                <div className="text-sm font-semibold text-primary-400 mb-1">
                  24/7 Notfall-Service
                </div>
                <div className="text-xs text-gray-300">
                  Bei Heizungsausfällen erreichen Sie uns rund um die Uhr
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 HILL-Clear Projects GmbH. Alle Rechte vorbehalten.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
              <a href="#" className="hover:text-primary-400 transition-colors">Impressum</a>
              <a href="#" className="hover:text-primary-400 transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-primary-400 transition-colors">AGB</a>
              <a href="#" className="hover:text-primary-400 transition-colors">Widerrufsrecht</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
