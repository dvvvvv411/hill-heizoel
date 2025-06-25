
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

export interface CompleteOrderData extends OrderData {
  customer: CustomerData;
}

export interface OrderTokenResponse {
  token: string;
  order_id?: string;
}

export interface OrderDetailsResponse {
  order_id: string;
  status: string;
  total_amount: number;
  customer: CustomerData;
  order_data: OrderData;
}

export interface ShopConfigResponse {
  shop_id: string;
  name: string;
  payment_methods: string[];
  delivery_options: string[];
  terms_url?: string;
  privacy_url?: string;
}

export interface BankDataResponse {
  bank_name: string;
  iban: string;
  bic: string;
  account_holder: string;
}

export interface OrderResponse {
  order_id: string;
  checkout_url: string;
  status: string;
}

export interface PriceData {
  standard_heizoel: number;
  premium_heizoel: number;
}
