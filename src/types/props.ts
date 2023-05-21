// npm packages
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

// types
import { User, Profile, Movie, Book } from '../types/models'
import { MovieFormData, BookFormData } from "./forms";

/* ---------======= custom props ======--------- */

export interface ProfilesProps {
  user: User | null;
}

export interface ProfileDetailsProps {
  user: User | null;
}

export interface HomeProps {
  user: User | null;
}

// movies
export interface MovieCardCUDProps {
  user: User | null;
  profile: Profile | null;
  movieIdx: number;
  setMovieIdx: Dispatch<SetStateAction<number>>;
  movie: Movie | null;
  setMovie: Dispatch<SetStateAction<Movie | null>>;
  movies: Movie[];
  setMovies: Dispatch<SetStateAction<Movie[] | []>>;
}

export interface MovieFormProps {
  formData: MovieFormData;
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleSubmit: (evt: FormEvent<HTMLFormElement>) => Promise<void>;
  handleCancel: () => void;
  handleChangePhoto: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface MovieDetailsProps {
  user: User | null;
  profile: Profile | null;
  movie: Movie;
  movies: Movie[];
  index: number;
}

export interface MovieCarouselProps {
  user: User | null;
  movies: Movie[];
}

export interface MovieCardRProps {
  user: User | null;
  movie: Movie | null;
}

// books
export interface BookCardCUDProps {
  user: User | null;
  profile: Profile | null;
  bookIdx: number;
  setBookIdx: Dispatch<SetStateAction<number>>;
  book: Book |null;
  setBook: Dispatch<SetStateAction<Book | null>>;
  books: Book[];
  setBooks: Dispatch<SetStateAction<Book[] | []>>;
}

export interface BookFormProps {
  formData: BookFormData;
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleSubmit: (evt: FormEvent<HTMLFormElement>) => Promise<void>;
  handleCancel: () => void;
  handleChangePhoto: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface BookDetailsProps {
  user: User | null;
  profile: Profile | null;
  book: Book;
  books: Book[];
  index: number;
}

export interface BookCarouselProps {
  user: User | null;
  books: Book[];
}

export interface BookCardRProps {
  user: User | null;
  book: Book | null;
}

/* ---------===== auth form props =====--------- */

export interface AuthFormProps {
  handleAuthEvt: () => void;
  updateMessage: (msg: string) => void;
}

export interface LoginFormProps {
  handleAuthEvt: () => void;
  updateMessage: (msg: string) => void;
  setDisplayAlert: Dispatch<SetStateAction<boolean>>;
}

export interface AccountSettingsProps {
  user: User | null;
  handleAuthEvt: () => void;
  favColor: string | undefined;
  setFavColor: Dispatch<SetStateAction<string | undefined>>;
}

export interface ChangeNameFormProps {
  handleAuthEvt: () => void;
}

export interface ColorPickerProps {
  user: User | null;
  handleAuthEvt: () => void;
  favColor: string | undefined;
  setFavColor: Dispatch<SetStateAction<string | undefined>>;
}