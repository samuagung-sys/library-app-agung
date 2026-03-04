import { useForm } from "react-hook-form";
import { useLogin } from "@/features/auth/hooks/useLogin";

type LoginForm = {
  email: string;
  password: string;
};

export function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const loginMutation = useLogin();

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4 rounded-xl border p-6 shadow-sm"
      >
        <h1 className="text-xl font-bold">Login</h1>

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full rounded-lg border p-2"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border p-2"
        />

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded-lg bg-blue-600 py-2 text-white disabled:opacity-50"
        >
          {loginMutation.isPending ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
