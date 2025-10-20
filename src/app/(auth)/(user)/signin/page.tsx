import { UserAuthForm } from '@/components/organisms/forms/auth/signin/user-auth-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Signin",
  description: "Signin into your custom eco account"
}

export default function SignInPage() {
  return (
    <div className='lg:p-8'>
      <div className='mx-auto flex w-full max-w-sm flex-col justify-center space-y-4'>
        <div className='flex flex-col space-y-2 text-start'>
          <h2 className='text-lg font-semibold tracking-tight'>Sign in</h2>
          <p className='text-muted-foreground text-sm'>
            Enter your email and password below
            to log into your account
          </p>
        </div>
        <UserAuthForm />
        <p className='text-muted-foreground px-8 text-center text-sm'>
          By clicking sign in, you agree to our{' '}
          <a
            href='#terms'
            className='hover:text-primary underline underline-offset-4'
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href='#privacy'
            className='hover:text-primary underline underline-offset-4'
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}