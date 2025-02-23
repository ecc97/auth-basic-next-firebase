import LoginTemplate from "@/components/ui/templates/LoginTemplate";
import ThemeToggle from "@/components/ui/atoms/Button/ToggleThemeButton";

export default function LoginPage() {

  return (
    <div className="fade-enter">
      <ThemeToggle />
      <LoginTemplate />
    </div>
  );
}