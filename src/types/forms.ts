/* ---------==== custom forms ====--------- */

export interface MovieFormData {
  name: string;
  releaseDate: string;
}

export interface EditMovieFormData {
  movieId: number | null;
  name: string;
  releaseDate: string;
}

export interface BookFormData {
  name: string;
  author: string;
  published: string;
}

export interface EditBookFormData {
  bookId: number | null;
  name: string;
  author: string;
  published: string;
}

/* ---------===== auth forms =====--------- */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  newPasswordConf: string;
}

export interface PhotoFormData {
  photo: File | null;
}
