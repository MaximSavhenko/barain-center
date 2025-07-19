import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import cn from 'clsx'

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  className,
  children,
  ...rest
}: PropsWithChildren<TypeButton>) {
  return (
    <button
      className={cn(
        'cursor-pointer linear rounded-lg bg-transparent border border-blue-400 py-2 px-7 text-base text-white transition hover:bg-blue400 active:bg-blue-950',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
