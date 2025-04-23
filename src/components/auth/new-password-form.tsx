'use client'

import { useEffect, useState, useTransition } from 'react'

import CardWrapper from './card-wrapper'

import * as z from 'zod'
import { RestPasswordSchema } from '@/schemas'

import { Input } from '@/components/ui/input'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'

import { useSearchParams } from 'next/navigation'
// import { newPassword } from '@/actions/new-password'
import axios from '../../api/axios'
import { getCsrfToken } from '../../hooks/useRefreshToken'

interface NewPasswordFormProps {
  uidb64: string
  token: string
}

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ uidb64, token }) => {

  const [newPasswordStatus, setNewPasswordStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof RestPasswordSchema>>({
    resolver: zodResolver(RestPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    const checkTokenValidity = async () => {
      setError('')
      setSuccess('')
      try {
        const response = await axios.get(`check-token/${uidb64}/${token}/`, { withCredentials: true });
      } catch (error: any) {
        console.log(error)
        setNewPasswordStatus("error");
        setError(error.response.data.error);
      }
    };

    checkTokenValidity();
  }, [uidb64, token]);


  const onSubmit = async (values: z.infer<typeof RestPasswordSchema>) => {
    setError('')
    setSuccess('')
    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const { csrf_token } = await getCsrfToken();

    console.log(values)
    startTransition(async () => {
      try {
        const response = await axios.post(`/password-reset-confirm/${uidb64}/${token}/`, {
          password: values.password,
          confirmPassword: values.confirmPassword,
        },{ withCredentials: true, headers: { 'X-CSRFToken': csrf_token } });
        setSuccess('Password reset successfully')
        setNewPasswordStatus("success");
      } catch (error: any) {
        if (error.response.data.error === "Current password is incorrect.")
          setError('Current password is incorrect.')
        else if (error.response.data.error === "New password cannot be the same as the current password.")
          setError('New password cannot be the same as the current password.')
        else {
          setNewPasswordStatus("error");
          setError('Failed to reset password')
        }
        form.reset({
          password: '',
          confirmPassword: '',
        });
      }
    })
  }

  return (

    <>
      {newPasswordStatus === "error" ? (
        <CardWrapper
          headerLabel='Enter a new password'
          backButtonLabel="Reset your password"
          backButtonHref='/reset'
        >
          <FormError message={error} />
        </CardWrapper>
      ) : newPasswordStatus === "success" ? (
        <CardWrapper
          headerLabel='Enter a new password'
          backButtonLabel="Back to login"
          backButtonHref='/login'
        >
          <FormSuccess message={success} />
        </CardWrapper>
      ) : (

        <CardWrapper
          headerLabel='Enter a new password'
          backButtonLabel="Back to login"
          backButtonHref='/login'
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder='******'
                          type='password'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder='******'
                          type='password'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type='submit' disabled={isPending} className='w-full'>
                Reset password
              </Button>
            </form>
          </Form>
        </CardWrapper>
      )}
    </>
  )
}

export default NewPasswordForm;
