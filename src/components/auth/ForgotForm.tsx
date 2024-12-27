"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "features/userapi/get-users";
import { Spinner } from "components/ui/spinner";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});
type FormData = z.infer<typeof loginSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { mutate: forgot, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (res: any) => {
      toast.success(res.message);
      reset();
    }
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    forgot(data)
  };

  return (
    <div>
      <div className="overflow-hidden rounded-3xl shadow-xl">
        <div className="rounded-tr-4xl bg-slate-950 bg-opacity-20 px-10 pb-8 pt-4">
          <h2 className="mt-3 text-center text-3xl font-bold text-text">
            Add Your Email
          </h2>
          <h6 className="text-text mt-8 mb-6">Please enter your email address and send a Link</h6>
          <form
            className=""
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative">
              <label htmlFor="email" className="block mb-2 text-lg font-medium text-text">
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
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="flex items-center justify-center gap-5 mt-10">
              <button
                type="button"
                onClick={() => router.push('/auth/login')}
                className="block w-full cursor-pointer rounded bg-primaryBtn p-4 text-center font-semibold text-text focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isDirty || isSubmitting || isPending}
                className="block w-full cursor-pointer rounded bg-primaryBtn p-4 text-center font-semibold text-text focus:outline-none focus:ring focus:ring-opacity-80 focus:ring-offset-2 disabled:opacity-60"
              >
                {isSubmitting || isPending ? (
                  <div className="flex size-full items-center justify-center">
                    <Spinner variant="light" />
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
