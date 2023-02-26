// npm packages
import { ChangeEvent, FormEvent } from "react";

// types
import { User, Profile, Movie, Book } from '../types/models'

/* ---------======= custom props ======--------- */

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

// movies
export interface MovieCardProps {
  user: User | null;
  profile: Profile | null;
}
export interface MovieFormProps {
  formData: {
    name: string;
    releaseDate: string;
  };
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleSubmit: (evt: FormEvent<HTMLFormElement>) => Promise<void>;
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
}
