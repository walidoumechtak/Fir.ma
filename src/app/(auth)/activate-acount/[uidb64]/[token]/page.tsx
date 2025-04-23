"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import axios from "@/api/axios";
import { FormSuccess } from "@/components/form-success";
import CardWrapper from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ResetSchema } from "@/schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { getCsrfToken } from "@/hooks/useRefreshToken";

function ActivateAccount() {
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [activationStatus, setActivationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const params = useParams<{ uidb64: string; token: string }>();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.get(
          `activate/${params.uidb64}/${params.token}/`,
        );
        if (response.status === 200) {
          setSuccess("Your account has been activated successfully!");
          setActivationStatus("success");
        }
      } catch (error: any) {
        setActivationStatus("error");
        setErrorMessage(String(error.response.data.error));
      }
    };

    activateAccount();
  }, []);

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: (
    values: z.infer<typeof ResetSchema>,
  ) => Promise<void> = async (values: z.infer<typeof ResetSchema>) => {
    setErrorMessage("");
    setSuccess("");
    const email = values.email;
    console.log(email);
    const { csrf_token } = await getCsrfToken();

    try {
      const response = await axios.post("resend-activate-email/", values, {
        withCredentials: true,
        headers: { "X-CSRFToken": csrf_token },
      });
    } catch (error: any) {
      if (error?.response.data.message == "Account is already activated.") {
        setSuccess("Account is already activated.");
        setActivationStatus("success");
      } else {
        setErrorMessage(String(error.response.data.error));
        // console.error("Resend activation link failed:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* {activationStatus === "loading" && <p>Activating your account, please wait...</p>} */}
      {activationStatus === "loading" && <div className="loader"></div>}
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      {activationStatus === "success" && (
        <>
          <CardWrapper
            headerLabel="Activate Your Account"
            backButtonLabel="Login to your account"
            backButtonHref="/login"
          >
            <FormSuccess message={success} />
          </CardWrapper>
        </>
      )}
      {activationStatus === "error" && (
        <>
          <CardWrapper
            headerLabel="Resend Activation Link"
            backButtonLabel="Login to your account"
            backButtonHref=""
          >
            <FormError message={errorMessage} />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="john.doe@example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* <FormError message={errorMessage} /> */}
                {/* <FormSuccess message={success} /> */}
                <Button type="submit" disabled={isPending} className="w-full">
                  Resend Activation Link
                </Button>
              </form>
            </Form>
          </CardWrapper>
        </>
      )}
    </div>
  );
}
export default ActivateAccount;
