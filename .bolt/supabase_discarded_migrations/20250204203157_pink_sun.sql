/*
  # Création de la table user_roles

  1. Nouvelle Table
    - `user_roles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `role` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policy for admins to manage roles
    - Add policy for users to read their own roles
*/

CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'editor', 'user')),
  created_at timestamptz DEFAULT now()
);

-- Active RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Politique de lecture pour les utilisateurs authentifiés
CREATE POLICY "Utilisateurs peuvent lire leurs rôles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Politique de gestion pour les administrateurs
CREATE POLICY "Administrateurs peuvent gérer les rôles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role = 'admin'
    )
  );