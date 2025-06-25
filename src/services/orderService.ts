
import { OrderData, OrderResponse } from '../types/order';

const API_BASE_URL = 'https://luhhnsvwtnmxztcmdxyq.supabase.co/functions/v1';

export class OrderService {
  static async createOrder(orderData: OrderData): Promise<OrderResponse> {
    console.log('Creating order with data:', orderData);
    
    const response = await fetch(`${API_BASE_URL}/get-order-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    console.log('Order API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Order API error:', errorText);
      throw new Error(`Order creation failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Order API response data:', data);
    
    if (!data.token) {
      throw new Error('No token received from order service');
    }

    return data;
  }

  static getCheckoutUrl(token: string): string {
    return `https://checkout.hill-heizoel.de/checkout?token=${token}`;
  }
}
