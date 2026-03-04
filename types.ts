
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  location: string;
}

export interface QuoteRequest {
  rooms: number;
  bathrooms: number;
  sqft: number;
  type: 'standard' | 'deep' | 'move';
  extras: string[];
}

export interface QuoteResponse {
  estimatedPrice: string;
  duration: string;
  recommendation: string;
}