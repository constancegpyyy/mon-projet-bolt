import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowLeft, Share2 } from 'lucide-react';
import { AvatarPreview } from './AvatarPreview';

interface AvatarResultProps {
  avatar: {
    skinTone: string;
    hairStyle: string;
    hairLength: string;
    hairColor: string;
    eyeColor: string;
  };
  onDownload?: () => void;
  onShare?: () => void;
}

export function AvatarResult({ avatar, onDownload, onShare }: AvatarResultProps) {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-lobster text-shadow mb-4">
          Voici votre avatar !
        </h2>
        <p className="text-dark/80 dark:text-white/80">
          Votre avatar personnalisé est prêt. Vous pouvez le télécharger ou le partager.
        </p>
      </div>

      {/* Avatar Preview */}
      <div className="card backdrop-blur-sm bg-white/80 dark:bg-dark/80 mb-8">
        <div className="aspect-square bg-accent/20 rounded-lg flex items-center justify-center p-8 mb-6">
          <AvatarPreview avatar={avatar} />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onDownload}
            className="btn flex-1 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Télécharger
          </button>
          <button
            onClick={onShare}
            className="btn flex-1 flex items-center justify-center gap-2 bg-white/50 dark:bg-dark/50 hover:bg-accent/20"
          >
            <Share2 className="w-5 h-5" />
            Partager
          </button>
        </div>
      </div>

      {/* Avatar Details */}
      <div className="card backdrop-blur-sm bg-white/80 dark:bg-dark/80 mb-8">
        <h3 className="text-xl font-semibold mb-4">Détails de l'avatar</h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Type de cheveux :</span>{' '}
            {avatar.hairStyle === 'straight' ? 'Raides' :
             avatar.hairStyle === 'wavy' ? 'Ondulés' :
             avatar.hairStyle === 'curly' ? 'Bouclés' : 'Crépus'}
          </p>
          <p>
            <span className="font-medium">Longueur des cheveux :</span>{' '}
            {avatar.hairLength === 'short' ? 'Courts' :
             avatar.hairLength === 'medium' ? 'Mi-longs' : 'Longs'}
          </p>
          <p>
            <span className="font-medium">Couleur des cheveux :</span>{' '}
            {avatar.hairColor === 'blonde' ? 'Blond' :
             avatar.hairColor === 'brown' ? 'Brun' :
             avatar.hairColor === 'red' ? 'Roux' : 'Noir'}
          </p>
          <p>
            <span className="font-medium">Couleur des yeux :</span>{' '}
            {avatar.eyeColor === 'blue' ? 'Bleus' :
             avatar.eyeColor === 'green' ? 'Verts' :
             avatar.eyeColor === 'brown' ? 'Marrons' : 'Noirs'}
          </p>
          <p>
            <span className="font-medium">Teint :</span>{' '}
            {avatar.skinTone === 'light' ? 'Clair' :
             avatar.skinTone === 'medium' ? 'Moyen' : 'Foncé'}
          </p>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-accent hover:text-highlight transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}