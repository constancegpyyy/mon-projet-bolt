import React, { useState } from 'react';
import { ArrowRight, Mail, Send, Calendar, Clock, Tag, User, ChevronRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "Pourquoi les histoires personnalisées captivent les enfants ?",
    excerpt: "Les livres personnalisés stimulent l'imagination et renforcent l'intérêt des enfants pour la lecture. Découvrez pourquoi ils sont si efficaces !",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800",
    date: "15 Mars 2024",
    readTime: "5 min",
    category: "Éducation",
    author: "Sophie Martin",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400"
  },
  {
    id: 2,
    title: "Les bienfaits de la lecture avant le coucher",
    excerpt: "Lire une histoire le soir favorise un sommeil paisible et développe la créativité des enfants. Apprenez comment établir une routine de lecture efficace.",
    image: "https://images.unsplash.com/photo-1549737221-bef65e2604a6?auto=format&fit=crop&w=800",
    date: "12 Mars 2024",
    readTime: "4 min",
    category: "Conseils",
    author: "Thomas Bernard",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400"
  },
  {
    id: 3,
    title: "Comment rendre un enfant acteur de son histoire ?",
    excerpt: "Personnaliser un livre, c'est permettre à un enfant de devenir le héros de son aventure ! Découvrez nos astuces pour une expérience immersive.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800",
    date: "10 Mars 2024",
    readTime: "6 min",
    category: "Créativité",
    author: "Marie Dubois",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400"
  },
  {
    id: 4,
    title: "L'IA au service de l'éducation des enfants",
    excerpt: "Comment l'intelligence artificielle révolutionne l'apprentissage des enfants à travers la littérature personnalisée et interactive.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800",
    date: "8 Mars 2024",
    readTime: "7 min",
    category: "Technologie",
    author: "Pierre Lambert",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400"
  },
  {
    id: 5,
    title: "5 conseils pour choisir le livre parfait",
    excerpt: "Guide pratique pour sélectionner une histoire adaptée à l'âge et aux centres d'intérêt de votre enfant.",
    image: "https://images.unsplash.com/photo-1533673156662-d74c677405c4?auto=format&fit=crop&w=800",
    date: "5 Mars 2024",
    readTime: "5 min",
    category: "Guide",
    author: "Julie Moreau",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400"
  },
  {
    id: 6,
    title: "La psychologie derrière les histoires personnalisées",
    excerpt: "Comprendre l'impact émotionnel et cognitif des histoires personnalisées sur le développement de l'enfant.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800",
    date: "3 Mars 2024",
    readTime: "8 min",
    category: "Psychologie",
    author: "Dr. Anne Richard",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400"
  }
];

const categories = [
  { name: "Tous", count: articles.length },
  { name: "Éducation", count: articles.filter(a => a.category === "Éducation").length },
  { name: "Conseils", count: articles.filter(a => a.category === "Conseils").length },
  { name: "Créativité", count: articles.filter(a => a.category === "Créativité").length },
  { name: "Technologie", count: articles.filter(a => a.category === "Technologie").length },
  { name: "Guide", count: articles.filter(a => a.category === "Guide").length },
  { name: "Psychologie", count: articles.filter(a => a.category === "Psychologie").length }
];

export function Blog() {
  const [visibleArticles, setVisibleArticles] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles = articles.filter(article => 
    selectedCategory === "Tous" ? true : article.category === selectedCategory
  );

  const loadMore = () => {
    setVisibleArticles(prev => Math.min(prev + 3, filteredArticles.length));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-accent text-dark px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in';
      notification.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="text-2xl">📫</span>
          <span>Merci de votre inscription !</span>
        </div>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.classList.add('animate-slide-out');
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6 text-glow slide-in-left">
            Le Blog de Mon Histoire Unique
          </h1>
          <p className="text-xl text-dark/80 dark:text-white/80 max-w-3xl mx-auto slide-in-right">
            Découvrez nos articles sur les bienfaits de la lecture, la personnalisation des histoires 
            et l'éducation des enfants. Trouvez des conseils, des inspirations et des nouveautés sur 
            le monde des livres personnalisés.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
                selectedCategory === category.name
                  ? 'bg-accent text-dark'
                  : 'bg-white/50 dark:bg-dark/50 hover:bg-accent/20'
              }`}
            >
              <span>{category.name}</span>
              <span className="text-sm bg-dark/10 dark:bg-white/10 px-2 py-0.5 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <div className="mb-16">
            <article className="card group backdrop-blur-sm bg-white/80 dark:bg-dark/80">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={filteredArticles[0].image}
                    alt={filteredArticles[0].title}
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-sm bg-accent rounded-full">
                      {filteredArticles[0].category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-dark/60 dark:text-white/60">
                      <Calendar className="w-4 h-4" />
                      {filteredArticles[0].date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-dark/60 dark:text-white/60">
                      <Clock className="w-4 h-4" />
                      {filteredArticles[0].readTime} de lecture
                    </div>
                  </div>
                  <h2 className="text-3xl mb-4 font-lobster text-shadow group-hover:text-highlight transition-colors">
                    {filteredArticles[0].title}
                  </h2>
                  <p className="text-dark/80 dark:text-white/80 mb-6">
                    {filteredArticles[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={filteredArticles[0].authorImage}
                        alt={filteredArticles[0].author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{filteredArticles[0].author}</p>
                        <p className="text-sm text-dark/60 dark:text-white/60">Auteur</p>
                      </div>
                    </div>
                    <button className="btn group">
                      <span className="relative z-10">Lire l'article</span>
                      <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredArticles.slice(1, visibleArticles).map((article) => (
            <article
              key={article.id}
              className="card group backdrop-blur-sm bg-white/80 dark:bg-dark/80"
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-sm bg-accent rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-dark/60 dark:text-white/60">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-dark/60 dark:text-white/60">
                  <Clock className="w-4 h-4" />
                  {article.readTime} de lecture
                </div>
              </div>
              <h2 className="text-xl mb-4 font-lobster text-shadow group-hover:text-highlight transition-colors">
                {article.title}
              </h2>
              <p className="text-dark/80 dark:text-white/80 mb-6">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-dark/60 dark:text-white/60">
                    {article.author}
                  </span>
                </div>
                <button className="text-accent group-hover:text-highlight transition-colors flex items-center gap-1">
                  Lire plus
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {visibleArticles < filteredArticles.length && (
          <div className="text-center mb-24">
            <button
              onClick={loadMore}
              className="btn"
            >
              Voir plus d'articles
            </button>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="card backdrop-blur-sm bg-white/80 dark:bg-dark/80 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
            <Mail className="w-8 h-8 text-highlight" />
          </div>
          <h2 className="text-2xl mb-4 font-lobster text-shadow">
            Recevez nos meilleurs articles
          </h2>
          <p className="text-dark/80 dark:text-white/80 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et conseils 
            directement dans votre boîte mail.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-2 rounded-lg bg-white/50 dark:bg-dark/50 border border-dark/10 dark:border-white/10 focus:ring-2 focus:ring-accent"
              required
            />
            <button
              type="submit"
              className="btn flex items-center gap-2 whitespace-nowrap"
            >
              <Send className="w-4 h-4" />
              S'abonner
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}