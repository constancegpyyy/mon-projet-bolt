/*
  # Création de la table des livres

  1. Nouvelle Table
    - `books`
      - `id` (uuid, clé primaire)
      - `title` (texte)
      - `description` (texte)
      - `content` (texte)
      - `category` (texte)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Sécurité
    - Active RLS sur la table books
    - Ajoute des politiques pour la lecture et l'écriture
*/

CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content text,
  category text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Active RLS
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Politique de lecture pour tous les utilisateurs authentifiés
CREATE POLICY "Utilisateurs peuvent lire tous les livres"
  ON books
  FOR SELECT
  TO authenticated
  USING (true);

-- Politique d'écriture pour les administrateurs
CREATE POLICY "Administrateurs peuvent gérer les livres"
  ON books
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM user_roles WHERE role = 'admin'
  ));