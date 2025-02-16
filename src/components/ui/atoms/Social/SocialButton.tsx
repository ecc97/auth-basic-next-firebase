import { DivideIcon as LucideIcon } from "lucide-react";
import styles from "./social.module.scss";

interface SocialButtonProps {
  Icon: typeof LucideIcon;
}

export function SocialButton({ Icon }: SocialButtonProps) {
  return (
    <button className={styles.socialButton}>
      <Icon size={20} />
    </button>
  );
}