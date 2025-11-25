import type { StationRaw, Station } from './types'

export function parseDecimal(s?: string | null): number | null {
  if (s == null) return null
  const normalized = String(s).trim().replace('\u00A0', ' ').replace(/\s+/g, '').replace(',', '.')
  const n = Number(normalized)
  return Number.isFinite(n) ? n : null
}

export function parseStation(raw: StationRaw): Station | null {
  const id = (raw['IDEESS'] ?? undefined) as string | undefined
  const latS = (raw['Latitud'] ?? raw['Latitud (WGS84)'] ?? raw['Latitud ']) as string | undefined
  const lonS = (raw['Longitud (WGS84)'] ?? raw['Longitud'] ?? raw['Longitud ']) as string | undefined

  const lat = parseDecimal(latS ?? null)
  const lon = parseDecimal(lonS ?? null)
  if (lat == null || lon == null) return null

  const precios: Record<string, number | null> = {}
  for (const [k, v] of Object.entries(raw)) {
    if (k && k.startsWith('Precio')) {
      const key = k.replace('Precio', '').trim()
      precios[key] = parseDecimal(v as string | null)
    }
  }

  const station: Station = {
    id: id ?? Math.random().toString(36).slice(2),
    rotulo: (raw['Rótulo'] ?? raw['Rótulo ']) as string | undefined,
    direccion: raw['Dirección'] as string | undefined,
    localidad: raw['Localidad'] as string | undefined,
    provincia: raw['Provincia'] as string | undefined,
    cp: raw['C.P.'] as string | undefined,
    lat,
    lon,
    horario: raw['Horario'] as string | undefined,
    margen: raw['Margen'] as string | undefined,
    tipoVenta: raw['Tipo Venta'] as string | undefined,
    precios,
  }

  return station
}

export function distanceMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (v: number) => (v * Math.PI) / 180
  const R = 6371000
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

