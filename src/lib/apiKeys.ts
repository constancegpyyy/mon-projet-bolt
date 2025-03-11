import { supabase } from './supabase';
import { generateFullApiKey } from './apiKeyGenerator';

/**
 * Crée une nouvelle clé API pour l'utilisateur connecté
 */
export async function createApiKey(name: string, scopes: string[] = []) {
  try {
    // Vérifier que l'utilisateur est connecté
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Utilisateur non connecté');

    // Générer une nouvelle clé API
    const key = generateFullApiKey();

    // Insérer la clé dans la base de données
    const { data, error } = await supabase
      .from('api_keys')
      .insert({
        user_id: user.id,
        key,
        name,
        scopes
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: {
        id: data.id,
        key,
        name: data.name,
        scopes: data.scopes,
        created_at: data.created_at
      }
    };
  } catch (error) {
    console.error('Erreur lors de la création de la clé API:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}

/**
 * Récupère toutes les clés API de l'utilisateur connecté
 */
export async function getApiKeys() {
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .is('revoked_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des clés API:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}

/**
 * Révoque une clé API
 */
export async function revokeApiKey(keyId: string) {
  try {
    const { error } = await supabase
      .from('api_keys')
      .update({ revoked_at: new Date().toISOString() })
      .eq('id', keyId);

    if (error) throw error;

    return {
      success: true
    };
  } catch (error) {
    console.error('Erreur lors de la révocation de la clé API:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}