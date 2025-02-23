import RegisterTemplate from "@/components/ui/templates/RegisterTemplate";
import ThemeToggle from "@/components/ui/atoms/Button/ToggleThemeButton";

export default function RegisterPage() {
  
  return (
    <div className="fade-enter">
      <ThemeToggle />
      <RegisterTemplate />
    </div>
  );
}