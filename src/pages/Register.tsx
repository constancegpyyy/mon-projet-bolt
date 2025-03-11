import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle,
  UserPlus,
  ChevronLeft,
  User,
  Check
} from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface VerificationData {
  code: string[];
  email: string;
}

export function Register() {
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [verificationData, setVerificationData] = useState<VerificationData>({
    code: ['', '', '', '', '', ''],
    email: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const codeInputRefs = Array(6).fill(0).map(() => React.createRef<HTMLInputElement>());

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions générales';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simuler l'envoi du code de vérification
    await new Promise(resolve => setTimeout(resolve, 1000));

    setVerificationData(prev => ({ ...prev, email: formData.email }));
    setStep('verify');
    setIsSubmitting(false);

    // Démarrer le timer pour le renvoi du code
    setResendDisabled(true);
    setResendTimer(60);
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = verificationData.code.join('');
    if (code.length !== 6) {
      setErrors({ code: 'Le code doit contenir 6 chiffres' });
      return;
    }

    setIsSubmitting(true);

    // Simuler la vérification du code
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Afficher une notification de succès
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-success text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-2xl">🎉</span>
        <span>Compte créé avec succès !</span>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('animate-slide-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);

    setIsSubmitting(false);
  };

  const handleCodeInput = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    setVerificationData(prev => {
      const newCode = [...prev.code];
      newCode[index] = value;
      return { ...prev, code: newCode };
    });

    if (value && index < 5) {
      codeInputRefs[index + 1].current?.focus();
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationData.code[index] && index > 0) {
      codeInputRefs[index - 1].current?.focus();
    }
  };

  const handleResendCode = async () => {
    if (resendDisabled) return;

    setResendDisabled(true);
    setResendTimer(60);

    // Simuler le renvoi du code
    await new Promise(resolve => setTimeout(resolve, 1000));

    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-success text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-2xl">✉️</span>
        <span>Nouveau code envoyé !</span>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('animate-slide-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  // Timer pour le renvoi du code
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleSocialRegister = (provider: string) => {
    // Simuler l'inscription sociale
    console.log(`Inscription avec ${provider}`);
  };

  return (
    <div className="py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {step === 'register' ? (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl mb-6 text-glow slide-in-left">
                Créer un compte
              </h1>
              <p className="text-lg text-secondary max-w-lg mx-auto slide-in-right">
                Rejoignez Mon Histoire Unique pour suivre vos commandes, personnaliser vos livres 
                et profiter d'une expérience exclusive.
              </p>
            </div>

            {/* Social Register */}
            <div className="space-y-4 mb-8">
              <button
                onClick={() => handleSocialRegister('Google')}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg border border-dark/10 hover:bg-accent/10 transition-colors"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span>S'inscrire avec Google</span>
              </button>
              <button
                onClick={() => handleSocialRegister('Facebook')}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg border border-dark/10 hover:bg-accent/10 transition-colors"
              >
                <img
                  src="https://www.facebook.com/favicon.ico"
                  alt="Facebook"
                  className="w-5 h-5"
                />
                <span>S'inscrire avec Facebook</span>
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

            {/* Register Form */}
            <form 
              onSubmit={handleSubmit}
              action="https://hook.us2.make.com/ndj4ybl2q9xqvtgmk3q2q0j97o3ck9je"
              method="POST"
              className="card space-y-6"
            >
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    Prénom *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/50 border ${
                        errors.firstName ? 'border-error' : 'border-dark/10'
                      } focus:ring-2 focus:ring-accent transition-colors`}
                      placeholder="Jean"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-error flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Nom *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg bg-white/50 border ${
                        errors.lastName ? 'border-error' : 'border-dark/10'
                      } focus:ring-2 focus:ring-accent transition-colors`}
                      placeholder="Dupont"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-error flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Adresse email *
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
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Mot de passe *
                </label>
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

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirmer le mot de passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full pl-12 pr-12 py-3 rounded-lg bg-white/50 border ${
                      errors.confirmPassword ? 'border-error' : 'border-dark/10'
                    } focus:ring-2 focus:ring-accent transition-colors`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-error flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div>
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                    className="mt-1 rounded border-dark/10 text-accent focus:ring-accent"
                  />
                  <span className="text-sm">
                    J'accepte les{' '}
                    <Link
                      to="/conditions-generales"
                      className="text-accent hover:text-highlight underline"
                    >
                      conditions générales
                    </Link>
                    {' '}et la{' '}
                    <Link
                      to="/politique-confidentialite"
                      className="text-accent hover:text-highlight underline"
                    >
                      politique de confidentialité
                    </Link>
                    {' '}*
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="mt-1 text-sm text-error flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.acceptTerms}
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
                <UserPlus className="w-5 h-5" />
                {isSubmitting ? 'Création du compte...' : 'Créer mon compte'}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-secondary">
                Vous avez déjà un compte ?{' '}
                <Link
                  to="/connexion"
                  className="text-info hover:text-highlight transition-colors inline-flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Se connecter
                </Link>
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Verification Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                <Mail className="w-8 h-8 text-highlight" />
              </div>
              <h1 className="text-4xl mb-6 text-glow">
                Vérifiez votre email
              </h1>
              <p className="text-lg text-secondary max-w-lg mx-auto">
                Un code de vérification a été envoyé à <strong>{verificationData.email}</strong>. 
                Veuillez entrer ce code pour activer votre compte.
              </p>
            </div>

            {/* Verification Form */}
            <form 
              onSubmit={handleVerificationSubmit}
              action="https://hook.us2.make.com/ndj4ybl2q9xqvtgmk3q2q0j97o3ck9je"
              method="POST"
              className="card space-y-8"
            >
              {/* Code Input */}
              <div>
                <label className="block text-sm font-medium mb-4 text-center">
                  Code de vérification
                </label>
                <div className="flex justify-center gap-2">
                  {verificationData.code.map((digit, index) => (
                    <input
                      key={index}
                      ref={codeInputRefs[index]}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeInput(index, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-semibold rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent transition-colors"
                    />
                  ))}
                </div>
                {errors.code && (
                  <p className="mt-2 text-sm text-error text-center flex items-center justify-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.code}
                  </p>
                )}
              </div>

              {/* Resend Code */}
              <div className="text-center">
                <p className="text-sm text-secondary mb-2">
                  Vous n'avez pas reçu le code ?
                </p>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendDisabled}
                  className={`text-info hover:text-highlight transition-colors ${
                    resendDisabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {resendDisabled
                    ? `Renvoyer le code (${resendTimer}s)`
                    : 'Renvoyer le code'}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn w-full flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Check className="w-5 h-5" />
                {isSubmitting ? 'Vérification...' : 'Valider mon compte'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}