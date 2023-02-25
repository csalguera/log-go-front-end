// npm packages
import { ChangeEvent, FormEvent } from "react";

// types
import { User, Profile } from '../types/models'

/* ---------======= custom props ======--------- */

export interface ProfileDetailsProps {
  user: User | null;
}

export interface MovieCardProps {
  user: User | null;
  profile: Profile | null;
}

export interface BookCardProps {
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

export interface BookFormProps {
  formData: {
    name: string;
    author: string;
    published: string;
  };
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleSubmit: (evt: FormEvent<HTMLFormElement>) => Promise<void>;
}

/* ---------===== auth form props =====--------- */

export interface AuthFormProps {
  handleAuthEvt: () => void;
  updateMessage: (msg: string) => void;
}
