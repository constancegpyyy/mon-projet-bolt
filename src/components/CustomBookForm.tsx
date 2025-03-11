import React, { useState } from 'react';
import { Book, Star, Share2, Mail, Link as LinkIcon } from 'lucide-react';

interface CustomBookFormData {
  title: string;
  childName: string;
  age: number;
  gender: 'girl' | 'boy' | 'unspecified';
  occasion: string;
  occasionOther: string;
  appearance: {
    hairColor: string;
    hairColorOther: string;
    eyeColor: string;
    eyeColorOther: string;
    style: string;
    styleOther: string;
    accessories: string[];
  };
  story: {
    type: string;
    typeOther: string;
    location: string;
    locationOther: string;
  };
  characters: {
    family: { name: string; relation: string }[];
    bestFriend: string;
    hero: string;
    pet: { name: string; type: string };
    magicalCreature: boolean;
    talkingPet: boolean;
  };
  values: {
    mainMessage: string;
    specialMessage: string;
  };
  visual: {
    includeCoverPhoto: boolean;
    illustrationStyle: string;
    colors: string[];
  };
  format: 'digital' | 'printed' | 'both';
  giftWrap: boolean;
  dedication: string;
}

const initialFormData: CustomBookFormData = {
  title: '',
  childName: '',
  age: 0,
  gender: 'unspecified',
  occasion: '',
  occasionOther: '',
  appearance: {
    hairColor: '',
    hairColorOther: '',
    eyeColor: '',
    eyeColorOther: '',
    style: '',
    styleOther: '',
    accessories: []
  },
  story: {
    type: '',
    typeOther: '',
    location: '',
    locationOther: ''
  },
  characters: {
    family: [],
    bestFriend: '',
    hero: '',
    pet: { name: '', type: '' },
    magicalCreature: false,
    talkingPet: false
  },
  values: {
    mainMessage: '',
    specialMessage: ''
  },
  visual: {
    includeCoverPhoto: false,
    illustrationStyle: '',
    colors: []
  },
  format: 'printed',
  giftWrap: false,
  dedication: ''
};

const occasions = [
  { id: 'birthday', label: '🎂 Anniversaire' },
  { id: 'christmas', label: '🎄 Noël' },
  { id: 'graduation', label: '🎓 Fin d\'année scolaire' },
  { id: 'other', label: '💖 Autre' }
];

const hairColors = [
  { id: 'brown', label: '🟤 Brun' },
  { id: 'blonde', label: '👱 Blond' },
  { id: 'black', label: '⚫ Noir' },
  { id: 'red', label: '🟠 Roux' },
  { id: 'other', label: '🌈 Autre' }
];

const eyeColors = [
  { id: 'brown', label: '🟤 Marron' },
  { id: 'green', label: '🟢 Vert' },
  { id: 'blue', label: '🔵 Bleu' },
  { id: 'black', label: '⚫ Noir' },
  { id: 'other', label: '🌈 Autre' }
];

const styles = [
  { id: 'elegant', label: '👗 Élégant' },
  { id: 'casual', label: '👕 Décontracté' },
  { id: 'superhero', label: '🦸 Super-héros' },
  { id: 'adventurous', label: '👖 Aventureux' },
  { id: 'other', label: '🎭 Autre' }
];

const accessories = [
  { id: 'glasses', label: '🕶️ Lunettes' },
  { id: 'hat', label: '🧢 Casquette / Chapeau' },
  { id: 'headband', label: '🎀 Serre-tête' },
  { id: 'jewelry', label: '💎 Bijoux' }
];

const storyTypes = [
  { id: 'adventure', label: '📚 Aventure' },
  { id: 'fairytale', label: '🏰 Conte de fées' },
  { id: 'scifi', label: '🚀 Science-fiction' },
  { id: 'superhero', label: '🦸 Super-héros' },
  { id: 'mystery', label: '🕵️ Mystère & enquête' },
  { id: 'educational', label: '🔬 Éducatif' },
  { id: 'other', label: '🎭 Autre' }
];

const locations = [
  { id: 'city', label: '🏙️ Ville moderne' },
  { id: 'island', label: '🏝️ Île tropicale' },
  { id: 'forest', label: '🌳 Forêt enchantée' },
  { id: 'space', label: '🪐 Planète lointaine' },
  { id: 'kingdom', label: '🏰 Royaume magique' },
  { id: 'other', label: '📖 Autre' }
];

const messages = [
  { id: 'confidence', label: '💪 Confiance en soi' },
  { id: 'friendship', label: '🧑‍🤝‍🧑 Amitié et entraide' },
  { id: 'nature', label: '🌎 Respect de la nature' },
  { id: 'learning', label: '📚 Apprentissage et découverte' },
  { id: 'creativity', label: '🎨 Créativité et imagination' },
  { id: 'courage', label: '🕊️ Courage et persévérance' },
  { id: 'achievement', label: '🏆 Dépassement de soi' }
];

const illustrationStyles = [
  { id: 'classic', label: '✏️ Dessin classique' },
  { id: 'comic', label: '🖍️ Style bande dessinée' },
  { id: 'watercolor', label: '🎨 Peinture aquarelle' },
  { id: '3d', label: '🖥️ Style numérique 3D' }
];

const colors = [
  { id: 'red', label: '🔴 Rouge' },
  { id: 'green', label: '🟢 Vert' },
  { id: 'blue', label: '🔵 Bleu' },
  { id: 'yellow', label: '🟡 Jaune' },
  { id: 'surprise', label: '🎨 Surprise-moi !' }
];

interface CustomBookFormProps {
  onSubmit: (data: CustomBookFormData) => void;
}

export function CustomBookForm({ onSubmit }: CustomBookFormProps) {
  const [formData, setFormData] = useState<CustomBookFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof CustomBookFormData],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleShare = async (type: 'email' | 'whatsapp' | 'link') => {
    switch (type) {
      case 'email':
        const email = prompt('Entrez l\'adresse email du destinataire :');
        if (email) {
          showNotification('Aperçu envoyé par email !');
        }
        break;
      case 'whatsapp':
        const text = encodeURIComponent('Découvre le livre personnalisé que je vais offrir !');
        window.open(`https://wa.me/?text=${text}`, '_blank');
        break;
      case 'link':
        const link = `${window.location.origin}/apercu/${Math.random().toString(36).substring(7)}`;
        await navigator.clipboard.writeText(link);
        showNotification('Lien copié !');
        break;
    }
  };

  const showNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-success text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-2xl">✨</span>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('animate-slide-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const nextStep = () => {
    if (currentStep < 10) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-dark/10 -translate-y-1/2" />
          <div className="relative flex justify-between">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                  index + 1 <= currentStep
                    ? 'bg-accent text-dark'
                    : 'bg-white/50 text-dark/40'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: General Information */}
        {currentStep === 1 && (
          <div className="card space-y-6">
            <h2 className="text-2xl font-lobster text-shadow">
              Informations générales
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Titre du livre (optionnel)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                  placeholder="Laissez vide pour générer automatiquement"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Prénom de l'enfant *
                </label>
                <input
                  type="text"
                  value={formData.childName}
                  onChange={(e) => handleChange('childName', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Âge de l'enfant *
                </label>
                <input
                  type="number"
                  value={formData.age || ''}
                  onChange={(e) => handleChange('age', parseInt(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                  required
                  min="0"
                  max="12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Genre de l'enfant
                </label>
                <div className="flex gap-4">
                  {[
                    { id: 'girl', label: 'Fille' },
                    { id: 'boy', label: 'Garçon' },
                    { id: 'unspecified', label: 'Non spécifié' }
                  ].map((option) => (
                    <label key={option.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value={option.id}
                        checked={formData.gender === option.id}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        className="text-accent focus:ring-accent"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Occasion spéciale ?
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => handleChange('occasion', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                >
                  <option value="">Sélectionnez une occasion</option>
                  {occasions.map((occasion) => (
                    <option key={occasion.id} value={occasion.id}>
                      {occasion.label}
                    </option>
                  ))}
                </select>
                {formData.occasion === 'other' && (
                  <input
                    type="text"
                    value={formData.occasionOther}
                    onChange={(e) => handleChange('occasionOther', e.target.value)}
                    className="mt-2 w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                    placeholder="Précisez l'occasion"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Character Appearance */}
        {currentStep === 2 && (
          <div className="card space-y-6">
            <h2 className="text-2xl font-lobster text-shadow">
              Apparence du personnage
            </h2>

            <div className="space-y-6">
              {/* Hair Color */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Couleur des cheveux *
                </label>
                <select
                  value={formData.appearance.hairColor}
                  onChange={(e) => handleNestedChange('appearance', 'hairColor', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                  required
                >
                  <option value="">Choisir une couleur</option>
                  {hairColors.map((color) => (
                    <option key={color.id} value={color.id}>
                      {color.label}
                    </option>
                  ))}
                </select>
                {formData.appearance.hairColor === 'other' && (
                  <input
                    type="text"
                    value={formData.appearance.hairColorOther}
                    onChange={(e) => handleNestedChange('appearance', 'hairColorOther', e.target.value)}
                    className="mt-2 w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                    placeholder="Précisez la couleur"
                  />
                )}
              </div>

              {/* Eye Color */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Couleur des yeux *
                </label>
                <select
                  value={formData.appearance.eyeColor}
                  onChange={(e) => handleNestedChange('appearance', 'eyeColor', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                  required
                >
                  <option value="">Choisir une couleur</option>
                  {eyeColors.map((color) => (
                    <option key={color.id} value={color.id}>
                      {color.label}
                    </option>
                  ))}
                </select>
                {formData.appearance.eyeColor === 'other' && (
                  <input
                    type="text"
                    value={formData.appearance.eyeColorOther}
                    onChange={(e) => handleNestedChange('appearance', 'eyeColorOther', e.target.value)}
                    className="mt-2 w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                    placeholder="Précisez la couleur"
                  />
                )}
              </div>

              {/* Style */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Style vestimentaire *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {styles.map((style) => (
                    <label
                      key={style.id}
                      className={`flex items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors ${
                        formData.appearance.style === style.id
                          ? 'bg-accent text-dark'
                          : 'bg-white/50 hover:bg-accent/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="style"
                        value={style.id}
                        checked={formData.appearance.style === style.id}
                        onChange={(e) => handleNestedChange('appearance', 'style', e.target.value)}
                        className="hidden"
                      />
                      {style.label}
                    </label>
                  ))}
                </div>
                {formData.appearance.style === 'other' && (
                  <input
                    type="text"
                    value={formData.appearance.styleOther}
                    onChange={(e) => handleNestedChange('appearance', 'styleOther', e.target.value)}
                    className="mt-2 w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                    placeholder="Précisez le style"
                  />
                )}
              </div>

              {/* Accessories */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Accessoires
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {accessories.map((accessory) => (
                    <label
                      key={accessory.id}
                      className={`flex items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors ${
                        formData.appearance.accessories.includes(accessory.id)
                          ? 'bg-accent text-dark'
                          : 'bg-white/50 hover:bg-accent/20'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={accessory.id}
                        checked={formData.appearance.accessories.includes(accessory.id)}
                        onChange={(e) => {
                          const newAccessories = e.target.checked
                            ? [...formData.appearance.accessories, accessory.id]
                            : formData.appearance.accessories.filter(id => id !== accessory.id);
                          handleNestedChange('appearance', 'accessories', newAccessories);
                        }}
                        className="hidden"
                      />
                      {accessory.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Story Setting */}
        {currentStep === 3 && (
          <div className="card space-y-6">
            <h2 className="text-2xl font-lobster text-shadow">
              Cadre et univers de l'histoire
            </h2>

            <div className="space-y-6">
              {/* Story Type */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Type d'histoire *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {storyTypes.map((type) => (
                    <label
                      key={type.id}
                      className={`flex items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors ${
                        formData.story.type === type.id
                          ? 'bg-accent text-dark'
                          : 'bg-white/50 hover:bg-accent/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="storyType"
                        value={type.id}
                        checked={formData.story.type === type.id}
                        onChange={(e) => handleNestedChange('story', 'type', e.target.value)}
                        className="hidden"
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
                {formData.story.type === 'other' && (
                  <input
                    type="text"
                    value={formData.story.typeOther}
                    onChange={(e) => handleNestedChange('story', 'typeOther', e.target.value)}
                    className="mt-2 w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                    placeholder="Précisez le type d'histoire"
                  />
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Lieu principal de l'histoire *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {locations.map((location) => (
                    <label
                      key={location.id}
                      className={`flex items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors ${
                        formData.story.location === location.id
                          ? 'bg-accent text-dark'
                          : 'bg-white/50 hover:bg-accent/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="location"
                        value={location.id}
                        checked={formData.story.location === location.id}
                        onChange={(e) => handleNestedChange('story', 'location', e.target.value)}
                        className="hidden"
                      />
                      {location.label}
                    </label>
                  ))}
                </div>
                {formData.story.location === 'other' && (
                  <input
                    type="text"
                    value={formData.story.locationOther}
                    onChange={(e) => handleNestedChange('story', 'locationOther', e.target.value)}
                    className="mt-2 w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                    placeholder="Précisez le lieu"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Secondary Characters */}
        {currentStep === 4 && (
          <div className="card space-y-6">
            <h2 className="text-2xl font-lobster text-shadow">
              Personnages secondaires
            </h2>

            <div className="space-y-6">
              {/* Family Members */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Membres de la famille à inclure
                </label>
                <div className="space-y-4">
                  {formData.characters.family.map((member, index) => (
                    <div key={index} className="flex gap-4">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => {
                          const newFamily = [...formData.characters.family];
                          newFamily[index].name = e.target.value;
                          handleNestedChange('characters', 'family', newFamily);
                        }}
                        className="flex-1 px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                        placeholder="Prénom"
                      />
                      <input
                        type="text"
                        value={member.relation}
                        onChange={(e) => {
                          const newFamily = [...formData.characters.family];
                          newFamily[index].relation = e.target.value;
                          handleNestedChange('characters', 'family', newFamily);
                        }}
                        className="flex-1 px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                        placeholder="Lien de parenté"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newFamily = formData.characters.family.filter((_, i) => i !== index);
                          handleNestedChange('characters', 'family', newFamily);
                        }}
                        className="px-4 py-2 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newFamily = [...formData.characters.family, { name: '', relation: '' }];
                      handleNestedChange('characters', 'family', newFamily);
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
                  >
                    + Ajouter un membre de la famille
                  </button>
                </div>
              </div>

              {/* Best Friend */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Meilleur(e) ami(e)
                </label>
                <input
                  type="text"
                  value={formData.characters.bestFriend}
                  onChange={(e) => handleNestedChange('characters', 'bestFriend', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                  placeholder="Prénom du/de la meilleur(e) ami(e)"
                />
              </div>

              {/* Hero */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Héros inspirant
                </label>
                <input
                  type="text"
                  value={formData.characters.hero}
                  onChange={(e) => handleNestedChange('characters', 'hero', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                  placeholder="Ex : inventeur, explorateur..."
                />
              </div>

              {/* Pet */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Animal de compagnie
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={formData.characters.pet.name}
                    onChange={(e) => handleNestedChange('characters', 'pet', {
                      ...formData.characters.pet,
                      name: e.target.value
                    })}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                    placeholder="Nom de l'animal"
                  />
                  <input
                    type="text"
                    value={formData.characters.pet.type}
                    onChange={(e) => handleNestedChange('characters', 'pet', {
                      ...formData.characters.pet,
                      type: e.target.value
                    })}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                    placeholder="Type d'animal"
                  />
                </div>
              </div>

              {/* Magical Creature */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.characters.magicalCreature}
                    onChange={(e) => handleNestedChange('characters', 'magicalCreature', e.target.checked)}
                    className="rounded border-dark/10 text-accent focus:ring-accent"
                  />
                  Inclure une créature magique ou extraterrestre
                </label>
              </div>

              {/* Talking Pet */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.characters .characters.talkingPet}
                    onChange={(e) => handleNestedChange('characters', 'talkingPet', e.target.checked)}
                    className="rounded border-dark/10 text-accent focus:ring-accent"
                  />
                  L'animal de compagnie doit-il parler ?
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Values and Messages */}
        {currentStep === 5 && (
          <div className="card space-y-6">
            <h2 className="text-2xl font-lobster text-shadow">
              Valeurs et messages
            </h2>

            <div className="space-y-6">
              {/* Main Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message principal de l'histoire *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {messages.map((message) => (
                    <label
                      key={message.id}
                      className={`flex items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors ${
                        formData.values.mainMessage === message.id
                          ? 'bg-accent text-dark'
                          : 'bg-white/50 hover:bg-accent/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="mainMessage"
                        value={message.id}
                        checked={formData.values.mainMessage === message.id}
                        onChange={(e) => handleNestedChange('values', 'mainMessage', e.target.value)}
                        className="hidden"
                      />
                      {message.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message spécial (optionnel)
                </label>
                <textarea
                  value={formData.values.specialMessage}
                  onChange={(e) => handleNestedChange('values', 'specialMessage', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                  rows={4}
                  placeholder="Un message particulier à transmettre dans l'histoire..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Visual Customization */}
        {currentStep === 6 && (
          <div className="card space-y-6">
            <h2 className="text-2xl font-lobster text-shadow">
              Personnalisation visuelle
            </h2>

            <div className="space-y-6">
              {/* Cover Photo */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.visual.includeCoverPhoto}
                    onChange={(e) => handleNestedChange('visual', 'includeCoverPhoto', e.target.checked)}
                    className="rounded border-dark/10 text-accent focus:ring-accent"
                  />
                  Ajouter une photo de l'enfant sur la couverture
                </label>
              </div>

              {/* Illustration Style */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Style d'illustration *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {illustrationStyles.map((style) => (
                    <label
                      key={style.id}
                      className={`flex items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors ${
                        formData.visual.illustrationStyle === style.id
                          ? 'bg-accent text-dark'
                          : 'bg-white/50 hover:bg-accent/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="illustrationStyle"
                        value={style.id}
                        checked={formData.visual.illustrationStyle === style.id}
                        onChange={(e) => handleNestedChange('visual', 'illustrationStyle', e.target.value)}
                        className="hidden"
                      />
                      {style.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Couleurs dominantes
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {colors.map((color) => (
                    <label
                      key={color.id}
                      className={`flex items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors ${
                        formData.visual.colors.includes(color.id)
                          ? 'bg-accent text-dark'
                          : 'bg-white/50 hover:bg-accent/20'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={color.id}
                        checked={formData.visual.colors.includes(color.id)}
                        onChange={(e) => {
                          const newColors = e.target.checked
                            ? [...formData.visual.colors, color.id]
                            : formData.visual.colors.filter(id => id !== color.id);
                          handleNestedChange('visual', 'colors', newColors);
                        }}
                        className="hidden"
                      />
                      {color.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Final Details */}
        {currentStep === 7 && (
          <div className="card space-y-6">
            <h2 className="text-2xl font-lobster text-shadow">
              Détails finaux
            </h2>

            <div className="space-y-6">
              {/* Format */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Format du livre *
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'digital', label: '📄 Numérique (PDF)', price: '19.99€' },
                    { id: 'printed', label: '📕 Imprimé', price: '29.99€' },
                    { id: 'both', label: '📚 Les deux', price: '39.99€' }
                  ].map((format) => (
                    <label
                      key={format.id}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors ${
                        formData.format === format.id
                          ? 'bg-accent text-dark'
                          : 'bg-white/50 hover:bg-accent/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="format"
                        value={format.id}
                        checked={formData.format === format.id}
                        onChange={(e) => handleChange('format', e.target.value)}
                        className="hidden"
                      />
                      <span>{format.label}</span>
                      <span className="text-sm font-medium">{format.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gift Wrap */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.giftWrap}
                    onChange={(e) => handleChange('giftWrap', e.target.checked)}
                    className="rounded border-dark/10 text-accent focus:ring-accent"
                  />
                  Ajouter un emballage cadeau (+5€)
                </label>
              </div>

              {/* Dedication */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Dédicace personnalisée (optionnel)
                </label>
                <textarea
                  value={formData.dedication}
                  onChange={(e) => handleChange('dedication', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                  rows={4}
                  placeholder="Votre message personnel qui apparaîtra au début du livre..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 8: Preview */}
        {currentStep === 8 && (
          <div className="card space-y-6">
            <h2 className="text-2xl font-lobster text-shadow">
              Aperçu de votre livre
            </h2>

            <div className="space-y-6">
              {/* Book Preview */}
              <div className="aspect-video rounded-lg overflow-hidden bg-white/50">
                <img
                  src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800"
                  alt="Aperçu du livre"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Preview Content */}
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/50">
                  <h3 className="font-semibold mb-2">Couverture</h3>
                  <p>L'incroyable aventure de {formData.childName}</p>
                </div>

                <div className="p-4 rounded-lg bg-white/50">
                  <h3 className="font-semibold mb-2">Première page</h3>
                  <p>Il était une fois {formData.childName}, un enfant extraordinaire qui...</p>
                </div>

                {formData.dedication && (
                  <div className="p-4 rounded-lg bg-white/50">
                    <h3 className="font-semibold mb-2">Dédicace</h3>
                    <p className="italic">{formData.dedication}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 9: Share */}
        {currentStep === 9 && (
          <div className="card space-y-6">
            <h2 className="text-2xl font-lobster text-shadow">
              Partagez l'aperçu
            </h2>

            <div className="space-y-6">
              {/* Email Share */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Partager par email
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email du destinataire"
                    className="flex-1 px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
                  />
                  <button
                    type="button"
                    onClick={() => handleShare('email')}
                    className="px-4 py-2 rounded-lg bg-accent text-dark hover:bg-highlight transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Other Share Options */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleShare('whatsapp')}
                  className="flex-1 px-4 py-2 rounded-lg bg-[#25D366] text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <img
                    src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/whatsapp.svg"
                    className="w-5 h-5 invert"
                  />
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => handleShare('link')}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-600 text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <LinkIcon className="w-5 h-5" />
                  Copier le lien
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 10: Summary */}
        {currentStep === 10 && (
          <div className="card space-y-6">
            <h2 className="text-2xl font-lobster text-shadow">
              Récapitulatif de votre livre
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/50">
                <h3 className="font-semibold mb-2">Informations générales</h3>
                <p>Titre : {formData.title || `L'incroyable aventure de ${formData.childName}`}</p>
                <p>Prénom : {formData.childName}</p>
                <p>Âge : {formData.age} ans</p>
                <p>Genre : {formData.gender === 'girl' ? 'Fille' : formData.gender === 'boy' ? 'Garçon' : 'Non spécifié'}</p>
                {formData.occasion && (
                  <p>Occasion : {
                    formData.occasion === 'other'
                      ? formData.occasionOther
                      : occasions.find(o => o.id === formData.occasion)?.label
                  }</p>
                )}
              </div>

              <div className="p-4 rounded-lg bg-white/50">
                <h3 className="font-semibold mb-2">Apparence du personnage</h3>
                <p>Cheveux : {hairColors.find(c => c.id === formData.appearance.hairColor)?.label}</p>
                <p>Yeux : {eyeColors.find(c => c.id === formData.appearance.eyeColor)?.label}</p>
                <p>Style : {styles.find(s => s.id === formData.appearance.style)?.label}</p>
                {formData.appearance.accessories.length > 0 && (
                  <p>Accessoires : {formData.appearance.accessories.map(
                    a => accessories.find(acc => acc.id === a)?.label
                  ).join(', ')}</p>
                )}
              </div>

              <div className="p-4 rounded-lg bg-white/50">
                <h3 className="font-semibold mb-2">Histoire</h3>
                <p>Type : {storyTypes.find(t => t.id === formData.story.type)?.label}</p>
                <p>Lieu : {locations.find(l => l.id === formData.story.location)?.label}</p>
              </div>

              <div className="p-4 rounded-lg bg-white/50">
                <h3 className="font-semibold mb-2">Format et options</h3>
                <p>Format : {
                  formData.format === 'digital' ? 'Numérique (PDF)' :
                  formData.format === 'printed' ? 'Imprimé' : 'Numérique + Imprimé'
                }</p>
                {formData.giftWrap && <p>✓ Emballage cadeau</p>}
                <p className="mt-2 text-xl font-semibold">
                  Prix total : {
                    (formData.format === 'digital' ? 19.99 :
                    formData.format === 'printed' ? 29.99 : 39.99) +
                    (formData.giftWrap ? 5 : 0)
                  }€
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 rounded-lg border border-dark/10 hover:bg-accent/20 transition-colors"
            >
              Précédent
            </button>
          )}
          {currentStep < 10 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto btn"
            >
              Suivant
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto btn"
            >
              Commander
            </button>
          )}
        </div>
      </form>

      {/* Preview Section */}
      {showPreview && (
        <div className="mt-8 card">
          <h3 className="text-xl font-lobster text-shadow mb-6">
            Aperçu de votre livre personnalisé
          </h3>
          
          <div className="relative mb-6">
            <img
              src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800"
              alt="Aperçu du livre"
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent flex items-end p-6">
              <h4 className="text-2xl font-lobster text-white">
                L'incroyable aventure de {formData.childName}
              </h4>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            {formData.dedication && (
              <div className="p-4 bg-white/50 rounded-lg">
                <h5 className="font-semibold mb-2">Dédicace</h5>
                <p className="italic">{formData.dedication}</p>
              </div>
            )}
            <div className="p-4 bg-white/50 rounded-lg">
              <h5 className="font-semibold mb-2">Première page</h5>
              <p>Il était une fois {formData.childName}, un enfant extraordinaire qui...</p>
            </div>
          </div>

          {/* Share Options */}
          <div className="border-t border-dark/10 pt-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Partager l'aperçu
            </h4>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => handleShare('email')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#EA4335] text-white hover:opacity-90 transition-opacity"
              >
                <Mail className="w-5 h-5" />
                Email
              </button>
              <button
                type="button"
                onClick={() => handleShare('whatsapp')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white hover:opacity-90 transition-opacity"
              >
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/whatsapp.svg" className="w-5 h-5 invert" />
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => handleShare('link')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600 text-white hover:opacity-90 transition-opacity"
              >
                <LinkIcon className="w-5 h-5" />
                Copier le lien
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}