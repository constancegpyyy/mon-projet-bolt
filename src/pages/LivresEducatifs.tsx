import React, { useState } from 'react';
import { Search, Star, ChevronDown, Book, ArrowUpDown, ShoppingBag } from 'lucide-react';
import { PersonalizationModal, PersonalizationData } from '../components/PersonalizationModal';
import { StockUrgency } from '../components/StockUrgency';
import { LivePreview } from '../components/LivePreview';
import { useCart } from '../contexts/CartContext';
import { books, categories } from '../data/books';

// Filter only educational books
const educationalBooks = books.filter(book => book.type === 'educational');
const educationalCategories = categories.filter(cat => cat.type === 'educational');

const ageRanges = ["4-6 ans", "5-7 ans", "6-8 ans"];

const sortOptions = [
  { label: "Les plus populaires", value: "popularity" },
  { label: "Prix croissant", value: "price-asc" },
  { label: "Prix décroissant", value: "price-desc" },
  { label: "Nouveautés", value: "new" }
];

export function LivresEducatifs() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [selectedAgeRange, setSelectedAgeRange] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showPersonalizationModal, setShowPersonalizationModal] = useState(false);

  const filteredBooks = educationalBooks.filter(book => {
    if (selectedCategory !== "Tous" && book.category !== selectedCategory) return false;
    if (selectedAgeRange && book.ageRange !== selectedAgeRange) return false;
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        book.title.toLowerCase().includes(searchLower) ||
        book.description.toLowerCase().includes(searchLower) ||
        book.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.formats.paper.price - b.formats.paper.price;
      case "price-desc":
        return b.formats.paper.price - a.formats.paper.price;
      case "new":
        return b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1;
      default:
        return b.reviews - a.reviews;
    }
  });

  const handlePersonalize = (book: Book) => {
    setSelectedBook(book);
    setShowPersonalizationModal(true);
  };

  const handleAddToCart = (personalization: PersonalizationData) => {
    if (!selectedBook) return;

    // Create cart item
    const cartItem = {
      bookId: selectedBook.id,
      title: selectedBook.title,
      price: selectedBook.formats.paper.price,
      image: selectedBook.image,
      personalization: {
        childName: personalization.childName,
        dedication: personalization.dedication,
        avatar: personalization.avatar
      }
    };

    // Add to cart
    addItem(cartItem);

    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-accent text-dark px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-2xl">🎉</span>
        <span>Livre ajouté au panier !</span>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('animate-slide-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);

    setShowPersonalizationModal(false);
    setSelectedBook(null);
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6 text-glow slide-in-left flex items-center justify-center gap-3">
            <Book className="w-12 h-12 text-highlight" />
            Nos Livres Éducatifs
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto slide-in-right">
            Des livres personnalisés qui combinent apprentissage et plaisir. Disponibles en format 
            papier ou numérique, ils accompagnent votre enfant dans son développement.
          </p>
        </div>

        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Rechercher un livre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowSortOptions(!showSortOptions)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/50 border border-dark/10 hover:bg-accent/20 transition-colors"
              >
                <ArrowUpDown className="w-5 h-5" />
                <span>Trier par</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showSortOptions ? 'rotate-180' : ''}`} />
              </button>
              {showSortOptions && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg z-20">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortOptions(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-accent/20 transition-colors ${
                        sortBy === option.value ? 'text-highlight' : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {educationalCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category.name
                    ? 'bg-accent text-dark'
                    : 'bg-white/50 hover:bg-accent/20'
                }`}
              >
                <span>{category.name}</span>
                <span className="text-sm bg-dark/10 px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {ageRanges.map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAgeRange(selectedAgeRange === age ? null : age)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedAgeRange === age
                    ? 'bg-accent text-dark'
                    : 'bg-white/50 hover:bg-accent/20'
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="card group backdrop-blur-sm bg-white/80"
            >
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {book.isNew && (
                  <div className="absolute top-4 right-4 bg-highlight px-3 py-1 rounded-full text-white text-sm font-semibold">
                    Nouveau
                  </div>
                )}
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-accent">{book.category}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(book.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-muted">
                      ({book.reviews})
                    </span>
                  </div>
                </div>
                <h3 className="text-xl mb-2 font-lobster text-shadow">{book.title}</h3>
                <p className="text-sm text-secondary mb-4">
                  {book.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {book.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-accent/10 text-primary rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Format papier</span>
                  <div className="text-right">
                    <span className="text-lg font-semibold">{book.formats.paper.price.toFixed(2)} €</span>
                    <StockUrgency stock={book.formats.paper.stock} isLimited={book.isNew} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Format numérique</span>
                  <div className="text-right">
                    <span className="text-lg font-semibold">{book.formats.ebook.price.toFixed(2)} €</span>
                    <p className="text-sm text-success">Disponible immédiatement</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <LivePreview name="" onPreviewGenerated={(preview) => {
                  console.log('Preview generated:', preview);
                }} />
              </div>

              <div className="flex items-center justify-between mt-auto">
                <button 
                  className="btn flex items-center gap-2 w-full"
                  onClick={() => handlePersonalize(book)}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Personnaliser
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedBook && (
        <PersonalizationModal
          book={selectedBook}
          isOpen={showPersonalizationModal}
          onClose={() => {
            setShowPersonalizationModal(false);
            setSelectedBook(null);
          }}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}