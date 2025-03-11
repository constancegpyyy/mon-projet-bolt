import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Heart, Star, MessageSquare, Sparkles, Leaf } from 'lucide-react';

export function About() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6 text-glow slide-in-left">
            Qui sommes-nous ? L'histoire derrière Mon Histoire Unique
          </h1>
          <p className="text-xl text-dark/80 dark:text-white/80 max-w-3xl mx-auto slide-in-right">
            Nous avons créé Mon Histoire Unique pour offrir aux enfants des livres personnalisés qui stimulent leur imagination. 
            Grâce à l'intelligence artificielle, nous permettons à chaque enfant de devenir le héros de son propre livre.
          </p>
        </div>

        {/* L'origine du projet */}
        <div className="card slide-in-left backdrop-blur-sm bg-white/80 dark:bg-dark/80">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
            <Book className="w-8 h-8 text-highlight" />
          </div>
          <h2 className="text-3xl text-center mb-6 font-lobster text-shadow">
            L'origine de Mon Histoire Unique
          </h2>
          <p className="text-dark/80 dark:text-white/80 text-center max-w-3xl mx-auto">
            L'idée de Mon Histoire Unique est née d'une envie simple : permettre à chaque enfant de vivre une aventure 
            qui lui ressemble. Nous avons combiné notre passion pour les histoires et les nouvelles technologies afin 
            de créer une expérience de lecture inédite.
          </p>
        </div>

        {/* Nos valeurs */}
        <div className="card slide-in-right backdrop-blur-sm bg-white/80 dark:bg-dark/80">
          <h2 className="text-3xl text-center mb-12 font-lobster text-shadow">
            Nos valeurs fondamentales
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sparkles className="w-8 h-8 text-highlight" />,
                title: "Créativité",
                text: "Encourager l'imagination à travers des histoires uniques."
              },
              {
                icon: <Book className="w-8 h-8 text-highlight" />,
                title: "Accessibilité",
                text: "Des livres disponibles en version numérique et imprimée."
              },
              {
                icon: <Heart className="w-8 h-8 text-highlight" />,
                title: "Diversité",
                text: "Des personnages et histoires adaptés à tous les enfants."
              },
              {
                icon: <Leaf className="w-8 h-8 text-highlight" />,
                title: "Écoresponsabilité",
                text: "Impression sur papier issu de forêts gérées durablement."
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-white/50 dark:bg-dark/50">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl mb-4 font-lobster text-shadow">{value.title}</h3>
                <p className="text-dark/80 dark:text-white/80">{value.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-3xl mb-8 font-lobster text-shadow">
            Une question ? Contactez-nous !
          </h2>
          <Link 
            to="/contact" 
            className="btn inline-flex items-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}