import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, 
  Sparkles, 
  GraduationCap, 
  Pencil, 
  Download, 
  Truck, 
  Star, 
  Heart, 
  Gift, 
  HelpCircle, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';

export function HowItWorks() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6 text-glow slide-in-left">
            📖 Créez un livre unique en quelques étapes simples !
          </h1>
          <p className="text-xl text-dark/80 dark:text-white/80 max-w-3xl mx-auto slide-in-right">
            Offrez une expérience de lecture inoubliable à votre enfant avec nos livres personnalisés. 
            Suivez ces étapes simples pour créer une histoire qui lui ressemble !
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {/* Step 1 */}
          <div className="card slide-in-left backdrop-blur-sm bg-white/80 dark:bg-dark/80">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-lobster text-shadow mb-6">
                  1. Choisir le type d'histoire
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Book className="w-8 h-8 text-highlight flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Nos histoires narratives</h3>
                      <p className="text-dark/80 dark:text-white/80">
                        Des aventures passionnantes qui stimulent l'imagination
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <GraduationCap className="w-8 h-8 text-highlight flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Nos histoires éducatives</h3>
                      <p className="text-dark/80 dark:text-white/80">
                        Apprendre en s'amusant avec des histoires enrichissantes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Sparkles className="w-8 h-8 text-highlight flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Nos histoires sur mesure</h3>
                      <p className="text-dark/80 dark:text-white/80">
                        Des histoires 100% personnalisables selon vos envies
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-accent font-medium">
                  👉 Sélectionnez la catégorie qui vous convient et passez à l'étape suivante !
                </p>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800"
                  alt="Choix de l'histoire"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card slide-in-right backdrop-blur-sm bg-white/80 dark:bg-dark/80">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 aspect-video rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800"
                  alt="Personnalisation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-lobster text-shadow mb-6">
                  2. Personnaliser le livre
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Pencil className="w-5 h-5 text-highlight" />
                    <span>Prénom de l'enfant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-highlight" />
                    <span>Apparence du personnage (couleur de peau, cheveux, lunettes…)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-highlight" />
                    <span>Message spécial (dédicace)</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-dark/80 dark:text-white/80">
                    📌 Si vous optez pour une histoire sur mesure, remplissez un court formulaire 
                    et nous générerons une histoire 100% unique !
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card slide-in-left backdrop-blur-sm bg-white/80 dark:bg-dark/80">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-lobster text-shadow mb-6">
                  3. Choisir le format et commander
                </h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-white/50 dark:bg-dark/50">
                    <h3 className="font-semibold mb-4">Nos histoires narratives & éducatives</h3>
                    <div className="space-y-2">
                      <p>📚 Version imprimée : <span className="font-semibold">29,99€</span></p>
                      <p>📱 Version numérique : <span className="font-semibold">19,99€</span></p>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/50 dark:bg-dark/50">
                    <h3 className="font-semibold mb-4">Nos histoires sur mesure</h3>
                    <div className="space-y-2">
                      <p>📚 Version imprimée : <span className="font-semibold">39,99€</span></p>
                      <p>📱 Version numérique : <span className="font-semibold">29,99€</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800"
                  alt="Formats disponibles"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="card slide-in-right backdrop-blur-sm bg-white/80 dark:bg-dark/80">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 aspect-video rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800"
                  alt="Livraison"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-lobster text-shadow mb-6">
                  4. Recevoir le livre personnalisé
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Download className="w-6 h-6 text-highlight flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Version numérique</h3>
                      <p className="text-dark/80 dark:text-white/80">
                        Téléchargement instantané après paiement
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Truck className="w-6 h-6 text-highlight flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Version imprimée</h3>
                      <p className="text-dark/80 dark:text-white/80">
                        Expédition sous 5 à 7 jours ouvrés
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-24">
          <h2 className="text-3xl text-center font-lobster text-shadow mb-12">
            Pourquoi choisir nos livres personnalisés ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-8 h-8" />,
                title: "Expérience unique",
                text: "Un livre qui ressemble à votre enfant"
              },
              {
                icon: <Book className="w-8 h-8" />,
                title: "Plaisir de la lecture",
                text: "Favorise l'amour des livres dès le plus jeune âge"
              },
              {
                icon: <Gift className="w-8 h-8" />,
                title: "Cadeau parfait",
                text: "Idéal pour les anniversaires, Noël et autres occasions"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="card backdrop-blur-sm bg-white/80 dark:bg-dark/80 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center text-highlight">
                  {feature.icon}
                </div>
                <h3 className="text-xl mb-4 font-lobster text-shadow">{feature.title}</h3>
                <p className="text-dark/80 dark:text-white/80">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-lobster text-shadow mb-8">
            🎉 Prêt à créer votre livre unique ?
          </h2>
          <Link 
            to="/nos-livres-sur-mesure" 
            className="btn inline-flex items-center gap-2 text-lg"
          >
            📌 Créer mon livre personnalisé maintenant
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-dark/60 dark:text-white/60">
            <HelpCircle className="w-5 h-5" />
            <span>Besoin d'aide ?</span>
          </div>
          <div className="mt-2 space-x-4">
            <Link to="/faq" className="text-accent hover:text-highlight transition-colors">
              Consultez notre FAQ
            </Link>
            <span>ou</span>
            <Link to="/contact" className="text-accent hover:text-highlight transition-colors inline-flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              Contactez-nous directement
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}