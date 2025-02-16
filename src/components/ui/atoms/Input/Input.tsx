import { DivideIcon } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import styles from "./input.module.scss";

interface FormInputProps {
  type: string;
  placeholder: string;
  Icon: typeof DivideIcon;
  error?: string;
  register: UseFormRegister<any>;
  name: string;
}

export function FormInput({ type, placeholder, Icon, error, register, name }: FormInputProps) {
  return (
    <div className={styles.inputGroup}>
      <Icon className={styles.inputIcon} size={20} />
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={error ? styles.errorInput : ""}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}