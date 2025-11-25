import { type Coords, type CoordsSetter } from '../../hooks/useGeolocation'
import type { StationWithDistance } from '../../hooks/useStations'
import ControlsBarNew from '../../components/ControlsBarNew'
import CoordinatesDisplay from '../../components/CoordinatesDisplay'
import StationsStatus from '../../components/StationsStatus'
import StationList from '../../components/StationList'
import ActionsPanel from '../../components/ActionsPanel'

type Props = {
  coords?: Coords | null
  geoError?: string | null
  geoLoading: boolean
  stations?: StationWithDistance[] | null
  stationsLoading: boolean
  stationsError?: string | null
  results: StationWithDistance[]
  limit: number
  onRequestPosition: () => void
  onReload: (force?: boolean) => void
  onChangeLimit: (n: number) => void
  setCoords: (updater: CoordsSetter) => void
}

export default function StationFinderLayout({
  coords,
  geoError,
  geoLoading,
  stations,
  stationsLoading,
  stationsError,
  results,
  limit,
  onRequestPosition,
  onReload,
  onChangeLimit,
  setCoords,
}: Props) {
  return (
    <div style={{ padding: 16 }}>
      <h1>Buscador de gasolineras</h1>

      <ControlsBarNew
        geoLoading={geoLoading}
        onRequestPosition={onRequestPosition}
        onReload={onReload}
        limit={limit}
        onChangeLimit={onChangeLimit}
      />

      <CoordinatesDisplay coords={coords} geoError={geoError} />

      <StationsStatus stations={stations} loading={stationsLoading} error={stationsError} />

      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <h2>Cerca de ti</h2>
          <StationList stations={results} />
        </div>
        <ActionsPanel setCoords={setCoords} />
      </div>
    </div>
  )
}
