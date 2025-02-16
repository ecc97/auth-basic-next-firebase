import { Facebook, Mail, Linkedin } from "lucide-react";
import { SocialButton } from "../../atoms/Social/SocialButton";
import styles from "./social-group.module.scss";

export function SocialLoginGroup() {
  return (
    <div className={styles.socialLogin}>
      <SocialButton Icon={Facebook} />
      <SocialButton Icon={Mail} />
      <SocialButton Icon={Linkedin} />
    </div>
  );
}