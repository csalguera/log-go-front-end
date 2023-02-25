/* ---------===== custom props ====--------- */

export interface Movie {
  id: number;
  name: string;
  profileId: number;
  releaseDate: number;
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
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}
