import React from 'react';
import { Book } from 'lucide-react';

interface StoryPreviewProps {
  childName: string;
  storyType: string;
  setting: string;
  tone: string;
}

export function StoryPreview({ childName, storyType, setting, tone }: StoryPreviewProps) {
  const generatePreview = () => {
    const settings = {
      magical_forest: "une forêt enchantée où les arbres chuchotent des secrets anciens",
      space: "une galaxie lointaine remplie d'étoiles scintillantes",
      underwater: "les profondeurs mystérieuses de l'océan",
      castle: "un château majestueux aux tours étincelantes",
      city: "une ville futuriste aux buildings de cristal"
    };

    const tones = {
      exciting: "avec émerveillement",
      mysterious: "avec curiosité",
      funny: "joyeusement",
      poetic: "gracieusement",
      educational: "attentivement"
    };

    const settingText = settings[setting as keyof typeof settings] || settings.magical_forest;
    const toneText = tones[tone as keyof typeof tones] || tones.exciting;

    return `Dans ${settingText}, ${childName} marchait ${toneText}, découvrant un monde extraordinaire rempli de merveilles et d'aventures...`;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Book className="w-6 h-6 text-accent" />
        <h3 className="text-xl font-lobster">Aperçu de l'histoire</h3>
      </div>
      <img 
        src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800" 
        alt="Livre personnalisé"
        className="w-32 h-32 object-contain mx-auto mb-4"
      />
      <p className="text-lg italic text-dark/80">
        {generatePreview()}
      </p>
      <button className="w-full px-4 py-2 text-sm bg-accent/20 hover:bg-accent/30 rounded-lg transition-colors">
        Générer une autre version
      </button>
    </div>
  );
}