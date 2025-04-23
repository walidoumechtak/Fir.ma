'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation';

import CardWrapper from './card-wrapper'

import * as z from 'zod'
import { LoginSchema } from '@/schemas'

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

// import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { useAuth } from '../../hooks/useAuth';
import axios from '../../api/axios';
import { useUserStore } from '../../hooks/use-current-user';
import AuthGuard from './auth-guard';



const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === 'OAuthAccountNotLinked'
    ? 'Email alreay in use whith different profider' : ''

  const setUserStore = useUserStore((state) => state?.setUserStore)
  const { setUser, setToken } = useAuth();
  const router = useRouter()
  const [isPending, setIsPending] = useState<boolean>(false)
  const ref = useRef<HTMLInputElement>(null);

  // useEffect(()=>{
  //   ref.current?.focus();
  // },[])

  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()


  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      setIsPending(true);
      // Simulate login logic or API call here
      // Example: await login(values);

      // Navigate to /dashboard after successful login
      router.push('/dashboard');
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsPending(false);
    }
  }

 

  return (
    <AuthGuard>
      <CardWrapper
        headerLabel='Welcom back!'
        backButtonLabel="Don't have an account?"
        backButtonHref='/register'
        showSocial={!showTwoFactor}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              {showTwoFactor && (

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem >
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl >
                        <InputOTP maxLength={6} {...field}>
                          < InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!showTwoFactor && (
                <>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder='john.doe@example.com'
                            type='email'
                          // ref={ref}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder='******'
                            type='password'
                          />
                        </FormControl>
                        <Button className='px-0 font-normal' size='sm' variant='link' asChild>
                          <Link href='/reset'>Forgot password</Link>
                        </Button>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormError message={error || urlError} />
              <FormSuccess message={success} />
              <Button type='submit' disabled={isPending} className='w-full'>
                {showTwoFactor ? 'Confirm' : 'Login'}
              </Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    </AuthGuard>
  )
}

export default LoginForm;





