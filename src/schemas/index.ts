import * as z from "zod";




export const RestPasswordSchema = z.object({
  password: z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .regex(/[0-9]/, 'Password must contain a number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain a symbol'),
  confirmPassword: z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .regex(/[0-9]/, 'Password must contain a number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain a symbol'),
})

export const ChangePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, {
      message: 'Password is required to be at least 6 characters',
    }
  ),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/[0-9]/, 'Password must contain a number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain a symbol'),
  confirmPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/[0-9]/, 'Password must contain a number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain a symbol'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export const ResetSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
})

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/[0-9]/, 'Password must contain a number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain a symbol'),
});

export const RegisterSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/[0-9]/, 'Password must contain a number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain a symbol'),
});


export const UpdateProfileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  profile_image: z.instanceof(File).optional(),
});
