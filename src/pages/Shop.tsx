import React from 'react';
import { Star } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

const books: Book[] = [
  {
    id: '1',
    title: "L'Aventure Spatiale",
    category: "Histoires classiques",
    description: "Une aventure intergalactique personnalisée où votre enfant devient un explorateur spatial.",
    price: 29.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800"
  },
  {
    id: '2',
    title: "Les Petits Scientifiques",
    category: "Livres éducatifs",
    description: "Découvrez les merveilles de la science à travers une histoire interactive.",
    price: 34.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800"
  },
  {
    id: '3',
    title: "Le Royaume Magique",
    category: "Livres premium",
    description: "Une histoire enchantée dans un monde de magie et de merveilles.",
    price: 39.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800"
  }
];

const categories = ["Tous", "Histoires classiques", "Livres éducatifs", "Livres premium"];

export function Shop() {
  const [selectedCategory, setSelectedCategory] = React.useState("Tous");

  const filteredBooks = books.filter(book => 
    selectedCategory === "Tous" ? true : book.category === selectedCategory
  );

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl text-center mb-12 text-glow slide-in-left">
          Nos Livres Personnalisés
        </h1>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-accent text-dark'
                  : 'bg-white/80 dark:bg-dark/80 hover:bg-accent/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <div key={book.id} className="card slide-in-right">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-accent">{book.category}</span>
                <div className="flex items-center">
                  {[...Array(book.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-current" />
                  ))}
                </div>
              </div>
              <h3 className="text-xl mb-2 font-lobster text-shadow">{book.title}</h3>
              <p className="text-sm text-dark/80 dark:text-white/80 mb-4">
                {book.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{book.price}€</span>
                <button className="btn">
                  Personnaliser
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}