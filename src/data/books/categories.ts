import { BookCategory } from '../../types/book';

// Categories for both narrative and educational books
export const categories: BookCategory[] = [
  // Catégories narratives
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