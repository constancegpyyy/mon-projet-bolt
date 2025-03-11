import React from 'react';
import { Book, Star, Crown, Check, ShoppingBag } from 'lucide-react';
import { StripeCheckout } from '../components/StripeCheckout';

export function Subscriptions() {
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);
  const [showStripeCheckout, setShowStripeCheckout] = React.useState(false);

  const plans = [
    {
      id: 'discovery',
      title: 'Plan Découverte',
      price: 9.99,
      format: 'numérique',
      features: [
        '1 histoire personnalisée par mois',
        'Format numérique (PDF)',
        'Accès à la bibliothèque d\'histoires',
        'Personnalisation du héros',
        'Choix des thèmes'
      ],
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800'
    },
    {
      id: 'classic',
      title: 'Plan Classique',
      price: 14.99,
      format: 'numérique + imprimé',
      features: [
        '1 histoire personnalisée par mois',
        'Format numérique + version imprimée',
        'Accès à la bibliothèque d\'histoires',
        'Personnalisation avancée',
        'Livraison offerte',
        'Support prioritaire'
      ],
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800'
    },
    {
      id: 'premium',
      title: 'Plan Premium',
      price: 24.99,
      format: 'numérique + imprimé',
      features: [
        '2 histoires personnalisées par mois',
        'Format numérique + version imprimée',
        'Accès à la bibliothèque d\'histoires',
        'Personnalisation illimitée',
        'Livraison offerte',
        'Support prioritaire',
        'Accès anticipé aux nouveautés'
      ],
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800'
    }
  ];

  const handleStripeSuccess = async (paymentIntent: any) => {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-success text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-2xl">✨</span>
        <span>Abonnement souscrit avec succès !</span>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('animate-slide-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);

    window.location.href = '/confirmation';
  };

  const handleStripeError = (error: Error) => {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-error text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-2xl">❌</span>
        <span>${error.message}</span>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('animate-slide-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6 text-glow slide-in-left flex items-center justify-center gap-3">
            <Crown className="w-12 h-12 text-highlight" />
            Nos Abonnements
          </h1>
          <p className="text-xl text-dark/80 dark:text-white/80 max-w-3xl mx-auto slide-in-right">
            Recevez chaque mois une nouvelle histoire personnalisée pour votre enfant.
            Une expérience unique qui évolue avec lui !
          </p>
        </div>

        {/* Why Subscribe Section */}
        <div className="mb-16">
          <h2 className="text-3xl text-center mb-12 font-lobster text-shadow">
            Pourquoi choisir un abonnement ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Book className="w-8 h-8 text-highlight" />,
                title: "Histoires exclusives",
                text: "Chaque mois, une nouvelle aventure inédite adaptée à votre enfant."
              },
              {
                icon: <Star className="w-8 h-8 text-highlight" />,
                title: "Personnalisation avancée",
                text: "Ajoutez le prénom, l'apparence et d'autres détails uniques."
              },
              {
                icon: <Crown className="w-8 h-8 text-highlight" />,
                title: "Tarif avantageux",
                text: "Jusqu'à 30% d'économie par rapport aux achats individuels."
              }
            ].map((feature, index) => (
              <div key={index} className="card backdrop-blur-sm bg-white/80 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl mb-4 font-lobster text-shadow">{feature.title}</h3>
                <p className="text-dark/80 dark:text-white/80">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`card group backdrop-blur-sm bg-white/80 relative overflow-hidden ${
                selectedPlan === plan.id ? 'ring-4 ring-accent' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <h3 className="text-xl font-lobster">{plan.title}</h3>
                    <p className="text-sm opacity-90">{plan.format}</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-highlight">
                  {plan.price.toFixed(2)} €
                  <span className="text-base font-normal text-dark/60 dark:text-white/60">
                    /mois
                  </span>
                </div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-dark/80 dark:text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Subscribe Button */}
              {showStripeCheckout && selectedPlan === plan.id ? (
                <StripeCheckout
                  amount={plan.price * 100}
                  onSuccess={handleStripeSuccess}
                  onError={handleStripeError}
                />
              ) : (
                <button
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    setShowStripeCheckout(true);
                  }}
                  className="btn w-full flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  S'abonner
                </button>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl text-center mb-8 font-lobster text-shadow">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "Comment fonctionne l'abonnement ?",
                answer: "Chaque mois, vous recevez un nouveau livre personnalisé. L'abonnement est sans engagement et peut être annulé à tout moment."
              },
              {
                question: "Quand sont envoyés les livres ?",
                answer: "Les livres sont expédiés le 1er de chaque mois. Pour toute souscription en cours de mois, le premier livre sera envoyé le mois suivant."
              },
              {
                question: "Puis-je changer de formule ?",
                answer: "Oui, vous pouvez changer de formule à tout moment. Le changement sera effectif le mois suivant."
              }
            ].map((item, index) => (
              <div key={index} className="card backdrop-blur-sm bg-white/80">
                <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
                <p className="text-dark/80 dark:text-white/80">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}