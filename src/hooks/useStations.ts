import { useCallback, useEffect, useState } from 'react'
import type { Station } from '../types'
import { fetchStationsParsed } from '../services/stationsService'
import { distanceMeters } from '../utils'

export interface StationWithDistance extends Station {
  distanceMeters: number
}

export function useStations() {
  const [stations, setStations] = useState<Station[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async (force = false) => {
    setLoading(true)
    setError(null)
    try {
      const s = await fetchStationsParsed(force)
      setStations(s)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(false)
  }, [load])

  const getNearest = useCallback(
    (lat: number, lon: number, limit = 20, maxRadiusMeters = 50000) => {
      const list = stations ?? []
      const out: StationWithDistance[] = list
        .map((s) => ({ ...s, distanceMeters: distanceMeters(lat, lon, s.lat, s.lon) }))
        .filter((s) => Number.isFinite(s.distanceMeters) && s.distanceMeters <= maxRadiusMeters)
        .sort((a, b) => a.distanceMeters - b.distanceMeters)
        .slice(0, limit)
      return out
    },
    [stations],
  )

  return { stations, loading, error, reload: load, getNearest } as const
}

export default useStations
