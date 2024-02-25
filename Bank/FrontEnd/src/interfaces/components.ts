export interface IMainHeaderProps {
  isDark: boolean;
  themeToggle: () => void;
}

export interface IUserDetailsFormProps {
  title: string;
  buttonText: string;
  className?: string;
}

export interface IUserFormActionData {
  msg: string;
  data?: { name: string; value: string; message: string }[];
}
