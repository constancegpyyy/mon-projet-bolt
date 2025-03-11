import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Instagram, 
  Facebook, 
  ChevronDown, 
  AlertCircle,
  MessageSquare,
  Clock
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  privacy: false
};

const faqs = [
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Nos livres imprimés sont livrés sous 7 à 10 jours. La version numérique est envoyée immédiatement après commande."
  },
  {
    question: "Puis-je modifier un livre après l'avoir commandé ?",
    answer: "Une fois la commande passée, il n'est plus possible de modifier la personnalisation."
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Nous acceptons les paiements par carte bancaire, PayPal et Apple Pay."
  }
];

export function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (!formData.subject) {
      newErrors.subject = 'Le sujet est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }

    if (!formData.privacy) {
      newErrors.privacy = 'Vous devez accepter la politique de confidentialité';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Afficher la notification de succès
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-success text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-2xl">✉️</span>
        <span>Message envoyé avec succès !</span>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('animate-slide-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);

    // Réinitialiser le formulaire
    setFormData(initialFormData);
    setIsSubmitting(false);
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6 text-glow slide-in-left flex items-center justify-center gap-3">
            <MessageSquare className="w-12 h-12 text-highlight" />
            Contactez-nous
          </h1>
          <p className="text-xl text-dark/80 dark:text-white/80 max-w-3xl mx-auto slide-in-right">
            Une question sur nos livres personnalisés ? Un problème avec votre commande ? 
            Notre équipe est là pour vous aider !
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card slide-in-left backdrop-blur-sm bg-white/80 dark:bg-dark/80">
            <h2 className="text-2xl mb-6 font-lobster text-shadow">Envoyez-nous un message</h2>
            <form 
              onSubmit={handleSubmit}
              action="https://hook.us2.make.com/ndj4ybl2q9xqvtgmk3q2q0j97o3ck9je"
              method="POST"
              className="space-y-6"
            >
              {/* Nom complet */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark/50 border ${
                    errors.name ? 'border-error' : 'border-dark/10 dark:border-white/10'
                  } focus:ring-2 focus:ring-accent transition-colors`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-error flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark/50 border ${
                    errors.email ? 'border-error' : 'border-dark/10 dark:border-white/10'
                  } focus:ring-2 focus:ring-accent transition-colors`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Téléphone (optionnel) */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Téléphone (optionnel)
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark/50 border border-dark/10 dark:border-white/10 focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Sujet */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Sujet *
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark/50 border ${
                    errors.subject ? 'border-error' : 'border-dark/10 dark:border-white/10'
                  } focus:ring-2 focus:ring-accent transition-colors`}
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="book">📖 Question sur un livre</option>
                  <option value="order">🚚 Problème de commande</option>
                  <option value="other">💡 Autre demande</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-error flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark/50 border ${
                    errors.message ? 'border-error' : 'border-dark/10 dark:border-white/10'
                  } focus:ring-2 focus:ring-accent transition-colors`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-error flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Privacy Policy */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.privacy}
                    onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                    className="rounded border-dark/10 dark:border-white/10 text-accent focus:ring-accent"
                  />
                  <span className="text-sm">
                    J'accepte la{' '}
                    <a
                      href="/politique-confidentialite"
                      className="text-accent hover:text-highlight underline"
                    >
                      politique de confidentialité
                    </a>{' '}
                    *
                  </span>
                </label>
                {errors.privacy && (
                  <p className="mt-1 text-sm text-error flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.privacy}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn w-full flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </form>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="card slide-in-right backdrop-blur-sm bg-white/80 dark:bg-dark/80">
              <h2 className="text-2xl mb-6 font-lobster text-shadow">Informations de contact</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-highlight" />
                  </div>
                  <div>
                    <div className="text-sm text-dark/60 dark:text-white/60">Email</div>
                    <div>support@monhistoireunique.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-highlight" />
                  </div>
                  <div>
                    <div className="text-sm text-dark/60 dark:text-white/60">Téléphone</div>
                    <div>+33 1 23 45 67 89</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-highlight" />
                  </div>
                  <div>
                    <div className="text-sm text-dark/60 dark:text-white/60">Horaires</div>
                    <div>Lun-Ven : 9h-18h</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-highlight" />
                  </div>
                  <div>
                    <div className="text-sm text-dark/60 dark:text-white/60">Adresse</div>
                    <div>123 Rue des Histoires, Paris, France</div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-dark/10 dark:border-white/10">
                <h3 className="text-lg mb-4">Suivez-nous</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent/30 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent/30 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="card slide-in-right backdrop-blur-sm bg-white/80 dark:bg-dark/80">
              <h2 className="text-2xl mb-6 font-lobster text-shadow">Questions fréquentes</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-dark/10 dark:border-white/10 last:border-0 pb-4 last:pb-0"
                  >
                    <button
                      onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                      className="w-full flex items-center justify-between gap-4 text-left"
                    >
                      <span className="font-medium">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          activeQuestion === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeQuestion === index && (
                      <p className="mt-2 text-dark/80 dark:text-white/80">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <a href="/faq" className="text-accent hover:text-highlight transition-colors">
                  Voir toutes les questions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}