
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Home } from 'lucide-react';
import { CustomerData } from '../types/order';

interface CustomerDataFormProps {
  onSubmit: (customerData: CustomerData) => void;
  isLoading: boolean;
  onBack: () => void;
}

const CustomerDataForm = ({ onSubmit, isLoading, onBack }: CustomerDataFormProps) => {
  const [formData, setFormData] = useState<CustomerData>({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    street: '',
    house_number: '',
    city: '',
    zip_code: '',
    delivery_instructions: ''
  });

  const [errors, setErrors] = useState<Partial<CustomerData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerData> = {};

    if (!formData.first_name.trim()) newErrors.first_name = 'Vorname ist erforderlich';
    if (!formData.last_name.trim()) newErrors.last_name = 'Nachname ist erforderlich';
    if (!formData.email.trim()) newErrors.email = 'E-Mail ist erforderlich';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Ungültige E-Mail-Adresse';
    if (!formData.phone.trim()) newErrors.phone = 'Telefonnummer ist erforderlich';
    if (!formData.street.trim()) newErrors.street = 'Straße ist erforderlich';
    if (!formData.house_number.trim()) newErrors.house_number = 'Hausnummer ist erforderlich';
    if (!formData.city.trim()) newErrors.city = 'Stadt ist erforderlich';
    if (!formData.zip_code.trim()) newErrors.zip_code = 'PLZ ist erforderlich';
    if (!/^\d{5}$/.test(formData.zip_code)) newErrors.zip_code = 'PLZ muss 5 Ziffern haben';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <User className="w-6 h-6 text-primary-600" />
          Lieferadresse
        </CardTitle>
        <p className="text-gray-600">Bitte geben Sie Ihre Daten für die Lieferung ein</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">Vorname *</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                className={errors.first_name ? 'border-red-500' : ''}
                placeholder="Max"
              />
              {errors.first_name && <p className="text-sm text-red-600">{errors.first_name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Nachname *</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                className={errors.last_name ? 'border-red-500' : ''}
                placeholder="Mustermann"
              />
              {errors.last_name && <p className="text-sm text-red-600">{errors.last_name}</p>}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail size={16} />
              E-Mail-Adresse *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
              placeholder="max@beispiel.de"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone size={16} />
              Telefonnummer *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={errors.phone ? 'border-red-500' : ''}
              placeholder="0123 456789"
            />
            {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
          </div>

          {/* Address Information */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="street" className="flex items-center gap-2">
                <MapPin size={16} />
                Straße *
              </Label>
              <Input
                id="street"
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                className={errors.street ? 'border-red-500' : ''}
                placeholder="Musterstraße"
              />
              {errors.street && <p className="text-sm text-red-600">{errors.street}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="house_number" className="flex items-center gap-2">
                <Home size={16} />
                Nr. *
              </Label>
              <Input
                id="house_number"
                value={formData.house_number}
                onChange={(e) => handleInputChange('house_number', e.target.value)}
                className={errors.house_number ? 'border-red-500' : ''}
                placeholder="123"
              />
              {errors.house_number && <p className="text-sm text-red-600">{errors.house_number}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zip_code">PLZ *</Label>
              <Input
                id="zip_code"
                value={formData.zip_code}
                onChange={(e) => handleInputChange('zip_code', e.target.value)}
                className={errors.zip_code ? 'border-red-500' : ''}
                placeholder="12345"
                maxLength={5}
              />
              {errors.zip_code && <p className="text-sm text-red-600">{errors.zip_code}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Stadt *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={errors.city ? 'border-red-500' : ''}
                placeholder="Musterstadt"
              />
              {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
            </div>
          </div>

          {/* Optional Delivery Instructions */}
          <div className="space-y-2">
            <Label htmlFor="delivery_instructions">Lieferhinweise (optional)</Label>
            <Textarea
              id="delivery_instructions"
              value={formData.delivery_instructions}
              onChange={(e) => handleInputChange('delivery_instructions', e.target.value)}
              placeholder="z.B. Bitte beim Nachbarn abgeben..."
              className="min-h-[80px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
              disabled={isLoading}
            >
              Zurück
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary-600 hover:bg-primary-700"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Bestellen...</span>
                </div>
              ) : (
                'Kostenpflichtig bestellen'
              )}
            </Button>
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          Durch die Bestellung stimmen Sie unseren AGB und der Datenschutzerklärung zu.
        </p>
      </CardContent>
    </Card>
  );
};

export default CustomerDataForm;
