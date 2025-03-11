import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle,
  LogIn,
  ChevronRight
} from 'lucide-react';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simuler une connexion
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Afficher une notification de succès
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-success text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-2xl">✨</span>
        <span>Connexion réussie !</span>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('animate-slide-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);

    setIsSubmitting(false);
  };

  const handleSocialLogin = (provider: string) => {
    // Simuler une connexion sociale
    console.log(`Connexion avec ${provider}`);
  };

  return (
    <div className="py-24">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-6 text-glow slide-in-left">
            Connexion à votre compte
          </h1>
          <p className="text-lg text-secondary max-w-sm mx-auto slide-in-right">
            Connectez-vous pour accéder à votre espace personnel, suivre vos commandes et gérer vos informations.
          </p>
        </div>

        {/* Social Login */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => handleSocialLogin('Google')}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg border border-dark/10 hover:bg-accent/10 transition-colors"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Se connecter avec Google</span>
          </button>
          <button
            onClick={() => handleSocialLogin('Facebook')}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg border border-dark/10 hover:bg-accent/10 transition-colors"
          >
            <img
              src="https://www.facebook.com/favicon.ico"
              alt="Facebook"
              className="w-5 h-5"
            />
            <span>Se connecter avec Facebook</span>
          </button>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-background text-muted">ou</span>
          </div>
        </div>

        {/* Login Form */}
        <form 
          onSubmit={handleSubmit}
          action="https://hook.us2.make.com/ndj4ybl2q9xqvtgmk3q2q0j97o3ck9je"
          method="POST"
          className="card space-y-6"
        >
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Adresse email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/50 border ${
                  errors.email ? 'border-error' : 'border-dark/10'
                } focus:ring-2 focus:ring-accent transition-colors`}
                placeholder="exemple@email.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-error flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Mot de passe
              </label>
              <Link
                to="/mot-de-passe-oublie"
                className="text-sm text-info hover:text-highlight transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full pl-12 pr-12 py-3 rounded-lg bg-white/50 border ${
                  errors.password ? 'border-error' : 'border-dark/10'
                } focus:ring-2 focus:ring-accent transition-colors`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-error flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={formData.rememberMe}
              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              className="rounded border-dark/10 text-accent focus:ring-accent"
            />
            <label htmlFor="remember" className="ml-2 text-sm">
              Se souvenir de moi
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn w-full flex items-center justify-center gap-2 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <LogIn className="w-5 h-5" />
            {isSubmitting ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-secondary">
            Vous n'avez pas encore de compte ?{' '}
            <Link
              to="/inscription"
              className="text-info hover:text-highlight transition-colors inline-flex items-center gap-1"
            >
              Créer un compte
              <ChevronRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}