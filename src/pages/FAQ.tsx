import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface FAQCategory {
  title: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

const faqData: FAQCategory[] = [
  {
    title: "Commandes et livraison",
    questions: [
      {
        question: "Quels sont les délais de livraison ?",
        answer: "Nos livres imprimés sont livrés sous 7 à 10 jours ouvrés. La version numérique est disponible immédiatement après la commande."
      },
      {
        question: "Quels sont les frais de livraison ?",
        answer: "La livraison est gratuite en France métropolitaine pour toute commande supérieure à 35€. Pour les autres destinations, les frais sont calculés en fonction du pays de livraison."
      },
      {
        question: "Comment suivre ma commande ?",
        answer: "Un email de confirmation avec un numéro de suivi vous est envoyé dès l'expédition de votre commande. Vous pouvez suivre votre colis directement depuis votre compte client."
      }
    ]
  },
  {
    title: "Personnalisation",
    questions: [
      {
        question: "Comment personnaliser un livre ?",
        answer: "Choisissez une histoire, ajoutez le prénom de l'enfant et personnalisez son apparence. Notre IA s'occupe ensuite de créer une histoire unique adaptée à ces critères."
      },
      {
        question: "Puis-je modifier un livre après l'avoir commandé ?",
        answer: "Une fois la commande validée, il n'est plus possible de modifier la personnalisation. Vérifiez bien tous les détails avant de confirmer votre commande."
      },
      {
        question: "Quels éléments puis-je personnaliser ?",
        answer: "Vous pouvez personnaliser le prénom, l'apparence du personnage (cheveux, yeux, tenue...), et ajouter un message personnel qui apparaîtra au début du livre."
      }
    ]
  },
  {
    title: "Formats et options",
    questions: [
      {
        question: "Quels formats de livres sont disponibles ?",
        answer: "Nous proposons des versions numériques (PDF) et des livres imprimés en format A4 couverture rigide ou souple."
      },
      {
        question: "Quelle est la qualité d'impression ?",
        answer: "Nos livres sont imprimés sur du papier de haute qualité (135g/m²) avec une couverture rigide ou souple selon votre choix. Les couleurs sont vives et durables."
      },
      {
        question: "Puis-je avoir une dédicace ?",
        answer: "Oui, vous pouvez ajouter un message personnel qui sera imprimé sur la première page du livre."
      }
    ]
  },
  {
    title: "Paiement et sécurité",
    questions: [
      {
        question: "Quels modes de paiement acceptez-vous ?",
        answer: "Nous acceptons les paiements par carte bancaire (Visa, Mastercard), PayPal et Apple Pay. Tous les paiements sont sécurisés."
      },
      {
        question: "Les paiements sont-ils sécurisés ?",
        answer: "Oui, nous utilisons un système de paiement sécurisé SSL. Vos données bancaires sont cryptées et ne sont jamais stockées sur nos serveurs."
      },
      {
        question: "Puis-je payer en plusieurs fois ?",
        answer: "Oui, pour les commandes supérieures à 60€, vous pouvez payer en 3 fois sans frais avec notre partenaire bancaire."
      }
    ]
  },
  {
    title: "Retours et remboursements",
    questions: [
      {
        question: "Quelle est votre politique de retour ?",
        answer: "Vous disposez d'un délai de 14 jours pour nous retourner un article. Les livres personnalisés ne peuvent être retournés que s'ils présentent un défaut."
      },
      {
        question: "Comment demander un remboursement ?",
        answer: "Contactez notre service client avec votre numéro de commande. Nous traiterons votre demande sous 48h ouvrées."
      },
      {
        question: "Que faire en cas de livre endommagé ?",
        answer: "Si votre livre arrive endommagé, prenez une photo et contactez-nous immédiatement. Nous vous enverrons un nouveau livre sans frais supplémentaires."
      }
    ]
  }
];

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6 text-glow slide-in-left">
            Questions Fréquentes
          </h1>
          <p className="text-xl text-dark/80 dark:text-white/80 max-w-2xl mx-auto slide-in-right">
            Trouvez rapidement des réponses à vos questions sur nos livres personnalisés
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40 dark:text-white/40" />
          <input
            type="text"
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/50 dark:bg-dark/50 border border-dark/10 dark:border-white/10 focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQ.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="card backdrop-blur-sm bg-white/80 dark:bg-dark/80"
            >
              <button
                onClick={() => setActiveCategory(
                  activeCategory === categoryIndex ? null : categoryIndex
                )}
                className="w-full flex items-center justify-between gap-4 mb-6"
              >
                <h2 className="text-2xl font-lobster text-shadow">{category.title}</h2>
                <ChevronDown
                  className={`w-6 h-6 transition-transform ${
                    activeCategory === categoryIndex ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {(activeCategory === categoryIndex || searchQuery) && (
                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => (
                    <div
                      key={questionIndex}
                      className="border-b border-dark/10 dark:border-white/10 last:border-0 pb-4 last:pb-0"
                    >
                      <button
                        onClick={() => setActiveQuestion(
                          activeQuestion === `${categoryIndex}-${questionIndex}`
                            ? null
                            : `${categoryIndex}-${questionIndex}`
                        )}
                        className="w-full flex items-center justify-between gap-4 text-left"
                      >
                        <span className="font-medium">{item.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            activeQuestion === `${categoryIndex}-${questionIndex}`
                              ? 'rotate-180'
                              : ''
                          }`}
                        />
                      </button>
                      {activeQuestion === `${categoryIndex}-${questionIndex}` && (
                        <p className="mt-2 text-dark/80 dark:text-white/80">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-dark/80 dark:text-white/80 mb-6">
            Vous n'avez pas trouvé la réponse à votre question ?
          </p>
          <a href="/contact" className="btn">
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  );
}