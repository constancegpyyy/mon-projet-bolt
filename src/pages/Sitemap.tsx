import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home,
  Book,
  Sparkles,
  GraduationCap,
  MessageSquare,
  Scroll,
  Shield,
  Info,
  ShoppingCart,
  HelpCircle,
  ArrowLeft
} from 'lucide-react';

interface SitemapItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  description: string;
}

const sitemapData: Record<string, SitemapItem[]> = {
  "Pages principales": [
    {
      title: "Accueil",
      path: "/",
      icon: <Home className="w-5 h-5" />,
      description: "Page d'accueil de Mon Histoire Unique"
    },
    {
      title: "Nos livres originaux",
      path: "/livres-originaux",
      icon: <Book className="w-5 h-5" />,
      description: "Découvrez notre collection de livres personnalisés"
    },
    {
      title: "Nos livres sur mesure",
      path: "/livres-sur-mesure",
      icon: <Sparkles className="w-5 h-5" />,
      description: "Créez une histoire unique pour votre enfant"
    },
    {
      title: "Nos livres éducatifs",
      path: "/livres-educatifs",
      icon: <GraduationCap className="w-5 h-5" />,
      description: "Livres éducatifs personnalisés par catégorie"
    },
    {
      title: "Contact",
      path: "/contact",
      icon: <MessageSquare className="w-5 h-5" />,
      description: "Contactez notre équipe"
    }
  ],
  "Informations légales": [
    {
      title: "Conditions Générales",
      path: "/conditions-generales",
      icon: <Scroll className="w-5 h-5" />,
      description: "Conditions générales d'utilisation et de vente"
    },
    {
      title: "Politique de Confidentialité",
      path: "/politique-confidentialite",
      icon: <Shield className="w-5 h-5" />,
      description: "Protection de vos données personnelles"
    },
    {
      title: "À propos",
      path: "/about",
      icon: <Info className="w-5 h-5" />,
      description: "En savoir plus sur Mon Histoire Unique"
    }
  ],
  "Autres pages": [
    {
      title: "Panier",
      path: "/panier",
      icon: <ShoppingCart className="w-5 h-5" />,
      description: "Votre panier d'achat"
    },
    {
      title: "FAQ",
      path: "/faq",
      icon: <HelpCircle className="w-5 h-5" />,
      description: "Questions fréquemment posées"
    }
  ]
};

export function Sitemap() {
  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6 text-glow">
            Plan du Site
          </h1>
          <p className="text-dark/60 dark:text-white/60">
            Retrouvez facilement toutes les pages de Mon Histoire Unique
          </p>
        </div>

        {/* Sitemap Content */}
        <div className="space-y-16">
          {Object.entries(sitemapData).map(([category, items]) => (
            <section key={category} className="card backdrop-blur-sm bg-white/80 dark:bg-dark/80">
              <h2 className="text-2xl font-lobster text-shadow mb-8">{category}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-start gap-4 p-4 rounded-lg bg-white/50 dark:bg-dark/50 hover:bg-accent/20 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-dark/60 dark:text-white/60">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-accent hover:text-highlight transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}