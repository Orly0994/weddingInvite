import { format } from 'date-fns'

export const getTime = (date) => {
  return format(new Date(date), 'dd.MM.yyyy HH:ss')
}