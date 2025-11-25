import type { StationRaw, Station } from '../types'
import { parseStation } from '../utils'

const API_URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres'
const CACHE_KEY = 'stations_raw_cache_v1'
const CACHE_TTL_MS = 1000 * 60 * 60 * 6 // 6 hours

interface CacheValue {
  timestamp: number
  data: StationRaw[]
}

export async function fetchStationsRaw(forceRefresh = false): Promise<StationRaw[]> {
  try {
    if (!forceRefresh) {
      const raw = localStorage.getItem(CACHE_KEY)
      if (raw) {
        const parsed: CacheValue = JSON.parse(raw)
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          return parsed.data
        }
      }
    }

    const res = await fetch(API_URL)
    if (!res.ok) throw new Error(`API response ${res.status}`)
    const json = await res.json()
    const data: StationRaw[] = json['ListaEESSPrecio'] || []

    try {
      const toStore: CacheValue = { timestamp: Date.now(), data }
      localStorage.setItem(CACHE_KEY, JSON.stringify(toStore))
    } catch (e) {
      console.warn('Failed to cache stations', e)
    }

    return data
  } catch (err) {
    const raw = localStorage.getItem(CACHE_KEY)
    if (raw) {
      try {
        const parsed: CacheValue = JSON.parse(raw)
        return parsed.data
      } catch (e) {
        console.warn('Failed to parse stale cache', e)
      }
    }
    throw err
  }
}

export async function fetchStationsParsed(forceRefresh = false): Promise<Station[]> {
  const raws = await fetchStationsRaw(forceRefresh)
  const out: Station[] = []
  for (const r of raws) {
    const s = parseStation(r)
    if (s) out.push(s)
  }
  return out
}
