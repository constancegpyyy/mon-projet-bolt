import { BookType } from '../../types/book';
import { narrativeBooks } from './narrative-books';
import { educationalBooks } from './educational-books';
import { categories } from './categories';
import { bookFormats, languages } from './formats';

// Export everything
export {
  narrativeBooks,
  educationalBooks,
  categories,
  bookFormats,
  languages
};

// Combine all books
export const books: BookType[] = [...narrativeBooks, ...educationalBooks];