'use client'

import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => push('/auth'),
  })

  return (
    <button
      className=" opacity-20 hover:opacity-100 transform-opacity duration-300"
      onClick={() => mutate()}
    >
      <LogOut size={32} />
    </button>
  )
}
