'use client'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'
import { Heading } from '@/components/ui/Heading'
import { authService } from '@/services/auth.service'
import { IAuthForm } from '@/types/auth.types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function Auth() {
  const { register, handleSubmit, reset } = useForm<IAuthForm>({
    mode: 'onSubmit',
  })

  const [isLoginForm, setLoginForm] = useState(false)

  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: IAuthForm) =>
      authService.main(isLoginForm ? 'login' : 'register', data),
    onSuccess() {
      toast.success('Successfully logged in !')
      reset()
      push('/dashboard')
    },
    onError(error: any) {
      toast.error(error.response?.data?.message || 'Something is wrong !')
    },
  })

  const onSubmit: SubmitHandler<IAuthForm> = (data) => mutate(data)

  return (
    <div className="flex min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/4 m-auto shadow rounded-xl"
      >
        <Heading title="Auth" />
        <Field
          id="email"
          label="Email"
          placeholder="Enter email:"
          type="email"
          {...register('email', { required: 'Email is requeired!' })}
        />
        <Field
          id="password"
          type="password"
          label="Password"
          placeholder="Enter password"
          {...register('password', { required: 'Password is required!' })}
        />
        <div className="flex">
          <Button onClick={() => setLoginForm(true)} className="mr-6">
            Login
          </Button>
          <Button onClick={() => setLoginForm(false)}>Register</Button>
        </div>
      </form>
    </div>
  )
}
