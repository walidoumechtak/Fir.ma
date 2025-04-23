"use client";

import { useState } from "react";

import CardWrapper from "./card-wrapper";

import * as z from "zod";
import { ResetSchema } from "@/schemas";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import axios from "../../api/axios";
import { getCsrfToken } from "../../hooks/useRefreshToken";

const ResetForm = () => {
  const [resetPasswordStatus, setResetPasswordStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    const { csrf_token } = await getCsrfToken();

    try {
      await axios.post("password-reset/", values, {
        withCredentials: true,
        headers: { "X-CSRFToken": csrf_token },
      });
      setSuccess("Check your email to reset your password.");
      setResetPasswordStatus("success");
    } catch (error: any) {
      setError(error.response.data.error);
      // setResetPasswordStatus("error");
    }
  };

  return (
    <>
      {resetPasswordStatus === "success" ? (
        <CardWrapper
          headerLabel="Forgot your password!"
          backButtonLabel="Back to login"
          backButtonHref="/login"
        >
          <FormSuccess message={success} />
        </CardWrapper>
      ) : (
        <CardWrapper
          headerLabel="Forgot your password!"
          backButtonLabel="Back to login"
          backButtonHref="/login"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="john.doe@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit" className="w-full">
                Sent reset email
              </Button>
            </form>
          </Form>
        </CardWrapper>
      )}
    </>
  );
};

export default ResetForm;
