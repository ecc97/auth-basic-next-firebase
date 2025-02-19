import { DivideIcon } from "lucide-react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import styles from "./input.module.scss";

interface FormInputProps<T extends FieldValues> {
  type: string;
  placeholder: string;
  Icon: typeof DivideIcon;
  error?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
}

export function FormInput<T extends FieldValues>({ type, placeholder, Icon, error, name, register }: FormInputProps<T>) {
  return (
    <div className={styles.inputGroup}>
      <Icon className={styles.inputIcon} size={20} />
      <input
        type={type}
        placeholder={placeholder}
        className={error ? styles.errorInput : ""}
        {...register(name)}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}