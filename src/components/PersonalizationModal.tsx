import React, { useState, useEffect } from 'react';
import { X, AlertCircle, ShoppingCart, Eye, Download, Wand2 } from 'lucide-react';
import { AvatarPreview } from './AvatarPreview';
import { useCart } from '../contexts/CartContext';

export interface PersonalizationData {
  bookId: string;
  childName: string;
  dedication: string;
  avatar: {
    skinTone: string;
    hairStyle: string;
    hairLength: string;
    hairColor: string;
    eyeColor: string;
  };
}

interface PersonalizationModalProps {
  book: {
    id: string;
    title: string;
    formats?: {
      paper: {
        price: number;
        stock: number;
      };
      ebook: {
        price: number;
      };
    };
    price?: number;
    image: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (personalization: PersonalizationData) => void;
}

const skinTones = [
  { id: 'light', name: 'Claire', hex: '#FFE6D5' },
  { id: 'medium', name: 'Moyenne', hex: '#FFBB98' },
  { id: 'dark', name: 'Foncée', hex: '#FF8C69' }
];

const hairStyles = [
  { id: 'straight', name: 'Raides', icon: '💇‍♂️' },
  { id: 'wavy', name: 'Ondulés', icon: '💇' },
  { id: 'curly', name: 'Bouclés', icon: '👨‍🦱' },
  { id: 'afro', name: 'Crépus', icon: '🧑‍🦱' }
];

const hairLengths = [
  { id: 'short', name: 'Courts', icon: '✂️' },
  { id: 'medium', name: 'Mi-longs', icon: '💇' },
  { id: 'long', name: 'Longs', icon: '👱‍♀️' }
];

const hairColors = [
  { id: 'blonde', name: 'Blond', hex: '#FFE135' },
  { id: 'brown', name: 'Brun', hex: '#8B4513' },
  { id: 'red', name: 'Roux', hex: '#FF4040' },
  { id: 'black', name: 'Noir', hex: '#1B1B1B' }
];

const eyeColors = [
  { id: 'blue', name: 'Bleu', hex: '#4FC3F7' },
  { id: 'green', name: 'Vert', hex: '#66BB6A' },
  { id: 'brown', name: 'Marron', hex: '#795548' },
  { id: 'black', name: 'Noir', hex: '#1B1B1B' }
];

export function PersonalizationModal({ book, isOpen, onClose, onAddToCart }: PersonalizationModalProps) {
  const { addItem } = useCart();
  const [personalization, setPersonalization] = useState<PersonalizationData>({
    bookId: book.id,
    childName: '',
    dedication: '',
    avatar: {
      skinTone: 'medium',
      hairStyle: 'straight',
      hairLength: 'medium',
      hairColor: 'brown',
      eyeColor: 'brown'
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentStep, setCurrentStep] = useState<'info' | 'avatar'>('info');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!personalization.childName.trim()) {
      newErrors.childName = 'Le prénom est requis';
    }
    if (!personalization.avatar.skinTone) {
      newErrors.skinTone = 'La couleur de peau est requise';
    }
    if (!personalization.avatar.hairStyle) {
      newErrors.hairStyle = 'Le type de cheveux est requis';
    }
    if (!personalization.avatar.hairLength) {
      newErrors.hairLength = 'La longueur des cheveux est requise';
    }
    if (!personalization.avatar.hairColor) {
      newErrors.hairColor = 'La couleur des cheveux est requise';
    }
    if (!personalization.avatar.eyeColor) {
      newErrors.eyeColor = 'La couleur des yeux est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Create cart item
      const cartItem = {
        bookId: book.id,
        title: book.title,
        price: book.formats ? book.formats.paper.price : (book.price || 0),
        image: book.image,
        personalization: {
          childName: personalization.childName,
          dedication: personalization.dedication,
          avatar: personalization.avatar
        }
      };

      // Add to cart context
      addItem(cartItem);

      // Create and show notification
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-success text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in';
      notification.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="text-2xl">🎉</span>
          <span>Livre ajouté au panier !</span>
        </div>
      `;
      document.body.appendChild(notification);

      // Remove notification after delay
      setTimeout(() => {
        if (notification.parentNode === document.body) {
          notification.classList.add('animate-slide-out');
          setTimeout(() => {
            if (notification.parentNode === document.body) {
              document.body.removeChild(notification);
            }
          }, 300);
        }
      }, 3000);

      // Call original onAddToCart if provided
      if (onAddToCart) {
        onAddToCart(personalization);
      }

      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-light dark:bg-dark rounded-lg shadow-xl m-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-accent/20 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-lobster text-shadow mb-8 text-center">
            Personnalisez votre livre
          </h2>

          {/* Steps Navigation */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setCurrentStep('info')}
              className={`px-6 py-2 rounded-l-full ${
                currentStep === 'info'
                  ? 'bg-accent text-dark'
                  : 'bg-white/50 dark:bg-dark/50 hover:bg-accent/20'
              }`}
            >
              Information
            </button>
            <button
              onClick={() => setCurrentStep('avatar')}
              className={`px-6 py-2 rounded-r-full ${
                currentStep === 'avatar'
                  ? 'bg-accent text-dark'
                  : 'bg-white/50 dark:bg-dark/50 hover:bg-accent/20'
              }`}
            >
              Avatar
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <div className={`space-y-6 ${isPreviewMode ? 'hidden md:block' : ''}`}>
              <form 
                onSubmit={handleSubmit}
                action="https://hook.us2.make.com/ndj4ybl2q9xqvtgmk3q2q0j97o3ck9je"
                method="POST"
                className="space-y-6"
              >
                {currentStep === 'info' ? (
                  <>
                    {/* Basic Information */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Prénom de l'enfant *
                      </label>
                      <input
                        type="text"
                        value={personalization.childName}
                        onChange={(e) => setPersonalization(prev => ({
                          ...prev,
                          childName: e.target.value
                        }))}
                        className={`w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark/50 border ${
                          errors.childName ? 'border-error' : 'border-dark/10 dark:border-white/10'
                        } focus:ring-2 focus:ring-accent`}
                      />
                      {errors.childName && (
                        <p className="mt-1 text-sm text-error flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.childName}
                        </p>
                      )}
                    </div>

                    {/* Dedication */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Message personnalisé (optionnel)
                      </label>
                      <textarea
                        value={personalization.dedication}
                        onChange={(e) => setPersonalization(prev => ({
                          ...prev,
                          dedication: e.target.value
                        }))}
                        placeholder="Écrivez un message qui apparaîtra au début du livre..."
                        className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-dark/50 border border-dark/10 dark:border-white/10 focus:ring-2 focus:ring-accent h-32"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Avatar Customization */}
                    <div className="space-y-6">
                      {/* Skin Tone */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Couleur de peau *
                        </label>
                        <div className="flex gap-4">
                          {skinTones.map((tone) => (
                            <button
                              key={tone.id}
                              onClick={() => setPersonalization(prev => ({
                                ...prev,
                                avatar: { ...prev.avatar, skinTone: tone.id }
                              }))}
                              className={`group relative w-12 h-12 rounded-full transition-transform ${
                                personalization.avatar.skinTone === tone.id ? 'scale-110 ring-2 ring-accent' : ''
                              }`}
                              style={{ backgroundColor: tone.hex }}
                            >
                              <span className="absolute inset-0 flex items-center justify-center bg-dark/0 group-hover:bg-dark/10 rounded-full transition-colors">
                                {personalization.avatar.skinTone === tone.id && (
                                  <div className="w-3 h-3 bg-white rounded-full" />
                                )}
                              </span>
                              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap">
                                {tone.name}
                              </span>
                            </button>
                          ))}
                        </div>
                        {errors.skinTone && (
                          <p className="mt-1 text-sm text-error flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.skinTone}
                          </p>
                        )}
                      </div>

                      {/* Hair Style */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Type de cheveux *
                        </label>
                        <div className="flex gap-4">
                          {hairStyles.map((style) => (
                            <button
                              key={style.id}
                              onClick={() => setPersonalization(prev => ({
                                ...prev,
                                avatar: { ...prev.avatar, hairStyle: style.id }
                              }))}
                              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
                                personalization.avatar.hairStyle === style.id
                                  ? 'bg-accent text-dark'
                                  : 'bg-white/50 dark:bg-dark/50 hover:bg-accent/20'
                              }`}
                            >
                              <span className="text-2xl">{style.icon}</span>
                              <span className="text-xs">{style.name}</span>
                            </button>
                          ))}
                        </div>
                        {errors.hairStyle && (
                          <p className="mt-1 text-sm text-error flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.hairStyle}
                          </p>
                        )}
                      </div>

                      {/* Hair Length */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Longueur des cheveux *
                        </label>
                        <div className="flex gap-4">
                          {hairLengths.map((length) => (
                            <button
                              key={length.id}
                              onClick={() => setPersonalization(prev => ({
                                ...prev,
                                avatar: { ...prev.avatar, hairLength: length.id }
                              }))}
                              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
                                personalization.avatar.hairLength === length.id
                                  ? 'bg-accent text-dark'
                                  : 'bg-white/50 dark:bg-dark/50 hover:bg-accent/20'
                              }`}
                            >
                              <span className="text-2xl">{length.icon}</span>
                              <span className="text-xs">{length.name}</span>
                            </button>
                          ))}
                        </div>
                        {errors.hairLength && (
                          <p className="mt-1 text-sm text-error flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.hairLength}
                          </p>
                        )}
                      </div>

                      {/* Hair Color */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Couleur des cheveux *
                        </label>
                        <div className="flex gap-4">
                          {hairColors.map((color) => (
                            <button
                              key={color.id}
                              onClick={() => setPersonalization(prev => ({
                                ...prev,
                                avatar: { ...prev.avatar, hairColor: color.id }
                              }))}
                              className={`group relative w-12 h-12 rounded-full transition-transform ${
                                personalization.avatar.hairColor === color.id ? 'scale-110 ring-2 ring-accent' : ''
                              }`}
                              style={{ backgroundColor: color.hex }}
                            >
                              <span className="absolute inset-0 flex items-center justify-center bg-dark/0 group-hover:bg-dark/10 rounded-full transition-colors">
                                {personalization.avatar.hairColor === color.id && (
                                  <div className="w-3 h-3 bg-white rounded-full" />
                                )}
                              </span>
                              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap">
                                {color.name}
                              </span>
                            </button>
                          ))}
                        </div>
                        {errors.hairColor && (
                          <p className="mt-1 text-sm text-error flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.hairColor}
                          </p>
                        )}
                      </div>

                      {/* Eye Color */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Couleur des yeux *
                        </label>
                        <div className="flex gap-4">
                          {eyeColors.map((color) => (
                            <button
                              key={color.id}
                              onClick={() => setPersonalization(prev => ({
                                ...prev,
                                avatar: { ...prev.avatar, eyeColor: color.id }
                              }))}
                              className={`group relative w-12 h-12 rounded-full transition-transform ${
                                personalization.avatar.eyeColor === color.id ? 'scale-110 ring-2 ring-accent' : ''
                              }`}
                              style={{ backgroundColor: color.hex }}
                            >
                              <span className="absolute inset-0 flex items-center justify-center bg-dark/0 group-hover:bg-dark/10 rounded-full transition-colors">
                                {personalization.avatar.eyeColor === color.id && (
                                  <div className="w-3 h-3 bg-white rounded-full" />
                                )}
                              </span>
                              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap">
                                {color.name}
                              </span>
                            </button>
                          ))}
                        </div>
                        {errors.eyeColor && (
                          <p className="mt-1 text-sm text-error flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.eyeColor}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Navigation */}
                <div className="flex justify-between">
                  {currentStep !== 'info' && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep('info')}
                      className="px-6 py-2 rounded-lg border border-dark/10 dark:border-white/10 hover:bg-accent/20 transition-colors"
                    >
                      Précédent
                    </button>
                  )}
                  {currentStep === 'info' ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep('avatar')}
                      className="ml-auto btn"
                    >
                      Suivant
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="ml-auto btn flex items-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Ajouter au panier
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Preview */}
            <div className={`space-y-6 ${!isPreviewMode ? 'hidden md:block' : ''}`}>
              <div className="card backdrop-blur-sm bg-white/80 dark:bg-dark/80">
                <h3 className="text-xl font-lobster text-shadow mb-4">Aperçu</h3>
                
                {/* Book Preview */}
                <div className="relative rounded-lg overflow-hidden mb-4">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-64 object-cover"
                  />
                  {personalization.childName && (
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent flex items-end p-4">
                      <h4 className="text-2xl font-lobster text-white">
                        {book.title} avec {personalization.childName}
                      </h4>
                    </div>
                  )}
                </div>

                {/* Avatar Preview */}
                <div className="bg-white/50 dark:bg-dark/50 rounded-lg p-4 mb-4">
                  <h4 className="text-lg font-semibold mb-4">Aperçu de l'avatar</h4>
                  <div className="aspect-square bg-accent/20 rounded-lg flex items-center justify-center p-8">
                    <AvatarPreview avatar={personalization.avatar} />
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      onClick={() => {
                        // Générer un nouvel avatar avec l'IA
                        console.log('Génération IA');
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/50 dark:bg-dark/50 hover:bg-accent/20 transition-colors"
                    >
                      <Wand2 className="w-4 h-4" />
                      Générer avec l'IA
                    </button>
                    <button
                      onClick={() => {
                        // Télécharger l'avatar
                        console.log('Téléchargement');
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/50 dark:bg-dark/50 hover:bg-accent/20 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </button>
                  </div>
                </div>

                {/* Personalization Summary */}
                <div className="space-y-2 text-sm">
                  {personalization.childName && (
                    <p>👤 Personnalisé pour: <span className="font-semibold">{personalization.childName}</span></p>
                  )}
                  {personalization.avatar.hairStyle && (
                    <p>💇‍♂️ Cheveux: <span className="font-semibold">
                      {hairStyles.find(h => h.id === personalization.avatar.hairStyle)?.name}
                    </span></p>
                  )}
                  {personalization.avatar.hairColor && (
                    <p>🎨 Couleur: <span className="font-semibold">
                      {hairColors.find(c => c.id === personalization.avatar.hairColor)?.name}
                    </span></p>
                  )}
                  {personalization.avatar.eyeColor && (
                    <p>👁 Yeux: <span className="font-semibold">
                      {eyeColors.find(c => c.id === personalization.avatar.eyeColor)?.name}
                    </span></p>
                  )}
                  {personalization.dedication && (
                    <div className="mt-4 p-4 bg-accent/10 rounded-lg">
                      <p className="font-semibold mb-2">Message personnalisé:</p>
                      <p className="italic">"{personalization.dedication}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex justify-center mt-8">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="btn"
            >
              {isPreviewMode ? (
                <>
                  <Eye className="w-5 h-5 mr-2" />
                  Modifier
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5 mr-2" />
                  Voir l'aperçu
                </>
              )}
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-dark/10 dark:border-white/10">
            <div className="text-lg font-semibold">
              Prix: {book.formats ? book.formats.paper.price.toFixed(2) : (book.price || 0).toFixed(2)} €
            </div>
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg border border-dark/10 dark:border-white/10 hover:bg-accent/20 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                className="btn flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}