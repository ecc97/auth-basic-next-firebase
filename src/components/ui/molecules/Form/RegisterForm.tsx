import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, User } from "lucide-react";
import { FormInput } from "../../atoms/Input/Input";
import stylesFormRegister from "./form.module.scss";
import stylesBtnRegister from "@/assets/sass/register.module.scss";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading: boolean;
}

export function RegisterForm({ onSubmit, isLoading }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={stylesFormRegister.form}>
      <FormInput
        type="text"
        placeholder="Name"
        Icon={User}
        error={errors.name?.message}
        register={register}
        name="name"
      />
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
      <button
        type="submit"
        className={stylesBtnRegister.signUpButton}
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "SIGN UP"}
      </button>
    </form>
  );
}