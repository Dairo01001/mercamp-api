import { object, string, TypeOf } from 'zod';

export const signInSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Email is invalid'),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Password must be at most 16 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_%*?&])[A-Za-z\d@$!_%*?&]{8,16}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
      ),
  }),
});

export type SignInInput = TypeOf<typeof signInSchema>;
