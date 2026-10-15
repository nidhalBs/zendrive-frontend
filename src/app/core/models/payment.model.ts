export interface Payment {
  id: number;
  reservationId: number;
  bookingReference?: string;
  amount: number;
  refundedAmount?: number;
  paymentMethod: 'CREDIT_CARD' | 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY';
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';
  transactionId?: string;
  createdAt: string;
  paidAt?: string;
  refundedAt?: string;
}

export interface ProcessPaymentRequest {
  reservationId: number;
  paymentMethod: 'CREDIT_CARD' | 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY';
  paymentToken?: string;
}
