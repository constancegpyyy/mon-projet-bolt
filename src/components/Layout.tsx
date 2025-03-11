import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FreeShippingBanner } from './FreeShippingBanner';
import { useCart } from '../contexts/CartContext';
import { 
  Sparkles, 
  Crown,
  ShoppingCart, 
  UserCircle,
  Menu,
  X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <div className="min-h-screen bg-background text-primary">
      <div className="h-10">
        <FreeShippingBanner />
      </div>

      <nav className="fixed top-10 left-0 right-0 bg-white/80 backdrop-blur-sm z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-lobster text-highlight">
              Mon Histoire Unique
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent/20 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <div className="hidden md:flex space-x-8">
              <Link to="/nos-livres-sur-mesure" className="link-underline hover:text-highlight transition-colors flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Nos livres sur mesure
              </Link>
              <Link to="/nos-abonnements" className="link-underline hover:text-highlight transition-colors flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Nos abonnements
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                to="/panier" 
                className="p-2 rounded-full hover:bg-accent/20 transition-all relative group"
                aria-label="Panier"
              >
                <ShoppingCart className="w-6 h-6 group-hover:text-highlight transition-colors" />
                <span className="absolute -top-1 -right-1 bg-highlight text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              </Link>
              <Link 
                to="/connexion" 
                className="p-2 rounded-full hover:bg-accent/20 transition-all group"
                aria-label="Connexion"
              >
                <UserCircle className="w-6 h-6 group-hover:text-highlight transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-dark p-6 shadow-xl">
            <div className="flex flex-col space-y-6">
              <Link 
                to="/nos-livres-sur-mesure" 
                className="flex items-center gap-2 hover:text-highlight transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Sparkles className="w-5 h-5" />
                Nos livres sur mesure
              </Link>
              <Link 
                to="/nos-abonnements" 
                className="flex items-center gap-2 hover:text-highlight transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Crown className="w-5 h-5" />
                Nos abonnements
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="pt-32">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-t from-white/50 to-transparent dark:from-dark/50 dark:to-transparent relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Mon Histoire Unique",
                content: <p className="text-sm text-secondary">Créez des souvenirs uniques pour vos enfants</p>
              },
              {
                title: "Navigation",
                content: (
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/nos-livres-sur-mesure" className="link-underline hover:text-highlight transition-colors">Nos livres sur mesure</Link></li>
                    <li><Link to="/nos-abonnements" className="link-underline hover:text-highlight transition-colors">Nos abonnements</Link></li>
                    <li><Link to="/comment-ca-marche" className="link-underline hover:text-highlight transition-colors">Comment ça marche</Link></li>
                    <li><Link to="/a-propos" className="link-underline hover:text-highlight transition-colors">À propos</Link></li>
                    <li><Link to="/contact" className="link-underline hover:text-highlight transition-colors">Contact</Link></li>
                  </ul>
                )
              },
              {
                title: "Contact",
                content: (
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/contact" className="link-underline hover:text-highlight transition-colors">Contact</Link></li>
                    <li><Link to="/faq" className="link-underline hover:text-highlight transition-colors">FAQ</Link></li>
                    <li><Link to="/blog" className="link-underline hover:text-highlight transition-colors">Blog</Link></li>
                  </ul>
                )
              },
              {
                title: "Informations légales",
                content: (
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/conditions-generales" className="link-underline hover:text-highlight transition-colors">Conditions générales</Link></li>
                    <li><Link to="/politique-confidentialite" className="link-underline hover:text-highlight transition-colors">Politique de confidentialité</Link></li>
                    <li><Link to="/plan-du-site" className="link-underline hover:text-highlight transition-colors">Plan du site</Link></li>
                  </ul>
                )
              }
            ].map((section, index) => (
              <div key={index} className="slide-in-left" style={{ transitionDelay: `${index * 0.1}s` }}>
                <h4 className="text-xl mb-6 font-lobster text-shadow">{section.title}</h4>
                {section.content}
              </div>
            ))}
          </div>
          <div className="border-t border-dark/10 mt-12 pt-8 text-sm text-center text-secondary">
            © 2024 Mon Histoire Unique. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}