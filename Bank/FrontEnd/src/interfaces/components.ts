export interface IMainHeaderProps {
  isDark: boolean;
  themeToggle: () => void;
}

export interface IUserDetailsFormProps {
  title: string;
  buttonText: string;
  values?: { [key: string]: string };
  className?: string;
}

export interface IUserFormActionData {
  msg: string;
  data?: { name: string; value: string; message: string }[];
}

export interface UserDetails {
  IDcard: string;
  name: { first: string; last: string };
  email: string;
  mobile: string;
  address: { city: string; street: string };
}
