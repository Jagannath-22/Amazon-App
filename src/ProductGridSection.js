import React from 'react';
import Product from './Product'; // Import the Product component
import './ProductGridSection.css'; // Dedicated CSS for this grid layout

// Example product data for this specific grid.
// In a real app, this might come from an API or a larger data source.
const exampleProducts = [
  {
    id: "grid-prod-1",
    title: "U.S. Polo Assn. Men Zane Printed Sliders",
    price: 798.00,
    originalPrice: 1699.00,
    discount: 53,
    rating: 4.3,
    image: "https://m.media-amazon.com/images/I/71S7H0cByHL._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71S7H0cByHL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/81M4zm2+0FL._AC_UY327_.jpg",
      "https://images.unsplash.com/photo-1542291026-79eddc872736?q=80&w=1770&auto=format&fit=crop", // Example third image
    ],
    likes: 595,
    views: 2500, // Example views
  },
  {
    id: "grid-prod-2",
    title: "Nike Men's Revolution 6 Nn Running Shoe",
    price: 2999.00,
    originalPrice: 4000.00,
    discount: 25,
    rating: 4.5,
    image: "https://m.media-amazon.com/images/I/61-mJ-tN0L._SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61-mJ-tN0L._SL1500_.jpg",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1770&auto=format&fit=crop",
    ],
    likes: 820,
    views: 3100,
  },
  {
    id: "grid-prod-3",
    title: "Amazon Basics 60W USB-C to USB-C 2.0 Charger Cable",
    price: 499.00,
    originalPrice: 799.00,
    discount: 38,
    rating: 4.0,
    image: "https://m.media-amazon.com/images/I/61V162w3jDL._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61V162w3jDL._SX679_.jpg",
      "https://images.unsplash.com/photo-1619344373073-e05357c9612d?q=80&w=1770&auto=format&fit=crop",
    ],
    likes: 1500,
    views: 6000,
  },
  {
    id: "grid-prod-4",
    title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
    price: 19999.00,
    originalPrice: 21999.00,
    discount: 9,
    rating: 4.2,
    image: "https://m.media-amazon.com/images/I/71V--WnrbwL._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71V--WnrbwL._SX679_.jpg",
      "https://images.unsplash.com/photo-1601784553335-e45542898b76?q=80&w=1770&auto=format&fit=crop",
    ],
    likes: 5000,
    views: 15000,
  },
  {
    id: "grid-prod-5",
    title: "Echo Dot (5th Gen, 2022 release) | Smart speaker with Alexa",
    price: 4499.00,
    originalPrice: 5499.00,
    discount: 18,
    rating: 4.6,
    image: "https://m.media-amazon.com/images/I/61Y3r0e1fBL._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61Y3r0e1fBL._SX679_.jpg",
      "https://images.unsplash.com/photo-1601784553335-e45542898b76?q=80&w=1770&auto=format&fit=crop",
    ],
    likes: 3200,
    views: 10000,
  },
  {
    id: "grid-prod-6",
    title: "boAt Airdopes 141 ANC TWS in Ear Earbuds",
    price: 1999.00,
    originalPrice: 4490.00,
    discount: 56,
    rating: 4.1,
    image: "https://m.media-amazon.com/images/I/61+r3JpmqfL._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61+r3JpmqfL._SX679_.jpg",
      "https://images.unsplash.com/photo-1601784553335-e45542898b76?q=80&w=1770&auto=format&fit=crop",
    ],
    likes: 2100,
    views: 7500,
  },
  // Add more products to see horizontal scrolling
  {
    id: "grid-prod-7",
    title: "HP Pavilion Aero AMD Ryzen 7-7735U 13.3 inch (33.8 cm) WUXGA Laptop",
    price: 79990.00,
    originalPrice: 90000.00,
    discount: 11,
    rating: 4.7,
    image: "https://m.media-amazon.com/images/I/71-yJ4m67+L._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71-yJ4m67+L._SX679_.jpg",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3dfeb?q=80&w=1770&auto=format&fit=crop",
    ],
    likes: 1800,
    views: 5000,
  },
  {
    id: "grid-prod-8",
    title: "Samsung Galaxy M34 5G (Prism Silver,8GB,128GB)|120Hz sAMOLED",
    price: 18999.00,
    originalPrice: 24999.00,
    discount: 24,
    rating: 4.4,
    image: "https://m.media-amazon.com/images/I/81fxjeu8fdL._SX679_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/81fxjeu8fdL._SX679_.jpg",
      "https://images.unsplash.com/photo-1598327105310-91a9d16a537f?q=80&w=1770&auto=format&fit=crop",
    ],
    likes: 4500,
    views: 13000,
  },
];

function ProductGridSection({ title = "Products you might like" }) {
  return (
    <div className="product-grid-section">
      <h2 className="product-grid-section__title">{title}</h2>
      <div className="product-grid-section__grid">
        {exampleProducts.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default ProductGridSection;
