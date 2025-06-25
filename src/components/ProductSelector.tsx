
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Droplets, Shield } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { OrderData, PriceData } from '../types/order';
import { OrderService } from '../services/orderService';
import { calculateNetAmount, calculateTaxAmount, formatPrice } from '../utils/taxCalculations';

const products = {
  standard_heizoel: {
    name: 'Standard Heizöl',
    price: 0.70,
    description: 'Schwefelarmes Heizöl EL',
    features: [
      'DIN 51603-1 konform',
      'Für alle Heizungsanlagen geeignet',
      'Bewährte Qualität',
      'Kostengünstig'
    ],
    icon: Droplets,
    color: 'bg-blue-500'
  },
  premium_heizoel: {
    name: 'Premium Heizöl',
    price: 0.73,
    description: 'Additivierte Qualität',
    features: [
      'Besserer Korrosionsschutz',
      'Längere Lagerfähigkeit',
      'Optimierte Verbrennung',
      'Moderne Additive'
    ],
    icon: Shield,
    color: 'bg-primary-600'
  }
};

const ProductSelector = () => {
  const [selectedProduct, setSelectedProduct] = useState<'standard_heizoel' | 'premium_heizoel'>('standard_heizoel');
  const [liters, setLiters] = useState<number>(1500);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const shopId = "83f973c5-280e-484a-bbfe-00b994b7988c";
  const currentProduct = products[selectedProduct];
  const currentPrice = currentProduct.price;
  const totalGrossAmount = liters * currentPrice;
  const netAmount = calculateNetAmount(totalGrossAmount);
  const taxAmount = calculateTaxAmount(netAmount);
  const minLiters = 1500;

  const handleOrder = async () => {
    if (liters < minLiters) {
      toast({
        title: "Ungültige Literzahl",
        description: `Mindestbestellmenge: ${minLiters} Liter`,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const orderData: OrderData = {
        product: selectedProduct,
        liters: liters,
        shop_id: shopId,
        total_amount: totalGrossAmount,
        delivery_fee: 0,
        price_per_liter: currentPrice,
        tax_amount: taxAmount,
        net_amount: netAmount
      };

      const response = await OrderService.createOrder(orderData);
      const checkoutUrl = OrderService.getCheckoutUrl(response.token);
      
      window.open(checkoutUrl, '_blank');
      
      toast({
        title: "Bestellung weitergeleitet",
        description: "Sie werden zum Checkout weitergeleitet.",
      });
    } catch (error) {
      console.error('Order error:', error);
      toast({
        title: "Fehler bei der Bestellung",
        description: "Bitte versuchen Sie es später erneut.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Wählen Sie Ihr Heizöl
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vergleichen Sie unsere Produkte und finden Sie das passende Heizöl für Ihre Bedürfnisse.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Product Selection */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Produkt wählen</h3>
            <RadioGroup 
              value={selectedProduct} 
              onValueChange={(value: 'standard_heizoel' | 'premium_heizoel') => setSelectedProduct(value)}
              className="space-y-4"
            >
              {Object.entries(products).map(([key, product]) => {
                const IconComponent = product.icon;
                return (
                  <div key={key} className="relative">
                    <RadioGroupItem value={key} id={key} className="peer sr-only" />
                    <Label 
                      htmlFor={key} 
                      className="flex items-start p-6 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 peer-checked:border-primary-600 peer-checked:bg-primary-50 transition-all"
                    >
                      <div className={`w-10 h-10 ${product.color} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-semibold">{product.name}</h4>
                          <span className="text-xl font-bold text-primary-600">
                            {formatPrice(product.price)}€/L
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{product.description}</p>
                        <ul className="space-y-1">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <Check className="w-4 h-4 text-primary-600 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Price Calculator */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">Preisrechner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Gewähltes Produkt</h4>
                <p className="text-2xl font-bold text-primary-600">{currentProduct.name}</p>
                <p className="text-gray-600">{currentProduct.description}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="liters" className="text-base font-medium">
                  Liter-Anzahl (min. {minLiters}L)
                </Label>
                <Input
                  id="liters"
                  type="number"
                  min={minLiters}
                  step={100}
                  value={liters}
                  onChange={(e) => setLiters(Number(e.target.value))}
                  className="text-lg h-12"
                  placeholder={`z.B. ${minLiters}`}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Nettobetrag:</span>
                  <span>{formatPrice(netAmount)}€</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>MwSt. (19%):</span>
                  <span>{formatPrice(taxAmount)}€</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-primary-600 border-t pt-2">
                  <span>Gesamtpreis:</span>
                  <span>{formatPrice(totalGrossAmount)}€</span>
                </div>
              </div>

              <Button 
                onClick={handleOrder}
                disabled={isLoading || liters < minLiters}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white h-12 text-lg font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Wird verarbeitet...</span>
                  </div>
                ) : (
                  'Jetzt bestellen'
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Alle Preise inkl. MwSt. • Mindestbestellmenge: {minLiters} Liter
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductSelector;
