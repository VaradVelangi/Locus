export interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
}

export interface Review {
  id: string;
  businessId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}