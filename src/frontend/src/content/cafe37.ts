import { getTodayHours, getStatusText } from '../utils/businessHours';

export const cafe37Content = {
  name: 'CAFE 37',
  tagline: 'The ultimate hangout cafe',
  category: 'Restaurant / Café',
  priceRange: '₹200–₹400 per person',
  get status() {
    return getStatusText();
  },
  get todayHours() {
    return getTodayHours();
  },
  address: {
    full: '64/1/45C, Belgachia Rd, near SBI Bank, Milk Colony, Belgachia, Kolkata, West Bengal 700037',
    short: 'Milk Colony, Belgachia, Kolkata',
  },
  phone: '+91 98308 64437',
  phoneFormatted: '+91 98308 64437',
  phoneLink: 'tel:+919830864437',
  whatsappLink: 'https://wa.me/919830864437',
  rating: 4.5,
  reviewCount: 322,
  facilities: ['Outdoor Seating', 'Free Wi-Fi'],
  extras: ['Live Music on Weekends'],
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.5!2d88.3832!3d22.6089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM2JzMyLjAiTiA4OMKwMjInNTkuNSJF!5e0!3m2!1sen!2sin!4v1234567890',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=64/1/45C,+Belgachia+Rd,+Milk+Colony,+Belgachia,+Kolkata,+West+Bengal+700037',
  shareUrl: 'https://cafe37milkcolony.com',
  highlights: [
    {
      title: 'Cozy Atmosphere',
      description: 'Warm and inviting ambience perfect for any occasion',
    },
    {
      title: 'Affordable Pricing',
      description: 'Quality food at prices that won\'t break the bank',
    },
    {
      title: 'Live Music on Weekends',
      description: 'Enjoy live performances while you dine',
    },
  ],
  testimonials: [
    {
      name: 'Rajesh Kumar',
      text: 'The chicken tikka pizza is absolutely amazing! The food is so tasty and the prices are very reasonable. Highly recommend!',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      text: 'Such a cozy environment with friendly staff. The atmosphere makes you feel right at home. Great place for a casual meal.',
      rating: 5,
    },
    {
      name: 'Amit Das',
      text: 'Reasonable prices and delicious food. The staff is incredibly friendly and the service is quick. Will definitely come back!',
      rating: 4,
    },
  ],
};
