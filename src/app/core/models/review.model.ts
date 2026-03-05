export interface Review {
  id: number;
  clientId: number;
  clientName: string;
  clientProfileImage?: string;
  reservationId: number;
  bookingReference?: string;
  rating: number;
  comment?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FEATURED';
  adminResponse?: string;
  createdAt: string;
  moderatedAt?: string;
}

export interface CreateReviewRequest {
  reservationId: number;
  rating: number;
  comment?: string;
}
