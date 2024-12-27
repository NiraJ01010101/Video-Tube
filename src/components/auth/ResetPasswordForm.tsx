"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "features/userapi/get-users";
import { Spinner } from "components/ui/spinner";
import toast from "react-hot-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const loginSchema = z.object({
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(20, { message: "Password cannot exceed 20 characters." })
        .refine(value => !/\s/.test(value), { message: "Password cannot contain spaces." }), // No spaces allowed,
});
type FormData = z.infer<typeof loginSchema>;

export default function ResetPasswordForm() {
    const router = useRouter()
    const { tokenId } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const { mutate: resetData, isPending } = useMutation({
        mutationFn: resetPassword,
        onSuccess: (res: any) => {
            toast.success(res.message);
            reset()
            console.log("isPending", isPending)
            // router.push('/auth/login')
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
        resetData({ data, tokenId })
    };

    return (
        <div>
            <div className="overflow-hidden rounded-3xl shadow-xl">
                <div className="rounded-tr-4xl bg-slate-950 bg-opacity-20 px-10 pb-8 pt-4">
                    <h2 className="mt-3 text-center text-3xl font-bold text-text">
                        Change Your Password
                    </h2>
                    <form
                        className=""
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="relative mt-4">
                            <label htmlFor="password" className="block mb-2 text-lg font-medium text-text">
                                Password
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
