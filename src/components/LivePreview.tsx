import React, { useState, useEffect } from 'react';
import { Wand2 } from 'lucide-react';

interface LivePreviewProps {
  name: string;
  onPreviewGenerated?: (preview: string) => void;
}

export function LivePreview({ name, onPreviewGenerated }: LivePreviewProps) {
  const [preview, setPreview] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (name.length > 0) {
      generatePreview(name);
    }
  }, [name]);

  const generatePreview = async (name: string) => {
    setIsGenerating(true);

    // Simuler la génération d'aperçu
    await new Promise(resolve => setTimeout(resolve, 1000));

    const previewText = `Dans une forêt enchantée, ${name} découvre un monde magique rempli de créatures extraordinaires...`;
    
    setPreview(previewText);
    onPreviewGenerated?.(previewText);
    setIsGenerating(false);
  };

  if (!name) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <img 
          src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800" 
          alt="Livre sur fond blanc"
          className="w-48 h-48 object-contain mx-auto mb-4"
        />
        <p className="text-secondary">
          Tapez le prénom de votre enfant pour voir un aperçu instantané du livre !
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="aspect-video rounded-lg overflow-hidden bg-white shadow-md">
        {isGenerating ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin">
              <Wand2 className="w-8 h-8 text-highlight" />
            </div>
          </div>
        ) : (
          <div className="p-8">
            <img 
              src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800" 
              alt="Livre personnalisé"
              className="w-32 h-32 object-contain mx-auto mb-4"
            />
            <p className="text-lg font-medium mb-4">Aperçu de l'histoire :</p>
            <p className="text-secondary italic">{preview}</p>
          </div>
        )}
      </div>
    </div>
  );
}