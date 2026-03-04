export type Book = {
  id: number;
  title: string;

  author:
    | string
    | {
        id?: number;
        name?: string;
        bio?: string | null;
      };

  category?: {
    id?: number;
    name?: string;
  };

  publishedYear?: number;
  availableCopies?: number;
  rating?: number;
  coverImage?: string;
};