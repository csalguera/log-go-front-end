import { ChangeEvent, FormEvent } from "react";

/* ---------======= custom props ======--------- */

export interface MovieFormProps {
  name: string;
  releaseDate: string;
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleSubmit: (evt: FormEvent<HTMLFormElement>) => Promise<void>;
  edit: boolean;
}

/* ---------===== auth form props =====--------- */

export interface AuthFormProps {
  handleAuthEvt: () => void;
  updateMessage: (msg: string) => void;
}
