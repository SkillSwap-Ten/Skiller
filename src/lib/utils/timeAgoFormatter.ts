export function timeAgo(dateStr: string): string {
  const now = new Date()
  const d = new Date(dateStr)
  const diffMs = now.getTime() - d.getTime()

  const diffH = Math.floor(diffMs / 3600000)
  if (diffH < 1) return 'hace un momento'
  if (diffH < 24) return `hace ${diffH} h`

  const diffD = Math.floor(diffH / 24)
  if (diffD < 7) return `hace ${diffD} d`

  const diffW = Math.floor(diffD / 7)
  if (diffW < 4) return `hace ${diffW} sem`

  const diffM = Math.floor(diffD / 30)
  if (diffM < 12) return `hace ${diffM} mes${diffM > 1 ? 'es' : ''}`

  const diffY = Math.floor(diffD / 365)
  return `hace ${diffY} año${diffY > 1 ? 's' : ''}`
}