
import { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="border-b border-gray-100 py-2 hidden md:block">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>089 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span>info@hill-clear.de</span>
              </div>
            </div>
            <div className="text-primary-600 font-medium">
              Kostenlose Lieferung ab 500L
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary-600">
              HILL-Clear
            </div>
            <div className="ml-2 text-sm text-gray-600 hidden sm:block">
              Projects GmbH
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </a>
            <a href="#preise" className="text-gray-700 hover:text-primary-600 transition-colors">
              Preise
            </a>
            <a href="#liefergebiet" className="text-gray-700 hover:text-primary-600 transition-colors">
              Liefergebiet
            </a>
            <a href="#ueber-uns" className="text-gray-700 hover:text-primary-600 transition-colors">
              Über uns
            </a>
            <Button className="bg-primary-600 hover:bg-primary-700 text-white px-6">
              Jetzt bestellen
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-4">
            <a href="#home" className="block text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </a>
            <a href="#preise" className="block text-gray-700 hover:text-primary-600 transition-colors">
              Preise
            </a>
            <a href="#liefergebiet" className="block text-gray-700 hover:text-primary-600 transition-colors">
              Liefergebiet
            </a>
            <a href="#ueber-uns" className="block text-gray-700 hover:text-primary-600 transition-colors">
              Über uns
            </a>
            <Button className="bg-primary-600 hover:bg-primary-700 text-white w-full">
              Jetzt bestellen
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
