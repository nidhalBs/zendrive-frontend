export interface LoyaltyAccount {
  id: number;
  userId: number;
  totalPoints: number;
  availablePoints: number;
  recentTransactions?: LoyaltyTransaction[];
}

export interface LoyaltyTransaction {
  id: number;
  points: number;
  description: string;
  referenceType?: string;
  referenceId?: number;
  createdAt: string;
}

export interface Coupon {
  id: number;
  code: string;
  description?: string;
  discountPercentage: number;
  maxDiscountAmount?: number;
  minOrderAmount?: number;
  maxUsageCount: number;
  currentUsageCount: number;
  singleUsePerClient: boolean;
  active: boolean;
  validFrom: string;
  validUntil: string;
}

export interface Route {
  id: number;
  originName: string;
  originLatitude?: number;
  originLongitude?: number;
  destinationName: string;
  destinationLatitude?: number;
  destinationLongitude?: number;
  distanceKm?: number;
  estimatedDurationMinutes?: number;
  basePrice?: number;
  popular: boolean;
  active: boolean;
  imageUrl?: string;
}

export interface DashboardStats {
  totalReservations: number;
  pendingReservations: number;
  confirmedReservations: number;
  completedReservations: number;
  cancelledReservations: number;
  totalTransfers: number;
  totalExcursions: number;
  totalRevenue: number;
  transferRevenue: number;
  excursionRevenue: number;
  totalClients: number;
  activeClients: number;
  totalVehicles: number;
  availableVehicles: number;
  totalReviews: number;
  pendingReviews: number;
  averageRating: number;
}

export interface Notification {
  id: number;
  userId: number;
  type: string;
  channel: string;
  subject: string;
  content: string;
  recipient?: string;
  sent: boolean;
  read: boolean;
  sentAt?: string;
  createdAt: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
