export interface BookType {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  type: 'narrative' | 'educational' | 'custom';
  price?: number;
}

export interface BookCategory {
  id: string;
  name: string;
  icon: string;
  type: 'narrative' | 'educational' | 'custom';
}

export interface BookPersonalization {
  childName: string;
  dedication?: string;
  language: string;
  format: 'digital' | 'printed';
}