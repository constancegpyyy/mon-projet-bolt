import { AvatarOptions } from './avatarGenerator';
import { supabase } from './supabase';

interface BookPersonalization {
  childName: string;
  avatar: AvatarOptions;
  dedication?: string;
}

interface BookPage {
  content: string;
  avatarPosition?: {
    x: number;
    y: number;
    scale: number;
    rotation: number;
  };
}

interface GeneratedBook {
  id: string;
  title: string;
  pages: BookPage[];
  coverImage: string;
  metadata: {
    personalization: BookPersonalization;
    createdAt: string;
    version: string;
  };
}

export class BookGenerator {
  private static readonly VERSION = '1.0.0';

  /**
   * Génère un livre personnalisé avec l'avatar intégré
   */
  static async generateBook(
    bookId: string,
    personalization: BookPersonalization
  ): Promise<GeneratedBook> {
    try {
      // 1. Récupérer le template du livre depuis Supabase
      const { data: bookTemplate, error: bookError } = await supabase
        .from('books')
        .select('*')
        .eq('id', bookId)
        .single();

      if (bookError) throw bookError;

      // 2. Personnaliser le contenu avec le prénom
      const personalizedPages = this.personalizeContent(
        bookTemplate.content,
        personalization.childName
      );

      // 3. Générer les positions de l'avatar pour chaque page
      const pagesWithAvatar = this.generateAvatarPositions(personalizedPages);

      // 4. Créer la couverture personnalisée
      const coverImage = await this.generateCover(
        bookTemplate.cover_template,
        personalization
      );

      // 5. Assembler le livre final
      const generatedBook: GeneratedBook = {
        id: crypto.randomUUID(),
        title: bookTemplate.title.replace('[Prénom]', personalization.childName),
        pages: pagesWithAvatar,
        coverImage,
        metadata: {
          personalization,
          createdAt: new Date().toISOString(),
          version: this.VERSION
        }
      };

      // 6. Sauvegarder le livre généré
      const { error: saveError } = await supabase
        .from('generated_books')
        .insert([{
          id: generatedBook.id,
          book_template_id: bookId,
          personalization: generatedBook.metadata.personalization,
          content: generatedBook.pages,
          cover_image: generatedBook.coverImage,
          created_at: generatedBook.metadata.createdAt
        }]);

      if (saveError) throw saveError;

      return generatedBook;
    } catch (error) {
      console.error('Erreur lors de la génération du livre:', error);
      throw new Error('Impossible de générer le livre personnalisé');
    }
  }

  /**
   * Personnalise le contenu du livre avec le prénom de l'enfant
   */
  private static personalizeContent(content: string[], childName: string): string[] {
    return content.map(page => page.replace(/\[Prénom\]/g, childName));
  }

  /**
   * Génère les positions de l'avatar pour chaque page
   */
  private static generateAvatarPositions(pages: string[]): BookPage[] {
    return pages.map(content => {
      // Détecter si la page nécessite un avatar
      const needsAvatar = content.includes('[Avatar]');

      if (!needsAvatar) {
        return { content };
      }

      // Générer une position aléatoire mais naturelle pour l'avatar
      const position = {
        x: 100 + Math.random() * 300, // Position X entre 100 et 400
        y: 100 + Math.random() * 200, // Position Y entre 100 et 300
        scale: 0.8 + Math.random() * 0.4, // Échelle entre 0.8 et 1.2
        rotation: -10 + Math.random() * 20 // Rotation entre -10 et 10 degrés
      };

      return {
        content: content.replace('[Avatar]', ''),
        avatarPosition: position
      };
    });
  }

  /**
   * Génère la couverture personnalisée du livre
   */
  private static async generateCover(
    coverTemplate: string,
    personalization: BookPersonalization
  ): Promise<string> {
    try {
      // Position par défaut de l'avatar sur la couverture
      const defaultAvatarPosition = {
        x: 250,
        y: 300,
        scale: 1,
        rotation: 0
      };

      // Générer l'URL de la couverture personnalisée
      return `${coverTemplate}?name=${encodeURIComponent(personalization.childName)}&avatar=${JSON.stringify(defaultAvatarPosition)}`;
    } catch (error) {
      console.error('Erreur lors de la génération de la couverture:', error);
      throw new Error('Impossible de générer la couverture du livre');
    }
  }

  /**
   * Génère un aperçu du livre
   */
  static async generatePreview(
    bookId: string,
    personalization: BookPersonalization
  ): Promise<string> {
    try {
      // Générer un aperçu de la première page avec l'avatar
      const { data: bookTemplate, error } = await supabase
        .from('books')
        .select('preview_template')
        .eq('id', bookId)
        .single();

      if (error) throw error;

      // Personnaliser l'aperçu avec le prénom et l'avatar
      const previewUrl = `${bookTemplate.preview_template}?name=${
        encodeURIComponent(personalization.childName)
      }&avatar=${JSON.stringify(personalization.avatar)}`;

      return previewUrl;
    } catch (error) {
      console.error('Erreur lors de la génération de l\'aperçu:', error);
      throw new Error('Impossible de générer l\'aperçu du livre');
    }
  }
}