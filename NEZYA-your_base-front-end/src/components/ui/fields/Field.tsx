import { forwardRef } from 'react'

interface IField {
  label: string
  type?: string
  id: string
  placeholder?: string
  name?: string
  error?: string
}

export const Field = forwardRef<HTMLInputElement, IField>(
  ({ label, type = 'text', id, placeholder, name, error, ...rest }, ref) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium mb-1">
          {label}
        </label>
        <input
          className="w-full border px-3 py-2 rounded"
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
        {error && <p className="text-red-500 text-sm mt-1"> {error}</p>}
      </div>
    )
  }
)

Field.displayName = 'Field'
