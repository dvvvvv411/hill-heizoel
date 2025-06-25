
import { CompleteOrderData, OrderResponse, OrderTokenResponse, OrderDetailsResponse, ShopConfigResponse, BankDataResponse } from '../types/order';

const API_BASE_URL = 'https://luhhnsvwtnmxztcmdxyq.supabase.co/functions/v1';

export class OrderService {
  static async createOrderToken(orderData: CompleteOrderData): Promise<OrderTokenResponse> {
    console.log('Creating order token with data:', orderData);
    
    const response = await fetch(`${API_BASE_URL}/create-order-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    console.log('Order token API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Order token API error:', errorText);
      throw new Error(`Order token creation failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Order token API response data:', data);
    
    if (!data.token) {
      throw new Error('No token received from order token service');
    }

    return data;
  }

  static async getOrderDetails(token: string): Promise<OrderDetailsResponse> {
    console.log('Fetching order details for token:', token);
    
    const response = await fetch(`${API_BASE_URL}/get-order-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    });

    console.log('Order details API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Order details API error:', errorText);
      throw new Error(`Failed to fetch order details: ${response.status}`);
    }

    const data = await response.json();
    console.log('Order details API response data:', data);
    
    return data;
  }

  static async getShopConfig(token: string): Promise<ShopConfigResponse> {
    console.log('Fetching shop config for token:', token);
    
    const response = await fetch(`${API_BASE_URL}/get-shop-config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    });

    console.log('Shop config API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Shop config API error:', errorText);
      throw new Error(`Failed to fetch shop config: ${response.status}`);
    }

    const data = await response.json();
    console.log('Shop config API response data:', data);
    
    return data;
  }

  static async getBankData(token: string): Promise<BankDataResponse> {
    console.log('Fetching bank data for token:', token);
    
    const response = await fetch(`${API_BASE_URL}/get-bank-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    });

    console.log('Bank data API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Bank data API error:', errorText);
      throw new Error(`Failed to fetch bank data: ${response.status}`);
    }

    const data = await response.json();
    console.log('Bank data API response data:', data);
    
    return data;
  }

  static async submitOrder(token: string, orderData: CompleteOrderData): Promise<OrderResponse> {
    console.log('Submitting final order with token:', token, 'and data:', orderData);
    
    const response = await fetch(`${API_BASE_URL}/submit-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        ...orderData
      })
    });

    console.log('Submit order API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Submit order API error:', errorText);
      throw new Error(`Order submission failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Submit order API response data:', data);
    
    if (!data.checkout_url) {
      throw new Error('No checkout URL received from order submission');
    }

    return data;
  }

  static getCheckoutUrl(token: string): string {
    return `https://checkout.hill-heizoel.de/checkout?token=${token}`;
  }
}
