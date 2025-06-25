
export interface OrderData {
  product: 'standard_heizoel' | 'premium_heizoel';
  liters: number;
  shop_id: string;
  total_amount: number;
  delivery_fee: number;
  price_per_liter: number;
  tax_amount: number;
  net_amount: number;
}

export interface CustomerData {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  street: string;
  house_number: string;
  city: string;
  zip_code: string;
  delivery_instructions?: string;
}

export interface OrderResponse {
  token: string;
  order_id?: string;
}

export interface PriceData {
  standard_heizoel: number;
  premium_heizoel: number;
}
