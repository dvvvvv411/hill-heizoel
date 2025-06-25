
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Truck, Shield, Clock, Calculator, ChevronLeft, ChevronRight, Star, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const MobilePriceCalculator = () => {
  const [liters, setLiters] = useState<number>(1000);
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
      features: ['DIN-konform', 'Kostengünstig'],
      icon: Truck,
      gradient: 'from-blue-500/20 to-blue-600/10'
    },
    {
      id: 'premium_heizoel' as const,
      name: 'Premium Heizöl',
      price: prices.premium_heizoel,
      description: 'Additivierte Qualität',
      features: ['Korrosionsschutz', 'Längere Lagerfähigkeit'],
      icon: Shield,
      gradient: 'from-primary-500/20 to-primary-600/10'
    }
  ];

  const shopId = "83f973c5-280e-484a-bbfe-00b994b7988c";
  const currentPrice = prices[oilType];
  const totalAmount = liters * currentPrice;
  const minLiters = 500;
  const maxLiters = 10000;

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
    <div className="w-full max-w-sm mx-auto animate-fade-in">
      <Card className="shadow-2xl border-0 bg-white/85 backdrop-blur-xl glass-effect relative overflow-hidden group">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-primary-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200/20 rounded-full blur-2xl animate-pulse-subtle"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-300/10 rounded-full blur-3xl animate-float"></div>

        <CardHeader className="text-center pb-4 relative z-10">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2 group-hover:text-primary-700 transition-colors duration-300">
            <div className="p-2 bg-primary-100 rounded-full group-hover:bg-primary-200 transition-all duration-300 group-hover:scale-110">
              <Calculator className="w-5 h-5 text-primary-600" />
            </div>
            Preisrechner
            <Star className="w-4 h-4 text-yellow-500 animate-pulse-subtle" fill="currentColor" />
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 relative z-10">
          {/* Product Selection - Enhanced Swipeable Cards */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-gray-700">Heizöltyp wählen</Label>
            <div 
              ref={scrollRef}
              className="flex space-x-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.map((product) => {
                const IconComponent = product.icon;
                return (
                  <div
                    key={product.id}
                    className={cn(
                      "flex-shrink-0 w-full p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 snap-start relative overflow-hidden group/card touch-action-manipulation",
                      oilType === product.id 
                        ? "border-primary-500 bg-gradient-to-br from-primary-50/80 to-primary-100/50 backdrop-blur-sm shadow-lg scale-[1.02]" 
                        : "border-gray-200/60 bg-white/60 backdrop-blur-sm hover:border-primary-300 hover:bg-primary-50/30"
                    )}
                    onClick={() => selectProduct(product.id)}
                  >
                    {/* Card background gradient */}
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover/card:opacity-100 transition-opacity duration-500", product.gradient)}></div>
                    
                    <div className="text-center relative z-10">
                      <div className="flex justify-center mb-2">
                        <div className={cn(
                          "p-2 rounded-full transition-all duration-300",
                          oilType === product.id ? "bg-primary-200" : "bg-gray-100 group-hover/card:bg-primary-100"
                        )}>
                          <IconComponent className={cn(
                            "w-5 h-5 transition-colors duration-300",
                            oilType === product.id ? "text-primary-600" : "text-gray-600 group-hover/card:text-primary-600"
                          )} />
                        </div>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                      <p className="text-2xl font-bold text-primary-600 mb-1 animate-scale-in">
                        {product.price.toFixed(2)}€/L
                      </p>
                      <p className="text-xs text-gray-600 mb-2">{product.description}</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {product.features.map((feature, idx) => (
                          <span key={idx} className="text-xs bg-gray-100/80 backdrop-blur-sm px-2 py-1 rounded-full border border-gray-200/50">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Liter Input with Touch Controls - Enhanced */}
          <div className="space-y-3">
            <Label htmlFor="liters" className="text-base font-medium text-gray-700">
              Liter-Anzahl ({minLiters} - {maxLiters}L)
            </Label>
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="outline"
                className="flex-shrink-0 w-12 h-12 p-0 border-gray-200/60 bg-white/60 backdrop-blur-sm hover:bg-primary-50/60 hover:border-primary-300 transition-all duration-300 active:scale-95"
                onClick={() => adjustLiters(-100)}
                disabled={liters <= minLiters}
              >
                <ChevronLeft size={20} />
              </Button>
              <div className="relative flex-1">
                <Input
                  id="liters"
                  type="number"
                  min={minLiters}
                  max={maxLiters}
                  step={50}
                  value={liters}
                  onChange={handleLitersChange}
                  className="text-center text-lg h-12 bg-white/70 backdrop-blur-sm border-gray-200/60 hover:bg-white/90 hover:border-primary-300 focus:bg-white/95 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/50 transition-all duration-300"
                  inputMode="numeric"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Zap className="w-4 h-4 text-primary-500 opacity-60" />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="flex-shrink-0 w-12 h-12 p-0 border-gray-200/60 bg-white/60 backdrop-blur-sm hover:bg-primary-50/60 hover:border-primary-300 transition-all duration-300 active:scale-95"
                onClick={() => adjustLiters(100)}
                disabled={liters >= maxLiters}
              >
                <ChevronRight size={20} />
              </Button>
            </div>
            <div className="flex justify-center space-x-2">
              {[500, 1000, 2000, 5000].map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs px-3 py-1 h-8 border-gray-200/60 bg-white/60 backdrop-blur-sm hover:bg-primary-50/60 hover:border-primary-300 transition-all duration-300 active:scale-95"
                  onClick={() => setLiters(amount)}
                >
                  {amount}L
                </Button>
              ))}
            </div>
          </div>

          {/* Price Display - Enhanced */}
          <div className="bg-gradient-to-r from-primary-50/70 to-primary-100/50 backdrop-blur-sm p-4 rounded-xl border border-primary-200/40 space-y-2 shadow-soft hover:shadow-medium transition-all duration-500">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Produkt:</span>
              <span className="font-medium text-gray-800">{currentProduct.name}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Menge:</span>
              <span className="font-medium text-gray-800">{liters} Liter</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Preis pro Liter:</span>
              <span className="font-medium text-gray-800">{currentPrice.toFixed(2)}€</span>
            </div>
            <div className="border-t border-primary-200/40 pt-2">
              <div className="flex justify-between items-center text-xl font-bold text-primary-600 animate-scale-in">
                <span>Gesamtpreis:</span>
                <span className="text-xl bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  {totalAmount.toFixed(2)}€
                </span>
              </div>
            </div>
          </div>

          {/* Features - Enhanced with better mobile layout */}
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-50/30 transition-colors duration-200">
              <div className="p-1.5 bg-primary-100 rounded-full">
                <Truck size={14} className="text-primary-600" />
              </div>
              <span className="text-sm text-gray-700">Kostenlose Lieferung</span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-50/30 transition-colors duration-200">
              <div className="p-1.5 bg-primary-100 rounded-full">
                <Clock size={14} className="text-primary-600" />
              </div>
              <span className="text-sm text-gray-700">Lieferung in 2-3 Werktagen</span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-50/30 transition-colors duration-200">
              <div className="p-1.5 bg-primary-100 rounded-full">
                <Shield size={14} className="text-primary-600" />
              </div>
              <span className="text-sm text-gray-700">Geprüfte DIN-Qualität</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sticky Order Button - Enhanced with glassmorphism */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 z-40 lg:hidden safe-bottom">
        <Button 
          onClick={handleOrder}
          disabled={isLoading || liters < minLiters || liters > maxLiters}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white h-14 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg relative overflow-hidden group/button"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000"></div>
          
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Wird verarbeitet...</span>
            </div>
          ) : (
            <span className="relative z-10">Jetzt bestellen - {totalAmount.toFixed(2)}€</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MobilePriceCalculator;
