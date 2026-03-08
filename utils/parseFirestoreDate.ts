export function parseFirestoreDate(value: any): Date {
  if (!value) return new Date()

  if (value.toDate) return value.toDate()

  if (value.seconds) {
    return new Date(value.seconds * 1000)
  }

  return new Date(value)
}