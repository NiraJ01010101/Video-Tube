"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "features/userapi/get-users";
import { Spinner } from "components/ui/spinner";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string(),
});
type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router=useRouter()
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (res: any) => {
      reset()
      const { accessToken, refreshToken } = res.data
      toast.success('Successfully logged in!');
      Cookies.set('accessToken', accessToken, { expires: 1 });
      router.push("/")
    }
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    login(data)
    // loginMutation.mutate(data)
  };

  return (
    <div>
      <div className="overflow-hidden rounded-3xl shadow-xl">
        <div className="rounded-tr-4xl bg-slate-950 bg-opacity-20 px-10 pb-8 pt-4">
          <h2 className="mt-3 text-center text-3xl font-bold text-text">
            Login to your account
          </h2>
          <form
            className="mt-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative">
              <label htmlFor="email" className="block mb-2 text-lg font-medium text-text">
                Email or Username
              </label>
              <input
                {...register("email", { required: true })}
                id="email"
                type="text"
                className="block w-full p-4 text-text border border-border rounded-lg bg-background text-base focus:ring-accent focus:border-accent"
                placeholder="john@doe.com or john"
                autoComplete="off"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="relative mt-4">
              <label htmlFor="password" className="block mb-2 text-lg font-medium text-text">
                Password
                <span className="float-right opacity-50 hover:opacity-100">
                  <Link
                    href="/auth/forgotPassword"
                    className="hover:underline focus:outline-none text-base font-medium text-text focus:text"
                  >
                    Forgotten Password?
                  </Link>
                </span>
              </label>
              <div className="relative">
                <input
                  {...register("password", { required: true })}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="block w-full p-4 text-text border border-border rounded-lg bg-background text-base focus:ring-accent focus:border-accent"
                  placeholder="Password"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none"
                >
                  {showPassword ? <Eye strokeWidth={1.5} /> : <EyeOff strokeWidth={1.5} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="mt-20 block w-full cursor-pointer rounded bg-primaryBtn p-4 text-center font-semibold text-text focus:outline-none focus:ring focus:ring-opacity-80 focus:ring-offset-2 disabled:opacity-60"
            >
              {isSubmitting || isPending ? (
                <div className="flex size-full items-center justify-center">
                  <Spinner variant="light" />
                </div>
              ) : (
                "Sign In"

              )}
            </button>
          </form>

          <div className="mt-4 text-center block">
            <span className="text-base font-medium text-text opacity-50">
              Don't have an account?{" "}
            </span>
            <Link
              href="/auth/register"
              className="hover:underline focus:outline-none text-base font-medium text-text focus:text"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
