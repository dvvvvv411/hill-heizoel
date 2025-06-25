
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Truck, Shield, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const PriceCalculator = () => {
  const [liters, setLiters] = useState<number>(1000);
  const [oilType, setOilType] = useState<'standard' | 'premium'>('standard');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const prices = {
    standard: 0.70,
    premium: 0.73
  };

  const currentPrice = prices[oilType];
  const totalPrice = liters * currentPrice;
  const minLiters = 500;

  const handleOrder = async () => {
    if (liters < minLiters) {
      toast({
        title: "Mindestbestellmenge nicht erreicht",
        description: `Die Mindestbestellmenge beträgt ${minLiters} Liter.`,
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
          shopId: '83f973c5-280e-484a-bbfe-00b994b7988c',
          product: oilType === 'standard' ? 'Standard Heizöl' : 'Premium Heizöl',
          quantity: liters,
          pricePerLiter: currentPrice,
          totalPrice: totalPrice
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to checkout with token
        window.location.href = `https://checkout.hill-clear.de?token=${data.token}`;
      } else {
        throw new Error('Bestellung konnte nicht verarbeitet werden');
      }
    } catch (error) {
      toast({
        title: "Fehler bei der Bestellung",
        description: "Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.",
        variant: "destructive"
      });
      console.error('Order error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Preisrechner
        </CardTitle>
        <p className="text-gray-600">Berechnen Sie Ihren Heizölpreis</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Oil Type Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Heizöltyp wählen</Label>
          <RadioGroup value={oilType} onValueChange={(value: 'standard' | 'premium') => setOilType(value)}>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard" className="flex-1 cursor-pointer">
                <div className="flex justify-between items-center">
                  <span>Standard Heizöl</span>
                  <span className="font-bold text-primary-600">{prices.standard.toFixed(2)}€/L</span>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="premium" id="premium" />
              <Label htmlFor="premium" className="flex-1 cursor-pointer">
                <div className="flex justify-between items-center">
                  <span>Premium Heizöl</span>
                  <span className="font-bold text-primary-600">{prices.premium.toFixed(2)}€/L</span>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Liter Input */}
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

        {/* Price Display */}
        <div className="bg-primary-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{liters} Liter × {currentPrice.toFixed(2)}€</span>
            <span>{(liters * currentPrice).toFixed(2)}€</span>
          </div>
          <div className="flex justify-between items-center text-xl font-bold text-primary-600 border-t pt-2">
            <span>Gesamtpreis:</span>
            <span>{totalPrice.toFixed(2)}€</span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Truck size={16} className="text-primary-600" />
            <span>Kostenlose Lieferung</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-primary-600" />
            <span>Lieferung innerhalb 2-3 Werktagen</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield size={16} className="text-primary-600" />
            <span>Geprüfte Qualität</span>
          </div>
        </div>

        {/* Order Button */}
        <Button 
          onClick={handleOrder}
          disabled={isLoading || liters < minLiters}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white h-12 text-lg font-semibold transition-all duration-200 hover:scale-105"
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
  );
};

export default PriceCalculator;
