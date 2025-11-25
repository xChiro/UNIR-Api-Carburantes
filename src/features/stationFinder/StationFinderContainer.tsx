import { useMemo, useState } from 'react'
import useGeolocation from '../../hooks/useGeolocation'
import useStations, { type StationWithDistance } from '../../hooks/useStations'
import StationFinderLayout from './StationFinderLayout'

export default function StationFinderContainer() {
  const { coords, error: geoError, loading: geoLoading, requestPosition, setCoords } = useGeolocation()
  const { stations, loading: stationsLoading, error: stationsError, reload, getNearest } = useStations()

  const [limit, setLimit] = useState(20)

  const results = useMemo(() => {
    if (!coords || !stations) return [] as StationWithDistance[]
    return getNearest(coords.lat, coords.lon, limit)
  }, [coords, stations, getNearest, limit])

  return (
    <StationFinderLayout
      coords={coords}
      geoError={geoError}
      geoLoading={geoLoading}
      stations={null}
      stationsLoading={stationsLoading}
      stationsError={stationsError}
      results={results}
      limit={limit}
      onRequestPosition={() => requestPosition()}
      onReload={(force?: boolean) => reload(force)}
      onChangeLimit={(n: number) => setLimit(n)}
      setCoords={setCoords}
    />
  )
}
