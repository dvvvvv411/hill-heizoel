
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Truck, Shield, Clock, Calculator, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const MobilePriceCalculator = () => {
  const [liters, setLiters] = useState<number>(1500);
  const [oilType, setOilType] = useState<'standard_heizoel' | 'premium_heizoel'>('standard_heizoel');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  const prices = {
    standard_heizoel: 0.70,
    premium_heizoel: 0.73
  };

  const products = [
    {
      id: 'standard_heizoel' as const,
      name: 'Standard Heizöl',
      price: prices.standard_heizoel,
      description: 'Bewährte Qualität',
      features: ['DIN-konform', 'Kostengünstig']
    },
    {
      id: 'premium_heizoel' as const,
      name: 'Premium Heizöl',
      price: prices.premium_heizoel,
      description: 'Additivierte Qualität',
      features: ['Korrosionsschutz', 'Längere Lagerfähigkeit']
    }
  ];

  const shopId = "83f973c5-280e-484a-bbfe-00b994b7988c";
  const currentPrice = prices[oilType];
  const totalAmount = liters * currentPrice;
  const minLiters = 1500;
  const maxLiters = 32000;

  const handleLitersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= minLiters && value <= maxLiters) {
      setLiters(value);
    }
  };

  const adjustLiters = (amount: number) => {
    const newValue = liters + amount;
    if (newValue >= minLiters && newValue <= maxLiters) {
      setLiters(newValue);
    }
  };

  const selectProduct = (productId: typeof oilType) => {
    setOilType(productId);
  };

  const handleOrder = async () => {
    if (liters < minLiters || liters > maxLiters) {
      toast({
        title: "Ungültige Literzahl",
        description: `Bitte wählen Sie zwischen ${minLiters} und ${maxLiters} Litern.`,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('https://luhhnsvwtnmxztcmdxyq.supabase.co/functions/v1/get-order-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: oilType,
          liters: liters,
          shop_id: shopId,
          total_amount: totalAmount,
          delivery_fee: 0,
          price_per_liter: currentPrice
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.token) {
          const checkoutUrl = `https://checkout.hill-heizoel.de/checkout?token=${data.token}`;
          window.open(checkoutUrl, '_blank');
          
          toast({
            title: "Bestellung weitergeleitet",
            description: "Sie werden zum Checkout weitergeleitet.",
          });
        } else {
          throw new Error('Kein Token erhalten');
        }
      } else {
        throw new Error(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Order error:', error);
      toast({
        title: "Fehler bei der Bestellung",
        description: "Bitte versuchen Sie es später erneut oder rufen Sie uns an.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentProduct = products.find(p => p.id === oilType)!;

  return (
    <div className="w-full max-w-sm mx-auto">
      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Calculator className="w-5 h-5 text-primary-600" />
            Preisrechner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Product Selection - Swipeable */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Heizöltyp wählen</Label>
            <div 
              ref={scrollRef}
              className="flex space-x-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className={cn(
                    "flex-shrink-0 w-full p-4 border-2 rounded-lg cursor-pointer transition-all snap-start",
                    oilType === product.id 
                      ? "border-primary-600 bg-primary-50" 
                      : "border-gray-200 bg-white"
                  )}
                  onClick={() => selectProduct(product.id)}
                >
                  <div className="text-center">
                    <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                    <p className="text-2xl font-bold text-primary-600 mb-1">
                      {product.price.toFixed(2)}€/L
                    </p>
                    <p className="text-xs text-gray-600 mb-2">{product.description}</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {product.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Liter Input with Touch Controls */}
          <div className="space-y-3">
            <Label htmlFor="liters" className="text-base font-medium">
              Liter-Anzahl ({minLiters} - {maxLiters}L)
            </Label>
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="outline"
                className="flex-shrink-0 w-12 h-12 p-0"
                onClick={() => adjustLiters(-100)}
                disabled={liters <= minLiters}
              >
                <ChevronLeft size={20} />
              </Button>
              <Input
                id="liters"
                type="number"
                min={minLiters}
                max={maxLiters}
                step={50}
                value={liters}
                onChange={handleLitersChange}
                className="text-center text-lg h-12 flex-1"
                inputMode="numeric"
              />
              <Button
                type="button"
                variant="outline"
                className="flex-shrink-0 w-12 h-12 p-0"
                onClick={() => adjustLiters(100)}
                disabled={liters >= maxLiters}
              >
                <ChevronRight size={20} />
              </Button>
            </div>
            <div className="flex justify-center space-x-2">
              {[1500, 2000, 5000, 10000].map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs px-3 py-1 h-8"
                  onClick={() => setLiters(amount)}
                >
                  {amount}L
                </Button>
              ))}
            </div>
          </div>

          {/* Price Display */}
          <div className="bg-primary-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Produkt:</span>
              <span className="font-medium">{currentProduct.name}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Menge:</span>
              <span className="font-medium">{liters} Liter</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Preis pro Liter:</span>
              <span className="font-medium">{currentPrice.toFixed(2)}€</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center text-xl font-bold text-primary-600">
                <span>Gesamtpreis:</span>
                <span>{totalAmount.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Truck size={14} className="text-primary-600" />
              <span>Kostenlose Lieferung</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={14} className="text-primary-600" />
              <span>Lieferung in 4-7 Werktagen</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield size={14} className="text-primary-600" />
              <span>Geprüfte DIN-Qualität</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sticky Order Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-40 lg:hidden">
        <Button 
          onClick={handleOrder}
          disabled={isLoading || liters < minLiters || liters > maxLiters}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white h-14 text-lg font-semibold transition-all duration-200 hover:scale-105"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Wird verarbeitet...</span>
            </div>
          ) : (
            <>
              <span>Jetzt bestellen - {totalAmount.toFixed(2)}€</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MobilePriceCalculator;
