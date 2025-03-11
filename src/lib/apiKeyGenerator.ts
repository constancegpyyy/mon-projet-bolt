import { randomBytes } from 'crypto';

/**
 * Génère une clé API sécurisée
 * @param length Longueur de la clé (par défaut 32 caractères)
 * @returns Une clé API sécurisée
 */
export function generateApiKey(length: number = 32): string {
  // Générer des bytes aléatoires
  const bytes = randomBytes(length);
  
  // Convertir en base64 et retirer les caractères non-URL safe
  return bytes.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
    .slice(0, length);
}

/**
 * Vérifie si une clé API est valide
 * @param apiKey Clé API à vérifier
 * @returns true si la clé est valide
 */
export function validateApiKey(apiKey: string): boolean {
  // Vérifier la longueur minimale
  if (apiKey.length < 32) return false;

  // Vérifier le format
  const validFormat = /^[A-Za-z0-9\-_]+$/;
  return validFormat.test(apiKey);
}

/**
 * Génère un préfixe pour la clé API
 * @returns Un préfixe pour la clé API
 */
export function generateApiKeyPrefix(): string {
  return 'mhu'; // mon-histoire-unique
}

/**
 * Génère une clé API complète avec préfixe
 * @returns Une clé API complète
 */
export function generateFullApiKey(): string {
  const prefix = generateApiKeyPrefix();
  const key = generateApiKey();
  return `${prefix}_${key}`;
}