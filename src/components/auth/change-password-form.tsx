"use client";

import { useState, useTransition } from "react";

import CardWrapper from "./card-wrapper";

import * as z from "zod";
import { ChangePasswordSchema } from "@/schemas";

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

import axios from "@/api/axios";

const ChangePasswordForm: React.FC = () => {
  const [changePasswordStatus, setChangePasswordStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ChangePasswordSchema>) => {
    setError("");
    setSuccess("");
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    } else if (values.password === values.currentPassword) {
      setError("New password cannot be the same as the current password");
      return;
    }
    startTransition(async () => {
      try {
        await axios.post(
          `change-password/`,
          {
            values,
          },
          { withCredentials: true },
        );
        setSuccess("Password changed successfully");
        setChangePasswordStatus("success");
        // router.push('/dashboard')
      } catch (error: any) {
        if (error.response.data.error === "Current password is incorrect.")
          setError("Current password is incorrect.");
        else setError("Failed to reset password: ");
      }
    });
  };

  return changePasswordStatus === "success" ? (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Go back to dashboard"
      backButtonHref="/dashboard"
    >
      <FormSuccess message={success} />
    </CardWrapper>
  ) : (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel=""
      backButtonHref="/dashboard"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ChangePasswordForm;
