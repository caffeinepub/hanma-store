export interface HomeSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

export const homepageSlides: HomeSlide[] = [
  {
    id: 1,
    image: '/assets/generated/homepage-slide-1.dim_1600x900.png',
    title: 'Special Offers',
    description: 'Enjoy exclusive deals on your favorite items',
  },
  {
    id: 2,
    image: '/assets/generated/homepage-slide-2.dim_1600x900.png',
    title: 'Fresh & Delicious',
    description: 'Discover our handcrafted coffee and pastries',
  },
  {
    id: 3,
    image: '/assets/generated/homepage-slide-3.dim_1600x900.png',
    title: 'New Deals Daily',
    description: 'Check out our latest menu additions and promotions',
  },
];
