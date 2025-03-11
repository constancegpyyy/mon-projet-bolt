import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyPolicy() {
  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
            <Shield className="w-8 h-8 text-highlight" />
          </div>
          <h1 className="text-4xl md:text-5xl mb-6 text-glow">
            Politique de Confidentialité & Protection des Données
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
              Chez Mon Histoire Unique, nous accordons une grande importance à la protection de vos 
              données personnelles. Cette politique de confidentialité explique comment nous collectons, 
              utilisons et protégeons vos informations.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-lobster text-shadow mb-4">2. Données collectées</h2>
            <p>Nous collectons les informations suivantes :</p>
            <ul className="list-disc pl-6 mt-4">
              <li>Informations d'identification (nom, prénom, email)</li>
              <li>Informations de livraison (adresse postale)</li>
              <li>Informations de paiement (via prestataires sécurisés)</li>
              <li>Préférences de personnalisation des livres</li>
              <li>Données de navigation (cookies)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-lobster text-shadow mb-4">3. Utilisation des données</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-6 mt-4">
              <li>Traiter vos commandes et personnaliser vos livres</li>
              <li>Vous envoyer des confirmations de commande</li>
              <li>Améliorer nos services et votre expérience</li>
              <li>Vous envoyer notre newsletter (avec votre consentement)</li>
              <li>Répondre à vos questions et demandes</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-lobster text-shadow mb-4">4. Partage des données</h2>
            <p>
              Nous ne partageons vos données qu'avec les prestataires nécessaires au bon fonctionnement 
              de nos services :
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Services de paiement sécurisés</li>
              <li>Services de livraison</li>
              <li>Hébergeur du site</li>
            </ul>
            <p className="mt-4">
              Nous ne vendons jamais vos données personnelles à des tiers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-lobster text-shadow mb-4">5. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données :
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Chiffrement SSL pour toutes les transmissions</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Sauvegardes régulières et sécurisées</li>
              <li>Mise à jour régulière de nos systèmes de sécurité</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-lobster text-shadow mb-4">6. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 mt-4">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d'opposition au traitement</li>
              <li>Droit de retrait du consentement</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-lobster text-shadow mb-4">7. Cookies et traçabilité</h2>
            <p>
              Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez 
              les gérer dans les paramètres de votre navigateur.
            </p>
            <h3 className="text-xl mb-2 mt-4">Types de cookies utilisés :</h3>
            <ul className="list-disc pl-6">
              <li>Cookies essentiels au fonctionnement du site</li>
              <li>Cookies analytiques (statistiques de visite)</li>
              <li>Cookies de personnalisation</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-lobster text-shadow mb-4">8. Contact</h2>
            <p>
              Pour toute question concernant vos données personnelles, contactez notre délégué à la 
              protection des données :
            </p>
            <p className="mt-4">
              Email : dpo@monhistoireunique.com<br />
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