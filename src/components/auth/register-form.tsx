"use client";

import { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from 'next/navigation';


import { RegisterSchema } from "@/schemas";
import CardWrapper from "./card-wrapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const RegisterForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()
  const [formData, setFormData] = useState({})
  


  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.focus();
    }
  }, []);

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
   
    try {
      setError("");
      setIsPending(true);
      setIsPending(true);
      // Simulate login logic or API call here
      // Example: await login(values);

      // Navigate to /dashboard after successful login
      setSuccess("Account created successfully");
      setIsSuccess(true);
      router.push('/farms');
    } catch (err: any) {
      setIsPending(false);
      if (!err?.response) setError("No Server Response");
      else if (err.response?.status == 500)
        setError("Something went wrong please try again");
      else setError(err.response?.data?.error);
      console.log(err);
    }
  };

  return (
    <>
      {isSuccess ? (
        <CardWrapper
          headerLabel="Activate Your Account"
          backButtonLabel="Did you activate your account?"
          backButtonHref="/login"
        >
          <div>
            <FormSuccess message="Check your email to activate your account" />
          </div>
        </CardWrapper>
      ) : (
        <CardWrapper
          headerLabel="Create an account!"
          backButtonLabel="Already have an account?"
          backButtonHref="/login"
          showSocial
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              encType="multipart/form-data"
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-x-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="John"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Doe"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="communicationChannel" className="text-gray-700">
                      Preferred Communication Channel
                    </Label>
                    <Select
                      value={formData.communicationChannel}
                      onValueChange={(value) => handleSelectChange("communicationChannel", value)}
                    >
                      <SelectTrigger id="communicationChannel" className="border-gray-300 focus:ring-green-500">
                        <SelectValue placeholder="Select preferred channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mobile-app">Mobile App</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="voice-calls">Voice Calls</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>


                    {/* User Type */}
                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-700 border-l-4 border-green-600 pl-2">User Type</h3>
                      <div className="space-y-2">
                        <Select onValueChange={(value) => handleSelectChange("userType", value)}>
                          <SelectTrigger id="userType" className="border-gray-300 focus:ring-green-500">
                            <SelectValue placeholder="Select user type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="farmer">Farmer</SelectItem>
                            <SelectItem value="technician">Technician</SelectItem>
                            <SelectItem value="advisor">Advisor / Engineer</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.userType === "other" && (
                        <div className="space-y-2">
                          <Label htmlFor="otherUserType" className="text-gray-700">
                            Please specify
                          </Label>
                          <Input
                            id="otherUserType"
                            name="otherUserType"
                            value={formData.otherUserType || ""}
                            onChange={handleInputChange}
                            placeholder="Specify your user type"
                            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                      )}
                    </div>


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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          disabled={isPending}
                          placeholder="******"
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
                Create an account
              </Button>
            </form>
          </Form>
        </CardWrapper>
      )}
    </>
  );
};

export default RegisterForm;
