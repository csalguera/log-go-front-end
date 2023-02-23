/* ---------===== custom props ====--------- */

export interface List {
  id: number;
  movie: string;
  book: string;
  tvShow: string;
  song: string;
  videoGame: string;
  boardGame: string;
  indoorActivity: string;
  outdoorActivity: string;
}

/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  lists: Array<List>;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}
