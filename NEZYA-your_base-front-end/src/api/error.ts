export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message

  if (message) {
    if (Array.isArray(message)) {
      return message[0] // Например, ['Email is invalid']
    }

    return message // Просто строка
  }

  return error.message // Если вообще ничего не пришло от сервера
}