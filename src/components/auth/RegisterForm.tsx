"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "features/userapi/get-users";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const registrationSchema = z
  .object({
    fullname: z.string().min(1, { message: "Full name is required." }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const { mutate: registeruser, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Successfully Register');
    }
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
  });

  function onSubmit(data: FormData) {
    console.log("data", data);
    registeruser(data)
    // Handle file uploads and form submission logic here
  }

  return (
    <div>
      <div className="overflow-hidden rounded-3xl shadow-xl">
        <div className="rounded-tr-4xl bg-slate-950 bg-opacity-20 px-10 pb-8 pt-4">
          <h2 className="mt-3 text-center text-3xl font-bold text-text">
            Register your account
          </h2>
          <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name and Username Inputs in One Line */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-lg font-medium text-text"
                >
                  Full Name
                </label>
                <input
                  {...register("fullname", { required: true })}
                  id="fullname"
                  type="text"
                  className="block w-full p-4 text-text border border-border rounded-lg bg-background text-base focus:ring-accent focus:border-accent"
                  placeholder="John Doe"
                  autoComplete="off"
                />
                {errors?.fullname && (
                  <p className="text-red-600 text-sm">
                    {errors?.fullname?.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label
                  htmlFor="username"
                  className="block mb-2 text-lg font-medium text-text"
                >
                  Username
                </label>
                <input
                  {...register("username", { required: true })}
                  id="username"
                  type="text"
                  className="block w-full p-4 text-text border border-border rounded-lg bg-background text-base focus:ring-accent focus:border-accent"
                  placeholder="Username"
                  autoComplete="off"
                />
                {errors?.username && (
                  <p className="text-red-600 text-sm">
                    {errors?.username?.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div className="relative mt-4">
              <label
                htmlFor="email"
                className="block mb-2 text-lg font-medium text-text"
              >
                Email
              </label>
              <input
                {...register("email", { required: true })}
                id="email"
                type="text"
                className="block w-full p-4 text-text border border-border rounded-lg bg-background text-base focus:ring-accent focus:border-accent"
                placeholder="john@doe.com"
                autoComplete="off"
              />
              {errors?.email && (
                <p className="text-red-600 text-sm">{errors?.email?.message}</p>
              )}
            </div>

            {/* Password and Confirm Password Inputs in One Line */}
            <div className="flex space-x-4 mt-4">
              <div className="flex-1">
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg font-medium text-text"
                >
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  id="password"
                  type="password"
                  className="block w-full p-4 text-text border border-border rounded-lg bg-background text-base focus:ring-accent focus:border-accent"
                  placeholder="Password"
                  autoComplete="off"
                />
                {errors?.password && (
                  <p className="text-red-600 text-sm">
                    {errors?.password?.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-lg font-medium text-text"
                >
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword", { required: true })}
                  id="confirmPassword"
                  type="password"
                  className="block w-full p-4 text-text border border-border rounded-lg bg-background text-base focus:ring-accent focus:border-accent"
                  placeholder="Confirm Password"
                  autoComplete="off"
                />
                {errors?.confirmPassword && (
                  <p className="text-red-600 text-sm">
                    {errors?.confirmPassword?.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isDirty || isSubmitting || isPending}
              className="mt-20 block w-full cursor-pointer rounded bg-primaryBtn px-4 py-2 text-center font-semibold text-text hover:bg-blue-700 focus:outline-none focus:ring focus:ring-opacity-80 focus:ring-offset-2 disabled:opacity-70"
            >
              {isSubmitting || isPending ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-6 h-6 mr-2 text-text opacity-100"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG for Spinner Animation */}
                  </svg>
                </div>
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Already have an account link */}
          <div className="mt-4 text-center block">
            <span className="text-base font-medium text-text opacity-50">
              Already have an account?{" "}
            </span>
            <Link href="/auth/login" className="hover:underline focus:outline-none focus:ring-2 text-base font-medium text-text focus:text">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
