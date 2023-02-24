/* ---------==== custom forms ====--------- */

export interface MovieFormData {
  name: string;
  releaseDate: string;
}

export interface EditMovieFormData {
  movieId: number | null;
  editName: string;
  editReleaseDate: string;
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
