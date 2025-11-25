import { type StationWithDistance } from '../hooks/useStations'

type Props = {
  stations?: StationWithDistance[] | null
  loading: boolean
  error?: string | null
}

export default function StationsStatus({ stations, loading, error }: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      {loading ? (
        <div>Cargando estaciones...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>Error al cargar estaciones: {error}</div>
      ) : (
        <div>Estaciones cargadas: {stations ? stations.length : 0}</div>
      )}
    </div>
  )
}
