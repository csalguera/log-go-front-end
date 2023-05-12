// npm packages
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

// types
import { User, Profile, Movie, Book } from '../types/models'
import { MovieFormData } from "./forms";

/* ---------======= custom props ======--------- */

export interface ProfilesProps {
  user: User | null;
}

export interface ProfileDetailsProps {
  user: User | null;
}

export interface CUDBtnsProps {
  user: User | null;
  profile: Profile | null;
  resource: Movie[] | Book[];
  displayForm: () => void;
  formDisplay: boolean;
  editFormDisplay: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
}

export interface NextPrevBtnsProps {
  handleClick: (evt: React.MouseEvent) => void;
  category: string;
}

// movies
export interface MovieCardProps {
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

// books
export interface BookCardProps {
  user: User | null;
  profile: Profile | null;
  books: Book[];
  setBooks: Dispatch<SetStateAction<Book[] | []>>;
}

export interface BookFormProps {
  formData: {
    name: string;
    author: string;
    published: string;
  };
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleSubmit: (evt: FormEvent<HTMLFormElement>) => Promise<void>;
}

export interface BookDetailsProps {
  user: User | null;
  profile: Profile | null;
  book: Book;
  books: Book[];
  index: number;
}


/* ---------===== auth form props =====--------- */

export interface AuthFormProps {
  handleAuthEvt: () => void;
  updateMessage: (msg: string) => void;
  setDisplayAlert: Dispatch<SetStateAction<boolean>>;
}
