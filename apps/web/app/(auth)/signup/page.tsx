"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/button";
import { errorToast, successToast } from "@/lib/toast";
import axios from "axios";
import Link from "next/link";
import axiosInstance, { baseURL } from "@/lib/axiosInstance";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  otp: z.string(), // Optional until OTP is required
  name: z.string(),
  isVerified: z.boolean(),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const router = useRouter();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      otp: "",
      name: "",
      isVerified: false,
    },
  });

  const generateOtp = async (email: string, name: string) => {
    try {
      // API call to check if the email exists
      const response = await axios.post(`${baseURL}/user/generate-otp`, { email, name });

      if (!response.data.success) {
        errorToast("Email already exists. Please use a different email.");
        setIsEmailVerified(false); 
      } else {
        // API call to generate and send OTP
        // await axios.post("/api/generate-otp", { email });
        successToast("OTP sent successfully.");
        setShowOtpField(true);
        setIsEmailVerified(true);
      }
    } catch (error: any) {
      console.error("Email verification failed:", error);
      errorToast(error.response.data.message);
    }
  };

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
   

    try {
      // Replace with your actual sign-up API call
      const response = await axios.post(`${baseURL}/user`, {
        email: data.email,
        password: data.password,
        otp: data.otp,
        name: data.name,
      });

      if (response.status === 201) {
        router.push("/login");
        successToast("Sign up successful. Please login.");
      } else {
        errorToast("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign up failed:", error);
      errorToast("Sign up failed. Please try again.");
    }
  };

  return (
    <section className="h-screen w-full flex justify-center items-center bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          Sign Up
        </h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-400"
          >
            Name
          </label>
          <input
            type="name"
            id="name"
            {...register("name")}
            className={`mt-1 block w-full p-2 border rounded-md bg-gray-700 text-white ${errors.email ? "border-red-500" : "border-gray-600"}`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`mt-1 block w-full p-2 border rounded-md bg-gray-700 text-white ${errors.email ? "border-red-500" : "border-gray-600"}`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        {!showOtpField ? (
          <div className="mb-4 flex justify-end">
            <button className="text-sm font-medium text-blue-400 hover:text-blue-600" type="button" onClick={() => generateOtp(getValues("email"), getValues("name"))}>
              Generate OTP
            </button>
          </div>
        ) : (
          <div className="mb-6">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-400"
            >
              OTP
            </label>
            <input
              type="text"
              id="otp"
              {...register("otp")}
              className={`mt-1 block w-full p-2 border rounded-md bg-gray-700 text-white ${errors.otp ? "border-red-500" : "border-gray-600"}`}
              placeholder="Enter OTP"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>
        )}

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-400"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className={`mt-1 block w-full p-2 border rounded-md bg-gray-700 text-white ${errors.password ? "border-red-500" : "border-gray-600"}`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition "
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Sign Up
        </Button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUpPage;
