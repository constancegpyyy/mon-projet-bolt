import React, { useState, useEffect } from 'react';
import { Book, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { booksApi } from '../lib/supabase';
import { generateBookDescription, generateStory } from '../lib/openai';

interface BookFormData {
  title: string;
  category: string;
  description: string;
  content: string;
}

const initialFormData: BookFormData = {
  title: '',
  category: '',
  description: '',
  content: ''
};

export function AdminPanel() {
  const [books, setBooks] = useState<any[]>([]);
  const [formData, setFormData] = useState<BookFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await booksApi.getAll();
      setBooks(data);
    } catch (err) {
      setError('Erreur lors du chargement des livres');
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (editingId) {
        await booksApi.update(editingId, formData);
      } else {
        await booksApi.create(formData);
      }
      setFormData(initialFormData);
      setEditingId(null);
      loadBooks();
    } catch (err) {
      setError('Erreur lors de la sauvegarde');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (book: any) => {
    setFormData({
      title: book.title,
      category: book.category,
      description: book.description,
      content: book.content
    });
    setEditingId(book.id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) return;

    try {
      await booksApi.delete(id);
      loadBooks();
    } catch (err) {
      setError('Erreur lors de la suppression');
      console.error(err);
    }
  };

  const generateAIContent = async () => {
    if (!formData.title || !formData.category) {
      setError('Le titre et la catégorie sont requis pour la génération IA');
      return;
    }

    setIsLoading(true);
    try {
      const description = await generateBookDescription(formData.title, formData.category);
      const story = await generateStory(formData.title, formData.category, 'Exemple', 7);
      
      setFormData(prev => ({
        ...prev,
        description: description || prev.description,
        content: story || prev.content
      }));
    } catch (err) {
      setError('Erreur lors de la génération du contenu IA');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Administration des Livres</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Titre</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-accent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Catégorie</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-accent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-accent"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contenu</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-accent"
            rows={6}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn flex items-center gap-2"
          >
            {editingId ? (
              <>
                <Save className="w-5 h-5" />
                Mettre à jour
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Ajouter
              </>
            )}
          </button>

          <button
            type="button"
            onClick={generateAIContent}
            disabled={isLoading}
            className="btn flex items-center gap-2"
          >
            <Book className="w-5 h-5" />
            Générer avec l'IA
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData(initialFormData);
                setEditingId(null);
              }}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="p-4 rounded border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="p-2 rounded hover:bg-gray-100"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="p-2 rounded hover:bg-gray-100 text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{book.category}</p>
            <p className="text-gray-700">{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}