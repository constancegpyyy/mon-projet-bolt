import { BookType, BookCategory } from '../types/book';

// Formats de livre disponibles
export const bookFormats = [
  {
    id: 'printed',
    name: 'Version imprimée',
    price: 29.99,
    description: 'Un beau livre relié avec une couverture rigide'
  },
  {
    id: 'digital',
    name: 'Version numérique',
    price: 19.99,
    description: 'Format PDF haute qualité, disponible immédiatement'
  }
];

// Langues disponibles
export const languages = [
  { id: 'fr', name: 'Français' },
  { id: 'en', name: 'Anglais' },
  { id: 'es', name: 'Espagnol' }
];

// Catégories narratives
export const categories: BookCategory[] = [
  { id: 'adventure', name: 'Aventure', icon: '🌊', type: 'narrative' },
  { id: 'fantasy', name: 'Fantaisie', icon: '🧙', type: 'narrative' },
  { id: 'scifi', name: 'Science-Fiction', icon: '🚀', type: 'narrative' },
  { id: 'mystery', name: 'Mystère & Enquête', icon: '🔎', type: 'narrative' },
  { id: 'horror', name: 'Horreur & Frissons', icon: '👻', type: 'narrative' },
  { id: 'heroic', name: 'Héroïc Fantasy & Mythologie', icon: '⚔️', type: 'narrative' },
  { id: 'timetravel', name: 'Voyage dans le Temps', icon: '🎩', type: 'narrative' },
  { id: 'nature', name: 'Nature & Écologie', icon: '🌿', type: 'narrative' },
  { id: 'aliens', name: 'Extraterrestres & Univers Parallèles', icon: '🛸', type: 'narrative' },
  { id: 'superhero', name: 'Super-héros & Super-pouvoirs', icon: '🦸', type: 'narrative' },
  { id: 'fairytale', name: 'Contes & Légendes Revisités', icon: '🏰', type: 'narrative' },
  { id: 'history', name: 'Aventures Historiques', icon: '🚂', type: 'narrative' },
  { id: 'bedtime', name: 'Histoires Douces & Apaisantes', icon: '💤', type: 'narrative' },
  // Catégories éducatives
  { id: 'reading', name: 'Apprentissage de la lecture et du langage', icon: '📖', type: 'educational' },
  { id: 'math', name: 'Apprentissage des mathématiques', icon: '➗', type: 'educational' },
  { id: 'culture', name: 'Connaissance du monde et de la culture', icon: '🌍', type: 'educational' },
  { id: 'science', name: 'Sciences et découvertes', icon: '🔬', type: 'educational' },
  { id: 'logic', name: 'Développement de la Logique et du Raisonnement', icon: '📚', type: 'educational' },
  { id: 'communication', name: 'Communication et Expression', icon: '🗣️', type: 'educational' },
  { id: 'emotions', name: 'Émotions et développement personnel', icon: '💖', type: 'educational' },
  { id: 'creativity', name: 'Créativité et imagination', icon: '🎨', type: 'educational' },
  { id: 'music', name: 'Musique et arts', icon: '🎵', type: 'educational' },
  { id: 'animals', name: 'Animaux et nature', icon: '🐾', type: 'educational' },
  { id: 'space', name: 'Astronomie et espace', icon: '🚀', type: 'educational' },
  { id: 'religion', name: 'Histoires religieuses et spirituelles', icon: '🕊️', type: 'educational' },
  { id: 'writing', name: 'Écriture et Calligraphie', icon: '🔤', type: 'educational' },
  { id: 'society', name: 'Vie en Société et Citoyenneté', icon: '👫', type: 'educational' },
  { id: 'diy', name: 'Bricolage et Expérimentations', icon: '🛠️', type: 'educational' },
  { id: 'memory', name: 'Mémoire et Concentration', icon: '🧩', type: 'educational' },
  { id: 'wellness', name: 'Bien-être et Relaxation', icon: '🧘', type: 'educational' },
  { id: 'critical', name: 'Curiosité et Esprit Critique', icon: '💡', type: 'educational' }
];

// Books array with all books
export const books: BookType[] = [
  // === LIVRES NARRATIFS ===

  // 🌊 Aventure
  {
    id: 'adventure-1',
    title: '(Prénom) et l\'Île aux Trésors Perdus',
    category: 'adventure',
    type: 'narrative',
    description: 'Une aventure palpitante à la recherche d\'un trésor légendaire sur une île mystérieuse.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800'
  },
  {
    id: 'adventure-2',
    title: 'L\'Odyssée de (Prénom) : Le Secret des Profondeurs',
    category: 'adventure',
    type: 'narrative',
    description: 'Une exploration sous-marine à la découverte des mystères de l\'océan.',
    image: 'https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?auto=format&fit=crop&w=800'
  },
  {
    id: 'adventure-3',
    title: '(Prénom) et le Mystère du Navire Fantôme',
    category: 'adventure',
    type: 'narrative',
    description: 'Une histoire de pirates et de mystères en haute mer.',
    image: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?auto=format&fit=crop&w=800'
  },

  // 🧙 Fantaisie
  {
    id: 'fantasy-1',
    title: '(Prénom) et la Magie des Rêves',
    category: 'fantasy',
    type: 'narrative',
    description: 'Un voyage enchanteur dans le monde des rêves et de la magie.',
    image: 'https://images.unsplash.com/photo-1679678691006-0ad24fecb769?auto=format&fit=crop&w=800'
  },
  {
    id: 'fantasy-2',
    title: 'Le Royaume Invisible de (Prénom)',
    category: 'fantasy',
    type: 'narrative',
    description: 'Découvrez un royaume magique caché aux yeux des humains.',
    image: 'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?auto=format&fit=crop&w=800'
  },
  {
    id: 'fantasy-3',
    title: '(Prénom) et la Forêt des Sortilèges',
    category: 'fantasy',
    type: 'narrative',
    description: 'Une aventure enchantée dans une forêt peuplée de créatures magiques.',
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=800'
  },

  // 🚀 Science-Fiction
  {
    id: 'scifi-1',
    title: '(Prénom) et la Planète Interdite',
    category: 'scifi',
    type: 'narrative',
    description: 'Une exploration spatiale vers une mystérieuse planète inconnue.',
    image: 'https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?auto=format&fit=crop&w=800'
  },
  {
    id: 'scifi-2',
    title: 'La Mission Secrète de (Prénom) sur Mars',
    category: 'scifi',
    type: 'narrative',
    description: 'Une mission spatiale extraordinaire sur la planète rouge.',
    image: 'https://images.unsplash.com/photo-1682687221248-3116ba6ab483?auto=format&fit=crop&w=800'
  },
  {
    id: 'scifi-3',
    title: '(Prénom) et le Robot du Futur',
    category: 'scifi',
    type: 'narrative',
    description: 'Une amitié unique entre un enfant et un robot intelligent venu du futur.',
    image: 'https://images.unsplash.com/photo-1682687220509-61b8a906ca19?auto=format&fit=crop&w=800'
  },

  // 🔎 Mystère & Enquête
  {
    id: 'mystery-1',
    title: '(Prénom) et l\'Énigme du Manoir Abandonné',
    category: 'mystery',
    type: 'narrative',
    description: 'Une enquête passionnante dans un vieux manoir rempli de secrets.',
    image: 'https://images.unsplash.com/photo-1682695796497-31a44224d6d6?auto=format&fit=crop&w=800'
  },
  {
    id: 'mystery-2',
    title: 'Le Vol du Diamant Noir : Une enquête de (Prénom)',
    category: 'mystery',
    type: 'narrative',
    description: 'Un mystérieux vol de diamant à résoudre dans un musée.',
    image: 'https://images.unsplash.com/photo-1682695794947-17061dc284dd?auto=format&fit=crop&w=800'
  },
  {
    id: 'mystery-3',
    title: '(Prénom) et le Secret de la Vieille Bibliothèque',
    category: 'mystery',
    type: 'narrative',
    description: 'Des indices mystérieux cachés dans une ancienne bibliothèque.',
    image: 'https://images.unsplash.com/photo-1682695794816-7b9da18ed470?auto=format&fit=crop&w=800'
  },

  // 👻 Horreur & Frissons
  {
    id: 'horror-1',
    title: '(Prénom) et la Nuit des Ombres',
    category: 'horror',
    type: 'narrative',
    description: 'Une nuit pleine de mystères et de frissons (adapté aux enfants).',
    image: 'https://images.unsplash.com/photo-1682695795557-17447f921f79?auto=format&fit=crop&w=800'
  },
  {
    id: 'horror-2',
    title: 'Le Manoir Maudit de (Prénom)',
    category: 'horror',
    type: 'narrative',
    description: 'Une aventure frissonnante dans un manoir pas comme les autres.',
    image: 'https://images.unsplash.com/photo-1682695796615-6ddf39f90caf?auto=format&fit=crop&w=800'
  },

  // ⚔️ Héroïc Fantasy & Mythologie
  {
    id: 'heroic-1',
    title: '(Prénom) et la Quête du Dragon Sacré',
    category: 'heroic',
    type: 'narrative',
    description: 'Une quête épique à la recherche d\'un dragon légendaire.',
    image: 'https://images.unsplash.com/photo-1682695796774-322da6b1e00f?auto=format&fit=crop&w=800'
  },
  {
    id: 'heroic-2',
    title: 'L\'Épée Magique de (Prénom)',
    category: 'heroic',
    type: 'narrative',
    description: 'La découverte d\'une épée aux pouvoirs extraordinaires.',
    image: 'https://images.unsplash.com/photo-1682695797034-39fd1f0bb048?auto=format&fit=crop&w=800'
  },

  // 🎩 Voyage dans le Temps
  {
    id: 'timetravel-1',
    title: '(Prénom) et la Machine à Remonter le Temps',
    category: 'timetravel',
    type: 'narrative',
    description: 'Un voyage extraordinaire à travers différentes époques.',
    image: 'https://images.unsplash.com/photo-1682695797406-b1e9b5ac6817?auto=format&fit=crop&w=800'
  },
  {
    id: 'timetravel-2',
    title: 'Le Voyage Temporel de (Prénom)',
    category: 'timetravel',
    type: 'narrative',
    description: 'Une aventure qui traverse les siècles.',
    image: 'https://images.unsplash.com/photo-1682695797747-f6058a578c8b?auto=format&fit=crop&w=800'
  },

  // 🌿 Nature & Écologie
  {
    id: 'nature-1',
    title: '(Prénom) et la Forêt Magique',
    category: 'nature',
    type: 'narrative',
    description: 'Une aventure écologique dans une forêt enchantée.',
    image: 'https://images.unsplash.com/photo-1682695798522-6e208131916d?auto=format&fit=crop&w=800'
  },
  {
    id: 'nature-2',
    title: 'Le Grand Secret des Animaux',
    category: 'nature',
    type: 'narrative',
    description: 'La découverte du monde secret des animaux de la forêt.',
    image: 'https://images.unsplash.com/photo-1682695798168-37d31d8ca72f?auto=format&fit=crop&w=800'
  },

  // === LIVRES ÉDUCATIFS ===

  // 📖 Apprentissage de la lecture et du langage
  {
    id: 'reading-1',
    title: '(Prénom) découvre l\'alphabet magique',
    category: 'reading',
    type: 'educational',
    description: 'Une aventure ludique pour apprendre l\'alphabet et découvrir le plaisir de la lecture.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800'
  },
  {
    id: 'reading-2',
    title: 'Les premières aventures de (Prénom) en lecture',
    category: 'reading',
    type: 'educational',
    description: 'Un voyage passionnant dans le monde des mots et des histoires.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800'
  },

  // ➗ Apprentissage des mathématiques
  {
    id: 'math-1',
    title: '(Prénom) et l\'île aux chiffres',
    category: 'math',
    type: 'educational',
    description: 'Une aventure mathématique pleine de défis et de découvertes.',
    image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=800'
  },

  // 🌍 Connaissance du monde et de la culture
  {
    id: 'culture-1',
    title: '(Prénom) fait le tour du monde',
    category: 'culture',
    type: 'educational',
    description: 'Un voyage culturel à travers les continents et les traditions.',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800'
  }
];