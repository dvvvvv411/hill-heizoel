
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Truck, Shield, Clock, Calculator, Zap, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const PriceCalculator = () => {
  const [liters, setLiters] = useState<number>(1000);
  const [oilType, setOilType] = useState<'standard_heizoel' | 'premium_heizoel'>('standard_heizoel');
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const prices = {
    standard_heizoel: 0.70,
    premium_heizoel: 0.73
  };

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
      console.log('Sending order request with data:', {
        product: oilType,
        liters: liters,
        shop_id: shopId,
        total_amount: totalAmount,
        delivery_fee: 0,
        price_per_liter: currentPrice
      });

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

      console.log('API Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('API Response data:', data);
        
        if (data.token) {
          const checkoutUrl = `https://checkout.hill-heizoel.de/checkout?token=${data.token}`;
          console.log('Redirecting to:', checkoutUrl);
          window.open(checkoutUrl, '_blank');
          
          toast({
            title: "Bestellung weitergeleitet",
            description: "Sie werden zum Checkout weitergeleitet.",
          });
        } else {
          throw new Error('Kein Token erhalten');
        }
      } else {
        const errorData = await response.text();
        console.error('API Error response:', errorData);
        throw new Error(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Order error:', error);
      toast({
        title: "Fehler bei der Bestellung",
        description: "Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch unter 089 123 456 789.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDisplayName = (type: string) => {
    return type === 'standard_heizoel' ? 'Standard Heizöl' : 'Premium Heizöl';
  };

  return (
    <div 
      className="w-full max-w-md mx-auto transform transition-all duration-500 hover:scale-[1.02] animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-xl glass-effect relative overflow-hidden group">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 via-transparent to-primary-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-2 -right-2 w-20 h-20 bg-primary-200/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-300/10 rounded-full blur-2xl animate-pulse-subtle"></div>
        </div>

        <CardHeader className="text-center pb-4 relative z-10">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3 group-hover:text-primary-700 transition-colors duration-300">
            <div className="p-2 bg-primary-100 rounded-full group-hover:bg-primary-200 transition-colors duration-300 group-hover:scale-110 transform">
              <Calculator className="w-6 h-6 text-primary-600" />
            </div>
            Preisrechner
            <div className={`ml-2 transition-transform duration-300 ${isHovered ? 'rotate-12 scale-110' : ''}`}>
              <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
            </div>
          </CardTitle>
          <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            Berechnen Sie Ihren Heizölpreis
          </p>
        </CardHeader>

        <CardContent className="space-y-6 relative z-10">
          {/* Oil Type Selection with enhanced styling */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
              Heizöltyp wählen
            </Label>
            <Select value={oilType} onValueChange={(value: 'standard_heizoel' | 'premium_heizoel') => setOilType(value)}>
              <SelectTrigger className="h-12 text-base bg-white/60 backdrop-blur-sm border-gray-200/50 hover:bg-white/80 hover:border-primary-300 transition-all duration-300 focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400">
                <SelectValue placeholder="Heizöltyp auswählen" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-gray-200/50">
                <SelectItem value="standard_heizoel" className="hover:bg-primary-50/50 transition-colors duration-200">
                  <div className="flex justify-between items-center w-full">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-600" />
                      Standard Heizöl
                    </span>
                    <span className="font-bold text-primary-600 ml-4">{prices.standard_heizoel.toFixed(2)}€/L</span>
                  </div>
                </SelectItem>
                <SelectItem value="premium_heizoel" className="hover:bg-primary-50/50 transition-colors duration-200">
                  <div className="flex justify-between items-center w-full">
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary-600" />
                      Premium Heizöl
                    </span>
                    <span className="font-bold text-primary-600 ml-4">{prices.premium_heizoel.toFixed(2)}€/L</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Liter Input with enhanced styling */}
          <div className="space-y-3">
            <Label htmlFor="liters" className="text-base font-medium text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
              Liter-Anzahl ({minLiters} - {maxLiters}L)
            </Label>
            <div className="relative">
              <Input
                id="liters"
                type="number"
                min={minLiters}
                max={maxLiters}
                step={50}
                value={liters}
                onChange={handleLitersChange}
                className="text-lg h-12 bg-white/60 backdrop-blur-sm border-gray-200/50 hover:bg-white/80 hover:border-primary-300 focus:bg-white/90 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/50 transition-all duration-300"
                placeholder={`z.B. ${minLiters}`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Zap className="w-4 h-4 text-primary-500 opacity-60" />
              </div>
            </div>
            {(liters < minLiters || liters > maxLiters) && (
              <p className="text-sm text-red-600 animate-fade-in">
                Bitte wählen Sie zwischen {minLiters} und {maxLiters} Litern.
              </p>
            )}
          </div>

          {/* Live Price Display with enhanced glassmorphism */}
          <div className="bg-gradient-to-r from-primary-50/60 to-primary-100/40 backdrop-blur-sm p-5 rounded-xl border border-primary-200/30 space-y-3 shadow-soft group-hover:shadow-medium transition-all duration-500 hover:bg-gradient-to-r hover:from-primary-50/80 hover:to-primary-100/60">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Produkt:</span>
              <span className="font-medium text-gray-800">{getDisplayName(oilType)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Menge:</span>
              <span className="font-medium text-gray-800">{liters} Liter</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Preis pro Liter:</span>
              <span className="font-medium text-gray-800">{currentPrice.toFixed(2)}€</span>
            </div>
            <div className="border-t border-primary-200/40 pt-3">
              <div className="flex justify-between items-center text-xl font-bold text-primary-600 animate-scale-in">
                <span>Gesamtpreis:</span>
                <span className="text-2xl bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  {totalAmount.toFixed(2)}€
                </span>
              </div>
            </div>
          </div>

          {/* Features with enhanced icons and animations */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-50/30 transition-colors duration-200">
                <div className="p-1.5 bg-primary-100 rounded-full">
                  <Truck size={16} className="text-primary-600" />
                </div>
                <span className="text-sm text-gray-700">Kostenlose Lieferung</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-50/30 transition-colors duration-200">
                <div className="p-1.5 bg-primary-100 rounded-full">
                  <Clock size={16} className="text-primary-600" />
                </div>
                <span className="text-sm text-gray-700">Lieferung innerhalb 2-3 Werktagen</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-50/30 transition-colors duration-200">
                <div className="p-1.5 bg-primary-100 rounded-full">
                  <Shield size={16} className="text-primary-600" />
                </div>
                <span className="text-sm text-gray-700">Geprüfte Qualität nach DIN-Norm</span>
              </div>
            </div>
          </div>

          {/* Order Button with enhanced styling */}
          <Button 
            onClick={handleOrder}
            disabled={isLoading || liters < minLiters || liters > maxLiters}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white h-12 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group/button"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000"></div>
            
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Wird verarbeitet...</span>
              </div>
            ) : (
              <span className="relative z-10">Jetzt bestellen</span>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center group-hover:text-gray-600 transition-colors duration-300">
            Alle Preise inkl. MwSt. • Mindestbestellmenge: {minLiters}L • Maximum: {maxLiters}L
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceCalculator;
