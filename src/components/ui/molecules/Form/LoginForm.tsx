import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock } from "lucide-react";
import { FormInput } from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import stylesBtnLogin from "@/assets/sass/login.module.scss";
import stylesFormLogin from './form.module.scss'

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={stylesFormLogin.form}>
      <FormInput
        type="email"
        placeholder="Email"
        Icon={Mail}
        error={errors.email?.message}
        register={register}
        name="email"
      />
      <FormInput
        type="password"
        placeholder="Password"
        Icon={Lock}
        error={errors.password?.message}
        register={register}
        name="password"
      />
      <a href="#" className={stylesFormLogin.forgotPassword}>
        Forgot your password?
      </a>
      <Button
        type="submit"
        className={stylesBtnLogin.signInButton}
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "SIGN IN"}
      </Button>
    </form>
  );
}