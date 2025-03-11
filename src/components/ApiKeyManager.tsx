import React, { useState, useEffect } from 'react';
import { Key, Plus, Trash2, Copy, Check } from 'lucide-react';
import { createApiKey, getApiKeys, revokeApiKey } from '../lib/apiKeys';

export function ApiKeyManager() {
  const [keys, setKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Charger les clés existantes
  useEffect(() => {
    loadKeys();
  }, []);

  const loadKeys = async () => {
    setLoading(true);
    const result = await getApiKeys();
    if (result.success) {
      setKeys(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  // Créer une nouvelle clé
  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const result = await createApiKey(newKeyName);
    if (result.success) {
      setKeys([result.data, ...keys]);
      setNewKeyName('');
      
      // Afficher une notification de succès
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-success text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in';
      notification.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="text-2xl">🔑</span>
          <span>Clé API créée avec succès !</span>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.classList.add('animate-slide-out');
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    } else {
      setError(result.error);
    }
  };

  // Révoquer une clé
  const handleRevokeKey = async (keyId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir révoquer cette clé ?')) return;

    const result = await revokeApiKey(keyId);
    if (result.success) {
      setKeys(keys.filter(key => key.id !== keyId));
    } else {
      setError(result.error);
    }
  };

  // Copier une clé
  const handleCopyKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      setError('Erreur lors de la copie de la clé');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Formulaire de création */}
      <form onSubmit={handleCreateKey} className="card space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Key className="w-5 h-5" />
          Créer une nouvelle clé API
        </h2>
        
        <div className="flex gap-4">
          <input
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="Nom de la clé API"
            className="flex-1 px-4 py-2 rounded-lg bg-white/50 border border-dark/10 focus:ring-2 focus:ring-accent"
            required
          />
          <button
            type="submit"
            className="btn flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Créer
          </button>
        </div>
      </form>

      {/* Liste des clés */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Vos clés API</h3>
        
        {error && (
          <div className="p-4 bg-error/10 text-error rounded-lg">
            {error}
          </div>
        )}

        {keys.length === 0 ? (
          <p className="text-dark/60 dark:text-white/60">
            Vous n'avez pas encore de clé API.
          </p>
        ) : (
          <div className="space-y-4">
            {keys.map((key) => (
              <div
                key={key.id}
                className="card flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-medium">{key.name}</h4>
                  <p className="text-sm text-dark/60 dark:text-white/60 font-mono">
                    {key.key}
                  </p>
                  <p className="text-xs text-dark/40 dark:text-white/40">
                    Créée le {new Date(key.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopyKey(key.key)}
                    className="p-2 rounded-lg hover:bg-accent/20 transition-colors"
                    title="Copier la clé"
                  >
                    {copiedKey === key.key ? (
                      <Check className="w-5 h-5 text-success" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleRevokeKey(key.id)}
                    className="p-2 rounded-lg hover:bg-error/20 transition-colors text-error"
                    title="Révoquer la clé"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}