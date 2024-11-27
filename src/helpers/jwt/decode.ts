export function decodeToken(token: string) {
  const arrayToken = token.split('.')
  const base64Url = arrayToken[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/') // Ajustar para base64 estándar
  const decoded = atob(base64) // Decodificar en base64

  return JSON.parse(decoded)
}
