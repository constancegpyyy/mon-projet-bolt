import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Sparkles, Gift, BookOpen, ChevronRight, Star, Heart, Brain } from 'lucide-react';
import { PersonalizedWelcome } from '../components/PersonalizedWelcome';
import { AIBookAssistant } from '../components/AIBookAssistant';
import { LoyaltyProgram } from '../components/LoyaltyProgram';

const bestSellers = [
  {
    id: 1,
    title: "L'Aventurier des Étoiles",
    description: "Une aventure spatiale magique où votre enfant devient un explorateur intergalactique.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800",
    reviews: 128
  },
  {
    id: 2,
    title: "Le Secret du Dragon",
    description: "Une histoire enchantée où votre enfant apprivoise un dragon et découvre la valeur de l'amitié.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800",
    reviews: 95
  },
  {
    id: 3,
    title: "Les Petits Scientifiques",
    description: "Une aventure éducative passionnante à travers les merveilles de la science.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800",
    reviews: 156
  },
  {
    id: 4,
    title: "Le Royaume Magique",
    description: "Un voyage fantastique dans un monde de magie où votre enfant devient le héros de l'histoire.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?auto=format&fit=crop&w=800",
    reviews: 142
  }
];

export function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [currentBook, setCurrentBook] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const [user, setUser] = useState<{
    name: string;
    childAge: number;
    lastVisitedCategory: string;
    points: number;
    purchaseCount: number;
    badges: string[];
    rank: number;
  } | null>(null);

  const nextBook = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentBook((prev) => (prev + 1) % bestSellers.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevBook = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentBook((prev) => (prev - 1 + bestSellers.length) % bestSellers.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(nextBook, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-in-active');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.slide-in-left, .slide-in-right').forEach((el) => {
      observerRef.current?.observe(el);
    });

    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.setProperty('--parallax-y', `${scrolled * 0.3}px`);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Simulate user data fetch
  useEffect(() => {
    // In a real app, this would come from your auth system
    const mockUser = {
      name: "Sophie",
      childAge: 6,
      lastVisitedCategory: "educational",
      points: 75,
      purchaseCount: 3,
      badges: ["Premier Achat", "Lecteur Passionné"],
      rank: 10
    };
    setUser(mockUser);
  }, []);

  const handleAISuggestion = (suggestion: any) => {
    console.log('AI Suggestion:', suggestion);
    // Handle the AI suggestion (e.g., filter books, scroll to recommendations)
  };

  return (
    <>
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-20 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-light/50 to-light dark:via-dark/50 dark:to-dark z-10" />
        <div ref={parallaxRef} className="absolute inset-0 z-0 parallax">
          <img
            src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1920"
            alt="Book background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <div className="animate-float">
            <h1 className="text-4xl sm:text-5xl md:text-7xl mb-6 text-highlight text-glow font-lobster">
              Mon Histoire Unique
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl mb-12 font-light max-w-3xl mx-auto px-4">
              Laissez l'IA créer une aventure sur mesure pour votre enfant
            </p>
            <Link to="/nos-livres-sur-mesure" className="btn group inline-flex items-center">
              <span className="relative z-10">Créez votre livre personnalisé</span>
              <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      {/* Personalized Welcome */}
      {user && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PersonalizedWelcome user={user} />
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center mb-16 text-shadow slide-in-left">
            Une expérience magique pour chaque enfant
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-8 h-8" />,
                title: "100% Personnalisé",
                text: "Chaque livre est unique et adapté à votre enfant"
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Éducatif et Ludique",
                text: "Des histoires qui stimulent l'apprentissage et l'imagination"
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Cadeau Unique",
                text: "Un souvenir précieux qui durera toute la vie"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="card slide-in-right backdrop-blur-sm bg-white/80 dark:bg-dark/80"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-highlight p-[2px]">
                  <div className="w-full h-full rounded-full bg-white dark:bg-dark flex items-center justify-center text-highlight">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl mb-4 text-center font-lobster text-shadow">{feature.title}</h3>
                <p className="text-center text-dark/80 dark:text-white/80">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty Program (for logged-in users) */}
      {user && (
        <section className="py-24 bg-gradient-to-b from-white/50 to-transparent dark:from-dark/50 dark:to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LoyaltyProgram
              points={user.points}
              purchaseCount={user.purchaseCount}
              badges={user.badges}
              rank={user.rank}
            />
          </div>
        </section>
      )}

      {/* How it Works Section */}
      <section className="py-24 bg-gradient-to-b from-white/50 to-transparent dark:from-dark/50 dark:to-transparent relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center mb-16 text-shadow slide-in-left">
            Comment ça marche ?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8 text-highlight" />,
                title: "Choisissez une histoire",
                text: "Sélectionnez parmi nos modèles d'histoires magiques"
              },
              {
                icon: <Book className="w-8 h-8 text-highlight" />,
                title: "Personnalisez",
                text: "Ajoutez le prénom et l'apparence de l'enfant"
              },
              {
                icon: <Sparkles className="w-8 h-8 text-highlight" />,
                title: "Magie de l'IA",
                text: "Notre IA crée une aventure unique"
              },
              {
                icon: <Gift className="w-8 h-8 text-highlight" />,
                title: "Recevez",
                text: "En version numérique ou imprimée"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="card slide-in-right backdrop-blur-sm bg-white/80 dark:bg-dark/80 group hover:bg-gradient-to-br hover:from-accent/20 hover:to-highlight/20"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center group-hover:animate-vibrate">
                  {item.icon}
                </div>
                <h3 className="text-xl mb-4 text-center font-lobster text-shadow">{item.title}</h3>
                <p className="text-center text-dark/80 dark:text-white/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center mb-16 text-shadow slide-in-left">
            Ce que disent nos clients
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Ma fille adore son livre personnalisé ! Elle le lit tous les soirs avant de dormir.",
                author: "Marie L.",
                role: "Maman comblée"
              },
              {
                text: "Un cadeau original qui a fait sensation ! La qualité est au rendez-vous.",
                author: "Thomas B.",
                role: "Papa créatif"
              },
              {
                text: "L'histoire était parfaitement adaptée à l'âge de mon fils. Je recommande !",
                author: "Sophie M.",
                role: "Maman enchantée"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="card slide-in-right backdrop-blur-sm bg-white/80 dark:bg-dark/80 group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-6">
                  <Star className="w-6 h-6 text-accent inline-block" />
                  <Star className="w-6 h-6 text-accent inline-block" />
                  <Star className="w-6 h-6 text-accent inline-block" />
                  <Star className="w-6 h-6 text-accent inline-block" />
                  <Star className="w-6 h-6 text-accent inline-block" />
                </div>
                <p className="mb-6 text-dark/80 dark:text-white/80 italic">{testimonial.text}</p>
                <div>
                  <p className="font-semibold text-highlight">{testimonial.author}</p>
                  <p className="text-sm text-dark/60 dark:text-white/60">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-highlight/20 opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-lobster mb-8 text-glow slide-in-left">
            Prêt à créer une histoire unique ?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto slide-in-right">
            Offrez à votre enfant une aventure personnalisée qui l'accompagnera toute sa vie.
          </p>
          <Link to="/nos-livres-sur-mesure" className="btn group">
            <span className="relative z-10">Créez votre livre maintenant</span>
            <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* AI Book Assistant */}
      <AIBookAssistant onSuggestion={handleAISuggestion} />
    </>
  );
}