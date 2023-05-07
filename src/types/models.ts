/* ---------===== custom props ====--------- */

export interface Movie {
  id: number;
  name: string;
  director: string;
  category: string;
  releaseDate: number;
  profileId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: number;
  name: string;
  author: string;
  category: string;
  published: number;
  profileId: number;
  createdAt: string;
  updatedAt: string;
}

/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  movies: Array<Movie>;
  books: Array<Book>;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number, photo: string };
  id: number;
  createdAt: string;
  updatedAt: string;
}
