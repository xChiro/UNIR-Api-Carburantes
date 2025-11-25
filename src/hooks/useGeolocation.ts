export interface Coords {
  lat: number
  lon: number
}

import { useCallback, useEffect, useState } from 'react'

export type CoordsSetter = Coords | null | ((prev: Coords | null) => Coords | null)

export function useGeolocation() {
  const [coords, setCoordsState] = useState<Coords | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const requestPosition = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by this browser')
      return
    }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoordsState({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        setError(null)
        setLoading(false)
      },
      (err) => {
        setError(err?.message ?? 'Failed to get position')
        setLoading(false)
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000 * 60 * 5 },
    )
  }, [])

  type InternalCoordsSetter = Coords | null | ((prev: Coords | null) => Coords | null)
  const setCoords = useCallback((c: InternalCoordsSetter) => {
    if (typeof c === 'function') {
      setCoordsState(c as (prev: Coords | null) => Coords | null)
    } else {
      setCoordsState(c)
    }
  }, [])

  useEffect(() => {
  }, [])

  return { coords, error, loading, requestPosition, setCoords } as const
}

export default useGeolocation
