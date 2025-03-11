import React from 'react';
import { Scroll, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsAndConditions() {
  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
            <Scroll className="w-8 h-8 text-highlight" />
          </div>
          <h1 className="text-4xl md:text-5xl mb-6 text-glow">
            Conditions Générales d'Utilisation & de Vente
          </h1>
          <p className="text-dark/60 dark:text-white/60">
            Dernière mise à jour : Mars 2024
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-lobster text-shadow mb-4">1. Introduction</h2>
            <p>
              Les présentes conditions générales régissent l'utilisation du site Mon Histoire Unique 
              et la vente de nos livres personnalisés. En utilisant notre site ou en passant commande, 
              vous acceptez ces conditions dans leur intégralité.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-lobster text-shadow mb-4">2. Objet des Conditions Générales</h2>
            <p>
              Mon Histoire Unique propose un service de création et de vente de livres personnalisés 
              pour enfants. Ces conditions définissent les droits et obligations des parties dans le 
              cadre de la vente de nos produits.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-lobster text-shadow mb-4">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble des éléments du site (textes, illustrations, code, etc.) est protégé par le 
              droit d'auteur. Toute reproduction ou utilisation non autorisée est interdite.
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Les contenus générés sont la propriété de Mon Histoire Unique</li>
              <li>Les illustrations sont protégées par le droit d'auteur</li>
              <li>L'utilisation est strictement limitée à un usage personnel</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-lobster text-shadow mb-4">4. Commandes et paiement</h2>
            <p>
              Les prix sont indiqués en euros TTC. Le paiement est exigible immédiatement à la commande.
            </p>
            <h3 className="text-xl mb-2 mt-4">Modes de paiement acceptés :</h3>
            <ul className="list-disc pl-6">
              <li>Cartes bancaires (Visa, Mastercard)</li>
              <li>PayPal</li>
              <li>Apple Pay</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-lobster text-shadow mb-4">5. Livraison et retours</h2>
            <p>
              Les délais de livraison sont de 7 à 10 jours ouvrés pour les versions imprimées. 
              Les versions numériques sont disponibles immédiatement après la commande.
            </p>
            <h3 className="text-xl mb-2 mt-4">Politique de retour :</h3>
            <ul className="list-disc pl-6">
              <li>14 jours pour exercer le droit de rétractation</li>
              <li>Remboursement sous 14 jours après réception du retour</li>
              <li>Les livres personnalisés ne peuvent être retournés sauf défaut</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-lobster text-shadow mb-4">6. Responsabilité et garanties</h2>
            <p>
              Mon Histoire Unique s'engage à fournir le service avec diligence et selon les règles 
              de l'art, étant précisé qu'il pèse sur elle une obligation de moyens.
            </p>
            <p className="mt-4">
              Le site ne pourra être tenu responsable des dommages indirects résultant de l'utilisation 
              du service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-lobster text-shadow mb-4">7. Modifications des CGV</h2>
            <p>
              Mon Histoire Unique se réserve le droit de modifier les présentes CGV à tout moment. 
              Les modifications prennent effet dès leur publication sur le site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-lobster text-shadow mb-4">8. Contact</h2>
            <p>
              Pour toute question relative aux présentes conditions générales, vous pouvez nous 
              contacter à l'adresse suivante :
            </p>
            <p className="mt-4">
              Email : support@monhistoireunique.com<br />
              Téléphone : +33 1 23 45 67 89<br />
              Adresse : 123 Rue des Histoires, Paris, France
            </p>
          </section>
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